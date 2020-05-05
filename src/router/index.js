import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

import indexPage from '@/components/index.vue'
import hotSpot from '@/components/hotSpot.vue'
import tendency from '@/components/tendency.vue'
import attribute from '@/components/attribute.vue'
import shop from '@/components/shop.vue'
import customer from '@/components/customer.vue'
import device from '@/components/device.vue'
import authority from '@/components/authority.vue'
import info from '@/components/info.vue'

const originalPush = Router.prototype.push
Router.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: indexPage,
      meta: {
        isLogin: false
      }
    },
    {
      path: '/hotSpot',
      name: 'hotSpot',
      component: hotSpot,
      meta: {
        isLogin: true
      }
    },
    {
      path: '/tendency',
      name: 'tendency',
      component: tendency,
      meta: {
        isLogin: true
      }
    },
    {
      path: '/attribute',
      name: 'attribute',
      component: attribute,
      meta: {
        isLogin: true
      }
    },
    {
      path: '/shop',
      name: 'shop',
      component: shop,
      meta: {
        isLogin: true
      }
    },
    {
      path: '/customer',
      name: 'customer',
      component: customer,
      meta: {
        isLogin: true
      }
    },
    {
      path: '/device',
      name: 'device',
      component: device,
      meta: {
        isLogin: true
      }
    },
    {
      path: '/authority',
      name: 'authority',
      component: authority,
      meta: {
        isLogin: true
      }
    },
    {
      path: '/info',
      name: 'info',
      component: info,
      meta: {
        isLogin: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  //获取用户登录成功后储存的登录标志
  let getFlag = localStorage.getItem("Flag");

  if(getFlag != "isLogin"){
      //用户想进入需要登录的页面，则定向回登录界面
      if(to.meta.isLogin){
        next('/')
        localStorage.setItem("login", "on");
        window.alert("请先登录")
      //用户进入无需登录的界面，则跳转继续
      }else{
        next()
      }
  }else{
    next()
  }

});

export default router;