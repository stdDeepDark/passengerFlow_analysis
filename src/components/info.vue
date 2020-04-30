<template>
    <div style="width:100%">
        <Header/>
        <el-container>
                <el-container style="width:100%">
                    <div style="position:absolute; left:170px; top:90px; bottom:0px;">
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
                    </div>
                </el-container>
     
          </el-container>          
        <Footer/>
    </div>
</template>

<script>
import Vue from 'vue';
import Header from '@/components/header.vue'
import Footer from '@/components/footer.vue'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import { constants } from 'crypto';
import { loadavg } from 'os';

Vue.use(ElementUI);
export default {
    data () {
      return {
        name:"",
        tableData_Door:[
          {
            name:"北门",
            description:""
          },
        ]
      }
    },
    mounted() {

    },
    methods: {
        
    },
    components:{
      Header,
      Footer
    }
}
</script>

<style>
  .el-main {
    /*background-color: #E9EEF3;*/
    color: #333;
    text-align: center;
    width: 100%;
    height: 100%;
    line-height: 160px;
  }
  .outline{
    background:whitesmoke;
    box-shadow: 1px 1px 5px 3px rgba(0, 0,0, 0.5);
    border-radius: 8px;
  }
</style>