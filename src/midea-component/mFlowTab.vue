<template>
    <div class="wrapper">
        <scroller show-scrollbar="false" scroll-direction="horizontal" class="scroller">
            <div class="scroller-wrapper" :style="{width:tabsWidth}" ref="test">
                <div class="tab-wrapper">
                    <div :ref="'text'+index" :style="{width:tabWidth}" v-for="(item,index) in tabArray" class="tab-item" @click="tabClicked(index)">
                        <text class="tab-txt" :class="[item.selected?'tab-txt-selected':'']">{{item.name}}</text>
                    </div>
                </div>
                <div ref="indicator" class="tab-indicator" :style="{width:tabWidth}">
                </div>
            </div>
        </scroller>
    </div>
</template>

<style>
.wrapper {
  background-color: #ffffff;
  padding: 0px;
  margin: 0px;
}
.scroller {
  height: 84px;
  display: flex;
  flex-direction: column;
}
.scroller-wrapper {
  height: 84px;
  display: flex;
  flex-direction: column;
}
.tab-wrapper {
  display: flex;
  flex-direction: row;
  height: 84px;
  background-color: #ffffff;
}
.tab-item {
  align-items: center;
  justify-content: center;
  text-align: center;
}
.tab-txt {
  font-family: PingFangSC-Medium;
  font-size: 32px;
  line-height: 45px;
  color: #666666;
}
.tab-txt-selected {
  color: #000000;
}
.tab-indicator {
  border-top-style: solid;
  border-top-color: #000000;
  border-top-width: 2px;
  position: relative;
  top: -4px;
}
</style>

<script>
const modal = weex.requireModule('modal');
const dom = weex.requireModule('dom');
const animation = weex.requireModule('animation');
export default {
    name: 'mideaFlowTab',
    props: {
        tabArray: {
            type: Array
        },
        fixedWidth: {
            type: Number,
            default: 150
        }
    },
    methods: {
        tabClicked(index) {
            var len = this.tabArray.length;
            for (var i = 0; i < this.tabArray.length; i++) {
                this.tabArray[i].selected = false;
            }
            Vue.set(this.tabArray[index], "selected", true);
            var xDis = index * (750 / len) + "px";
            if (len > 5) {
                xDis = index * this.fixedWidth + "px";
            }
            var ref = this.$refs.indicator;
            animation.transition(ref, {
                styles: {
                    transform: 'translate(' + xDis + ',0px)',
                    transformOrigin: 'center center'
                },
                duration: 250, //ms
                timingFunction: 'ease',
                delay: 0 //ms
            }, function () {

            });
            var elName = "text" + index;
            var el = this.$refs[elName][0];
            dom.scrollToElement(el, { offset: 0 })
            this.$emit('tabClicked', index);
        }
    },
    data: function () {
        return {

        }
    },
    created() {
        var len = this.tabArray.length;
        this.tabsWidth = "750px";
        if (this.fixedWidth * len > 750) {
            this.tabWidth = this.fixedWidth + "px";
            this.tabsWidth = this.fixedWidth * len + "px";
        } else {
            this.tabWidth = (750 / len) + "px";
        }
    }
}
</script>




