<template>
    <div style="width:100%">
        <Header/>
        <el-container>
          <Nav active="3"/>
                <el-container style="width:100%">
                    <el-main>
                        <ve-line class="chart_line" :data="chartData"></ve-line>
                        <div>
                            <el-row :gutter="10" class="row">
                                <!--style="left:-1050px;top:-76px;"-->

                                
                                
                                <el-col class="font-bg" :push="1" :span="4">
                                    
                                    <a class="font-show"><i style="margin:5px"class="el-icon-time"></i>趋势分析设置</a>
                                </el-col>
                                <div style="line-height:40px; margin-top:5px">
                                    <el-col :push="1":span="4">
                                        <el-select v-model="aimShop" placeholder="请选择目标门店">
                                            <el-option
                                            v-for="item in shops"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                            </el-option>
                                        </el-select>    
                                    </el-col>
                                    <el-col :push="1":span="4">
                                    <el-select v-model="timeType" @change="timeSelect()" placeholder="请选择时间范围">
                                        <el-option
                                            v-for="item in options"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </el-col>
                                    <el-col :push="1" :span="4">
                                        <el-date-picker
                                        v-model="time"
                                        :type="timeType"
                                        placeholder="选择日期">
                                        </el-date-picker>
                                    </el-col>
                                </div>
                                <el-col :push="2" :span="4">
                                    <el-button class="button" v-on:click="drawChart"><i style="margin-right:10px"class="el-icon-s-promotion"></i>绘制趋势图</el-button>
                                 </el-col>
                            </el-row>
                        </div>
                            
                    </el-main>
                </el-container>
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
            chartData:{
                columns: ['日期', '男性', '女性','少年(<18)','青年(18~40)','中年(40~60)','老年(>60)'],
                rows: [
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
            options: [{
                value: 'date',
                label: '一天内每小时客流趋势'
                }, {
                value: 'week',
                label: '一周内每天客流趋势'
                }, {
                value: 'year',
                label: '一年内每月客流趋势'
                }
            ],
            timeType:"",
            time:"",
        }
    },
    mounted() {
    },
    methods: {
        timeSelect:function(key){
            console.log(key)
        },
        randomf(E, D){
            return Math.random() * (2*D) + E-D;
        },
        randomNum(minNum, maxNum) {
            return parseInt(Math.random() * ( maxNum - minNum + 1 ) + minNum);
        },
        drawChart(){
            if(this.timeType==''||this.time=='')
            {
                alert("请先选择要分析时间范围")
                return
            }

            const loading = this.$loading({
                lock: true,
                text: '数据获取中',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
            var Eh=[0.5,0.7,1.2,1,0.8,0.6,0.7,0.9,1.1,1,0.9,0.6,0.3]
            var Ed=[0.8,0.9,0.9,0.9,1,1.1,1.2]
            var Em=[0.8,0.7,0.8,1,1.1,1.1,1,1,1.1,1,0.9,0.8];
            var TD=0.15;
            var Ch=1000;
            var Cd=10000;
            var Cm=300000;

            var Emale=0.45;
            var Efemale=0.55;
            var SD=0.1;

            var Eage1=0.2;
            var Eage2=0.5;
            var Eage3=0.25;
            var Eage4=0.05;
            var AD=0.05;

            this.chartData.rows=[]
            var rows=[]

            var zhou=['周一','周二','周三','周四','周五','周六','周日']

            switch(this.timeType){
                case"date":
                    for(let i=0; i<13; i++)
                        Eh[i]=this.randomf(Eh[i],TD)*Ch;
                    for(let i=0; i<13; i++)
                    {
                        let row=[]
                        let c=Eh[i];
                        row['日期']=(i+9)+"点";
                        row['男性']=c*this.randomf(Emale,SD);
                        row['女性']=c*this.randomf(Efemale,SD);
                        row['少年(<18)']=c*this.randomf(Eage1,AD);
                        row['青年(18~40)']=c*this.randomf(Eage2,AD);
                        row['中年(40~60)']=c*this.randomf(Eage3,AD);
                        row['老年(>60)']=c*this.randomf(Eage4,AD);
                        rows.push(row);
                    }
                    break
                case"week":
                    for(let i=0; i<7; i++)
                        Ed[i]=this.randomf(Ed[i],TD)*Cd;
                    for(let i=0; i<7; i++)
                    {
                        let row=[]
                        let c=Ed[i];
                        row['日期']=zhou[i];
                        row['男性']=c*this.randomf(Emale,SD);
                        row['女性']=c*this.randomf(Efemale,SD);
                        row['少年(<18)']=c*this.randomf(Eage1,AD);
                        row['青年(18~40)']=c*this.randomf(Eage2,AD);
                        row['中年(40~60)']=c*this.randomf(Eage3,AD);
                        row['老年(>60)']=c*this.randomf(Eage4,AD);
                        rows.push(row);
                    }
                    break
                case"year":
                    for(let i=1; i<=12; i++)
                        Em[i-1]=this.randomf(Em[i-1],TD)*Cm;
                    for(let i=1; i<=12; i++)
                    {
                        let row=[]
                        let c=Em[i-1];
                        row['日期']=i+"月";
                        row['男性']=c*this.randomf(Emale,SD);
                        row['女性']=c*this.randomf(Efemale,SD);
                        row['少年(<18)']=c*this.randomf(Eage1,AD);
                        row['青年(18~40)']=c*this.randomf(Eage2,AD);
                        row['中年(40~60)']=c*this.randomf(Eage3,AD);
                        row['老年(>60)']=c*this.randomf(Eage4,AD);
                        rows.push(row);
                    }
                    break
            }
            this.chartData.rows=rows

            loading.close();
        }
    },
    components:{
      Header,
      Nav,
      Footer
    }
}
</script>

<style>
  .font-bg{
    color:#c0c4cc;
    font-family: "微软雅黑";
    font-size: 1.2em;
    line-height: 50px;
    }
  .font-show{
    color:#ffd04b;
    font-family: "微软雅黑";
    font-size: 1.5em;
  }
  .el-main {
    /*background-color: #E9EEF3;*/
    color: #333;
    text-align: center;
    width: 100%;
    height: 100%;
  }
  .row{
      line-height: 20px; 
      margin-top:20px; 
      height:20px;
  }
  .chart_line{
    background:whitesmoke;
    margin-top: 0px;
    margin-bottom: 8px;
    box-shadow: 1px 1px 5px 3px rgba(0, 0,0, 0.5);
    width: 100%;
    height: 800px;
    border-radius: 30px;
}
</style>

<style lang="stylus" scoped>
  .button
        background: #545c64;
        border: 1px solid #545c64;
        color: white; 

  .button:hover
        background: #545c64;
        color #ffd04b
</style>
