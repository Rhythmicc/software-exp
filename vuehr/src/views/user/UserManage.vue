<template>
    <div>
        <el-tabs v-model="activeName" type="card">
            <el-tab-pane label="信息管理" name="userInfo"><UserInfo></UserInfo></el-tab-pane>
            <el-tab-pane label="权限" name="permissmana"><PermissMana></PermissMana></el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import UserInfo from "../../components/sys/basic/UserInfo";
import PermissMana from "../../components/sys/basic/PermissMana";
export default {
    name: "UserManage",
    data(){ 
        return{
            activeName: 'userInfo'
        }
    },
    components:{
        UserInfo,
        PermissMana
    }
}
</script>

<style scoped>

</style>
