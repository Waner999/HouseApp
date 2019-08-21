<template>
  <div>
    <div>
      <img class="head-img" :src="sellerdata.avatar" />
      <h3>{{ sellerdata.name }}</h3>
      <h4>{{ sellerdata.description }}/{{ sellerdata.deliveryTime }}分钟到达</h4>
      <h6>{{ supportsStr }}</h6>
      <!-- 联调/ 数据调试/  调试接口 -->
    </div>
    <div class="nav-div">
      <router-link to="/">
        <span :class="{select: curNav == '商品'}" @click="clickT('商品')">商品</span>
      </router-link>
      <router-link to="/evaluate">
        <span :class="{select: curNav == '评价'}" @click="clickT('评价')">评价</span>
      </router-link>
      <router-link to="/merchant">
        <span :class="{select: curNav == '商家'}" @click="clickT('商家')">商家</span>
      </router-link>
    </div>
    <router-view></router-view>
    <div>购物车的条</div>
  </div>
</template>

<script>
import { getSeller } from "../apis/apis";

export default {
  data() {
    return {
      curNav: "商品", //当前选中的标签
      sellerdata: {} //商家信息对象
    };
  },
  async created() {

    //ES6
    // getSeller().then(res => {
    //     this.sellerdata = res.data.data
    // })

    //async await
    // await: 只能用在proimise或者基于promise的对象上, 它能等待异步执行完毕, 在执行下一行代码
    // async: await指令只能用在async函数中
    // ES7 终极异步解决方案
    let res = await getSeller()
    this.sellerdata = res.data.data
    // this.sellerdata = (await getSeller()).data.data

    //10次请求
    // new Promise(异步请求1).then(
    //   new Promise(异步请求2).then(
    //     new Promise(异步请求3).then(
    //         new Promise(异步请求4).then(
    //              new Promise(异步请求4).then(
    //                   new Promise(异步请求4).then(
    //                        new Promise(异步请求4).then(
    //                             new Promise(异步请求4).then(
    //                                  new Promise(异步请求4).then(
    //                                       new Promise(异步请求4).then(
    //                                            new Promise(异步请求4).then(
    //         ))
    //   )
    // );
  },
  methods: {
    clickT(nav) {
      //改变当前选中的标签
      this.curNav = nav;
    }
  },
  computed: {
    supportsStr() {
      //先进行非空判断
      if (!this.sellerdata.supports) return "";

      let str = ``;
      for (let obj of this.sellerdata.supports) {
        str += obj.description + " ";
      }

      return str;
    }
  }
};
</script>

<style lang="less" scoped>
.select {
  color: red;
}

.head-img {
  width: 100px;
}

.nav-div {
  display: flex;
  justify-content: space-around;
  font-size: 20px;
}
</style>