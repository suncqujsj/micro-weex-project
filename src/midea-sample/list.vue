<template>
  <div class="wrapper" :style="{paddingTop:isIos?'40px':'0px'}">
      <list @loadmore="onloading" >
        <refresh class="refresh-view" @refresh="onrefresh" :display="refreshing">
           <loading-indicator class="indicator" ></loading-indicator>
        </refresh>
        <midea-item v-for="(item,i) in list"
               :hasTopBorder="i==0?true:false" :title="item.name"
                :hasArrow="true"
                :clickActivied="true"
                @onItemPress="showDel(item)"
                :cantEdit="true"
                @onDelete="delItem(item)"
         >
        </midea-item>
         <midea-item v-for="(item,i) in list1"
               :hasTopBorder="i==0?true:false" :title="item.name"
                :hasArrow="false"
                :desc="item.desc"
                :itemImg="item.itemImg"
                :height="220"
                :clickActivied="true"
                @onItemPress="showDel(item)"
                :cantEdit="true"
                @onDelete="delItem(item)"
         >
        </midea-item>
      </list> 
      <midea-operation-modal
         :show="showDelModal"
         @close="closeDelModal"
         @onDelete="deleteRow"
      >
     </midea-operation-modal>
  </div>
</template>
<style scoped>
 .indicator {
    height: 60;
    width: 60;
    color: #00B9EF;
  }
  .text-indicator{
    width:750;
    color: #999;
    font-size:28px;
    text-align:center;
  }
  .refresh-view {
    height: 120px;
    width: 750px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
<script>

  import mideaItem from '../midea-component/item.vue'
  import mideaOperationModal from '../midea-component/operation-modal.vue'
  import nativeService from '../common/services/nativeService'
  const modal = weex.requireModule('modal');
  
  export default {
    components: {mideaItem,mideaOperationModal},
    data () {
        return{
          refreshing:'hide',
          showDelModal:false,
          startIndex:16,
          loadMore:true,
          list:[
            {"name":"设备1"},
            {"name":"设备2"},
            {"name":"设备3"},
            {"name":"设备4"},
            {"name":"设备5"},
            {"name":"设备6"},
            {"name":"设备7"},
            {"name":"设备8"},
            {"name":"设备9"},
            {"name":"设备10"},
            {"name":"设备11"},
            {"name":"设备12"},
            {"name":"设备13"},
            {"name":"设备14"},
            {"name":"设备15"}
          ],
          list1:[
            {"name":"普京和特朗普未能会谈 克里姆宁宫：都怪美国","desc":"美居活动 2017-12-25","itemImg":"/dist/src/img/icon/485_laffey.RFH.001.png"},
            {"name":"普京和特朗普未能会谈 克里姆宁宫：都怪美国","desc":"美居活动 2017-12-25","itemImg":"/dist/src/img/icon/485_laffey.RFH.001.png"},
            {"name":"普京和特朗普未能会谈 克里姆宁宫：都怪美国","desc":"美居活动 2017-12-25","itemImg":"/dist/src/img/icon/485_laffey.RFH.001.png"},
            {"name":"普京和特朗普未能会谈 克里姆宁宫：都怪美国","desc":"美居活动 2017-12-25","itemImg":"/dist/src/img/icon/485_laffey.RFH.001.png"},
            {"name":"普京和特朗普未能会谈 克里姆宁宫：都怪美国","desc":"美居活动 2017-12-25","itemImg":"/dist/src/img/icon/485_laffey.RFH.001.png"}
          ]
        }
    },
    methods: {
       deleteRow(){
          this.showDelModal=false;
       },
       closeDelModal(){
          this.showDelModal=false;
       },
       showDel(item){
          this.showDelModal=true;
          this.editItem=item;
       },
       delItem(item){

       },
       onrefresh (event) {
          var self=this;
          self.refreshing = 'show';
          setTimeout(function(){
            var list=[];
            for(var i=0;i<15;i++){
              var obj={"name":"设备"+(i+1)};
              list.push(obj);
            }
            self.list=list;
            self.startIndex=16;
            self.refreshing = 'hide';
          }, 1000)
       },
       onloading (event) {
         var self=this;
         self.showLoading = 'show';
         setTimeout(function(){
            if (self.loadMore) {
              for(var i=0;i<10;i++){
                 if(self.startIndex<=100){
                   var obj={"name":"设备"+self.startIndex};
                   self.list.push(obj);
                   self.startIndex++;
                 }else{
                   self.loadMore=false;
                   break;
                 }
              }
            }
            self.showLoading = 'hide';
         }, 100);
       }
    },
    created () {
      this.isIos=weex.config.env.platform=='iOS'?true:false;
    }
  };
</script>