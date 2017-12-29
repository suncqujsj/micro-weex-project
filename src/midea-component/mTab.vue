<template>
    <div class="wrapper">
        <div class="tab-wrapper">
            <div v-for="(item,index) in tabArray" :key="index" class="tab-item" @click="tabClicked(index)">
                <text class="tab-txt" :class="[item.selected?'tab-txt-selected':'']">{{item.name}}</text>
            </div>
        </div>
        <div class="indicator-wrapper" ref="indicator">
            <div class="tab-indicator" :style="{width:indicatorWidth}">
            </div>
        </div>
    </div>
</template>

<style>
.wrapper {
  background-color: #fff;
  padding: 0px;
  margin: 0px;
  display: flex;
}
.tab-wrapper {
  width: 750px;
  flex-direction: row;
  height: 84px;
  background-color: #ffffff;
}
.tab-item {
  flex: 1;
  color: #333;
  align-items: center;
  justify-content: center;
  text-align: center;
}
.tab-txt {
  font-size: 32px;
  line-height: 45px;
}
.tab-txt-selected {
  color: #0e90ff;
}
.tab-indicator {
  border-top-style: solid;
  border-top-color: #0e90ff;
  border-top-width: 2px;
  position: relative;
  align-items: center;
}
.indicator-wrapper {
  width: 375px;
  align-items: center;
  justify-content: center;
  top: -4px;
}
</style>

<script>
const modal = weex.requireModule('modal');
const animation = weex.requireModule('animation');
export default {
    name: 'mideaTab',
    props: {
        tabArray: {
            type: Array
        }
    },
    methods: {
        tabClicked(index) {
            var len = this.tabArray.length;
            for (var i = 0; i < this.tabArray.length; i++) {
                this.tabArray[i].selected = false;
            }
            Vue.set(this.tabArray[index], "selected", true);
            var strLen = this.tabArray[index].name.length;
            this.indicatorWidth = (strLen * 28 + 20) + "px";
            var xDis = index * (750 / len) + "px";
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
            this.$emit('tabClicked', index)
        }
    },
    data: function () {
        return {
            indicatorWidth: 0
        }
    },
    created() {
        var len = this.tabArray[0].name.length;
        this.indicatorWidth = (len * 28 + 20) + "px";
    }
}
</script>

