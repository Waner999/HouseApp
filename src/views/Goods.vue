<template>
  <div>
    <div class="container">
      <div class="left-box">
        <div class="bscroll">
          <ul class="namelist content">
            <li v-for="(item, index) in namelist" :key="index" @click="clickTitle(item.name)" :class="{active: select == item.name}">
              <span >{{ item.name}}</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="right-box">
        <div class="rightscroll">
          <ul class="content">
            <div v-for="(item, index) in  namelist" :key="index" :id="item.name">
              <label class="title"  >{{item.name}}</label>
              <li v-for="(food, id) in item.foods" :key="id">
                <!-- 图片 -->
                <img :src="food.icon" alt />
                <!-- 价格描述 -->
                <div>
                  <h3>{{food.name}}</h3>
                  <span
                    class="description"
                    v-show="food.description == ''? false : true"
                  >{{food.description}}</span>
                  <span class="sellCount">月售:{{food.sellCount}}份,好评率: {{ food.rating }}%</span>
                  <h2 class="price">
                    ￥{{ food.price }}
                    <del
                      v-show="food.oldPrice == '' ? false : true "
                    >￥{{food.oldPrice}}</del>
                  </h2>
                </div>
                <!-- 操作 -->
                <div class="btn-div" >
                  <Button v-show="food.num > 0" type="primary" shape="circle" icon="md-remove" size="small" ghost  @click="changeNum(food.name,-1)"></Button>
                  <label  v-show="food.num > 0" class="num"> {{ food.num }} </label>
                  <Button type="primary" shape="circle" icon="ios-add" size="small" @click="changeNum( food.name,1)"></Button>
                </div>
              </li>
            </div>
          </ul>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
import BScroll from "better-scroll";
import { getgoods } from "@/apis/apis";
export default {
  data() {
    return {
      select: ""
    };
  },
  async created() {
   this.$store.dispatch('getList')
    //获取id
    // let id = localStorage.getItem("id");
    //  this.namelist = (await getgoods()).data.data
    //  this.select = this.namelist[0].name
  },
  mounted() {
    new BScroll(".bscroll", {
      click: true
    });
    this.rightscroll = new BScroll(".rightscroll",{
        probeType:3,
        click:true
    });
    this.rightscroll.on('scroll',(res)=>{
       let _y = Math.abs(res.y)
       
       if(_y <= this.heightArr[0].height){
         this.select = this.heightArr[0].id
       }else{
          let  total = 0 
         this.heightArr.forEach((elt,index) => {
            total += elt.height
          if(_y >= total){

            this.select =  this.heightArr[index + 1  == this.heightArr.lenth ? index: index +1].id
          }
         })
       }
    })
  },
  updated(){
    let arr = []
    let ul =  document.querySelector('.rightscroll > .content')
      for(let elt of ul.children){
        arr.push({
          id:elt.id,
          height:elt.offsetHeight
        })
      }
      this.heightArr = arr
  },
  computed: {
      namelist(){
         return this.$store.state.namelist  
       },
  },
  methods: {
    clickTitle(val) {
       this.select = val;
       this.rightscroll.scrollToElement("#"+val, 600);
    },
    changeNum(id,val){
      this.$store.commit('changeNum',{id,val})
    }
  }
};
</script>

<style lang="less" scoped>
//内容
.btn-div{
  display: flex;
  align-items: center;
}
.active {
   color: #f60;
}
.title {
  display: inline-block;
  width: 100%;
  background: #ccc;
  font-size: 15px;
  margin-top: 20px;
  text-indent: 20px;
}
.bscroll {
  height: 600px;
  overflow: auto;
}
.rightscroll {
  height:500px;
  overflow: auto;
}
ul {
  list-style: none;
}
.container {
  display: flex;
  .left-box {
    width: 125px;

    .namelist {
      li {
        text-align: center;
        line-height: 40px;
        span {
          display: inline-block;
          border-bottom: 1px solid #ccc;
        }
      }
    }
  }
  .right-box {
    width: 100%;
    ul {
      li {
        border-bottom: 1px solid #ccc;
        padding: 10px;
        display: flex;
        justify-content: space-around;
        align-items: center;
        img {
          width: 50px;
          height: 50px;
        }
        .price {
          color: red;
          font-size: 14px;
          del {
            color: #ccc;
            font-size: 12px;
          }
        }
        .description,
        .sellCount {
          font-size: 12px;
          
        }
        .description {
          text-overflow: ellipsis;
          overflow: hidden;
          width: 170px;
          height: 20px;
        }
        .num {
          margin: 0 5px;
        }
      }
    }
  }
}
</style>