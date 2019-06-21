<template>
    <div class="app">
        <list class="list" ref="list">
            <refresh v-if="!isIos" @refresh="onrefresh" :display="refreshing ? 'show' : 'hide'">
            </refresh>
            <cell class="header-cell">
                <div class="header">
                    <div class="header_bg_wrapper" ref="title_img_wrapper">
                        <image ref="title_img" class="header_bg" src="https://gw.alicdn.com/tfs/TB1PDWiXSBYBeNjy0FeXXbnmFXa-1024-576.jpg" />
                    </div>
                </div>
            </cell>

            <cell v-for="c in 12">
                <div class="card_wrapper">
                    <div class="card_content" />
                </div>
            </cell>
        </list>
        <div v-if="!isIos" style="position:absolute;top:0px;left:0;" ref="title_img_wrapper1">
            <image ref="title_img1" class="header_bg" src="https://gw.alicdn.com/tfs/TB1PDWiXSBYBeNjy0FeXXbnmFXa-1024-576.jpg" />
        </div>

        <midea-header ref="app_bar" class="app_bar" title="滑动放缩图片" bgColor="transparent" @leftImgClick="back" :showRightImg="true" rightImg="../assets/img/smart_ic_reline@3x.png" @rightImgClick="reload"></midea-header>

    </div>
</template>

<style>
.app {
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: #e0e0e0;
}
.list {
    flex-direction: column;
    width: 750;
    background-color: #f2f3f4;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
}
.refresh {
    width: 750;
    height: 100px;
}
.indicator {
    margin-top: 16px;
    height: 40px;
    width: 40px;
    color: #0078ff;
}
.header_bg_wrapper {
    width: 750;
    height: 500;
}
.header_bg {
    position: relative;
    width: 750;
    height: 500;
}
.header-cell {
    overflow: visible;
}
.header {
    width: 750;
}
.header_card {
    margin-top: 330;
}
.app_bar {
    width: 750;
    position: absolute;
    top: 0;
}
.app_bar_bg {
    width: 750;
    height: 200;
    background-color: #03a9f4;
    position: absolute;
    top: 0;
    opacity: 0;
}
.card_wrapper {
    width: 750;
    height: 250;
    margin-top: 20;
    justify-content: center;
    align-items: center;
    background-color: transparent;
}
.card_content {
    border-radius: 25;
    width: 710;
    height: 250;
    background-color: #ffffff;
}
.nav_wrapper {
    width: 750;
    height: 100;
    align-items: center;
    background-color: transparent;
    flex-direction: row;
}
.nav_title {
    font-size: 35;
    font-weight: bold;
    margin-left: 250;
    color: #ffffff;
}
.nav_back {
    width: 40;
    margin-left: 20;
    height: 40;
}
.tab_wrapper_container {
    width: 750;
    height: 100;
    align-items: center;
    background-color: transparent;
    flex-direction: row;
}
.tab_wrapper {
    width: 125;
    height: 100;
    align-items: center;
    justify-content: center;
}
.tab {
    font-size: 25;
    color: #ffffff;
}
</style>

<script>
import Binding from 'weex-bindingx';
import base from '../base'
import nativeService from '../../common/services/nativeService';
const modal = weex.requireModule('modal')
module.exports = {
    mixins: [base],
    data() {
        return {
            fake_tabs: [
                'Tab1',
                'Tab2',
                'Tab3',
                'Tab4',
                'Tab5',
                'Tab6'
            ],
            cells: [1, 2, 3, 4, 5, 6, 7, 8, 9],
            refreshing: false,
        }
    },
    mounted() {
        let self = this;
        let list = this.getEl(self.$refs.list);
        let title_img_wrapper = this.getEl(self.$refs.title_img_wrapper);
        let title_img = this.getEl(self.$refs.title_img);
        let props = []
        if (!this.isIos) {
            let title_img_wrapper1 = this.getEl(self.$refs.title_img_wrapper1);
            let title_img1 = this.getEl(self.$refs.title_img1);
            props = [
                {
                    element: title_img_wrapper1,
                    property: "transform.scale",
                    expression: "(y>0)?0:((400-y)/400)"
                },
                {
                    element: title_img1,
                    property: "transform.scale",
                    expression: "(y>0)?0:((400-y)/400)"
                },
                {
                    element: title_img1,
                    property: "transform.translateY",
                    expression: "y>0?y:0"

                }
            ]
        }


        Binding.bind({
            eventType: 'scroll',
            anchor: list,
            props: [
                {
                    element: title_img,
                    property: "transform.scale",
                    expression: "(y>0)?1:((500-y)/500)"
                },
                {
                    element: title_img,
                    property: "transform.translateY",
                    expression: "y>0?0:y"

                },

                ...props
            ]
        }, function (e) {
        });
    },
    methods: {
        getEl: function (e) {
            return e.ref;
        },
        onrefresh(event) {
            this.refreshing = true
            setTimeout(() => {
                this.refreshing = false
            }, 100)
        }
    }
}
</script>