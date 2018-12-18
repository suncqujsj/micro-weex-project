<template>
  <div class="wrapper">
     <div class="tab-wrapper">
         <div v-for="(item,index) in tabArray" class="tab-item" @click="tabClicked(index)">
              <text class="tab-txt" :class="[item.selected?'tab-txt-selected':'']">{{item.name}}</text>
         </div>
     </div>
     <div ref="indicator" class="tab-indicator" :style="{width:indicatorWidth}">
     </div>
  </div>
</template>

<style>
.wrapper {
   background-color:#FFFFFF;
   padding:0px;
   margin:0px;
   display:flex;
}
.tab-wrapper{
   width:750px;
   flex-direction:row;
   height:84px;
   background-color:#F7F7F7;
}
.tab-item{
   flex:1;
   color:#333333;
   align-items: center;
   justify-content: center;
   text-align: center;
}
.tab-txt{
  font-size:28px;
}
.tab-txt-selected{
  color:#00B9EF;
}
.tab-indicator{
  border-top-style:solid;
  border-top-color:#00B9EF;
  border-top-width: 4px;
  width:375px;
  position:relative;
  top:-2px;
}
</style>

<script>
 const modal = weex.requireModule('modal');
 const animation = weex.requireModule('animation');
  export default {
    name: 'mideaTab',
    props: {
      tabArray: {
        type: Array
      }
    },
    methods: {
      tabClicked(index) {
         var len=this.tabArray.length;
         for(var i=0;i<this.tabArray.length;i++){
            this.tabArray[i].selected=false;
         }
         Vue.set(this.tabArray[index],"selected",true);
         var xDis=index*(750/len)+"px";
         var ref=this.$refs.indicator;
         animation.transition(ref, {
              styles: {
                  transform:'translate('+xDis+',0px)',
                  transformOrigin:'center center'
              },
              duration: 250, //ms
              timingFunction: 'ease',
              delay: 0 //ms
          }, function () {
             
          });
          this.$emit('tabClicked',index)
      }
    },
    data:function () {
     return {
        
     }
    },
    created () {
       var len=this.tabArray.length;
       this.indicatorWidth=(750/len)+"px";
    }
  }
</script>

