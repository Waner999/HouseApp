<template>
  <div id="app">
    
    <!-- <router-view/> -->
    <index></index>
  </div>
</template>
 
 <script>
 import index from './views/Index'
 export default {
   components:{
     index
   }
 }
 </script>

 <style lang="less">
  html,body,#app{
    height: 100%;
  }
 </style>
 