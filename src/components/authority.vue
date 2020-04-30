<template>
    <div style="width:100%">
        <Header/>
        <el-container>
          <Nav active="7"/>
                <el-container style="width:100%">
                  <div style="position:absolute; left:170px; top:90px; bottom:0px;">
                      <el-table
                        stripe
                        class="outline"
                        :data="tableData_Door"
                        height="450px"
                        >
                        <el-table-column
                          sortable
                          prop="name"
                            label="姓名"
                            width="100">
                        </el-table-column>
                        <el-table-column
                          sortable
                          prop="description"
                            label="描述"
                            width="100">
                        </el-table-column>
                        <el-table-column label="">
                            <template slot-scope="scope">        
                            <el-button
                                size="mini"
                                @click="handleEdit(scope.$index, scope.row)"><i style="margin-right:5px"class="el-icon-edit"></i>编辑</el-button>
                            </template>
                        </el-table-column>
                        </el-table>
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
        tableData_Door:[
          {
            name:"北门",
            description:""
          },
        ]
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
    line-height: 160px;
  }
  .outline{
    background:whitesmoke;
    box-shadow: 1px 1px 5px 3px rgba(0, 0,0, 0.5);
    border-radius: 8px;
  }
</style>