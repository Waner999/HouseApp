<template>
  <div>
    <div class="title">
       {{ list.name }}  <P>
      <img v-for="i in print" :key='i' src="../assets/star24_on@3x.png" alt />
      <label>月售  {{ list.ratingCount }} 单</label>

       </P>
    </div>
    <div class="info">
      <div>
          <p>起送价</p> 
          <p> {{ list.minPrice }} </p>

      </div>
      <div class="two">
          <p> {{ list.description }} </p>
          <p> {{ list.deliveryPrice }} </p>

      </div>
      <div>
          <p>平均配送时间</p>
          <p> {{ list.deliveryTime }} </p>
      </div>
    </div>

    <div>
      <Card :bordered="true">
        <p slot="title">公告与活动</p>
        <p> {{ list.bulletin }} </p>
        <p v-for="(item,index) in list.supports" :key="index">{{ item.description }} </p>
      </Card>
    </div>
    <!-- 商家实景 -->
    <div>
      <div style="background:#eee ">
        <Card :bordered="false">
          <p slot="title">商家实景</p>
          <p> <img  v-for="(item,index) in list.pics" :key="index" :src="item" alt=""></p>
        </Card>
      </div>
    </div>
    <!-- 商家信息 -->
    <div>
      <div style="background:#eee ">
        <Card :bordered="false">
          <p slot="title">商家信息</p>
          <p v-for="(item,index) in list.infos" :key="index"> {{item}} </p>
        </Card>
      </div>
    </div>
  </div>
</template>

<script>
import {getseller} from '../apis/apis'
export default {
    data(){
        return {
            list:[],
        }
    },
  async  created(){

      let  res =  await getseller()

        this.list = res.data.data
        console.log(this.list.serviceScore)

  },
  computed:{
      print(){
          let print = 0
          print = Math.floor(this.list.serviceScore)
           return print
      }
  }
};
</script>

<style lang="less" scoped>
.title{
    padding: 15px;
    font-size: 16px;
    img{
        width: 20px;
    }
}
.info{
    display: flex;
    justify-content: space-around;
    align-items: center;
    .two{
        p{
            border-right: 1px solid #ccc;
            border-left: 1px solid #ccc
        }
    }
}
</style>