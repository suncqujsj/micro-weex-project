<style lang="less" type="text/less">
 .center-section{
  margin-left: 20px;
  margin-right: 20px;
}
.center-title{
  color: #333;
  font-size: 28px;
  margin-top: 20px;
}
</style>
<template>
    <div class="center-section">
        <div class="center-title-section">
          <text class="center-title">烹饪过的食谱</text>
        </div>
        <midea-nav-list
          :list="navList"
          :cols="3"
          height="150"
          :imgStyle="imgStyle"
          :customStyles="customStyles"
         >
         </midea-nav-list>
    </div>
</template>

<script>
  import mideaNavList from '@/midea-component/mNavList.vue'
  export default {
    props:{
      //  tabClickHandle: {
      //       type: Function,
      //       default: ()=>{}
      //   }
    },
    data () {
    
      return {
         navList:[
         {
           "img":"http://121.41.75.163:8000/source/image/20181126/1543210828723ngy8.jpg"
         },
         {
           "img":"http://121.41.75.163:8000/source/image/20181126/1543210828723ngy8.jpg"
         },
         {
           "img":"http://121.41.75.163:8000/source/image/20181126/1543210828723ngy8.jpg"
         },
         {
           "img":"http://121.41.75.163:8000/source/image/20181126/1543210828723ngy8.jpg"
         },
         {
           "img":"http://121.41.75.163:8000/source/image/20181126/1543210828723ngy8.jpg"
         }
       ],
       cols:3,
       imgStyle: {width:'230px',height:'150px'},
        type:'spaceBetween',//spaceBetween or center
        customStyles:{marginTop:'20px'}
      }
    },
    components:{mideaNavList},
    methods: {
    
    }
  }
</script>