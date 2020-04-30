<template>
    <div style="width:100%">
        <Header/>
        <el-container>
          <Nav active="5"/>
                <el-container style="width:100%">
                  <el-dialog
                    title="门店删除确认"
                    :visible.sync="dialogVisible"
                    width="30%">
                    <span>{{deleinfo}}</span>
                    <span slot="footer" class="dialog-footer">
                      <el-button @click="dialogVisible = false">取 消</el-button>
                      <el-button type="primary" @click="deleConfirm">确 定</el-button>
                    </span>
                  </el-dialog>

                  <el-dialog  height="700px"  width="60%" :title="editTitle" :close-on-click-modal="false"	 :visible.sync="dialogFormVisible">
                                <el-form style="width:430px" :inline="false" :rules="rules" :model="form">
                                  <el-form-item prop="name" label="店名" label-height="10px" :label-width="formLabelWidth">
                                    <el-input v-model="form.name" size="medium" autocomplete="off"></el-input>
                                  </el-form-item>
                                  <el-form-item prop="managerName" label="店长名" :label-width="formLabelWidth">
                                    <el-input v-model="form.managerName" size="medium" autocomplete="off"></el-input>
                                  </el-form-item>
                                  <el-form-item prop="phone" label="手机" :label-width="formLabelWidth">
                                    <el-input v-model="form.phone" size="medium" autocomplete="off"></el-input>
                                  </el-form-item>
                                  <el-form-item prop="tel" label="联系电话" :label-width="formLabelWidth">
                                    <el-input v-model="form.tel"  size="medium" autocomplete="off"></el-input>
                                  </el-form-item>
                                  <el-form-item prop="address" style="width=700px" label="地址" :label-width="formLabelWidth">
                                    <el-input v-model="form.address" width="400px"size="medium" autocomplete="off"></el-input>
                                  </el-form-item>
                                   <el-form-item prop="coordinate" label="坐标" :label-width="formLabelWidth">
                                    <el-input @change="coorChange" placeholder="格式：'经度,纬度'" v-model="form.coordinate"size="medium" autocomplete="off"></el-input>
                                  </el-form-item>
                                </el-form>
                                <el-button type="primary" @click="getCoordinate">获取当前坐标</el-button>
                                  <el-button type="primary" @click="clickMap">地图选择坐标</el-button>
                                <div slot="footer" class="dialog-footer">
                                  <el-button @click="dialogFormVisible = false">取 消</el-button>
                                  <el-button type="primary" @click="editConfirm">确 定</el-button>
                                </div>
                                <div id="container2" class="outline" style="position:absolute;top:70px; left:480px; right:10px; bottom:150px"></div>
                                
                    </el-dialog>

                    <div style="position:absolute; left:170px; top:90px; bottom:0px;">
                        <el-table
                        @expand-change="lineExpand"
                        stripe
                        class="outline"
                        :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
                        max-height="500"
                        style="width: 100%">
                        <el-table-column type="expand">
                          <template slot-scope="props">
                            <el-form label-position="left" inline class="demo-table-expand">
                              <el-form-item label="店名">
                                <span>{{ props.row.name }}</span>
                              </el-form-item>
                              <el-form-item label="店长">
                                <span>{{ props.row.managerName }}</span>
                              </el-form-item>
                              <el-form-item label="手机">
                                <span>{{ props.row.phone }}</span>
                              </el-form-item>
                              <el-form-item label="联系电话">
                                <span>{{ props.row.tel }}</span>
                              </el-form-item>
                              <el-form-item label="地址">
                                <span>{{ props.row.address }}</span>
                              </el-form-item>
                              <el-form-item label="坐标">
                                <span>{{ props.row.coordinate }}</span>
                              </el-form-item>
                            </el-form>
                          </template>
                        </el-table-column>
                        <el-table-column
                            label="店名"
                            sortable
                            prop="name"
                            width="180">
                        </el-table-column>
                        <el-table-column
                            label="地址"
                            prop="address"
                            width="400">
                        </el-table-column>
                        <el-table-column width="270px" label="操作">
                          <template slot="header" slot-scope="scope">
                            <el-input
                              v-model="search"
                              size="medium"
                              placeholder="输入店名关键字搜索"/>
                          </template>
                            <template slot-scope="scope">
                            <el-button
                                size="mini"
                                @click="handleDevice(scope.$index, scope.row)"><i style="margin-right:5px"class="el-icon-s-platform"></i>设备</el-button>        
                            <el-button
                                size="mini"
                                @click="handleEdit(scope.$index, scope.row)"><i style="margin-right:5px"class="el-icon-edit"></i>编辑</el-button>
                            <el-button
                                size="mini"
                                type="danger"
                                @click="handleDelete(scope.$index, scope.row)"><i style="margin-right:5px"class="el-icon-delete"></i>删除</el-button>
                            </template>
                        </el-table-column>
                        </el-table>
                        <el-button z-index=10  style="position:absolute;top:10px; left:500px"v-on:click="newShop"><i style="margin-right:10px"class="el-icon-s-shop"></i>添加门店</el-button>
                        
                    </div>
                     <div id="container" style="position:absolute;top:80px; left:1100px; right:0px; bottom:50px"></div>
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
        map2:null,
        expendNum:0,
        tableData: [{
          name: '北航店',
          managerName:"张三",
          coordinate:"116.44,39.95",
          tel:'5154123',
          phone: '15652511111',
          address: '北京市-海淀区-学院路37号'
        },{
          name: '沙河店',
          managerName:"张三",
          coordinate:"116.40,39.9",
          tel:'5154123',
          phone: '15652512222',
          address: '北京市-昌平区-高教园南三街x号'
        },{
          name: '故宫店',
          managerName:"张三",
          coordinate:"116.36,39.99",
          tel:'5154123',
          phone: '15652511333',
          address: '北京市-东城区-景山前路x号'
        },{
          name: '798艺术区店',
          managerName:"张三",
          coordinate:"",
          tel:'5154123',
          phone: '15652511444',
          address: '北京市-朝阳区-酒仙桥路x号'
        },{
          name: '雍和宫店',
          managerName:"张三",
          coordinate:"",
          tel:'5154123',
          phone:'15652511555',
          address: '北京市-东城区-雍和宫大街x号'
        },
        ],
        search:"",
        click2coor:false,
        deleinfo:"",
        editTitle:"",
        curid:0,
        isNew:false,
        dialogVisible: false,
        dialogTableVisible: false,
        dialogFormVisible: false,
        form: {
          name: '',
          managerName:'',
          coordinate:"",
          tel:'',
          phone:'',
          address: ''
        },
        rules:{
          name: [
              { required: true, message: '请输入门店名', trigger: 'blur' }
            ],
          managerName: [
              { required: true, message: '请输入店长名', trigger: 'blur' }
            ],
            phone: [
              { required: true, message: '请输入店长手机号', trigger: 'blur' }
            ],
            tel: [
              { required: true, message: '请输入门店联系电话', trigger: 'blur' }
            ],
            address: [
              { required: true, message: '请输入门店地址', trigger: 'blur' }
            ],
            coordinate: [
              { required: true, message: '请输入门店坐标', trigger: 'blur' }
            ]
        },
        formLabelWidth: '80px'
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
/*
      */
    },
    methods: {
      clickMap(){
        this.click2coor=true
         this.$alert('在地图内点击鼠标左键获取坐标', '地图选择坐标', {
          confirmButtonText: '确定'
        });
      },
      setMarker(point,name){
        var myIcon = new BMap.Icon(require("../assets/marker.png"), new BMap.Size(30, 30), {        
        anchor: new BMap.Size(15, 25),     
        });        
        var marker = new BMap.Marker(point, {icon: myIcon, title:name}); 
        marker.setLabel(this.setLabelStyle(name))
        marker.addEventListener("mouseover", function(e){    
            console.log(e)    
        });   
        return marker    
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
      lineExpand(row,expanded){
        if(this.expendNum-1!=expanded.length){
            var coor=row.coordinate.split(",")
            var point = new BMap.Point(coor[0], coor[1]);
            this.map.centerAndZoom(point, 15);
            this.map.clearOverlays()
            this.map.addOverlay(this.setMarker(point,row.name));
        }
        this.expendNum=expanded.length
      },
      newShop(){
        this.editTitle="添加门店"
        this.dialogFormVisible=true;
        this.isNew=true;
        this.form={
          name: '',
          managerName:'',
          coordinate:"",
          tel:'',
          phone:'',
          address: ''
        }
        setTimeout(() => {
          this.dialogOpen()
        }, 0);
      },
      shallowCopy(src) {
          var dst = {};
          for (var prop in src) {
              if (src.hasOwnProperty(prop)) {
                  dst[prop] = src[prop];
              }
          }
          return dst;
      },
      dialogOpen(){
         this.map2 = new BMap.Map("container2"); 
         if(!this.isNew){
            var coor=this.form.coordinate.split(",")
            var point = new BMap.Point(coor[0], coor[1]);
            this.map2.centerAndZoom(point, 15);
            this.map2.setMapStyleV2({     
            styleId: '839e1a1adbc182392bce48d3ee31fb94'
            });
            this.map2.addOverlay(this.setMarker(point,this.form.name));
         }
          else{
            var point = new BMap.Point(116.404, 39.915);
            this.map2.centerAndZoom(point, 12);
            this.map2.setMapStyleV2({     
            styleId: '839e1a1adbc182392bce48d3ee31fb94'
            });
          }
          var that=this
          this.map2.addEventListener("click",function(e){
            if(that.click2coor){
              that.form.coordinate=e.point.lng + "," + e.point.lat
              that.coorChange(that.form.coordinate)
              that.click2coor=false
            }
	        });
          this.map2.enableScrollWheelZoom();
          
      },
      editConfirm(){
          if(this.isNew){
              this.tableData.push(this.form)
          }else{
              this.tableData[this.curid]=this.form
              var it=this.tableData.concat()
              this.tableData=it
          }
          this.dialogFormVisible = false        
      },
      deleConfirm(){
        this.tableData.splice(this.curid, 1);
        this.dialogVisible = false
      },
      handleDevice(index,row){
          this.$router.push({  
            path:'/device',  
            name: 'device',  
            params: {   
                name: row.name,     
            }
          });  
      },
      handleEdit(index, row) {
        this.editTitle="编辑门店信息"
        this.isNew=false;
        this.curid=index
        this.dialogFormVisible=true;
        this.form=this.shallowCopy(this.tableData[index]);

        setTimeout(() => {
          this.dialogOpen()
        }, 0);
      },
      handleDelete(index, row) {
        this.curid=index
        this.dialogVisible=true;
        this.deleinfo="确定删除门店："+this.tableData[index].name;
      },
      coorChange(value){
        console.log(value)
            var coor=value.split(",")
            var point = new BMap.Point(coor[0], coor[1]);
            if(!this.click2coor){
              this.map2.centerAndZoom(point, 15);
            }
            this.map2.clearOverlays()
            if(this.form.name=="")
              this.map2.addOverlay(this.setMarker(point,"当前门店"));
            else
              this.map2.addOverlay(this.setMarker(point,this.form.name));
      },
      getCoordinate(){
        var that=this
        AMap.plugin('AMap.Geolocation', function() {
        var geolocation = new AMap.Geolocation({
            enableHighAccuracy: true,//是否使用高精度定位，默认:true
            timeout: 10000,          //超过10秒后停止定位，默认：5s
            buttonPosition:'RB',    //定位按钮的停靠位置
            buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
            zoomToAccuracy: true,   //定位成功后是否自动调整地图视野到定位点

        });
        geolocation.getCurrentPosition(function(status,result){
            if(status=='complete'){
              that.$message({
                message: '坐标获取成功',
                type: 'success'
              });
              that.form.coordinate=result.position.lng+","+result.position.lat
              that.coorChange(that.form.coordinate)
               // onComplete(result)
            }else{
              that.$message({
                //message: '坐标获取成功',
                message: '定位失败:'+result.message,
                type: 'error'
              });
                //onError(result)
            }
        });
    });
    //解析定位结果
    function onComplete(data) {
      console.log(data)
        //document.getElementById('status').innerHTML='定位成功'
        var str = [];
        str.push('定位结果：' + data.position);
        str.push('定位类别：' + data.location_type);
        if(data.accuracy){
             str.push('精度：' + data.accuracy + ' 米');
        }//如为IP精确定位结果则没有精度信息
        str.push('是否经过偏移：' + (data.isConverted ? '是' : '否'));
        document.getElementById('result').innerHTML = str.join('<br>');
    }
    //解析定位错误信息
    function onError(data) {
        document.getElementById('status').innerHTML='定位失败'
        document.getElementById('result').innerHTML = '失败原因排查信息:'+data.message;
    }
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
   .outline{
    background:whitesmoke;
    box-shadow: 1px 1px 5px 3px rgba(0, 0,0, 0.5);
    border-radius: 8px;
    font-size: 16px;
  }
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 70px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
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
<style lang="stylus" scoped>
  .button
        height:40px; width:120px; 
        background:#409EFF; 
        border: 1px solid #409EFF;
        color: white; 

  .button:hover
        background: #545c64;
        color #ffd04b
</style>