<template>
<div> 
    <div> 
        <el-button icon="el-icon-plus" size="small" type="primary" @click="showAddMap">添加</el-button>
    </div>

    <div class="mapMain">
        <el-table :data="maps" border @selection-change="handleSelectionChange" size="small" stripe style="width: 70%">
            <el-table-column type="selection" width="55"></el-table-column> 
            <el-table-column prop="id" label="编号" width="55"></el-table-column> 
            <el-table-column prop="name" label="地区" width="180"></el-table-column> 
            <el-table-column prop="keyword" width="150" label="坐标"></el-table-column> 
            <el-table-column prop="createDate" width="150" label="创建时间"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button size="mini" @click="showLookView(scope.$index, scope.row)">预览 </el-button> 
                    <el-button size="mini" type="danger" @click="handleDelete(scope.$index,scope.row)">删除</el-button> 
                </template> 
            </el-table-column> 
        </el-table>
        <el-button @click="deleteMany" type="danger" size="small" style="margin-top: 8px" :disabled="multipleSelection.length==0">批量删除</el-button> 
    </div> 
    <el-dialog title="地图展示" :visible.sync="dialogVisible_show" width="80%">
        <el-container>
            <el-aside style="width: 50%;">
                <vl-map :load-tiles-while-animating="true" :load-tiles-while-interacting="true" style="height: 800px;" data-projection="EPSG:4326">
                    <vl-view :zoom.sync="location.zoom" :center.sync="location.center" :rotation.sync="location.rotation"></vl-view>
                    <vl-layer-vector :z-index="1">
                        <vl-source-vector :features.sync="location.features" ident="the-source"></vl-source-vector>

                        <vl-style-box>
                            <vl-style-stroke color="green"></vl-style-stroke>
                            <vl-style-fill color="rgba(255,255,255,0.5)"></vl-style-fill>
                            <vl-style-text :text="drawText"></vl-style-text>
                        </vl-style-box>
                    </vl-layer-vector>

                    <vl-interaction-draw :type="drawOption" source="the-source">
                        <vl-style-box>
                            <vl-style-stroke color="blue"></vl-style-stroke>
                            <vl-style-fill color="rgba(255,255,255,0.5)"></vl-style-fill>
                        </vl-style-box>
                    </vl-interaction-draw>
                    <vl-layer-tile id="bingmaps">
                        <!--<vl-source-bingmaps :api-key="location.apiKey" :imagery-set="location.imagerySet"></vl-source-bingmaps>-->
                        <vl-source-osm></vl-source-osm>
                    </vl-layer-tile>
                </vl-map>
            </el-aside>
            <el-main style="width: 50%;">
                <div style="height: 800px;">
                    <model-gltf :src="mapUrl" backgroundColor="#000000" zoom="10"></model-gltf>
                </div>
            </el-main>
        </el-container>
        <span slot="footer" class="dialog-footer">
            <el-select v-model="drawOption" placeholder="请选择绘制图形">
                <el-option v-for="item in drawOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
            <el-button size="small" @click="getArea"> 计算面积/长度 </el-button>
            <el-button size="small" @click="location.features = []; drawText=''"> 清空绘图 </el-button>
            <el-button size="small" @click="show3DModel"> 加载3D模型 </el-button>
            <el-button size="small" @click="dialogVisible_show=false" type="primary"> 退出 </el-button>
        </span> 
    </el-dialog> 
    <el-dialog title="增加地图" :visible.sync="dialogVisible_add" width="40%">
        <div>
            <div> 
                <el-tag>地图名称</el-tag> 
                <el-input class="addMapInput" size="small" v-model="AddMap.name"></el-input>
            </div> 
            <div>
                <el-tag>地图坐标</el-tag> 
                <el-input class="addMapInput" size="small" v-model="AddMap.keyword">
                </el-input> 
            </div> 
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button size="small" @click="dialogVisible_add = false"> 取消 </el-button>
            <el-button size="small" type="primary" @click="addMap"> 确定 </el-button> 
        </span> 
    </el-dialog> 
</div> 
</template>

