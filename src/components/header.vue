<template>
    <div>
        <el-container>
            <el-header height="80px">
              <div class="head">
                <div class="title">
                    <h1>连锁门店客流分析系统</h1>
                </div>
                <el-dropdown id="in" style="position:absolute; color:#E6A23C; margin-top:5px; right:-60%; font-size:20px;" @command="handleCommand">
                  <span class="el-dropdown-link">
                    <i class="el-icon-user-solid"></i>登录<i class="el-icon-arrow-down el-icon--right"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="login">登录</el-dropdown-item>
                    <el-dropdown-item command="register">注册</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>

                <el-dropdown id="out" style="position:absolute; color:#E6A23C; margin-top:5px; right:-60%; font-size:20px;" @command="handleCommand">
                  <span class="el-dropdown-link">
                    <i class="el-icon-user-solid"></i>信息<i class="el-icon-arrow-down el-icon--right"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="info">个人信息</el-dropdown-item>
                    <el-dropdown-item command="passwordEdit">修改密码</el-dropdown-item>
                    <el-dropdown-item command="logout">退出登录</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
                <!--<el-link style="position:absolute; margin-top:5px; right:-60%; font-size:20px;" type="warning" href="#/hotSpot/"><i class="el-icon-user-solid"></i>登录</el-link>-->
              </div>
            </el-header>
                <el-dialog width="450px" title="注册" :close-on-click-modal="false" :visible.sync="loginFormVisible">
                                <el-form style="margin-left:30px; width:300px" :inline="false" :model="loginForm">
                                  <el-form-item prop="account" label="账号" label-height="10px" :label-width="formLabelWidth">
                                    <el-input v-model="loginForm.account" size="medium" autocomplete="off"></el-input>
                                  </el-form-item>
                                  <el-form-item prop="password" label="密码" label-height="10px" :label-width="formLabelWidth">
                                    <el-input v-model="loginForm.password" type="password" size="medium" autocomplete="off"></el-input>
                                  </el-form-item>
                                </el-form>
                                <div slot="footer" class="dialog-footer">
                                  <el-button @click="loginFormVisible = false">取 消</el-button>
                                  <el-button type="primary" @click="loginConfirm">登 录</el-button>
                                </div>
                  </el-dialog>
                  <el-dialog width="450px" title="注册" :close-on-click-modal="false" :visible.sync="loginFormVisible">
                                <el-form style="margin-left:30px; width:300px" :inline="false" :model="loginForm">
                                  <el-form-item prop="password" label="新密码" label-height="10px" :label-width="formLabelWidth">
                                    <el-input v-model="loginForm.password" type="password" size="medium" autocomplete="off"></el-input>
                                  </el-form-item>
                                  <el-form-item prop="confirmPassword" label="确认密码" label-height="10px" :label-width="formLabelWidth">
                                    <el-input v-model="loginForm.confirmPassword" type="password" size="medium" autocomplete="off"></el-input>
                                  </el-form-item>
                                </el-form>
                                <div slot="footer" class="dialog-footer">
                                  <el-button @click="loginFormVisible = false">取 消</el-button>
                                  <el-button type="primary" @click="loginConfirm">登 录</el-button>
                                </div>
                  </el-dialog>
                <el-dialog width="500px" title="注册" :close-on-click-modal="false" :visible.sync="registerFormVisible">
                                <el-form style="margin-left:50px; width:340px" :rules="registerRules" :inline="false" :model="registerForm">
                                  <el-form-item prop="account" label="账号" label-height="10px" :label-width="formLabelWidth">
                                    <el-input v-model="registerForm.account" size="medium" autocomplete="off"></el-input>
                                  </el-form-item>
                                  <el-form-item prop="password" label="密码" label-height="10px" :label-width="formLabelWidth">
                                    <el-input v-model="registerForm.password" type="password" size="medium" autocomplete="off"></el-input>
                                  </el-form-item>
                                  <el-form-item prop="confirmPassword" label="确认密码" label-height="10px" :label-width="formLabelWidth">
                                    <el-input v-model="registerForm.confirmPassword" type="password" size="medium" autocomplete="off"></el-input>
                                  </el-form-item>
                                  <el-form-item prop="name" label="昵称" label-height="10px" :label-width="formLabelWidth">
                                    <el-input v-model="registerForm.name" type="tel" size="medium" autocomplete="off"></el-input>
                                  </el-form-item>
                                  <el-form-item prop="phone" label="手机号码" label-height="10px" :label-width="formLabelWidth">
                                    <el-input v-model="registerForm.phone" size="medium" autocomplete="off"></el-input>
                                  </el-form-item>
                                  <el-form-item prop="email" label="邮箱" label-height="10px" :label-width="formLabelWidth">
                                    <el-input v-model="registerForm.email" type="email" size="medium" autocomplete="off"></el-input>
                                  </el-form-item>
                                </el-form>
                                <div slot="footer" class="dialog-footer">
                                  <el-button @click="registerFormVisible = false">取 消</el-button>
                                  <el-button type="primary" @click="registerFormVisible = false">注 册</el-button>
                                </div>
                  </el-dialog>
        </el-container>
    </div>
</template>
<script>

export default {
    data () {
      return {
        formLabelWidth:"80px",
        loginFormVisible:false,
        loginForm:{
          account:"",
          password:""
        },
        registerFormVisible:false,
        registerForm:{
          account:"",
          password:"",
          confirmPassword:"",
          name:"",
          phone:"",
          email:""
        },
        registerRules:{
          account: [
              { required: true, message: '', trigger: 'blur' }
            ],
          password: [
              { required: true, message: '', trigger: 'blur' }
            ],
          confirmPassword: [
              { required: true, message: '', trigger: 'blur' }
            ],
          name: [
              { required: true, message: '', trigger: 'blur' }
            ],
          phone: [
              { required: true, message: '', trigger: 'blur' }
            ]
        }
      }
    },
    mounted(){
        document.getElementById("in").style.visibility="visible"
        document.getElementById("out").style.visibility="hidden"
    },
    methods:{
      handleCommand(command) {
        console.log(command)
        if(command=="login"){
            this.loginFormVisible=true   
        }else if(command=="register"){
            this.registerFormVisible=true
        }else if(command=="info"){
            this.$router.push({ path:'/info'})
        }else if(command=="logout"){
            document.getElementById("in").style.visibility="visible"
            document.getElementById("out").style.visibility="hidden"
             this.$message({
              message: '退出成功',
              type: 'success'
            });
        }
      },
      loginConfirm(){
          document.getElementById("in").style.visibility="hidden"
          document.getElementById("out").style.visibility="visible"
          this.loginFormVisible=false
          this.$message({
            message: '登录成功',
            type: 'success'
          });
      }
    }
}
</script>
<style>
  .el-header{
    height:160px;
    width: 100%;
    background-color:#00203e;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  
.head{
  width: 580px;
  height: 60px;
  background:#00203e;
  background: url('../assets/logo_bg.png') no-repeat;
  background-size: 100% 100%;
  position: absolute;
  z-index: 1;
  left: 50%;
  top: 10px;
  margin-left: -285px;
}
.logo{
      position:absolute;
      left:0%;
      margin-top:8px;
      margin-left: 30px; 
}
.title{
      height: 66px;
      width: 500px;
      position: absolute;
      z-index: 1;
      left: 50%;
      top: -2px;
      font-size: 30px;
      margin-left: -250px;
      line-height: 5px;
      color:white;
      text-align: center;
}

</style>