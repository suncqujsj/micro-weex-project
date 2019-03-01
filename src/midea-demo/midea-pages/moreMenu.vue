<template>
    <div>
        <midea-header title="滑动显示更多菜单" @leftImgClick="back" :showRightImg="true" rightImg="../assets/img/smart_ic_reline@3x.png" @rightImgClick="reload"></midea-header>
        <div class="scroller" ref="scroller" @touchstart="ontouchstart">
            <div class="progresscycle-wrapper">
                <midea-progresscycle-view class="progresscycle" :data="chartData"></midea-progresscycle-view>
            </div>
            <div class="footer" ref="footer">
                <div class="tab-wrapper">
                    <midea-flow-tab :tabArray="flowTabData" :fixedWidth="150" @tabClicked="flowTabClicked">
                    </midea-flow-tab>
                </div>
                <div class="action-sub-bar" v-if="index==0">
                    <div class="action-wrapper" v-for="n in 16">
                        <div class="icon-wraper">
                            <image src="../assets/img/public_ic_done@3x.png" class="icon_actived" resize="contain"></image>
                            <image src="../assets/img/smart_ic_reline@3x.png" class="icon" resize="contain"></image>
                        </div>
                        <text class="desc">模式{{n}}</text>
                    </div>
                </div>
                <div class="action-sub-bar-column" v-if="index==1">
                    <midea-cell v-for="n in 4" :title="'switch'+n">
                        <div slot="value">
                            <midea-switch2 :checked="mideaChecked" @change="onMideachange"></midea-switch2>
                        </div>
                    </midea-cell>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import base from '../base'
import nativeService from '../../common/services/nativeService';
import bindingx from 'weex-bindingx';
import mideaHeader from '@/midea-component/header.vue'
import mideaFlowTab from '@/midea-component/mFlowTab.vue'
import mideaCell from '@/component/cell.vue'
import mideaSwitch2 from '@/midea-component/switch2.vue'


