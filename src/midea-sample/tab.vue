<template>
    <div class="wrapper">
        <midea-header title="Tab" :isImmersion="false" @leftImgClick="back"></midea-header>
        <div style="background-color:#FFF;padding:24px;border-bottom-width:1px;border-bottom-color:#e2e2e2">
            <text style="font-size:28px">导航Tab</text>
        </div>
        <midea-tab ref="mTab" :tabArray="tabData" @tabClicked="tabClicked">
        </midea-tab>
        <div style="background-color:#FFF;padding:24px;border-bottom-width:1px;border-bottom-color:#e2e2e2">
            <text style="font-size:28px">可横向滑动的导航Tab</text>
        </div>
        <midea-flow-tab ref="flowTab" :tabArray="flowTabData" @tabClicked="flowTabClicked">
        </midea-flow-tab>
        <slider :value="val" :index="index" @change="changeArea" class="slider" auto-play="false">
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
.device-list {
  width: 750px;
  position: relative;
}
.slider {
  width: 750px;
  height: 800px;
}
</style>
<script> 
import base from './base'

import mideaTab from '@/midea-component/mTab.vue'
import mideaFlowTab from '@/midea-component/mFlowTab.vue'
const modal = weex.requireModule('modal');

module.exports = {
    components: { mideaTab, mideaFlowTab },
    mixins: [base],
    data() {
        return {
            tabData: [
                { "name": "一次性密码", "selected": true },
                { "name": "日志", "selected": false }
            ],
            flowTabData: [
                { "name": "客厅", "selected": true },
                { "name": "厨房", "selected": false },
                { "name": "卧室一", "selected": false },
                { "name": "卧室二", "selected": false },
                { "name": "卧室三", "selected": false },
                { "name": "阳台", "selected": false },
                { "name": "厕所", "selected": false }
            ],
            val: 0,
            index: 0
        }
    },
    methods: {
        tabClicked(tabIndex) {
        },
        flowTabClicked(tabIndex) {
            var self = this;
            this.index = tabIndex;
        },
        changeArea(sliObj) {
            var sliderIndex = sliObj.index;
            this.$refs.flowTab.tabClicked(sliderIndex);
            //modal.toast({ message:'index:'+val.index, duration: 1 })
        }

    },
    created() {
        //this.isIos = weex.config.env.platform == 'iOS' ? true : false;
    }
};
</script>