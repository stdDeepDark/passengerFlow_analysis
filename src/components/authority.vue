<template>
    <div style="width:100%">
        <Header/>
        <el-container>
          <Nav active="7"/>
                <el-container style="width:100%">
                  <el-dialog
                    title="审核不通过确认"
                    :visible.sync="refuseDialogVisible"
                    width="400px">
                    <span>{{refuseInfo}}</span>
                    <span slot="footer" class="dialog-footer">
                      <el-button @click="refuseDialogVisible = false">取 消</el-button>
                      <el-button type="primary" @click="refuseConfirm">确 定</el-button>
                    </span>
                  </el-dialog>
                  <el-dialog
                    title="审核通过确认"
                    :visible.sync="passDialogVisible"
                    width="500px">
                    <span>{{passInfo}}</span>
                    <span slot="footer" class="dialog-footer">
                      <el-button type="primary" @click="passSystemConfirm">通过为系统管理员</el-button>
                      <el-button type="primary" @click="passStoreConfirm">通过为门店管理员</el-button>
                      <el-button @click="passDialogVisible = false">取 消</el-button>
                    </span>
                  </el-dialog>

                  <el-dialog
                    :title="storeInfo"
                    :visible.sync="storeDialogVisible"
                    width="800px">
                    <el-transfer
                      filterable
                      :filter-method="filterMethod"
                      :titles="['全部门店', '所管门店']"
                      style="text-align: left; display: inline-block"
                      filter-placeholder="请输入门店关键字"
                      v-model="stores"
                      :data="allStores">
                    </el-transfer>
                    <span slot="footer" class="dialog-footer">
                      <el-button type="primary" @click="storeDialogVisible = false">确定</el-button>
                      <el-button @click="storeDialogVisible = false">取 消</el-button>
                    </span>
                  </el-dialog>

                  <div class="outline" style="position:absolute; left:250px; right:100px; top:100px; bottom:100px; padding-right:20px;padding-left:20px;padding-top:20px;">
                    <el-tabs v-model="activeName" @tab-click="handleClick">
                        <el-tab-pane label="账号审核" name="first"></el-tab-pane>
                        <el-tab-pane label="权限设置" name="second"></el-tab-pane>
                      </el-tabs>
                      <div id="account" style="position:absolute; left:20px; top:80px; right:20px; bottom:0px;">
                        <el-table
                          stripe
                          empty-text="没有待审核账号"
                          :data="tableData_account.filter(data => !search || data.account.toLowerCase().includes(search.toLowerCase()))"
                          height="430px"
                          >
                          <el-table-column
                                  width="50">
                          </el-table-column>
                          <el-table-column
                            sortable
                            prop="account"
                              label="账号"
                              width="200">
                          </el-table-column>
                          <el-table-column
                            prop="name"
                              label="昵称"
                              width="100">
                          </el-table-column>
                          <el-table-column
                            prop="phone"
                              label="手机号码"
                              width="150">
                          </el-table-column>
                          <el-table-column
                            prop="email"
                              label="邮箱"
                              width="250">
                          </el-table-column>
                          <el-table-column width="" label="">
                            <template slot="header" slot-scope="scope">
                              <el-input
                                v-model="search"
                                size="medium"
                                placeholder="输入账号关键字搜索"/>
                            </template>
                              <template slot-scope="scope">        
                              <el-button
                                      size="mini"
                                      @click="accountPass(scope.$index, scope.row)"><i style="margin-right:5px"class="el-icon-edit"></i>审核通过</el-button>
                            <el-button
                                    size="mini"
                                    type="danger"
                                    @click="accountRefuse(scope.$index, scope.row)"><i style="margin-right:5px"class="el-icon-delete"></i>审核不通过</el-button>
                              </template>
                          </el-table-column>
                          </el-table>
                        </div>

                      <div id="authority" style="position:absolute; left:20px; top:80px; right:20px; bottom:0px;">
                        <el-table
                          stripe
                          :data="tableData_authority.filter(data => !search || data.account.toLowerCase().includes(search.toLowerCase()))"
                          height="430px"
                          >
                          <el-table-column
                                  width="50">
                          </el-table-column>
                          <el-table-column
                            sortable
                            prop="account"
                              label="门店管理员账号"
                              width="200">
                          </el-table-column>
                          <el-table-column
                            prop="name"
                              label="昵称"
                              width="100">
                          </el-table-column>
                          <el-table-column
                            prop="phone"
                              label="手机号码"
                              width="150">
                          </el-table-column>
                          <el-table-column
                            prop="email"
                              label="邮箱"
                              width="250">
                          </el-table-column>
                          <el-table-column width="" label="">
                            <template slot="header" slot-scope="scope">
                              <el-input
                                v-model="search"
                                size="medium"
                                placeholder="输入账号关键字搜索"/>
                            </template>
                              <template slot-scope="scope">        
                              <el-button
                                      size="mini"
                                      @click="storeManage(scope.$index, scope.row)"><i style="margin-right:5px"class="el-icon-edit"></i>管理门店范围</el-button>
                            </template>
                          </el-table-column>
                          </el-table>
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
      const generateStores = _ => {
        const data = [];
        const cities = ['上海店', '北京店', '广州店', '深圳店', '南京店', '西安店', '成都店'];
        cities.forEach((city, index) => {
          data.push({
            label: city,
            key: index
          });
        });
        return data;
      };
      return {
        allStores: generateStores(),
        stores: [1],
        activeName:"first",
        curid:"",
        search:"",
        name:"",
        refuseInfo:"",
        passInfo:"",
        refuseDialogVisible:false,
        passDialogVisible:false,
        storeInfo:"",
        storeDialogVisible:false,
        tableData_account:[
          {
            account:"zhangsan",
            name:"张三",
            phone:"15652577777",
            email:"zhangsan@buaa.edu.cn"
          },{
            account:"lisi",
            name:"李四",
            phone:"156525721377",
            email:"lisi@buaa.edu.cn"
          },{
            account:"wangwu",
            name:"王五",
            phone:"156525712377",
            email:"wangwu@buaa.edu.cn"
          }
        ],
        tableData_authority:[
          {
            account:"zhangsan",
            name:"张三",
            phone:"15652577777",
            email:"zhangsan@buaa.edu.cn"
          },{
            account:"lisi",
            name:"李四",
            phone:"156525721377",
            email:"lisi@buaa.edu.cn"
          }
        ]
      }
    },
    mounted() {
      document.getElementById("account").style.visibility="visible"
      document.getElementById("authority").style.visibility="hidden"
    },
    methods: {
        filterMethod(query, item) {
          return item.label.toLowerCase().includes(query.toLowerCase());
        },
        accountPass(index, row){
            this.curid=index
            this.passInfo="确认账号："+row.account+" 审核通过"
            this.passDialogVisible=true
        },
        passSystemConfirm(){
          this.tableData_account.splice(this.curid, 1);
          this.passDialogVisible = false
        },
        passStoreConfirm(){
          this.tableData_account.splice(this.curid, 1);
          this.passDialogVisible = false
        },
        accountRefuse(index, row){
            this.curid=index
            this.refuseInfo="确认账号："+row.account+" 审核不通过"
            this.refuseDialogVisible=true
        },
        refuseConfirm(){
          this.tableData_account.splice(this.curid, 1);
          this.refuseDialogVisible = false
        },
        storeManage(index,row){
            this.curid=index
            this.storeInfo="管理账号："+row.account+" 的门店范围"
            this.storeDialogVisible=true
        },
        handleClick(tab, event) {
          if(tab.index=="0"){
            document.getElementById("account").style.visibility="visible"
            document.getElementById("authority").style.visibility="hidden"
          }
          else{
            document.getElementById("account").style.visibility="hidden"
            document.getElementById("authority").style.visibility="visible"
          }
            
      },
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