export default {
    components: { mideaFlowTab, mideaSwitch2, mideaCell },
    mixins: [base],
    data() {
        return {
            intervalHandler: null,
            chartData: {
                "completedColor": "#ffffff", //环形进度条未完成后的颜色默认#267AFF
                "incompletedColor": "#f5d5d5eb", //环形进度条未完成后的颜色，默认透明
                "thickness": 2, //环形进度条宽度，默认4
                "cornerRadius": 240,  //环形的半径，默认是width/2
                "totalCounter": 360, //环形进度条的最大值，默认是360
                "progressCounter": 0, //设置进度值，默认是从0-360, 默认为0
                "autoProgress": false, //设置是否需要自动执行环形进度，默认false, 如果设置为true，则每秒进度值+1操作
                "clockwise": true, //环形自动执行进度的方向，默认是true，即顺时针方向，false为逆时针方向
                "startingSlice": 180, //环形进度开始的起始位置，当totalCounter为360的时候，0: 0点钟位置起点，90:3点钟位置起点 180:6点钟位置起点
                "pointShow": true, //环形进度中的进度球是否需要显示，默认不显示
                "pointRadius": 8, //默认是环形进度宽度的一半
                "pointColor": "#FFFFFF", //环形进度中的进度球颜色
            },

            flowTabData: [
                { "name": "类型一", "selected": true },
                { "name": "类型二", "selected": false },
                { "name": "类型三", "selected": false },
                { "name": "类型四", "selected": false },
                { "name": "类型五", "selected": false },
                { "name": "类型六", "selected": false }
            ],
            index: 0,
            isInAnimation: false,
            gesToken: 0,
            y: 0,
            confirm_y: 180, //确认动作的距离
            final_height: 400, //最终移动(抬高）的距离
            isBottomPosition: true
        }
    },
    methods: {
        onappear() {
            this.bind();
        },
        ontouchstart(event) {
            var self = this;
            if (this.isInAnimation === true) {
                console.log('we are in animation, drop pan gesture...');
                if (this.gesToken) {
                    bindingx.unbind({
                        eventType: 'pan',
                        token: self.gesToken
                    });
                    this.gesToken = undefined;
                }
                return;
            }
            this.bind();
        },
        flowTabClicked(tabIndex) {
            this.index = tabIndex;
        },

        getEl: function (e) {
            return e.ref;
        },
        bind() {
            var scroller = this.getEl(this.$refs.scroller);
            var footer = this.getEl(this.$refs.footer);
            var expression = this.isBottomPosition ? `y<=0?max(y,${-this.final_height}):0` : `y>0?min(y+${this.y}, 0):${-this.final_height}`
            bindingx.bind({
                anchor: scroller,
                eventType: 'pan',
                props: [
                    {
                        element: footer,
                        property: 'transform.translateY',
                        expression: expression
                    }
                ]
            }, (e) => {
                if (e.state === 'end') {
                    if (this.isBottomPosition && e.deltaY < 0) {
                        this.y += Math.max(e.deltaY, -400);
                        this.bindTiming()
                    } else if (!this.isBottomPosition && e.deltaY > 0) {
                        this.y += Math.min(e.deltaY, 400);
                        this.bindTiming()
                    }
                }
            });
        },
        bindTiming: function () {
            this.isInAnimation = true;

            var footer = this.getEl(this.$refs.footer);
            var self = this;

            // should equal with timing duration
            var exit_origin = 't>300';

            var changed_y;
            var final_y;
            var translate_y_origin;
            var shouldDismiss = false;
            if (this.isBottomPosition) {
                //起始位置上拉
                if (self.y >= -self.confirm_y) {
                    //未达到确认距离，回复初始位置
                    shouldDismiss = false;
                    final_y = 0;
                    changed_y = 0 - self.y;
                    translate_y_origin = `easeOutElastic(t,${self.y},${changed_y},300)`
                } else {
                    shouldDismiss = true;
                    final_y = -self.final_height;
                    changed_y = -self.final_height - self.y;
                    translate_y_origin = `easeOutExpo(t,${self.y},${changed_y},300)`
                }
            } else {
                //上移后下拉
                if (self.y <= -self.final_height + self.confirm_y) {
                    //未达到确认距离，回复初始位置
                    shouldDismiss = false;
                    final_y = -self.final_height;
                    changed_y = -self.final_height - self.y;
                    translate_y_origin = `easeOutElastic(t,${self.y},${changed_y},300)`
                } else {
                    shouldDismiss = true;
                    final_y = 0;
                    changed_y = -self.y;
                    translate_y_origin = `easeOutExpo(t,${self.y},${changed_y},300)`
                }
            }

            var result = bindingx.bind({
                eventType: 'timing',
                exitExpression: exit_origin,
                props: [{
                    element: footer,
                    property: 'transform.translateY',
                    expression: translate_y_origin
                }
                ]

            }, function (e) {
                if (e.state === 'end' ||
                    e.state === 'exit') {
                    // reset x
                    self.y = final_y;
                    self.isInAnimation = false;

                    if (shouldDismiss) {
                        self.isBottomPosition = !self.isBottomPosition
                    }
                }
            });
        }
    },
    mounted() {
        let tempObj = JSON.parse(JSON.stringify(this.chartData))
        if (this.intervalHandler) {
            clearInterval(this.intervalHandler)
            this.intervalHandler = null
        } else {
            this.intervalHandler = setInterval(() => {
                tempObj.progressCounter += 6
                if (tempObj.progressCounter >= tempObj.totalCounter) {
                    tempObj.progressCounter = tempObj.totalCounter
                    clearInterval(this.intervalHandler)
                    this.intervalHandler = null
                }
                this.chartData = JSON.parse(JSON.stringify(tempObj))
            }, 1000);
        }
        this.bind();
    }
}
</script>


<style scoped>
.scroller {
    position: relative;
    flex: 1;
    overflow: hidden;
    background-image: linear-gradient(to bottom, #ffbb00, #ffaa10);
}
.progresscycle-wrapper {
    flex: 1;
    width: 750px;
    justify-content: flex-start;
    align-items: center;
    padding: 50px;
}
.progresscycle {
    width: 480px;
    height: 480px;
    justify-content: center;
    align-items: center;
}
.footer {
    position: absolute;
    left: 0px;
    bottom: -1000px;
    width: 750px;
    height: 1484px;
    background-color: #ffffff;
}
.tab-wrapper {
    height: 84px;
    border-color: #ececec;
    border-top-width: 1px;
    border-bottom-width: 1px;
}
.action-bar-group {
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
}
.action-sub-bar {
    width: 750px;
    flex-direction: row;
    justify-content: space-around;
    align-items: flex-start;
    flex-wrap: wrap;
}
.action-sub-bar-column {
    flex-direction: column;
}
.action-wrapper {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 200px;
    min-width: 177.5px;
    padding: 20px 0px;
}
.icon-wraper {
    position: relative;
    overflow: hidden;
    width: 88px;
    height: 88px;
}
.icon {
    width: 88px;
    height: 88px;
    background-color: #ffffff;
    opacity: 1;
}
.icon:active {
    width: 88px;
    height: 88px;
    opacity: 0;
}
.icon_actived {
    position: absolute;
    top: 0;
    left: 0;
    width: 88px;
    height: 88px;
}
.desc {
    font-family: PingFangSC-Regular;
    font-size: 25px;
    text-align: center;
    color: #333333;
    padding-top: 25px;
}
</style>