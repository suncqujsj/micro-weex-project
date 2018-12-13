<template>
    <div class="wrapper">
        <midea-header title="Tab" :isImmersion="isImmersion" @leftImgClick="back" :showRightImg="true" rightImg="../assets/img/smart_ic_reline@3x.png" @rightImgClick="reload"></midea-header>
        <div style="background-color:#FFF;padding:24px;border-bottom-width:1px;border-bottom-color:#e2e2e2">
            <text style="font-size:28px">导航Tab</text>
        </div>
        <midea-tab ref="mTab" :tabArray="tabData" @tabClicked="tabClicked">
        </midea-tab>
        <slider :value="indexA" :index="indexA" @change="changeAreaA" class="sliderA" :infinite="isIos?true:false" auto-play="false">
            <div class="device-listA">
                <midea-cell title="门磁传感器5" :hasArrow="true" :clickActivied="true" itemImg="http://tmp666.oss-cn-shenzhen.aliyuncs.com/img/icon/midea.magnet.001.png">
                </midea-cell>
                <midea-cell title="红外探测器5" :hasArrow="true" :clickActivied="true" itemImg="http://tmp666.oss-cn-shenzhen.aliyuncs.com/img/icon/midea.ir.001.png">
                </midea-cell>
            </div>
            <div class="device-listA">
                <midea-cell title="门磁传感器6" :hasArrow="true" :clickActivied="true" itemImg="http://tmp666.oss-cn-shenzhen.aliyuncs.com/img/icon/midea.magnet.001.png">
                </midea-cell>
                <midea-cell title="红外探测器6" :hasArrow="true" :clickActivied="true" itemImg="http://tmp666.oss-cn-shenzhen.aliyuncs.com/img/icon/midea.ir.001.png">
                </midea-cell>
            </div>
        </slider>
        <div style="background-color:#FFF;padding:24px;border-bottom-width:1px;border-bottom-color:#e2e2e2">
            <text style="font-size:28px">导航Tab(不可滑动)</text>
        </div>
        <midea-tab ref="mTabB" :tabArray="tabDataB" @tabClicked="tabClickedB">
        </midea-tab>
        <slider :value="indexB" :index="indexB" @change="changeAreaB" class="sliderB" :infinite="isIos?true:false" auto-play="false">
            <div v-if="indexB==0" class="device-listA">
                <midea-cell title="门磁传感器5" :hasArrow="true" :clickActivied="true" itemImg="http://tmp666.oss-cn-shenzhen.aliyuncs.com/img/icon/midea.magnet.001.png">
                </midea-cell>
                <midea-cell title="红外探测器5" :hasArrow="true" :clickActivied="true" itemImg="http://tmp666.oss-cn-shenzhen.aliyuncs.com/img/icon/midea.ir.001.png">
                </midea-cell>
            </div>
            <div v-if="indexB==1" class="device-listA">
                <midea-cell title="门磁传感器6" :hasArrow="true" :clickActivied="true" itemImg="http://tmp666.oss-cn-shenzhen.aliyuncs.com/img/icon/midea.magnet.001.png">
                </midea-cell>
                <midea-cell title="红外探测器6" :hasArrow="true" :clickActivied="true" itemImg="http://tmp666.oss-cn-shenzhen.aliyuncs.com/img/icon/midea.ir.001.png">
                </midea-cell>
            </div>
        </slider>
        <div style="background-color:#FFF;padding:24px;border-bottom-width:1px;border-bottom-color:#e2e2e2">
            <text style="font-size:28px">定义tab宽度，可横向滑动的导航Tab</text>
        </div>
        <midea-flow-tab ref="flowTab" :tabArray="flowTabData" :fixedWidth="150" @tabClicked="flowTabClicked">
        </midea-flow-tab>
        <slider :value="index" :index="index" @change="changeArea" class="slider" auto-play="false">
            <div class="device-list">
                <scroller>
                    <midea-cell title="烟雾传感器1" :hasArrow="true" :clickActivied="true" itemImg="http://tmp666.oss-cn-shenzhen.aliyuncs.com/img/icon/midea.env.002.png">
                    </midea-cell>
                    <midea-cell title="一路开关面板" :hasArrow="true" :clickActivied="true" itemImg="http://tmp666.oss-cn-shenzhen.aliyuncs.com/img/icon/jiayun.switch.001.png">
                    </midea-cell>
                    <midea-cell title="烟雾传感器1" :hasArrow="true" :clickActivied="true" itemImg="http://tmp666.oss-cn-shenzhen.aliyuncs.com/img/icon/midea.env.002.png">
                    </midea-cell>
                    <midea-cell title="一路开关面板" :hasArrow="true" :clickActivied="true" itemImg="http://tmp666.oss-cn-shenzhen.aliyuncs.com/img/icon/jiayun.switch.001.png">
                    </midea-cell>
                    <midea-cell title="烟雾传感器1" :hasArrow="true" :clickActivied="true" itemImg="http://tmp666.oss-cn-shenzhen.aliyuncs.com/img/icon/midea.env.002.png">
                    </midea-cell>
                    <midea-cell title="一路开关面板" :hasArrow="true" :clickActivied="true" itemImg="http://tmp666.oss-cn-shenzhen.aliyuncs.com/img/icon/jiayun.switch.001.png">
                    </midea-cell>
                    <midea-cell title="烟雾传感器1" :hasArrow="true" :clickActivied="true" itemImg="http://tmp666.oss-cn-shenzhen.aliyuncs.com/img/icon/midea.env.002.png">
                    </midea-cell>
                    <midea-cell title="一路开关面板" :hasArrow="true" :clickActivied="true" itemImg="http://tmp666.oss-cn-shenzhen.aliyuncs.com/img/icon/jiayun.switch.001.png">
                    </midea-cell>
                    <midea-cell title="烟雾传感器1" :hasArrow="true" :clickActivied="true" itemImg="http://tmp666.oss-cn-shenzhen.aliyuncs.com/img/icon/midea.env.002.png">
                    </midea-cell>
                    <midea-cell title="一路开关面板" :hasArrow="true" :clickActivied="true" itemImg="http://tmp666.oss-cn-shenzhen.aliyuncs.com/img/icon/jiayun.switch.001.png">
                    </midea-cell>
                    <midea-cell title="烟雾传感器1" :hasArrow="true" :clickActivied="true" itemImg="http://tmp666.oss-cn-shenzhen.aliyuncs.com/img/icon/midea.env.002.png">
                    </midea-cell>
                    <midea-cell title="一路开关面板" :hasArrow="true" :clickActivied="true" itemImg="http://tmp666.oss-cn-shenzhen.aliyuncs.com/img/icon/jiayun.switch.001.png">
                    </midea-cell>
                    <midea-cell title="烟雾传感器1" :hasArrow="true" :clickActivied="true" itemImg="http://tmp666.oss-cn-shenzhen.aliyuncs.com/img/icon/midea.env.002.png">
                    </midea-cell>
                    <midea-cell title="一路开关面板last" :hasArrow="true" :clickActivied="true" itemImg="http://tmp666.oss-cn-shenzhen.aliyuncs.com/img/icon/jiayun.switch.001.png">
                    </midea-cell>
                </scroller>
            </div>
            <div class="device-list">
                <midea-cell title="二路开关面板2" :hasArrow="true" :clickActivied="true" itemImg="http://tmp666.oss-cn-shenzhen.aliyuncs.com/img/icon/midea.switch.002.png">
                </midea-cell>
                <midea-cell title="四路开关面板" :hasArrow="true" :clickActivied="true" itemImg="http://tmp666.oss-cn-shenzhen.aliyuncs.com/img/icon/jiayun.switch.004.png">
                </midea-cell>
                <midea-cell title="烟雾传感器1" :hasArrow="true" :clickActivied="true" itemImg="http://tmp666.oss-cn-shenzhen.aliyuncs.com/img/icon/midea.env.002.png">
                </midea-cell>
                <midea-cell title="一路开关面板" :hasArrow="true" :clickActivied="true" itemImg="http://tmp666.oss-cn-shenzhen.aliyuncs.com/img/icon/jiayun.switch.001.png">
                </midea-cell>
                <midea-cell title="门磁传感器3" :hasArrow="true" :clickActivied="true" itemImg="http://tmp666.oss-cn-shenzhen.aliyuncs.com/img/icon/midea.magnet.001.png">
                </midea-cell>
                <midea-cell title="红外探测器" :hasArrow="true" :clickActivied="true" itemImg="http://tmp666.oss-cn-shenzhen.aliyuncs.com/img/icon/midea.ir.001.png">
                </midea-cell>
            </div>
            <div class="device-list">
                <midea-cell title="门磁传感器3" :hasArrow="true" :clickActivied="true" itemImg="http://tmp666.oss-cn-shenzhen.aliyuncs.com/img/icon/midea.magnet.001.png">
                </midea-cell>
                <midea-cell title="红外探测器" :hasArrow="true" :clickActivied="true" itemImg="http://tmp666.oss-cn-shenzhen.aliyuncs.com/img/icon/midea.ir.001.png">
                </midea-cell>
            </div>
            <div class="device-list">
                <midea-cell title="门磁传感器4" :hasArrow="true" :clickActivied="true" itemImg="http://tmp666.oss-cn-shenzhen.aliyuncs.com/img/icon/midea.magnet.001.png">
                </midea-cell>
                <midea-cell title="红外探测器4" :hasArrow="true" :clickActivied="true" itemImg="http://tmp666.oss-cn-shenzhen.aliyuncs.com/img/icon/midea.ir.001.png">
                </midea-cell>
            </div>
            <div class="device-list">
                <midea-cell title="门磁传感器5" :hasArrow="true" :clickActivied="true" itemImg="http://tmp666.oss-cn-shenzhen.aliyuncs.com/img/icon/midea.magnet.001.png">
                </midea-cell>
                <midea-cell title="红外探测器5" :hasArrow="true" :clickActivied="true" itemImg="http://tmp666.oss-cn-shenzhen.aliyuncs.com/img/icon/midea.ir.001.png">
                </midea-cell>
            </div>
            <div class="device-list">
                <midea-cell title="门磁传感器6" :hasArrow="true" :clickActivied="true" itemImg="http://tmp666.oss-cn-shenzhen.aliyuncs.com/img/icon/midea.magnet.001.png">
                </midea-cell>
                <midea-cell title="红外探测器6" :hasArrow="true" :clickActivied="true" itemImg="http://tmp666.oss-cn-shenzhen.aliyuncs.com/img/icon/midea.ir.001.png">
                </midea-cell>
            </div>

        </slider>
    </div>
