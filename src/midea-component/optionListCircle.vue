<template>
     
    <div class="option-list">
        <scroller  show-scrollbar="false" scroll-direction="horizontal" class="scroller">
        <div class="option-item" 
            :class="[item.checked && 'option-item-current']"
            @click="checkChange(item)" v-for="item in oList">
            <text class="text">{{item.title}}</text>
        </div>  
        </scroller>  
    </div>
   
</template>
<style scoped>
   .option-list {
       display: flex;
       flex-direction: row;
       justify-content: flex-start;
       align-items: center;
       padding-top: 19px;
       padding-bottom: 19px;
       padding-left: 30px;
       padding-right: 30px;
       background-color: #FFF;
   }
   .option-item {
        width: 58px;
        height: 58px;
        border-radius: 58px;
        border-radius: 58px;
        margin-right: 46px;
        background-color: #C7C7CC;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content:center;
 
   }
 
   .option-item-current {
        background-color: #267AFF;
   } 
   .text {
        font-size: 28px;
        text-align: center;
        color: #FFFFFF;
   }
   .scroller {
        height: 58px;
        display: flex;
        flex-direction: row;
   }
</style>
<script>
 import nativeService from '@/common/services/nativeService.js'
  export default {
    components: {},
    props: {
        list: {
            type: Array,
            default: () => ([])
        },
    },
    data () {
        return {
           oList: []
        }
    },
    watch: {
        list() {
            this.buildList();
        }
    },
    computed: {
    },
    created () {
        this.buildList();
    },
    methods: {
        buildList() {
            this.oList = this.list.map(item => {
                Vue.set(item,'checked', item.checked || false);
                return item;
            });
        },
        checkChange(e) {
            e.checked = !!!e.checked;
            let checkedList  = [];
            this.oList.forEach(item => {
                item.checked && checkedList.push(item.value);
            });
            this.$emit('optionClick', {checkedList});
        }
    }
  };
</script>

<style scoped>

</style>
