<template>
<div>
        <div>
            <el-button icon="el-icon-plus" size="small" type="primary" @click="showAddHr">添加</el-button>
        </div>
        <div
            v-loading="globalLoading"
            element-loading-text="正在添加..."
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(0, 0, 0, 0.8)">
        <el-table :data="users.filter(data => !search || data.name.includes(search))" 
            border size="small" stripe style="width: 70%">
            <el-table-column prop="id" label="编号" width="55" sortable></el-table-column>
            <el-table-column prop="name" label="姓名"></el-table-column>
            <el-table-column prop="phone" label="电话"></el-table-column>
            <el-table-column prop="telephone" label="手机"></el-table-column>
            <el-table-column prop="address" label="地址"></el-table-column>
            <el-table-column prop="username" label="账号"></el-table-column>
            <el-table-column prop="password" label="密码"></el-table-column>
            <el-table-column label="头像">
                <template width="60" slot-scope="scope">
                    <img style="width:80px;height:80px;border:none" :src="scope.row.userface">
                </template>
            </el-table-column>
            <el-table-column prop="remark" label="备注"></el-table-column>
            <el-table-column label="操作" fixed="right">
                <template slot-scope="scope">
                    <el-button icon="el-icon-edit-outline" type="warning" size="small" @click="handleEditHr(scope.row)">编辑</el-button>
                    <el-button icon="el-icon-delete" size="small" type="danger" @click="handleDeleteHr(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog title="增改用户" :visible.sync="dialogVisible" width="60%">
            <div>
                <el-form :model="hr" :rules="rules" ref="empForm">
                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="员工姓名:" prop="name">
                                <el-input size="mini" style="width:150px" prefix-icon="el-icon-edit" v-model="hr.name" placeholder="请输入用户名"></el-input>
                            </el-form-item> 
                        </el-col>
                        <el-col :span="7">
                            <el-form-item label="手机号码:" prop="phone">
                                <el-input size="mini" style="width:120px" prefix-icon="el-icon-edit" v-model="hr.phone" placeholder="请输入手机号"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="登录权限" prop="enabled">
                                <el-select v-model="hr.enabled" placeholder="请选择">
                                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="电话号码:" prop="telephone">
                                <el-input size="mini" style="width: 150px" prefix-icon="el-icon-edit" v-model="hr.telephone" placeholder="请输入电话号码"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="7">
                            <el-form-item label="联系地址:" prop="address">
                                <el-input size="mini" style="width:200px" prefix-icon="el-icon-edit" v-model="hr.address" placeholder="请输入联系地址"></el-input>
                            </el-form-item> 
                        </el-col> 
                        <el-col :span="8">
                            <el-form-item label="登录账户:" prop="username">
                                <el-input size="mini" style="width:150px" prefix-icon="el-icon-edit" v-model="hr.username" placeholder="请输入该用户登录用户名"></el-input>
                            </el-form-item> 
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="图像链接:" prop="userface">
                                <el-input size="mini" style="width:180px" prefix-icon="el-icon-edit" v-model="hr.userface" placeholder="请输入图片 url"></el-input>
                            </el-form-item>
                        </el-col>    
                        <el-col :span="7">
                                <el-form-item label="备注信息:" prop="remark">
                                    <el-input size="mini" style="width:180px" prefix-icon="el-icon-edit" v-model="hr.remark" placeholder="请输入备注"></el-input>
                                </el-form-item> 
                        </el-col>
                        <el-col :span="8">
                                <el-form-item label="登录密码:" prop="password">
                                    <el-input size="mini" style="width: 150px" prefix-icon="el-icon-edit" v-model="hr.password" placeholder="请输入该用户登陆密码"></el-input>
                                </el-form-item> 
                        </el-col> 
                    </el-row>
                </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" @click="doAddHr">确定</el-button>
            </span>
        </el-dialog>
    </div>
</div>
</template>
<script>
export default {
    name: "UserInfo",
    data() {
        return {
            globalLoading: false,
            dialogVisible: false,
            users: [],
            hr : { id: 0, name: "", phone: "", telephone: "", address: "", enabled: false, username: "", password: "", userface: "", remark: "",},
            rules: {
                username: [{required: true, message: '请输入用户名', trigger: 'blur'}],
                password: [{required: true, message: '请输入密码', trigger: 'blur'}],
            },
            search: '',
            options: [{value: false, label: '禁止登录'}, {value: true, label: '允许登录'}]
        }
    },
    mounted() {
        this.initUserInfos();
    },
    methods: {
        __copy___(dst, src){
            for (let key in src) {
                dst[key] = src[key];
            }
        },

        __reset_hr() {
            this.hr.id = 0;
            this.hr.name = "";
            this.hr.phone = "";
            this.hr.telephone = "";
            this.hr.address = "";
            this.hr.enabled = false;
            this.hr.username = "";
            this.hr.password = "";
            this.hr.userface = "";
            this.hr.remark = "";
        },

        initUserInfos() {
            this.globalLoading = true;
            this.getRequest("/system/hr/").then(resp => {
                this.globalLoading = false;
                if (resp) this.users = resp;
            })
        },

        showAddHr() {
            this.dialogVisible = true;
        },

        doAddHr() { 
            let cp = {};
            this.__copy___(cp, this.hr);
            if (cp.id && cp.id > 0) { 
                this.$refs['empForm'].validate(valid => { 
                    if (valid) { 
                        this.putRequest("/system/hr/", cp).then(resp => { 
                            if (resp) { 
                                this.dialogVisible = false; 
                                this.initUserInfos(); 
                            }
                        })
                    }
                }); 
            } else { 
                this.$refs['empForm'].validate(valid => { 
                    if (valid) {
                        this.postRequest("/system/hr/", cp).then(resp => {
                            if (resp) { 
                               this.dialogVisible = false; 
                               this.initUserInfos();
                            }
                        })
                    }
                });
            }
            this.__reset_hr();
            this.dialogVisible = false;
        },

        handleDeleteHr(index, rowData) {
            this.$confirm('此操作将永久删除【' + data.name + '】,' + '是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.deleteRequest("/system/hr/" + rowData.id).then(resp => {
                    if (resp) this.users.splice(index, 1);
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },

        handleEditHr(rowData) {
            this.__copy___(this.hr, rowData);
            this.showAddHr();
        }
    },
}
</script>
