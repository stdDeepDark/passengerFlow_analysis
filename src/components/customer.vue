<template>
    <div style="width:100%">
        <Header/>
        <el-container>
          <Nav active="6"/>
                <el-container style="width:100%">
                  <el-dialog
                    title="顾客删除确认"
                    :visible.sync="dialogVisible"
                    width="30%">
                    <span>{{deleinfo}}</span>
                    <span slot="footer" class="dialog-footer">
                      <el-button @click="dialogVisible = false">取 消</el-button>
                      <el-button type="primary" @click="deleConfirm">确 定</el-button>
                    </span>
                  </el-dialog>

                  <el-dialog :title="editTitle" :close-on-click-modal="false" :visible.sync="dialogFormVisible">
                                <el-form :inline="true" :rules="rules" :model="form">
                                  <el-form-item style="margin-left:-460px" prop="photo" label="人像" label-height="10px" :label-width="formLabelWidth">
                                   <el-avatar shape="square" size="large" :src="form.photo"></el-avatar>
                                  </el-form-item>
                                  <br>
                                  <el-form-item prop="name" label="姓名" label-height="10px" :label-width="formLabelWidth">
                                    <el-input v-model="form.name" size="medium" autocomplete="off"></el-input>
                                  </el-form-item>
                                  <el-form-item prop="sex" label="性别" label-height="10px" :label-width="formLabelWidth">
                                    <el-select size="medium" v-model="form.sex" placeholder="请选择">
                                          <el-option
                                            v-for="item in sexs"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                          </el-option>
                                    </el-select>
                                  </el-form-item>
                                  <el-form-item prop="age" label="年龄" label-height="10px" :label-width="formLabelWidth">
                                    <el-input v-model="form.age" type="number" size="medium" autocomplete="off"></el-input>
                                  </el-form-item>
                                  <el-form-item prop="vip" label="会员" label-height="10px" :label-width="formLabelWidth">
                                    <el-select size="medium" v-model="form.vip" placeholder="请选择">
                                          <el-option
                                            v-for="item in vips"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                          </el-option>
                                    </el-select>
                                  </el-form-item>
                                  <br/>
                                  <el-form-item style="margin-left:-310px"prop="phone" label="手机号" label-height="10px" :label-width="formLabelWidth">
                                    <el-input v-model="form.phone" size="medium" autocomplete="off"></el-input>
                                  </el-form-item>
                                  <br/>
                                  <el-form-item style="margin-left:-310px"prop="address" label="所在地" label-height="10px" :label-width="formLabelWidth">
                                    <el-input v-model="form.address" size="medium" autocomplete="off"></el-input>
                                  </el-form-item>
                                </el-form>
                                <div slot="footer" class="dialog-footer">
                                  <el-button @click="dialogFormVisible = false">取 消</el-button>
                                  <el-button type="primary" @click="editConfirm">确 定</el-button>
                                </div>
                    </el-dialog>

                    <div style="position:absolute; left:180px; right:20px; top:100px; bottom:0px;">
                        <el-table
                        stripe
                        class="outline"
                        :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
                        max-height="500"
                        style="width: 100%;">
                        <el-table-column
                            style=""
                            label=""
                            width="60">
                        </el-table-column>
                        <el-table-column
                            style="margin-left:200px"
                            label=""
                            width="80">
                            <template slot-scope="scope">
                              <el-avatar shape="square" size="large" :src="scope.row.photo"></el-avatar>
                            </template>
                        </el-table-column>
                        <el-table-column
                          sortable
                          prop="name"
                            label="姓名"
                            width="100">
                        </el-table-column>
                        <el-table-column
                            label="性别"
                            prop="sex"
                            width="70">
                        </el-table-column>
                        <el-table-column
                            prop="age"
                            label="年龄"
                            width="70">
                        </el-table-column>
                        <el-table-column
                            label="会员"
                             prop="vip"
                            width="100">
                        </el-table-column>
                        <el-table-column
                            sortable
                            prop="phone"
                            label="手机号"
                            width="150">
                        </el-table-column>
                        <el-table-column
                            sortable
                            prop="address"
                            label="所在地"
                            width="350">
                        </el-table-column>

                        <el-table-column label="">
                          <template slot="header" slot-scope="scope">
                            <el-input
                              v-model="search"
                              size="medium"
                              placeholder="输入名字关键字搜索"/>
                          </template>
                            <template slot-scope="scope">        
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
                        <el-button z-index=10  style="position:absolute;top:10px; left:800px"v-on:click="newShop"><i style="margin-right:10px"class="el-icon-s-shop"></i>添加顾客</el-button>
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
        tableData: [{
         photo:'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png',
          name: '张三',
          sex:'男',
          age:'29',
          vip:'会员',
          phone:'15652123111',
          address:'北京市海淀区'
        },
        {
         photo:'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png',
          name: '李四',
          sex:'男',
          age:'36',
          vip:'非会员',
          phone:'15652123112',
          address:'北京市丰台区'
        },{
         photo:'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png',
          name: '李艳',
          sex:'女',
          age:'32',
          vip:'会员',
          phone:'15652123113',
          address:'北京市朝阳区'
        },{
         photo:'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png',
          name: '王五',
          sex:'男',
          age:'32',
          vip:'会员',
          phone:'15652123115',
          address:'深圳市南山区'
        },
        ],
        search:"",
        sexs: [{
          value: '男',
          label: '男'
        }, {
          value: '女',
          label: '女'
        }],
        vips: [{
          value: '会员',
          label: '会员'
        }, {
          value: '非会员',
          label: '非会员'
        }],
        deleinfo:"",
        editTitle:"",
        curid:0,
        isNew:false,
        dialogVisible: false,
        dialogTableVisible: false,
        dialogFormVisible: false,
        form: {
          photo:'',
          name: '',
          sex:'',
          age:'',
          vip:'',
          phone:'',
          address:''
        },
        rules:{
          name: [
              { required: true, message: '请输入顾客姓名', trigger: 'blur' }
            ],
          sex: [
              { required: true, message: '请输入顾客性别', trigger: 'blur' }
            ],
            age: [
              { required: true, message: '请输入顾客年龄', trigger: 'blur' }
            ],
            vip: [
              { required: true, message: '请输入顾客类别', trigger: 'blur' }
            ],
            address: [
              { required: true, message: '请输入顾客所在地', trigger: 'blur' }
            ]
        },
        formLabelWidth: '80px'
      }
    },
    methods: {
      newShop(){
        this.editTitle="添加顾客"
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
      handleEdit(index, row) {
        this.editTitle="编辑顾客信息"
        this.isNew=false;
        this.curid=index
        this.dialogFormVisible=true;
        this.form=this.shallowCopy(this.tableData[index]);
      },
      handleDelete(index, row) {
        this.curid=index
        this.dialogVisible=true;
        this.deleinfo="确定删除顾客："+this.tableData[index].name;
      }
    },
    mounted() {

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