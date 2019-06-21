<template>
    <recipe-home :tabs="tabs" :constant="constant"></recipe-home>
</template>

<script>
    // config data
    import constant from "./config/constant";
    import modes from "./config/modes.js";
    import autoMenu from "./config/auto-menu.js";
    import recipeHome from "@/common/pages/src/mike/home.vue";
    import nativeService from "@/common/services/nativeService";

    var numberRecord = 0; //记录跳页面的次数
    export default {
        data(){
            return {
                tabs:[
                    {
                        name:'自动菜单',
                        active:true,
                        rows:autoMenu
                    },
                    {
                        name:'加热模式',
                        active:false,
                        rows:modes
                    }
                ],
                constant:constant
            }
        },
        components:{recipeHome},
        created(){
         
        },
        methods: {
           
        }
    }
</script>


