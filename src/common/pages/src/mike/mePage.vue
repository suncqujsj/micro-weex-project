<style lang="less" type="text/less">
.hearder-section{
  height: 500px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #333;
}
.header-icon{
  border-radius: 100px;

}
.header-name{
  color: white;
  font-size: 40px;
  margin-top: 20px;
}
.header-sub-name{
  color: #dddddd;
  margin-top: 10px;
}

.select-tags{
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
}
.tag-item{
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 200px;
}
.tag-item-icon{

}
.tag-item-number{
  color:#dddddd;
}
</style>
<template>
    <div>
       <div class="hearder-section">
          <image class="header-icon" src="https://mapnew.midea.com/pfile/group1/M00/6A/49/ChAgb1le8o6AJxDcAAAaX6S8hL8860.jpg" style="width:200px;height:200px"></image>
          <text class="header-name">parker</text>
          <text class="header-sub-name">ID：parker</text>
          <div class="select-tags">
              <div class="tag-item" v-for="(item,index) in selectTags">
                  <image class="tag-item-icon" :src="item.icon" style="width:50px;height:50px"></image>
                  <text class="tag-item-number">{{item.number}}</text>
              </div>
          </div>
       </div>
       <div class="">
          
          <image src="http://121.41.75.163:8000/source/image/20181126/1543210828723ngy8.jpg" style="width:200px;height:100px"></image>
       </div>
    </div>
</template>

<script>
  export default {
    props: [],
    data(){
        return {
          selectTags: [
            {icon: "img/header/public_ic_home@3x.png",number:111},
            {icon: "img/header/public_ic_home@3x.png",number:111},
            {icon: "img/header/public_ic_home@3x.png",number:111},
          ]
        }
    },
    methods:{
        
    }
  }
</script>