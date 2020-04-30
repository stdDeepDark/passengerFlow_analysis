<template>
    <div style="width:100%">
        <Header/>
        <el-container>
          <Nav active="2"/>
                <el-container style="width:100%">
                    <div id="container" style="position:absolute; left:160px; right:0px; top:80px; bottom:0px;"></div>
                    <div class="input-card" style="width: auto; margin-bottom:200px;">
                      <div class="input-item">
                          <button class="btn" onclick="heatmap.show()">显示热力图</button>
                      </div>
                      <div class="input-item">
                          <button class="btn" onclick="heatmap.hide()">关闭热力图</button>
                      </div>
                    </div>
                </el-container>
                
          </el-container>
          
        <Footer/>
    </div>
</template>

<script src="//a.amap.com/jsapi_demos/static/resource/heatmapData.js"></script>

<script>
import Vue from 'vue';
import Header from '@/components/header.vue'
import Nav from '@/components/nav.vue'
import Footer from '@/components/footer.vue'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import { constants } from 'crypto';
import { loadavg } from 'os';

Vue.use(ElementUI);
export default {

    data () {
      this.chartSettings = {
        key: 'oBvDtR6nzWtVchkY4cLHtnah1VVZQKRK',
        bmap: {
          center: [116.419482,39.913220],
          zoom: 12,
          roam: true,
        },
        type: 'bmap'
      }
      return {
        map:null,
        chartData: {
          columns: ['lat', 'lng', '人数'],
          rows: [
            { 'lat': 116.419482, 'lng': 39.913220, '人数': 5000 },
            { 'lat': 116.4, 'lng': 39.913220, '人数': 5000 },
            { 'lat': 116.419482, 'lng': 39.9, '人数': 5000 },
            { 'lat': 116.41, 'lng': 39.9, '人数': 5000 }
          ]
        }
      }
    },
    mounted() {
      this.map = new AMap.Map('container', {
            mapStyle: 'amap://styles/dark',
            center:[116.5, 39.9],
            zoom:11
        });
         if (!this.isSupportCanvas()) {
			    this.$Message.info('热力图仅对支持canvas的浏览器适用,您所使用的浏览器不能使用热力图功能,请换个浏览器试试~')
		    }
          let heatmap;	
          let heatmapData=[];
          //从接口获取数据 
          //官网示例数据结构 http://a.amap.com/jsapi_demos/static/resource/heatmapData.js
		      this.$axios.get("/map/data").then(res => {
				if(res.success) {					
					if(res.data){
						res.data.forEach(item=>{
							let obj={
								lng:item.longitude,
								lat:item.latitude,
								count:item.count,
							}
							heatmapData.push(obj);
						})
						map.plugin(["AMap.Heatmap"], function() {
							//初始化heatmap对象
							 heatmap = new AMap.Heatmap(map, {
							      radius: 25, //给定半径
							      opacity: [0, 0.8],
							      gradient:{
							        0.5: 'blue',
							        0.65: 'rgb(117,211,248)',
							        0.7: 'rgb(0, 255, 0)',
							        0.9: '#ffea00',
							        1.0: 'red'
							     }
							});
							//设置数据集
							heatmap.setDataSet({
								data: heatmapData,
									max: 5
								});
							});
					}else{
						heatmapData =[];
					}
				} else {
					heatmapData =[];
				}
			});

    },
    methods: {
      isSupportCanvas(){//判断浏览区是否支持canvas
        var elem = document.createElement('canvas');
        return !!(elem.getContext && elem.getContext('2d'));
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
  .el-main {
    /*background-color: #E9EEF3;*/
    color: #333;
    text-align: center;
    width: 100%;
    height: 100%;
    line-height: 160px;
  }
</style>