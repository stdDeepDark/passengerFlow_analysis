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

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: indexPage
    },
    {
      path: '/hotSpot',
      name: 'hotSpot',
      component: hotSpot
    },
    {
      path: '/tendency',
      name: 'tendency',
      component: tendency
    },
    {
      path: '/attribute',
      name: 'attribute',
      component: attribute
    },
    {
      path: '/shop',
      name: 'shop',
      component: shop
    },
    {
      path: '/customer',
      name: 'customer',
      component: customer
    },
    {
      path: '/device',
      name: 'device',
      component: device
    },
    {
      path: '/authority',
      name: 'authority',
      component: authority
    },
    {
      path: '/info',
      name: 'info',
      component: info
    }
  ]
})