</template>
<style scoped>
.wrapper {
  position: relative;
}
.sliderA {
  width: 750px;
  height: 200px;
}
.sliderB {
  width: 750px;
  height: 200px;
}
.device-listA {
  position: relative;
  width: 750px;
  height: 300px;
}
.device-list {
  position: relative;
  width: 750px;
}
.slider {
  flex: 1;
  width: 750px;
}
</style>
<script> 
import base from '../base'

import mideaTab from '@/midea-component/mTab.vue'
import mideaFlowTab from '@/midea-component/mFlowTab.vue'
import mideaCell from '@/component/cell.vue'
const modal = weex.requireModule('modal');

module.exports = {
    components: { mideaTab, mideaFlowTab, mideaCell },
    mixins: [base],
    data() {
        return {
            tabData: [
                { "name": "一次性密码", "selected": true },
                { "name": "日志", "selected": false }
            ],
            tabDataB: [
                { "name": "一次性密码", "selected": true },
                { "name": "日志", "selected": false }
            ],
            flowTabData: [
                { "name": "客厅", "selected": true },
                { "name": "厨房", "selected": false },
                { "name": "卧室一", "selected": false },
                { "name": "卧室二", "selected": false },
                { "name": "卧室三", "selected": false },
                { "name": "阳台", "selected": false }
            ],
            index: 0,
            indexA: 0,
            indexB: 0
        }
    },
    methods: {
        tabClicked(tabIndex) {
            this.indexA = tabIndex;
        },
        changeAreaA(sliObj) {
            var sliderIndex = sliObj.index;
            this.$refs.mTab.tabClicked(sliderIndex);
        },
        tabClickedB(tabIndex) {
            this.indexB = tabIndex;
        },
        changeAreaB(sliObj) {
            var sliderIndex = sliObj.index;
            this.$refs.mTabB.tabClicked(sliderIndex);
        },
        flowTabClicked(tabIndex) {
            this.index = tabIndex;
        },
        changeArea(sliObj) {
            var sliderIndex = sliObj.index;
            this.$refs.flowTab.tabClicked(sliderIndex);
        }

    },
    created() {
        //this.isIos = weex.config.env.platform == 'iOS' ? true : false;
    }
};
</script>