<script>
    import { ModelGltf } from 'vue-3d-model';
    import 'vuelayers/lib/style.css'
    export default { 
        name: "map3d", 
        components: { ModelGltf },
        data() { 
            return { 
                m: {
                    name: '', 
                    keyword: ''
                }, 
                dialogVisible_show: false, 
                dialogVisible_add: false, 
                loading: false, 
                AddMap: {
                    name: '',
                    keyword: '' 
                }, 
                multipleSelection: [], 
                maps: [],
                location: {
                    zoom: 15,
                    center: [0, 0],
                    rotation: 0,
                    apiKey: 'Au9zjPDr51o7DJuRc9gemyp1zu-xS4P5XJ4wU50CLXoOVM3gKR31DhwsQsRQSmV0',
                    imagerySet: 'AerialWithLabels',
                    features: [],
                },
                drawOptions: [{
                    value: 'LineString',
                    label: '折线',
                }, {
                    value: 'Polygon',
                    label: '多边形',
                }, {
                    value: 'Circle',
                    label: '圆形'
                }],
                drawOption: 'Polygon',
                drawText: '',
                mapVisible: true,
                layers: [],
                mapUrl: ''
            }
        }, 
        mounted() { 
            this.initMaps();
        },
        methods: { 
            deleteMany() { 
                this.$confirm(' 此 操 作 将 永 久 删 除【' + this.multipleSelection.length + '】条记录, 是否继续?', '提示', { confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning'}
                ).then(() => {
                    let ids = '?';
                    this.multipleSelection.forEach(item => {
                        ids += 'ids=' + item.id + '&';
                    }) 
                    this.deleteRequest("/map/map3d/" + ids).then(resp => {
                        if (resp) { this.initMaps(); } })
                }).catch(() => {
                    this.$message({ type: 'info', message: '已取消删除' });
                });
            }, 
            handleSelectionChange(val) {
                this.multipleSelection = val; 
            }, 
            showAddMap() {
                this.AddMap.name = ''; 
                this.AddMap.keyword = ''; 
                this.dialogVisible_add = true;
            }, 
            addMap() {
                this.postRequest("/map/map3d/", this.AddMap).then(resp => {
                    if (resp) { 
                        this.initMaps(); 
                        this.dialogVisible_add = false; }
                })
            }, 
            showLookView(index, data) {
                // Object.assign(this.m, data);
                let ss = data.keyword.split(',');
                this.location.center = [parseFloat(ss[0]), parseFloat(ss[1])];
                // this.location.position.lng = parseFloat(ss[0]);
                // this.location.position.lat = parseFloat(ss[1]);
                this.dialogVisible_show = true;
            }, 
            handleDelete(index, data) { 
                this.$confirm('此操作将永久删除【' + data.name + '】, 是否 继续 ? ','提示', { confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning'}
                ).then(() => {
                    this.deleteRequest("/map/map3d/"+data.id).then(resp => {
                        if (resp) { this.initMaps(); }
                    })
                }).catch(() => {
                    this.$message({ type: 'info', message: '已取消删除' });
                });
            }, 
            initMaps() {
                this.loading = true; 
                this.getRequest("/map/map3d/").then(resp => { this.loading = false; if (resp) { this.maps = resp; } })
            },
            show3DModel() {
                this.mapUrl = '/api/dae/model.gltf';
            },
            mapPanelTabClasses(tab) {
                return {
                    'is-active': this.mapPanel.tab === tab,
                }
            },
            showMapPanelTab(tab) {
                this.mapPanel.tab = tab
                if (tab !== 'draw') {
                    this.drawType = undefined
                }
            },
            getArea() {
                this.location.features.splice(0, this.location.features.length - 1);
                if (this.drawOption != 'LineString'){
                    let points = this.location.features[0].geometry.coordinates[0];
                    let count = points.length;
                    let area0 = 0, area1 = 0;
                    for (let i = 0; i < count; i++) {
                        area0 += points[i][0] * (i + 1 < count ? points[i + 1][1]: points[0][1]) * 9101.160000085981;
                        area1 += points[i][1] * (i + 1 < count ? points[i + 1][0]: points[0][0]) * 9101.160000085981;
                    }
                    area0 = Math.abs(area0 - area1) * 0.5;
                    // console.log(area0.toFixed(2), "KM2");
                    this.$message({
                        showClose: true,
                        message: "所选地区面积为: " + area0.toFixed(2).toString() + " km2",
                        type: 'success'
                    });
                    this.drawText = area0.toFixed(2).toString() + " km2";
                } else {
                    let points = this.location.features[0].geometry.coordinates;
                    var count = points.length;
                    let length = 0;
                    for (let i = 0; i < count - 1; i++) {
                        var radLat1 = points[i][1] * Math.PI / 180.0;
                        var radLat2 = points[i + 1][1] *Math.PI / 180.0;
                        
                        var a = radLat1 - radLat2;
                        var b = points[i][0] * Math.PI / 180.0 - points[i + 1][0] * Math.PI / 180.0;
                        var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a/2),2) + Math.cos(radLat1)*Math.cos(radLat2)*Math.pow(Math.sin(b/2),2)));
                        length += s * 6378.137;
                    } 
                    this.$message({
                        showClose: true,
                        message: "划线长度为: " + length.toFixed(2).toString() + " km",
                        type: 'success'
                    });
                    this.drawText = length.toFixed(2).toString() + " km";
                }
            }
        }
    } 
</script>

<style>
    .addMapInput { width: 200px; margin-left: 8px; }    
    .mapMain { margin-top: 10px; } .map-img {
    width: 600px;
    height: 600px;
    border-radius: 72px; }
    .img-container {
        width: 900px; height: 900px; /*width: 150px;*/ /*height: 120px;*/ 
        display: flex; 
        justify-content: center;
    } 
    .bm-view { width: 100%; height: 300px; }
</style>
