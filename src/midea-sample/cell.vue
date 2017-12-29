<template>
   <div class="wrapper" :style="{paddingTop:isIos?'40px':'0px'}">
    <scroller>
    <midea-cell title="仅标题且带底部边距"
                :hasArrow="true"
                :hasMargin="true"
                :hasTopBorder="true"
                :clickActivied="true"
                style="margin-top:24px"
                @mideaCellClick="itemClicked"
               >
    </midea-cell>
    <midea-cell title="标题附5444带描述"
                desc="描述"
                :hasMargin="true"
                :hasArrow="true"
                :clickActivied="true"
                :hasTopBorder="true"
                @mideaCellClick="itemClicked"
               >
    </midea-cell>
    <midea-cell title="带右边文字"
                rightText="设置"
                :hasTopBorder="true"
                :hasMargin="true"
                @mideaCellClick="itemClicked"
               >
    </midea-cell>
    <midea-cell title="带右边文字和导航"
                rightText="设置"
                :hasTopBorder="true"
                :hasArrow="true"
                :clickActivied="true"
                @mideaCellClick="itemClicked"
               >
    </midea-cell>
    <midea-cell title="带图标且自动设置高度"
                desc="描述"
                height="120"
                rightText="设置"
                :hasArrow="true"
                :clickActivied="true"
                itemImg="../img/icon/jiayun.light.00233.png"
                @mideaCellClick="itemClicked"
               >
     </midea-cell>

     <midea-cell label="动态插入文本"
                @mideaCellClick="itemClicked"
                >
                <text class="link-text" slot="text" v-if="selected==1"> 不可关联</text>
                <text class="link-text" slot="text" v-if="selected==2"> 已关联</text>
     </midea-cell>

     <midea-cell title="动态插入切换按键"
                @mideaCellClick="itemClicked"
                >
            <switch slot="value"> </switch>
      </midea-cell>


          <midea-cell title="仅标题且带底部边距"
                :hasArrow="true"
                :hasMargin="true"
                :hasTopBorder="true"
                :clickActivied="true"
                style="margin-top:24px"
                @mideaCellClick="itemClicked"
               >
    </midea-cell>
    <midea-cell title="标题附5444带描述"
                desc="描述"
                :hasMargin="true"
                :hasArrow="true"
                :clickActivied="true"
                :hasTopBorder="true"
                @mideaCellClick="itemClicked"
               >
    </midea-cell>
    <midea-cell title="带右边文字"
                rightText="设置"
                :hasTopBorder="true"
                :hasMargin="true"
                @mideaCellClick="itemClicked"
               >
    </midea-cell>
    <midea-cell title="带右边文字和导航"
                rightText="设置"
                :hasTopBorder="true"
                :hasArrow="true"
                :clickActivied="true"
                @mideaCellClick="itemClicked"
               >
    </midea-cell>
    <midea-cell title="带图标且自动设置高度"
                desc="描述"
                height="120"
                rightText="设置"
                :hasArrow="true"
                :clickActivied="true"
                itemImg="../img/icon/jiayun.light.002.png"
                @mideaCellClick="itemClicked"
               >
     </midea-cell>

     <midea-cell label="动态插入文本"
                @mideaCellClick="itemClicked"
                >
                <text class="link-text" slot="text" v-if="selected==1"> 不可关联</text>
                <text class="link-text" slot="text" v-if="selected==2"> 已关联</text>
     </midea-cell>

     <midea-cell title="动态插入切换按键"
                @mideaCellClick="itemClicked"
                >
            <switch slot="value"> </switch>
      </midea-cell>

 </scroller>
     
  </div>
</template>
<style scoped>
 .link-text{
   color:#333;
   font-size:24px;
 }
 .wrapper{
   background-color:#F7F7F7;
    position:relative;
 }
</style>
<script>

  import mideaCell from '../component/cell.vue'
  import nativeService from '../common/services/nativeService'
  const modal = weex.requireModule('modal');
  
  module.exports = {
    components: {mideaCell},
    data () {
      return {
        selected:1
      }
    },
    methods: {
      itemClicked(){
        nativeService.toast("button clicked");
      }
    },
    created () {
      this.isIos=weex.config.env.platform=='iOS'?true:false;
    }
  };
</script>