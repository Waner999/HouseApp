import axios from 'axios'

const IP = 'http://192.168.0.108:3333/'



//商家详情

 export let getseller = () => {

    return axios.get(IP + 'api/seller')

}


//商品列表
export let getgoods = () => {

    return axios.get(IP + 'api/goods')

}
//评论详情

export let getratings = () => {
    return axios.get(IP + 'api/ratings')
}