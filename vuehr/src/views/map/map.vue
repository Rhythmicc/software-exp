<template>
  <div>
    <div>
      <el-button icon="el-icon-plus" size="small" type="primary" @click="showAddMap">添加</el-button>
    </div>
    <div class="mapMain">
      <el-table :data="maps" border @selection-change="handleSelectionChange" size="small" stripe style="width: 70%">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="id" label="编号" width="55"></el-table-column>
        <el-table-column prop="name" label="名称" width="180"></el-table-column>
        <el-table-column prop="createDate" width="150" label="缩略">
          <template width="60" slot-scope="scope">
            <img style="width:80px;height:80px;border:none" :src="scope.row.url">
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="showLookView(scope.$index, scope.row)">查看</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-button @click="deleteMany" type="danger" size="small" style="margin-top: 8px" :disabled="multipleSelection.length==0"> 批量删除</el-button>
    </div>
    <el-dialog title="地图展示" :visible.sync="dialogVisible_show" width="80%">
      <div class="img-container">
        <img :src="m.url" :alt="m.name" :title="m.name" class="map-img">
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogVisible_show = false">退出</el-button>
      </span>
    </el-dialog>
    <el-dialog title="增加地图" :visible.sync="dialogVisible_add" width="40%">
      <div>
        <div>
          <el-tag>地图名称</el-tag>
          <el-input class="addMapInput" size="small" v-model="AddMap.name"></el-input>
        </div>
        <div>
          <el-tag>地图 url</el-tag>
          <el-input class="addMapInput" size="small" v-model="AddMap.url"></el-input>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogVisible_add = false">取 消</el-button>
        <el-button size="small" type="primary" @click="addMap">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
function getFileUrl(obj) {
  let url;
  url = window.URL.createObjectURL(obj.files.item(0));
  return url;
}
export default {
  name: "map",
  data() {
    return {
      m: {
        name: '',
        url: ''
      },
      dialogVisible_show: false,
      dialogVisible_add: false,
      loading: false,
      AddMap: {
        name: '',
        url: ''
      },
      multipleSelection: [],
      maps: []
    }
  },
  mounted() {
    this.initMaps();
  },
  methods: {
    deleteMany() {
      this.$confirm(' 此 操 作 将 永 久 删 除 【 ' + this.multipleSelection.length + '】条记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let ids = '?';
        this.multipleSelection.forEach(item => {
          ids += 'ids=' + item.id + '&';
        })
        this.deleteRequest("/map/imgbed/" + ids).then(resp => {
          if (resp) {
            this.initMaps();
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    showAddMap() {
      this.AddMap.name = '';
      this.AddMap.url = '';
      this.dialogVisible_add = true;
    },
    async uploadImg() {
      const that = this;
      const inputFile = await this.$refs.fileBtn.files[0];
      let res;
      console.log('选了图片');
      console.log(inputFile);
      this.inputFile = inputFile;
      if (this.inputFile) {
        let inputFile = this.inputFile;
        if (inputFile.type !== 'image/jpeg' &&
            inputFile.type !== 'image/png' && inputFile.type !== 'image/gif') {
          alert('不是有效的图片文件！');
          return;
        }
        inputFile.lastModifiedDate.toLocaleString()
        const reader = new FileReader();
        res = reader.readAsDataURL(this.inputFile);
        console.log('我想想要获取流');
        reader.onloadend = function () {
          reader.result.substring(84);
          var strBase64 = reader.result.substring(0);
          console.log(strBase64);
        };
        reader.onload = function (e) {
          console.log(e);
          that.AddMap.url = this.result;// 注意:这里的 this.result 中,这个 this 不是 vue 实例,而是 reader 对象,所以之前用 that 接收 vue 示例 that.imgSrc
          that.AddMap.url =getFileUrl(that.AddMap.url);
        };
      } else {
        return;
      }
    },
    addMap () {
      this.postRequest("/map/imgbed/", this.AddMap).then(resp => {
        if (resp) {
          this.initMaps();
          this.dialogVisible_add=false;
        }
      })
    },
    showLookView(index, data) {
      Object.assign(this.m, data);
      this.dialogVisible_show = true;
    },
    handleDelete(index, data) {
      this.$confirm('此操作将永久删除【' + data.name + '】,' + '是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteRequest("/map/imgbed/" + data.id).then(resp => {
          if (resp) {
            this.initMaps();
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    initMaps() {
      this.loading = true;
      this.getRequest("/map/imgbed/").then(resp => {
        this.loading = false;
        if (resp) {
          this.maps = resp;
        }
      })
    }
  }
}
</script>

<style>
.addMapInput {
  width: 200px;
  margin-left: 8px;
}
.mapMain {
  margin-top: 10px;
}
.map-img {
  width: 600px;
  height: 600px;
  border-radius: 72px;
}
.img-container {
  display: flexbox;
  justify-content: center;
}
</style>
