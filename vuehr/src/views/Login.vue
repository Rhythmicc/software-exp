<template>
    <div>
        <el-form
                :rules="rules"
                ref="loginForm"
                v-loading="loading"
                element-loading-text="正在登录..."
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)"
                :model="loginForm"
                class="loginContainer">
            <h3 class="loginTitle">系统登录</h3>
            <el-form-item prop="username">
                <el-input size="normal" type="text" v-model="loginForm.username" auto-complete="off"
                          placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input size="normal" type="password" v-model="loginForm.password" auto-complete="off"
                          placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-form-item prop="code">
                <el-input size="normal" type="text" v-model="loginForm.code" auto-complete="off"
                          placeholder="点击图片更换验证码" @keydown.enter.native="submitLogin" style="width: 250px"></el-input>
                <img :src="vcUrl" @click="updateVerifyCode" alt="" style="cursor: pointer">
            </el-form-item>
            <el-checkbox size="normal" class="loginRemember" v-model="checked"></el-checkbox>
            <div style="display: flex; justify-content: space-between;">
              <el-button size="normal" type="primary" style="width: 100%;" @click="submitLogin">登录</el-button>
              <el-button size="normal" type="primary" style="width: 100%;" @click="showAddHrView">注册</el-button>
            </div>
        </el-form>
        <el-dialog title="注册用户" :visible.sync="dialogVisible" width="60%">
            <div>
                <el-form :model="hr" :rules="rules" ref="empForm">
                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="姓名:" prop="name">
                                <el-input size="mini" style="width:150px" prefix-icon="el-icon-edit" v-model="hr.name" placeholder="请输入用户名"></el-input>
                            </el-form-item> 
                        </el-col>
                        <el-col :span="7">
                            <el-form-item label="手机号:" prop="phone">
                                <el-input size="mini" style="width:120px" prefix-icon="el-icon-edit" v-model="hr.phone" placeholder="请输入手机号"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="电话:" prop="telephone">
                                <el-input size="mini" style="width: 150px" prefix-icon="el-icon-edit" v-model="hr.telephone" placeholder="请输入电话号码"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="7">
                            <el-form-item label="联系地址:" prop="address">
                                <el-input size="mini" style="width:200px" prefix-icon="el-icon-edit" v-model="hr.address" placeholder="请输入联系地址"></el-input>
                            </el-form-item> 
                        </el-col> 
                    </el-row>
                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="登录用户名:" prop="username">
                                <el-input size="mini" style="width:150px" prefix-icon="el-icon-edit" v-model="hr.username" placeholder="请输入该用户登录用户名"></el-input>
                            </el-form-item> 
                        </el-col>
                        <el-col :span="7">
                                <el-form-item label="登录密码:" prop="password">
                                    <el-input size="mini" style="width: 150px" prefix-icon="el-icon-edit" v-model="hr.password" placeholder="请输入该用户登陆密码"></el-input>
                                </el-form-item> 
                        </el-col> 
                    </el-row>
                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="图片:" prop="userface">
                                <el-input size="mini" style="width:180px" prefix-icon="el-icon-edit" v-model="hr.userface" placeholder="请输入图片 url"></el-input>
                            </el-form-item>
                        </el-col>    
                        <el-col :span="7">
                            <el-form-item label="备注:" prop="remark">
                                <el-input size="mini" style="width:180px" prefix-icon="el-icon-edit" v-model="hr.remark" placeholder="请输入备注"></el-input>
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
</template>

<script>
    export default {
        name: "Login",
        data() {
            return {
                loading: false,
                vcUrl: '/api/verifyCode?time='+new Date(),
                loginForm: {
                    username: '',
                    password: '',
                    code:''
                },
                hr : { name: "", phone: "", telephone: "", address: "", enabled: 0, username: "", password: "", userface: "", remark: "",},
                dialogVisible:false,
                checked: true,
                rules: {
                    username: [{required: true, message: '请输入用户名', trigger: 'blur'}],
                    password: [{required: true, message: '请输入密码', trigger: 'blur'}],
                    code: [{required: true, message: '请输入验证码', trigger: 'blur'}]
                }
            }
        },
        methods: {
            updateVerifyCode() {
                this.vcUrl = '/api/verifyCode?time='+new Date();
            },
            submitLogin() {
                this.$refs.loginForm.validate((valid) => {
                    if (valid) {
                        this.loading = true;
                        this.postRequest('/doLogin', this.loginForm).then(resp => {
                            this.loading = false;
                            if (resp) {
                                this.$store.commit('INIT_CURRENTHR', resp.obj);
                                window.sessionStorage.setItem("user", JSON.stringify(resp.obj));
                                let path = this.$route.query.redirect;
                                this.$router.replace((path == '/' || path == undefined) ? '/home' : path);
                            }else{
                                this.vcUrl = '/api/verifyCode?time='+new Date();
                            }
                        })
                    } else {
                        return false;
                    }
                });
            },
            showAddHrView() { 
                this.dialogVisible = true; 
            },
            doAddHr() { 
                if (this.hr.id) { 
                    this.$refs['empForm'].validate(valid => { 
                        if (valid) { 
                            this.putRequest("/system/hr/", this.hr).then(resp => { 
                                if (resp) { 
                                    this.dialogVisible = false; 
                                    this.initHrs(); 
                                }
                            })
                        }
                    }); 
                } else { 
                    this.$refs['empForm'].validate(valid => { 
                        if (valid) {
                            this.hr.enabled=0;
                            this.postRequest("/system/hr/", this.hr).then(resp => {
                                if (resp) { 
                                   this.dialogVisible = false; 
                                   this.initHrs(); 
                                }
                            })
                        }
                    });
                }
            }
        }
    }
</script>

<style>
    .loginContainer {
        border-radius: 15px;
        background-clip: padding-box;
        margin: 180px auto;
        width: 350px;
        padding: 15px 35px 15px 35px;
        background: #fff;
        border: 1px solid #eaeaea;
        box-shadow: 0 0 25px #cac6c6;
    }

    .loginTitle {
        margin: 15px auto 20px auto;
        text-align: center;
        color: #505458;
    }

    .loginRemember {
        text-align: left;
        margin: 0px 0px 15px 0px;
    }
    .el-form-item__content{
        display: flex;
        align-items: center;
    }
</style>
