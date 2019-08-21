<template>
    <div >
    <div class="evaluate">
        <div class="rate">
            {{ratingsList.serviceScore }}
            <p> 综合评分</p>
            <p>高于周边商家{{ratingsList.rankRate}}% </p>

        </div>
        <div>
            <p>服务态度 <img v-for="i in Math.floor(ratingsList.score) " :key="i" src="../assets/star24_on@3x.png" alt=""> </p>
          <img v-show="ratingsList.score% 1 >= 0.5" src="../assets/star36_half@2x.png" alt="">
          <p>送达时间 {{ratingsList.deliveryTime}}分钟 </p>
        </div>
    </div>
        <div class="rateing" v-for="(item,index) in rate" :key="index"> 
        <!-- 头像 -->
       <img :src="item.avatar" alt=""> 
      <div class="flex"> <label> {{ item.username}} </label> <label> {{ new Date(item.rateTime) }} </label></div>
      <label> <img v-for="i in item.score"  :key="i" src="../assets/star24_on@3x.png" alt=""> </label> <label> {{ item.deliveryTime }}分钟送达 </label>
      <p>{{ item.text }} </p>
        <!-- 点赞商品 -->
       <div> {{ item.recommend }} </div>

    </div>
    </div>
</template>

<script>
import {getseller,getratings} from '@/apis/apis'
    export default {
        data(){
            return {
                ratingsList:[],
                rate:[]
            }
        },
       async created(){
         this.ratingsList = (await getseller()).data.data       
            this.rate = (await getratings()).data.data
            console.log(this.rate)
        },
        computed:{
    

        }
    }
</script>

<style lang="less" scoped>
    .evaluate{
      display: flex;
      justify-content: space-around;
      align-items: center;
    .rate{
        border-right: 1px solid #ccc;
    }
    }
    .rateing{
        width: 100%;
         border:1px solid #ccc;
         .flex{
             display: flex;
             justify-content:space-between
         }
         img{
             width: 20px;
             height: 20px;
         }
    }
</style>