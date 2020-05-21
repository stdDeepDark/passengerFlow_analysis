<template>
    <div style="width:100%">
        <Header/>
        <el-container>
          <Nav active="2"/>
                <el-container style="width:100%">
                    <div id="container" style="position:absolute; left:160px; right:0px; top:80px; bottom:0px;"></div>
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

Vue.use(ElementUI);
export default {

    data () {
      this.chartSettings = {
        key: 'oBvDtR6nzWtVchkY4cLHtnah1VVZQKRK',
        bmap: {
          center: [116.419482,39.913220],
          zoom: 15,
          roam: true,
        },
        type: 'bmap'
      }
      return {
        map:null,
        heatmapOverlay:null,
      }
    },
    mounted(){
      this.map = new BMap.Map("container"); 
      var point = new BMap.Point(116.404, 39.915);
      this.map.centerAndZoom(point, 12);
      this.map.setMapStyleV2({     
        styleId: '839e1a1adbc182392bce48d3ee31fb94'
      });
      this.map.enableScrollWheelZoom();
      var points =[
        {"name":"xxxxx店","lng":"116.44","lat":"39.95","count":"8002"},
        {"name":"yyyyy店","lng":"116.40","lat":"39.9","count":"4000"},
        {"name":"zzzzz店","lng":"116.36","lat":"39.99","count":"6000"},
        {"name":"abcd店","lng":"116.49","lat":"39.901385","count":"1900"},
      ];//这里面添加经纬度
      if(!isSupportCanvas()){
          alert('热力图目前只支持有canvas支持的浏览器,您所使用的浏览器不能使用热力图功能~')
      }
      //详细的参数,可以查看heatmap.js的文档 https://github.com/pa7/heatmap.js/blob/master/README.md
      //参数说明如下:
      /* visible 热力图是否显示,默认为true
      * opacity 热力的透明度,1-100
      * radius 势力图的每个点的半径大小
      * gradient  {JSON} 热力图的渐变区间 . gradient如下所示
      *  {
              .2:'rgb(0, 255, 255)',
              .5:'rgb(0, 110, 255)',
              .8:'rgb(100, 0, 255)'
          }
          其中 key 表示插值的位置, 0~1.
              value 为颜色值.
      */
      var maxCount=0;
      for(let i=0; i<points.length; i++){
        if(points[i]['count']>maxCount)
          maxCount=points[i]['count']
      }
      this.heatmapOverlay = new BMapLib.HeatmapOverlay({"radius":100,"visible":true,
          /*"gradient":{
             .2:'rgb(0, 255, 255)',
              .5:'rgb(0, 110, 255)',
              .8:'rgb(100, 0, 255)'
          }*/
        });
        this.map.addOverlay(this.heatmapOverlay);
        this.heatmapOverlay.setDataSet({data:points,max:maxCount});
        this.heatmapOverlay.show();
        
        var markers = [];

        for (let i=0; i < points.length; i++) {
            markers.push(this.addMarker(new BMap.Point(points[i]['lng'],points[i]['lat']),points[i]['name']+":"+points[i]['count']));
        }
        //最简单的用法，生成一个marker数组，然后调用markerClusterer类即可。
        var markerClusterer = new BMapLib.MarkerClusterer(this.map, {markers:markers});

      /*for(let i=0; i<points.length; i++){
         this.map.addOverlay(markers[i]);
        //this.addMarker(new BMap.Point(points[i]['lng'],points[i]['lat']),points[i]['name']+":"+points[i]['count']);
      }*/
      //closeHeatmap();
    
    
  
      //判断浏览区是否支持canvas
      function isSupportCanvas(){
          var elem = document.createElement('canvas');
          return !!(elem.getContext && elem.getContext('2d'));
      }
  
      function openHeatmap(){
          heatmapOverlay.show();
      }
  
      function closeHeatmap(){
          heatmapOverlay.hide();
      }
    },
    methods: {
      addMarker(point,name){
        var myIcon = new BMap.Icon(require("../assets/marker.png"), new BMap.Size(30, 30), {    
        // 指定定位位置。   
        // 当标注显示在地图上时，其所指向的地理位置距离图标左上    
        // 角各偏移10像素和25像素。您可以看到在本例中该位置即是   
        // 图标中央下端的尖角位置。    
        anchor: new BMap.Size(15, 25),    
        // 设置图片偏移。   
        // 当您需要从一幅较大的图片中截取某部分作为标注图标时，您   
        // 需要指定大图的偏移位置，此做法与css sprites技术类似。    
        //imageOffset: new BMap.Size(0, 0)   // 设置图片偏移    
        });      
        // 创建标注对象并添加到地图   
        var marker = new BMap.Marker(point, {icon: myIcon, title:"点击进入该门店的设备管理页面"}); 
        marker.setLabel(this.setLabelStyle(name))
        var that =this
        marker.addEventListener("click", function(e){    
            that.$router.push({  
            path:'/device',  
            name: 'device',  
            params: {   
                name:name.split(":")[0],     
            }
          });    
        });   
        return marker
        //this.map.addOverlay(marker);    
      },
      setLabelStyle(content) {
        //左偏移  右偏移
        var offsetSize = new BMap.Size(-10, -45);
        var labelStyle = {
            color: "#fff",
            backgroundColor: "#333333",
            border: "0",
            fontSize : "14px",
            opacity:"0.8",
            verticalAlign:"center",
            borderRadius: "4px",
            whiteSpace:"nowrap",
            padding:"7px",
        };
        //设置样式
        var spanA="<span class='angle'><span>"
        var label = new BMap.Label(content+spanA, {
            offset: offsetSize
        });
        label.setStyle(labelStyle);
        return label;
      },
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
  .angle{
    display: inline-block;
    width: 0px;
    height: 0px;
    position: absolute;
    bottom:-60px;
    border: 14px solid;
    left: 10px;
    bottom: -25px;
    opacity: 0.8;
    border-color: #333333 transparent transparent transparent;
}
</style>