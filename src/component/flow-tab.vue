<template>
  <div class="wrapper">
    <scroller  show-scrollbar="false" scroll-direction="horizontal" class="scroller">
        <div class="scroller-wrapper" :style="{width:tabsWidth}" ref="tests">
             <div class="tab-wrapper" > 
                 <div :ref="'text'+index" :style="{width:tabWidth}" v-for="(item,index) in tabArray" class="tab-item" @click="tabClicked(index)">
                      <text class="tab-txt" :class="[item.selected?'tab-txt-selected':'']">{{item.name}}</text>
                 </div>
             </div>
             <div ref="indicator" class="tab-indicator" :style="{width:tabWidth}">
             </div>
        </div>
    </scroller>
  </div>
</template>

<style>
.wrapper {
   background-color:#FFFFFF;
   padding:0px;
   margin:0px;
}
.scroller{
   height:84px;
   display:flex;
   flex-direction:column;
}
.scroller-wrapper{
   height:84px;
   display:flex;
   flex-direction:column;
}
.tab-wrapper{
   display:flex;
   flex-direction:row;
   height:84px;
   background-color:#F7F7F7;
}
.tab-item{
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
  position:relative;
  top:-4px;
}
</style>

<script>
 const modal = weex.requireModule('modal');
 const dom = weex.requireModule('dom');
 const animation = weex.requireModule('animation');
  export default {
    name: 'mideaFlowTab',
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
         if(len>5){
             xDis=index*150+"px";
         }
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
          var elName="text"+index;
          var el=this.$refs[elName][0];
          dom.scrollToElement(el, { offset:0 })
          this.$emit('tabClicked',index);
      }
    },
    data:function () {
     return {
      
     }
    },
    created () {
       var len=this.tabArray.length;
       this.tabsWidth="750px";
       if(len>5){
          this.tabWidth="150px";
          this.tabsWidth=150*len+"px";
       }else{
          this.tabWidth=(750/len)+"px";
       }
    }
  }
</script>




