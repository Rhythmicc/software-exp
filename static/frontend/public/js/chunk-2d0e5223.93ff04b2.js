(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0e5223"],{"92d8":function(e,t,s){"use strict";s.r(t);var r=function(){var e=this,t=e.$createElement,s=e._self._c||t;return e.hr?s("div",[s("el-card",{staticClass:"box-card",staticStyle:{width:"400px"}},[s("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[s("span",[e._v(e._s(e.hr.name))])]),s("div",[s("div",{staticStyle:{display:"flex","justify-content":"center"}},[s("el-upload",{attrs:{"show-file-list":!1,"on-success":e.onSuccess,data:e.hr,action:"/hr/userface"}},[s("img",{staticStyle:{width:"100px",height:"100px","border-radius":"50px"},attrs:{title:"点击修改用户图像",src:e.hr.userface,alt:""}})])],1),s("div",[e._v("电话号码：\n                  "),s("el-tag",[e._v(e._s(e.hr.telephone))])],1),s("div",[e._v("手机号码：\n                  "),s("el-tag",[e._v(e._s(e.hr.phone))])],1),s("div",[e._v("居住地址：\n                  "),s("el-tag",[e._v(e._s(e.hr.address))])],1),s("div",[e._v("用户标签：\n                  "),e._l(e.hr.roles,(function(t,r){return s("el-tag",{key:r,staticStyle:{"margin-right":"5px"},attrs:{type:"success"}},[e._v("\n                      "+e._s(t.nameZh)+"\n                  ")])}))],2),s("div",{staticStyle:{display:"flex","justify-content":"space-around","margin-top":"10px"}},[s("el-button",{attrs:{type:"primary"},on:{click:e.showUpdateHrInfoView}},[e._v("修改信息")]),s("el-button",{attrs:{type:"danger"},on:{click:e.showUpdatePasswdView}},[e._v("修改密码")])],1)])]),s("el-dialog",{attrs:{title:"修改用户信息",visible:e.dialogVisible,width:"30%"},on:{"update:visible":function(t){e.dialogVisible=t}}},[s("div",[s("table",[s("tr",[s("td",[s("el-tag",[e._v("用户昵称：")])],1),s("td",[s("el-input",{model:{value:e.hr2.name,callback:function(t){e.$set(e.hr2,"name",t)},expression:"hr2.name"}})],1)]),s("tr",[s("td",[s("el-tag",[e._v("电话号码：")])],1),s("td",[s("el-input",{model:{value:e.hr2.telephone,callback:function(t){e.$set(e.hr2,"telephone",t)},expression:"hr2.telephone"}})],1)]),s("tr",[s("td",[s("el-tag",[e._v("手机号码：")])],1),s("td",[s("el-input",{model:{value:e.hr2.phone,callback:function(t){e.$set(e.hr2,"phone",t)},expression:"hr2.phone"}})],1)]),s("tr",[s("td",[s("el-tag",[e._v("用户地址：")])],1),s("td",[s("el-input",{model:{value:e.hr2.address,callback:function(t){e.$set(e.hr2,"address",t)},expression:"hr2.address"}})],1)])])]),s("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[s("el-button",{on:{click:function(t){e.dialogVisible=!1}}},[e._v("取 消")]),s("el-button",{attrs:{type:"primary"},on:{click:e.updateHrInfo}},[e._v("确 定")])],1)]),s("el-dialog",{attrs:{title:"修改密码",visible:e.passwdDialogVisible,width:"30%"},on:{"update:visible":function(t){e.passwdDialogVisible=t}}},[s("div",[s("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:e.ruleForm,"status-icon":"",rules:e.rules,"label-width":"100px"}},[s("el-form-item",{attrs:{label:"请输入旧密码",prop:"oldpass"}},[s("el-input",{attrs:{type:"password",autocomplete:"off"},model:{value:e.ruleForm.oldpass,callback:function(t){e.$set(e.ruleForm,"oldpass",t)},expression:"ruleForm.oldpass"}})],1),s("el-form-item",{attrs:{label:"请输入新密码",prop:"pass"}},[s("el-input",{attrs:{type:"password",autocomplete:"off"},model:{value:e.ruleForm.pass,callback:function(t){e.$set(e.ruleForm,"pass",t)},expression:"ruleForm.pass"}})],1),s("el-form-item",{attrs:{label:"新确认密码",prop:"checkPass"}},[s("el-input",{attrs:{type:"password",autocomplete:"off"},model:{value:e.ruleForm.checkPass,callback:function(t){e.$set(e.ruleForm,"checkPass",t)},expression:"ruleForm.checkPass"}})],1),s("el-form-item",[s("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.submitForm("ruleForm")}}},[e._v("提交")]),s("el-button",{on:{click:function(t){return e.resetForm("ruleForm")}}},[e._v("重置")])],1)],1)],1)])],1):e._e()},i=[],o=(s("a481"),{name:"HrInfo",data:function(){var e=this,t=function(t,s,r){""===s?r(new Error("请输入密码")):(""!==e.ruleForm.checkPass&&e.$refs.ruleForm.validateField("checkPass"),r())},s=function(t,s,r){""===s?r(new Error("请再次输入密码")):s!==e.ruleForm.pass?r(new Error("两次输入密码不一致!")):r()};return{ruleForm:{oldpass:"",pass:"",checkPass:""},rules:{oldpass:[{validator:t,trigger:"blur"}],pass:[{validator:t,trigger:"blur"}],checkPass:[{validator:s,trigger:"blur"}]},hr:null,hr2:null,dialogVisible:!1,passwdDialogVisible:!1}},mounted:function(){this.initHr()},methods:{onSuccess:function(){this.initHr()},updateHrInfo:function(){var e=this;this.putRequest("/hr/info",this.hr2).then((function(t){t&&(e.dialogVisible=!1,e.initHr())}))},showUpdateHrInfoView:function(){this.dialogVisible=!0},submitForm:function(e){var t=this;this.$refs[e].validate((function(e){if(!e)return!1;t.ruleForm.hrid=t.hr.id,t.putRequest("/hr/pass",t.ruleForm).then((function(e){e&&(t.getRequest("/logout"),window.sessionStorage.removeItem("user"),t.$store.commit("initRoutes",[]),t.$router.replace("/"))}))}))},resetForm:function(e){this.$refs[e].resetFields()},showUpdatePasswdView:function(){this.passwdDialogVisible=!0},initHr:function(){var e=this;this.getRequest("/hr/info").then((function(t){t&&(e.hr=t,e.hr2=Object.assign({},e.hr),window.sessionStorage.setItem("user",JSON.stringify(t)),e.$store.commit("INIT_CURRENTHR",t))}))}}}),l=o,a=s("2877"),n=Object(a["a"])(l,r,i,!1,null,"477e2013",null);t["default"]=n.exports}}]);
//# sourceMappingURL=chunk-2d0e5223.93ff04b2.js.map