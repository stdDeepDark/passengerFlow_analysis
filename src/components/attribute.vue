<template>
    <div style="width:100%">
        <Header/>
        <el-container style="height:600px;">
          <Nav active="4"/>
                <el-container style="width:100%">
                    <el-main>
                        <div >
                            <div class="chart">
                                <ve-pie  height="310px" :data="chartData_vip"></ve-pie>  
                                <span class="font-legend">会员组成</span>
                            </div>   
                            <div class="chart">
                                <ve-pie height="310px" :data="chartData_sex"></ve-pie>  
                                <span class="font-legend">性别组成</span>
                            </div>
                            <div class="chart">
                                <ve-pie height="310px" :data="chartData_age"></ve-pie>  
                                <span class="font-legend">年龄组成</span>
                            </div>
                        </div> 
                        <el-row :gutter="10" class="row">
                                <!--style="left:-1050px;top:-76px;"-->      
                                
                                <el-col class="font-bg" :push="9" :span="5">
                                    <el-select style="margin-top:10px" v-model="aimShop" placeholder="请选择目标门店">
                                              <el-option
                                              v-for="item in shops"
                                              :key="item.value"
                                              :label="item.label"
                                              :value="item.value">
                                              </el-option>
                                    </el-select>      
                                </el-col>
                        </el-row>   
                    </el-main>
                     
                </el-container>
                 
          </el-container>
        <Footer/>
    </div>
</template>

<script>
import Vue from 'vue';
import Header from '@/components/header.vue'
import Nav from '@/components/nav.vue'
import Footer from '@/components/footer.vue'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import { constants } from 'crypto';
import { loadavg } from 'os';

import VCharts from 'v-charts'
// 引入提示框组件、标题组件、工具箱组件、图例组件。
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/toolbox';
import 'echarts/lib/component/legendScroll';
import 'v-charts/lib/style.css';

Vue.use(ElementUI);
//import Header from '@/components/header.vue'
Vue.use(VCharts)
export default {

    data () {
      return {
        chartData_vip: {
          columns: ['客流类别', '数量'],
          rows: [
            { '客流类别': 'vip', '数量': 8872},
            { '客流类别': '非vip','数量': 21128},
          ]
        },
        chartData_sex: {
          columns: ['性别', '数量'],
          rows: [
            { '性别': '男性',  '数量': 13617 },
            { '性别': '女性',  '数量': 16383 },
          ]
        },
        chartData_age: {
          columns: ['年龄段', '数量'],
          rows: [
            { '年龄段': '少年(<18)',  '数量': 4705 },
            { '年龄段': '青年(18~40)',  '数量': 15320 },
            { '年龄段': '中年(40~60)',  '数量': 8012 },
            { '年龄段': '老年(>60)',  '数量': 1963 },
          ]
        },
        shops: [{
                value: '0',
                label: '全部门店'
                }, {
                value: '1',
                label: '北航店'
                }, {
                value: '2',
                label: '清华店'
                }
            ],
            aimShop:"",
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
.el-main {
    /*background-color: #E9EEF3;*/
    color: #333;
    text-align: center;
    width: 100%;
    height: 100%;
  }
  .inline{
    display: inline;
  }
  .chart{
    background:whitesmoke;
    margin-top: 5px;
    margin-left: 20px;
    box-shadow: 1px 1px 5px 3px rgba(0, 0,0, 0.5);
    margin-bottom: 5px;
    width: 400px;
    height: 400px;
    border-radius: 30px;
    float: left;
    vertical-align: middle;
    text-align: center;
}
 .font-legend{
    color:black;
    line-height: 60px;
    font-family: "微软雅黑";
    font-size: 1.5em;
  }
</style>