<template>
    <div>
        <midea-header title="bindingx" :isImmersion="isImmersion" @leftImgClick="back" :showRightImg="true" rightImg="../assets/img/smart_ic_reline@3x.png" @rightImgClick="reload"></midea-header>
        <div style="height:100px;">
            <text class="display-text">bindingX演示 (请使用桌面浏览器打开)</text>
            <text class="display-link" @click="openWeb('https://alibaba.github.io/bindingx/demos')">https://alibaba.github.io/bindingx/demos</text>
        </div>
        <midea-button text="抖动远球" type="primary" @mideaButtonClicked="bindTime">
        </midea-button>
        <div style="flex:1;background-color:yellow;">
            <div ref="card" style="background-color:#6A1B9A;width:0;height:0.1;margin-left:-300;margin-top:-300" />
            <div ref="btn" class="card" style="background-color:#00ff00" @click="clickBtn" />
        </div>
    </div>
</template>

<style scoped>
.card {
  width: 100px;
  height: 100px;
  position: absolute;
  border-radius: 50px;
  top: 0px;
}
.display-text {
  font-size: 30px;
  margin-left: 10px;
  margin-right: 10px;
}
.display-link {
  font-size: 30px;
  margin-left: 10px;
  margin-right: 10px;
  color: blue;
  text-decoration: blue;
}
</style>
<script>  
import base from '../base'
import mideaHeader from '@/midea-component/header.vue'
import nativeService from '@/common/services/nativeService'
import mideaButton from '@/midea-component/button.vue'

import Binding from 'weex-bindingx';
export default {
    components: {
        mideaButton
    },
    mixins: [base],
    data() {
        return {
        }
    },
    methods: {
        openWeb(url) {
            nativeService.weexBundleToWeb({
                url: url,
                title: "bindingx"
            })
        },
        getEl: function (e) {
            return e.ref;
        },
        clickBtn: function () {
            let card = this.getEl(this.$refs.card);
            let duration = 700;
            let radius = 1800;

            Binding.bind({
                eventType: 'timing',
                exitExpression: {
                    origin: `t>${duration}`
                },
                props: [{
                    element: card,
                    property: 'border-top-right-radius',
                    expression: {
                        origin: `easeInOutQuint(t,0,${radius},${duration})`
                    }
                },
                {
                    element: card,
                    property: 'border-bottom-left-radius',
                    expression: {
                        origin: `easeInOutQuint(t,0,${radius},${duration})`
                    }
                },
                {
                    element: card,
                    property: 'border-bottom-right-radius',
                    expression: {
                        origin: `easeInOutQuint(t,0,${radius},${duration})`
                    }
                },
                {
                    element: card,
                    property: 'width',
                    expression: {
                        origin: `easeInOutQuint(t,0,${radius},${duration})`
                    }
                },
                {
                    element: card,
                    property: 'height',
                    expression: {
                        origin: `easeInOutQuint(t,0,${radius},${duration})`
                    }
                }
                ]

            });

        },
        bindTime(){
            let btn = this.getEl(this.$refs.btn);
            let duration = 400;

            Binding.bind({
                eventType: 'timing',
                exitExpression: {
                    origin: `t>${duration}`
                },
                props: [{
                    element: btn,
                    property: 'transform.scale',
                    expression: {
                        origin: `easeOutBounce(t,0,0.2-1.2,${duration})`
                    }
                }
                ]

            });
        }
    },
    mounted() {
    }
}
</script>