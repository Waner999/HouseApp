import vue from 'vue'
import vuex from 'vuex'
import { getgoods } from './apis/apis'

vue.use(vuex)

const store = new vuex.Store({
    state: {
        namelist:[]
    },
    mutations: { //同步改变数据
        getList(state,data){

            state.namelist = data
        },
        //修改数量
        changeNum(state,data){

            //data有两个参数 一个是id 一个是数量
         for(let obj  of state.namelist){
            for(let food of obj.foods){

                if(food.name  == data.id){
                    food.num += data.val

                    return
                }

            }

         }
            


        }

    },
    actions: { //可以获取异步数据
        
        async getList(context){
            var res = await getgoods()
            var arr = res.data.data
            for(var obj of arr){
                for(var food of obj.foods){
                    food.num = 0 
                }
            }
            context.commit('getList',arr)
        }

    },
    //计算属性
    getters:{
        //获取购物车
        getshopCar(state){
            let arr = []
            for(let obj of state.namelist){
                for(let food of obj.foods){
                    if(food.num> 0){
                        arr.push(food)
                    }
                }
            }
            return arr
        }
    }
})

export default store