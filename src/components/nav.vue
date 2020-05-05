<template>
    <div>
         <!--
        <el-container>
            <el-menu
            :default-active="activeIndex2"
            class="el-menu-demo"
            mode="horizontal"
            @select="handleSelect"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b">
            <el-menu-item index="1" >
                    <i class="el-icon-map-location"></i>
                    <span slot="title">客流热点分析</span>
            </el-menu-item>
            <el-menu-item index="2">
                    <i class="el-icon-data-line"></i>
                    <span slot="title">客流趋势分析</span>          
            </el-menu-item>
            <el-menu-item index="3">
                    <i class="el-icon-pie-chart"></i>
                    <span slot="title">客流属性分析</span>
            </el-menu-item>
            <el-menu-item index="4">
                    <i class="el-icon-office-building"></i>
                    <span slot="title">门店信息管理</span>
            </el-menu-item>
            </el-menu>
        </el-container>
        -->
            <el-container style="display:flex">
                <el-aside width="160px">
                  <el-col >
                    <el-menu
                      :default-active="active"
                      class="el-menu-vertical-demo"
                      @open="handleOpen"
                      @close="handleClose"
                      @select="menuSelect"
                      background-color="#545c64"
                      text-color="#fff"
                      active-text-color="#ffd04b">
                        <el-menu-item index="1">
                            <i style="margin-left:-55px"class="el-icon-s-home"></i>
                            <span slot="title">首页</span>
                        </el-menu-item>
                        <el-menu-item index="2" :disabled="auth1">
                            <i class="el-icon-map-location"></i>
                            <span slot="title">客流热点分析</span>
                        </el-menu-item>
                        <el-menu-item index="3" :disabled="auth1">
                            <i class="el-icon-data-line"></i>
                            <span slot="title">客流趋势分析</span>
                        </el-menu-item>
                        <el-menu-item index="4" :disabled="auth1">
                            <i class="el-icon-pie-chart"></i>
                            <span slot="title">客流属性分析</span>
                        </el-menu-item>
                        <el-menu-item index="5" :disabled="auth1">
                            <i class="el-icon-s-shop"></i>
                            <span slot="title">门店信息管理</span>
                        </el-menu-item>
                        <el-menu-item index="6" :disabled="auth1">
                            <i class="el-icon-s-custom"></i>
                            <span slot="title">顾客信息管理</span>
                        </el-menu-item> 
                        <el-menu-item index="7" :disabled="auth1">
                            <i class="el-icon-user"></i>
                            <span slot="title">用户权限管理</span>
                        </el-menu-item>
                    </el-menu>
                </el-col>
            </el-aside>
        </el-container>
    </div>
</template>

<script>
export default {
    data(){
        return{
            auth1:true,
        }
    }, 
    props: ['active'],
    mounted(){
        let getFlag = localStorage.getItem("Flag");
        if(getFlag==="isLogin"){
          
          this.auth1=false
        }else{
          this.auth1=true
        }  
    },
    methods: {
        f(i){
            this.active=i;
        },
        menuSelect(key){
            switch(key){
            case '1': this.$router.push({ path:'/'})
                break
            case '2': this.$router.push({ path:'/hotSpot'})
                break
            case '3': this.$router.push({ path:'/tendency'})
                break
            case '4': this.$router.push({ path:'/attribute'})
                break
            case '5': this.$router.push({ path:'/shop'})
                break
            case '6': this.$router.push({ path:'/customer'})
                break
            case '7': this.$router.push({ path:'/authority'})
                break
            }         
        },
        handleOpen(key, keyPath) {
            console.log(123);
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        }
    }
}
</script>    

<style>
.el-aside {
    /*background-color: #D3DCE6;*/
    color: #333;
    text-align: center;
    line-height: 200px;
  }
</style>          