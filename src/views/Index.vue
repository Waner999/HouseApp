<template>
  <div class="index-view">
    <div class="header">
      <img :src="this.sellList.avatar" alt class="head-pic" />
      <div>
        <h2 class="title">{{ this.sellList.name }}</h2>
        <h3 class="description">{{ this.sellList.description }}, 约{{ this.sellList.deliveryTime }}分钟</h3>
        <h3 class="supports">{{ getsupports }}</h3>
      </div>
    </div>
    <div>
      <p>公告: <span class="bulletin"> {{this.sellList.bulletin}} </span> </p>
    </div>
    <div class="nav-div">
      <router-link to="/">
        <span :class="{ active: state == '商品'}" @click="clickTo('商品')">商品</span>
      </router-link>
      <router-link to="/evaluate">
        <span :class="{ active: state == '评价'}" @click="clickTo('评价')">评价</span>
      </router-link>
      <router-link to="/merchant">
        <span :class="{ active: state == '商家'}" @click="clickTo('商家')">商家</span>
      </router-link>
    </div>
    <div class="index-view">
      <router-view></router-view>
    </div>
    <div class="shopcar">
      <div class="shop-icon" @click="shopcar">
        <div class="min-shop">
          <Icon size="25" type="md-cart" :color="changeIcon" />
        </div>
      </div>

      <span class="price">￥{{gettotal}}</span>
      <span>另需配送费￥{{ this.sellList.deliveryPrice }} 元</span>
      <span class="minPrice">￥{{ this.sellList.minPrice }} 起送</span>
      <transition name="slide-fade">
        <div class="min-car" v-show="showcar">
          <div v-for="(item,index) in getshopCar" :key="index" class="shop">
            <h2>{{item.name}}</h2>
            <h2>{{item.price}}</h2>
            <div>
              <Button
                v-show="item.num >0"
                type="primary"
                shape="circle"
                icon="md-remove"
                size="small"
                ghost
                @click="changeNum(item.name,-1)"
              ></Button>
              <label v-show="item.num >0" class="num">{{ item.num }}</label>
              <Button
                type="primary"
                shape="circle"
                icon="ios-add"
                size="small"
                @click="changeNum( item.name,1)"
              ></Button>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { getseller } from "@/apis/apis";
export default {
  data() {
    return {
      state: "商品",
      sellList: {}, //商家列表
      showcar: false
    };
  },
  async created() {
    //商家列表
    this.sellList = (await getseller()).data.data;
    //ID
    localStorage.setItem("id", this.sellList.id);
  },
  methods: {
    clickTo(val) {
      this.state = val;
    },
    shopcar() {
      this.showcar = !this.showcar;
    },
    changeNum(id, val) {
      this.$store.commit("changeNum", { id, val });
    }
  },
  computed: {
    getsupports() {
      if (!this.sellList.supports) return ""; //非空判断
      let str = "";
      for (let obj of this.sellList.supports) {
        //循环拿到特色的对象
        str += obj.description + ",";
      }
      return str;
    },
    getshopCar() {
      return this.$store.getters.getshopCar;
    },
    changeIcon() {
      if (this.$store.getters.getshopCar.length > 0) {
        return "red";
      } else {
        return "#ccc";
      }
    },
    //计算总价
    gettotal() {
      let total = 0;
      for (let obj of this.$store.getters.getshopCar) {
        total += obj.num * obj.price;
      }
      return total;
    }
  }
};
</script>

<style lang="less" scoped>
.index-view {
  height: 82%;
}
.shop {
  display: flex;
  justify-content: space-between;
}
//头部
.header {
  display: flex;
  padding: 20px;
  .head-pic {
    margin-right: 20px;
    width: 100px;
    height: 100px;
  }

  .description {
    font-size: 14px;
  }
  .supports {
    font-size: 12px;
  }
}
//nav
.nav-div {
  display: flex;
  justify-content: space-around;
  a {
    color: #91979b;
    font-size: 16px;
  }
  border-bottom: 1px solid #ccc;
  padding-bottom: 10px;
  .active {
    color: #f60;
    border-bottom: 1px solid #f60;
  }
}
.bulletin{
  overflow: auto;
}
//购物车
.shopcar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  width: 100%;
  position: fixed;
  bottom: 0;
  z-index: 999;
  background: #141c27;
  .shop-icon {
    height: 60px;
    width: 60px;
    border-radius: 30px;
    background: #121c24;
    position: relative;
    left: 20px;
    bottom: 18px;
    text-align: center;
    color: #91979b;
    .min-shop {
      height: 40px;
      width: 40px;
      border-radius: 20px;
      background: #2b343d;
      line-height: 40px;
      text-align: center;
      position: absolute;
      left: 10px;
      z-index: 99;
      top: 8px;
    }
  }
  .minPrice,
  .price {
    font-size: 16px;
    font-weight: 600;
    color: #808589;
  }
  .minPrice {
    display: inline-block;
  }
  .min-car {
    width: 100%;
    height: 100px;
    position: fixed;
    z-index: 9;
    bottom: 50px;
    overflow: auto;
  }
}
/* 可以设置不同的进入和离开动画 */
/* 设置持续时间和动画函数 */
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateY(200px);
  opacity: 0;
}
</style>