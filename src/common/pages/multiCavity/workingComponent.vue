
<style lang="less" type="text/less">
    @import "../../less/working.less";
</style>
<template>
    <div class="working_section all_section" v-if="isCavityWorking" :style="{height: wrapHeight}">
            <m-header leftImg="assets/img/header/public_ic_back@3x.png" title="蒸汽炉" titleText="white" :isImmersion="true"  :showLeftImg="true" @leftImgClick="back2Native" >
            <div slot="headerTitle">
                <header-tab ref="mTab" :tabArray="pages" @tabClicked="tabClicked">
                </header-tab>
            </div>
            <div slot="customerContent" class="header-top-wrapper">
                <div class="header-top-inner-wrapper">
                    <div class="header-right-image-wrapper" @click="openCloudRecipe">
                        <image class="header-right-image" :src="'assets/img/header/public_ic_cloud_recipe@3x.png'"></image>
                    </div>
                    <div class="header-right-image-wrapper" @click="childLock(true,index)">
                        <image class="header-right-image" :src="'img/header/public_ic_babylock@3x.png'"></image>
                    </div>
                    <div class="header-right-image-wrapper" @click="openMorePage">
                        <image class="header-right-image" :src="'img/header/public_ic_lots@3x.png'"></image>
                    </div>
                </div>
            </div>
        </m-header>
        <div class="progress_content"  @longpress="onlongpressQuery()"><!--隐藏长按组件触发03查询，方便调试-->
            <div class="progress_section" :style="progress_style" > 
                <!--<wxcProgress :percent="progress" :progressShow="progressShow"
                    :wxc_radius='progress_radius'>

                </wxcProgress>
            <div class="animate_section" v-if="isWorking" :style="{left:`${progress_radius-50}px`}">
                    <image class="animate_circle" src="img/ellipsis_px_2.gif"></image>
                </div>-->
                <div v-if="progressShow">
                    <midea-progresscycle-view class="circleprogress" :data="chartJson"></midea-progresscycle-view>
                </div>

                <div v-if="analysisObj.isProbe.value" class="time_section" :style="{ height: `${progress_radius*2}px`,width:`${progress_radius*2}px`}">
                    <div class="content_section">
                        <text :class="['number-text',timeShow && 'work_time',hasHour && 'hour_time']">{{probeProgress}}</text>
                    </div>
                    <div class="next_section">
                        <text class="number_next">{{probeTempText}}</text>
                    </div>
                </div>
            
                <div v-if="!analysisObj.isProbe.value" class="time_section" :style="{ height: `${progress_radius*2}px`,width:`${progress_radius*2}px`}">
                    <div class="center_section">
                        <!--<text class="number-text">{{progress}} {{timeRemain}}</text>-->
                        <div :class="['prev_section',hourMore10 && 'prev_section_more']">
                            <text class="number_prev" v-if="hasHour">时</text>
                        </div>
                        <div class="content_section">
                            <text :class="['number-text',timeShow && 'work_time',hasHour && 'hour_time']">{{workSpecialStatusText}}</text>
                        </div>
                        <div class="next_section">
                            <text class="number_next">{{tag_next}}</text>
                        </div>
                    </div>
                </div>
                <div class="cen status_tag_section" :style="{width:`${progress_radius*2}px`}">
                    <text class="status_tag">{{statusTag}}</text>
                </div>
            
            </div>
        </div>

        <div class="detail_section" v-if="!finishStatus" @click="setting(analysisObj)">
            <text class="detail_text">{{analysisObj.mode.text}} {{analysisObj.temperature.upLowTemperature>0?analysisObj.temperature.upLowTemperature:''}}</text>
            <text class="temp_text">{{analysisObj.temperature.upLowTemperature>0?"°":''}}</text>
        </div>
        <div class="detail_section" v-if="hasSetting">
            <div class="edit_section" @click="setting(analysisObj)">
                <image class="setting_icon" src="img/edit_icon@2x.png" ></image>
            </div>
        </div>
        <div class="footer_section" v-if="isFooterShow">
            <div class="btn_content">
                <div class="btn_section">
                    <div class="image_section" @click="cancle">
                        <image class="icon_image" :src="cancleIcon"></image>
                    </div>
                    <div class="decs_section">
                        <text class="decs_text">{{cancleBtnText}}</text>
                    </div>
                </div>
                <div class="btn_section" v-if="hasStopOrContinueBtn" >
                    <div class="image_section" @click="startOrPause()">
                        <image class="icon_image" :src="btnSrc"></image>
                    </div>
                    <div class="decs_section" >
                        <text class="decs_text">{{btnText}}</text>
                    </div>

                    <!--预热完成引导-->
                    <div class="preheatFinishTig" v-if="preheatFinishTig">
                        <div class="preheat_tig_section">
                            <div><text class="preheat_tig">放入食物</text></div>
                            <div><text class="preheat_tig" style="marginTop:10px">点击开始</text></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    
    import headerTab from '@/component/sf/custom/headerTab.vue'
    import mHeader from '@/component/sf/custom/header.vue'
    import commonMixin from  "@/common/util/mixins/common"
    export default {
        mixins: [commonMixin],
        data(){
            return {
               chartJson: {
                "completedColor":"#FFFFFF", //环形进度条未完成后的颜色默认#267AFF
                "incompletedColor":"#f5d5d5eb", //环形进度条未完成后的颜色，默认透明
                "thickness":2, //环形进度条宽度，默认4
                "cornerRadius" : 280,  //环形的半径，默认是width/2
                "totalCounter" : 360, //环形进度条的最大值，默认是360
                "progressCounter" : 0, //设置进度值，默认是从0-360, 默认为0
                "autoProgress" : false, //设置是否需要自动执行环形进度，默认false, 如果设置为true，则每秒进度值+1操作
                "clockwise" : true, //环形自动执行进度的方向，默认是true，即顺时针方向，false为逆时针方向
                "startingSlice" : 360, //环形进度开始的起始位置，当totalCounter为360的时候，0: 0点钟位置起点，90:3点钟位置起点 180:6点钟位置起点
                "pointShow" : false, //环形进度中的进度球是否需要显示，默认不显示
                "pointRadius" : 3, //默认是环形进度宽度的一半
                "pointColor" :  "#FFFFFF", //环形进度中的进度球颜色
                "pointImageBase64" :  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACEAAAAhCAYAAABX5MJvAAAERklEQVRYR82Yf2jUdRjHX5875137cbcfOF1Omfij1DDC3BKEWeCPUMERy2pgkQvBQUY5EfrB6AfIlrVFG4gYJWmaxASV/AHlQKptRTRSywyHu5oudttOt+623T3x3Pe8rbntbiTdvv99P5/n83ne3/fn/Tyf5/ka4nkqxObKJd3RS1Y/FCI8JpBnDLOATASvQJuBVoSvptpoCKTQ6fPQTYUJxXJhYhlkV8t0PxRjWIeQH3Ya6zF0As0IJ51wtOMlc2O8JWOD2CtJbj9FCK8KLACcsXyPMu83cBnDOz1O6tlqBkbbY1QQGXvFHQpQJiHeABy6cKodpiXD/AxYPxcezIbcVEh3QrcfPLfgpw448Tv81gV/9UF/MOoyYGy8aXNQ27XV9IwEcgcI13syDzsVwDMI4fn7MmHT/ZbzBZlYg2M8Alz2WmCO/AK/eiOGBp06RJAK38vmyvDl/9pPGQj6qUV4CrAbA88uhp0FMD0ZptjiP5DBENzog8pG+OQCiEKAIIbDdidlwxkZAqEaCFAuwtvKQHISlD0EryyDe6ZYznsH4JoPzrbC6Va42gNdfshwwhw3rMmDVXkw2wUpSdaavwdhTzPU/gh9qgiDGMNrPQ6qbmskCsJdI0+KcEA1oAzsWDYEICjw/XU4cAGOX4GewNiMuB2wYR5sXgwPz1A6h4C82xxlJGAMm3u2m891pzAIDcMAnBFYou/PPQC7C4cY+PIqlJ8Dz83oJuOei35EbhpUrYTH5wwxsqsBPv7ZejfQ4oDVGr4GTUSZbCNElYahirC+CGamgjJwphVKTkAwZsq5E5fdBgfXw+o8i5E/bkLRsahY/dgo93mpM2kfSpYJ8inCWg3DXQWwfaklwsZ22HIK2nzxC3Kk5SwX7F8LBTkwEIIPfoDdjZHwNZwiSImZViPzA8J3mglnpkH9RiskVYQ7G+DgxfiOYCyYejQli6Cy0BKrhqyyoawAXofhEeOukVIR9unIytlwrMgSyqVOWHN0fBHGy4+K9XQxLMwinCw21sO5axFtCC8Yd7UcEnhah/Y8CqVhaVq0vX4+Xjex7d5aAS8utez2tcCOr6MC/cy4quUbYLkOnd0E+TOsyXVfwHlP7M3jtViRCyefsKybrsOqI9GV3+pxtImQq0OXtsC9qdbkoo+i5xavn3HtVG8Xn7dM/rwFC/dHmDB4FESvCMk61F4GyZHsmFMXyXB3BQJoBm7fZm3WNwg5tVEQfaqJNiGBTIBnkmhiMkSH+30pFZPgPJHQjGnodMDyyXF3hG/RdDR4/v9bFMp93dRNknoikowSXlmFcUyGGlNxjFlt50N2CiRNoNrWAqajFyqbJlJtR44l4X3H7bsqVge2YS4siXRgWu5r2a8dWEsHHL8bHVj00kx0Lzr89g535TaKkQl05eDF0PTfu/LhSDShuUh32MnqD1GIGfF/ArwiI/5PBOn0+eL7P/EPYtpkF4ik2AkAAAAASUVORK5CYII=", //环形进度中的进度球的图片base64
            },
            progress:1,
            progress_radius: 280,
            tag_next: '',
            btnText: "暂停",
            btnSrc: "img/footer/icon_pause@2x.png",
            cancleBtnText: '关闭',
            cancleIcon: 'img/footer/icon_cancle@2x.png',
            progressShow: true, //是否显示圆圈
            finishStatus: false, //完成状态
            preheatFinishTig: false, //预热完成指引
            isFooterShow: false,
            isWorking: false,

            // cmdObj:cmdFun.initAnalysisObj(), //指令解析对象
          
            timeShow: false, //是否显示时间
            workSpecialStatusText: '',  //显示当前状态
            queryTimer: null,  
            countDownTimer: null,
            isTimerStop: false,  //是否暂停
            statusTag: "剩余时间", 
            hasSetting: false, //是否有时间温度设置
            hasHour: false, //是否有小时
            hourMore10: false,//是否大于10小时
            hasStopOrContinueBtn: false,
            modeText:'',
            probeProgress: null, //探针工作倒计时
            probeTempText: "°C",

            warningDialogShow: false,
            warningDialogTitle: "温馨提示",
            warningDialogContent: "主人，您的水箱缺水了，要及时添加水哦",

            showBar:false,
            actionsheetItems:['确定关闭'],
            lightImg:"img/light_off@3x.png"
               
            }
        },
       props: {
           pages:{
                type: Array,
                default: function(){
                    return []
                }
            },
             analysisObj:{
                type: Object,
                default: () => ({})
            },
            isCavityWorking: {
                type: Boolean,
                default: false
            },
        },
        components: {headerTab,mHeader},
        created(){
           
        },
        computed: {
           progress_style(){
                let {wrapHeight,progress_radius} = this;
                return{
                    height: `${progress_radius * 2}px`,
                    width: `${progress_radius * 2}px`,
                    marginTop: `${wrapHeight/2-progress_radius*2 -60}px`
                }
            }
        },
        mounted() {
            //this.moveTest();
        },
        methods: {    
        }
    }
</script>


