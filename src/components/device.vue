<template>
    <div style="width:100%">
        <Header/>
        <el-container>
          <Nav/>
                <el-container style="width:100%">
                  <el-dialog
                    title="大门删除确认"
                    :visible.sync="doorDialogVisible"
                    width="30%">
                    <span>{{deleinfo}}</span>
                    <span slot="footer" class="dialog-footer">
                      <el-button @click="doorDialogVisible = false">取 消</el-button>
                      <el-button type="primary" @click="doorDeleConfirm">确 定</el-button>
                    </span>
                  </el-dialog>
                  <el-dialog
                    title="摄像头删除确认"
                    :visible.sync="cameraDialogVisible"
                    width="30%">
                    <span>{{deleinfo}}</span>
                    <span slot="footer" class="dialog-footer">
                      <el-button @click="cameraDialogVisible = false">取 消</el-button>
                      <el-button type="primary" @click="cameraDeleConfirm">确 定</el-button>
                    </span>
                  </el-dialog>

                  <el-dialog :title="editTitle" :close-on-click-modal="false" :visible.sync="doorDialogFormVisible">
                                <el-form :inline="true" :rules="doorRules" :model="doorForm">
                                  <el-form-item prop="name" label="大门别称" label-height="10px" :label-width="formLabelWidth">
                                    <el-input v-model="doorForm.name" size="medium" autocomplete="off"></el-input>
                                  </el-form-item>
                                  <el-form-item prop="description" label="信息描述" label-height="10px" :label-width="formLabelWidth">
                                    <el-input v-model="doorForm.description" size="medium" autocomplete="off"></el-input>
                                  </el-form-item>
                                </el-form>
                                <div slot="footer" class="dialog-footer">
                                  <el-button @click="doorDialogFormVisible = false">取 消</el-button>
                                  <el-button type="primary" @click="doorEditConfirm">确 定</el-button>
                                </div>
                    </el-dialog>
                  <el-dialog :title="editTitle" :close-on-click-modal="false" :visible.sync="cameraDialogFormVisible">
                                <el-form :inline="true" :rules="cameraRules" :model="cameraForm">
                                  <el-form-item prop="name" label="摄像头标识" label-height="10px" :label-width="formLabelWidth">
                                    <el-input v-model="cameraForm.name" size="medium" autocomplete="off"></el-input>
                                  </el-form-item>
                                  <el-form-item prop="time" label="上传时间" label-height="10px" :label-width="formLabelWidth">
                                    <el-time-picker
                                      v-model="cameraForm.time"
                                      size="medium"
                                      placeholder="点击设定时间">
                                    </el-time-picker>
                                  </el-form-item>
                                   <el-form-item prop="door" label="所属大门" label-height="10px" :label-width="formLabelWidth">
                                    <el-input v-model="cameraForm.door" size="medium" autocomplete="off"></el-input>
                                  </el-form-item>
                                   <el-form-item prop="port" label="出/入口" label-height="10px" :label-width="formLabelWidth">
                                    <el-input v-model="cameraForm.port" size="medium" autocomplete="off"></el-input>
                                  </el-form-item>
                                </el-form>
                                <div slot="footer" class="dialog-footer">
                                  <el-button @click="cameraDialogFormVisible = false">取 消</el-button>
                                  <el-button type="primary" @click="cameraEditConfirm">确 定</el-button>
                                </div>
                    </el-dialog>

                  <div class="outline" style="position:absolute; left:250px; right:100px; top:100px; bottom:100px; padding-left:20px;padding-top:20px;">
                    <el-page-header @back="goBack" :content="name">
                      </el-page-header>
                      <el-tabs v-model="activeName" @tab-click="handleClick">
                        <el-tab-pane label="大门管理" name="first"></el-tab-pane>
                        <el-tab-pane label="摄像头管理" name="second"></el-tab-pane>
                      </el-tabs>
                      <div id="door" style=" position:absolute; left:20px; top:100px; bottom:0px;">
                          <el-table
                            stripe
                            :data="tableData_Door"
                            height="400px"
                            >
                            <el-table-column
                                width="50">
                            </el-table-column>
                            <el-table-column
                              sortable
                              prop="name"
                                label="大门别称"
                                width="200">
                            </el-table-column>
                            <el-table-column
                              prop="description"
                                label="信息描述"
                                width="500">
                            </el-table-column>
                            <el-table-column width="200" label="">
                                <template slot-scope="scope">        
                                <el-button
                                    size="mini"
                                    @click="doorEdit(scope.$index, scope.row)"><i style="margin-right:5px"class="el-icon-edit"></i>编辑</el-button>
                                <el-button
                                  size="mini"
                                  type="danger"
                                  @click="doorDelete(scope.$index, scope.row)"><i style="margin-right:5px"class="el-icon-delete"></i>删除</el-button>
                                </template>
                            </el-table-column>
                            </el-table>
                            <el-button z-index=10  style="position:absolute;top:10px; left:450px"v-on:click="newDoor"><i style="margin-right:10px"class="el-icon-reading"></i>添加大门</el-button>
                            
                        </div>
                        <div id="camera" style="position:absolute; left:20px; top:100px; bottom:0px;">
                          <el-table
                            stripe
                           
                            :data="tableData_Camera"
                            height="400px"
                            >
                            <el-table-column
                                width="50">
                            </el-table-column>
                            <el-table-column
                              sortable
                              prop="name"
                                label="摄像头标识"
                                width="200">
                            </el-table-column>
                            <el-table-column
                              prop="time"
                                label="上传时间"
                                width="300">
                            </el-table-column>
                            <el-table-column
                              prop="door"
                                label="所属大门"
                                width="200">
                            </el-table-column>
                            <el-table-column
                              prop="port"
                                label="出/入口"
                                width="100">
                            </el-table-column>
                  
                            <el-table-column width="200" label="">
                                <template slot-scope="scope">        
                                <el-button
                                    size="mini"
                                    @click="cameraEdit(scope.$index, scope.row)"><i style="margin-right:5px"class="el-icon-edit"></i>编辑</el-button>
                                <el-button
                                  size="mini"
                                  type="danger"
                                  @click="cameraDelete(scope.$index, scope.row)"><i style="margin-right:5px"class="el-icon-delete"></i>删除</el-button>
                                </template>
                            </el-table-column>
                            </el-table>
                            <el-button z-index=10  style="position:absolute;top:10px; left:850px"v-on:click="newCamera"><i style="margin-right:10px"class="el-icon-video-camera"></i>添加摄像头</el-button>
                            
                        </div>
                    
                  </div>
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
      return {
        name:"",
        curid:"",
        isNew:"",
        formLabelWidth:"80px",
        doorDialogVisible:false,
        cameraDialogVisible:false,
        deleinfo:"",
        doorDialogFormVisible:false,
        cameraDialogFormVisible:false,
        editTitle:"",
        activeName:"first",
        doorForm:{
          name:"",
          description:""
        },
        cameraForm:{
          name:"",
          time:"",
          door:"",
          port:""
        },
        doorRules:{
          name: [
              { required: true, message: '请输入大门别称', trigger: 'blur' }
            ]
        },
        cameraRules:{
          name: [
              { required: true, message: '请输入摄像头标识', trigger: 'blur' }
            ],
          time: [
              { required: true, message: '请设定上传时间', trigger: 'blur' }
            ],
          door: [
              { required: true, message: '请设定所属大门', trigger: 'blur' }
            ],
          port: [
              { required: true, message: '请标识出入口', trigger: 'blur' }
            ]
        },
        tableData_Door:[
          {
            name:"北门",
            description:""
          },
        ],
        tableData_Camera:[
          {
            name:"1号摄像头",
            time:new time(18,0),
            door:"北门",
            port:"出口"
          },
          {
            name:"2号摄像头",
            time:"23:00",
            door:"北门",
            port:"入口"
          }
        ]
      }
    },
    mounted() {
      this.name = this.$route.params.name+"-设备管理"
      document.getElementById("door").style.visibility="visible"
      document.getElementById("camera").style.visibility="hidden"
    },
    methods: {
      goBack() {
        this.$router.back(-1);
      },
      newDoor(){
        this.editTitle="添加大门"
        this.doorDialogFormVisible=true;
        this.isNew=true;
        this.doorForm={
          name: '',
          description:'',
        }
      },
      doorEditConfirm(){
          if(this.isNew){
              this.tableData_Door.push(this.doorForm)
          }else{
              this.tableData_Door[this.curid]=this.doorForm
              var it=this.tableData_Door.concat()
              this.tableData_Door=it
          }
          this.doorDialogFormVisible = false        
      },
      doorEdit(index, row) {
        this.editTitle="编辑大门信息"
        this.isNew=false;
        this.curid=index
        this.doorDialogFormVisible=true;
        this.doorForm=this.shallowCopy(this.tableData_Door[index]);
      },
      doorDelete(index, row) {
        this.curid=index
        this.doorDialogVisible=true;
        this.deleinfo="确定删除大门："+this.tableData_Door[index].name;
      },
      doorDeleConfirm(){
        this.tableData_Door.splice(this.curid, 1);
        this.doorDialogVisible = false
      },

      newCamera(){
        this.editTitle="添加摄像头"
        this.cameraDialogFormVisible=true;
        this.isNew=true;
        this.cameraForm={
          name:"",
          time:"",
          door:"",
          port:""
        }
      },
      cameraEditConfirm(){
          if(this.isNew){
              this.tableData_Camera.push(this.cameraForm)
          }else{
              this.tableData_Camera[this.curid]=this.cameraForm
              var it=this.tableData_Camera.concat()
              this.tableData_Camera=it
          }
          this.cameraDialogFormVisible = false        
      },
      cameraEdit(index, row) {
        this.editTitle="编辑摄像头信息"
        this.isNew=false;
        this.curid=index
        this.cameraDialogFormVisible=true;
        this.cameraForm=this.shallowCopy(this.tableData_Camera[index]);
      },
      cameraDelete(index, row) {
        this.curid=index
        this.cameraDialogVisible=true;
        this.deleinfo="确定删除摄像头："+this.tableData_Camera[index].name;
      },
      cameraDeleConfirm(){
        this.tableData_Camera.splice(this.curid, 1);
        this.cameraDialogVisible = false
      },
      
      handleClick(tab, event) {
        if(tab.index=="0"){
          document.getElementById("door").style.visibility="visible"
          document.getElementById("camera").style.visibility="hidden"
        }
        else{
          document.getElementById("door").style.visibility="hidden"
          document.getElementById("camera").style.visibility="visible"
        }
            
      },
      shallowCopy(src) {
          var dst = {};
          for (var prop in src) {
              if (src.hasOwnProperty(prop)) {
                  dst[prop] = src[prop];
              }
          }
          return dst;
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
  }
</style>