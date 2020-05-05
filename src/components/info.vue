<template>
    <div style="width:100%">
        <Header/>
        <el-container>
                <el-container style="width:100%; padding-top:20px">
                    <div class="outline" style="margin:auto; width:500px; padding:10px">
                      <el-page-header @back="goBack" content="个人信息">
                      </el-page-header>
                      <el-form style="margin-left:70px; width:340px" :rules="infoRules" :inline="false" :model="infoForm">
                            <el-form-item prop="account" label="账号" label-height="10px" :label-width="formLabelWidth">
                              <el-input v-model="infoForm.account" size="medium" autocomplete="off"></el-input>
                            </el-form-item>
                            <el-form-item prop="name" label="昵称" label-height="10px" :label-width="formLabelWidth">
                              <el-input v-model="infoForm.name" type="tel" size="medium" autocomplete="off"></el-input>
                            </el-form-item>
                            <el-form-item prop="phone" label="手机号码" label-height="10px" :label-width="formLabelWidth">
                              <el-input v-model="infoForm.phone" size="medium" autocomplete="off"></el-input>
                            </el-form-item>
                            <el-form-item prop="email" label="邮箱" label-height="10px" :label-width="formLabelWidth">
                              <el-input v-model="infoForm.email" type="email" size="medium" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-form>  
                        <el-button type="primary" @click="saveInfo">保存信息</el-button>
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
        infoForm:{
          account:"test",
          name:"张三",
          phone:"15652577777",
          email:"hadbawda@buaa.edu.cn"
        },
        infoRules:{
          account: [
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
    mounted() {

    },
    methods: {
      goBack() {
        this.$router.back(-1);
      },
      saveInfo(){
        this.$message({
              message: '保存成功',
              type: 'success'
            });
      }
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