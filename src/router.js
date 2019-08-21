import Vue from 'vue'
import Router from 'vue-router'
import goods from './views/Goods.vue'

Vue.use(Router)

export default new Router({
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'goods',
      component: goods
    },
    {
      path: '/evaluate',
      name: 'evaluate',
      component: () => import( './views/Evaluate')
    },
    {
      path: '/merchant',
      name: 'merchant',
      component: () => import( './views/Merchant')
    },
  ]
})
