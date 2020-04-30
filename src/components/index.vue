<template>
    <div style="width:100%">
        <Header/>
        <el-container>
          <Nav active="1"/>
                <el-container style="width:100%">
                    <el-main >
                      <el-carousel :interval="4000" type="card" style="position:absolute; left:50%; margin-left:-400px; width:800px" height="300px">
                        <el-carousel-item v-for="item in 4" :key="item">
                        </el-carousel-item>
                      </el-carousel>             
                    </el-main>
                    <div style="position:absolute; margin-top:410px; left:250px;">
                    <el-card style="font-size:15px;width:500px; float: left;
                      vertical-align: middle;
                      text-align: center;" class="box-card">
                        <div slot="header" class="clearfix">
                          <span>技术基础</span>
                        </div>
                        <div>
                          <span>人脸识别</span>
                          <el-divider direction="vertical"></el-divider>
                          <span>性别识别</span>
                          <el-divider direction="vertical"></el-divider>
                          <span>年龄识别</span>
                          <el-divider direction="vertical"></el-divider>
                          <span>......</span>
                        </div>
                      </el-card> 
                      <el-card style="font-size:15px;width:500px; float: left;
                      vertical-align: middle; margin-left:50px;
                      text-align: center;" class="box-card">
                        <div slot="header" class="clearfix">
                          <span>客流分析</span>
                        </div>
                        <div>
                          <span>自动化人数统计</span>
                          <el-divider direction="vertical"></el-divider>
                          <span>新老客户识别</span>
                          <el-divider direction="vertical"></el-divider>
                          <span>客群性别与年龄</span>
                          <el-divider direction="vertical"></el-divider>
                          <span>......</span>
                        </div>
                      </el-card> 
                      </div>
                </el-container> `
          </el-container>
        <Footer/>
    </div>
</template>

<script>
import Vue from 'vue';
import Header from '@/components/header.vue'
import Footer from '@/components/footer.vue'
import Nav from '@/components/nav.vue'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import { constants } from 'crypto';
import { loadavg } from 'os';

Vue.use(ElementUI);
export default {

    data () {
      return {
        
      }
    },
    mounted() {

    },
    methods: {

    },
    components:{
      Header,
      Nav,
      Footer
    }
}
</script>

<style>
.el-carousel__item:nth-child(2n) {
    background: url('../assets/img1.jpg') no-repeat;
    background-size:400px 300px;
}
.el-carousel__item:nth-child(2n+1) {
    background: url('../assets/img2.jpg') no-repeat;
    background-size:400px 300px;
}

  .el-main {
    /*background-color: #E9EEF3;*/
    color: #333;
    text-align: center;
    width: 100%;
    height: 100%;
    line-height: 160px;
  }
  .para{
    line-height: 40px;
    position:absolute;
    background:whitesmoke;
    left: 50%;
    top:450px;
    margin-top: 5px;
    margin-left: -500px;
    box-shadow: 1px 1px 5px 2px rgba(0, 0,0, 0.5);
    margin-bottom: 5px;
    width: 1000px;
    height: 120px;
    font-size: 21px;
    border-radius: 5px;
    float: left;
    vertical-align: middle;
    text-align: center;
}
</style>