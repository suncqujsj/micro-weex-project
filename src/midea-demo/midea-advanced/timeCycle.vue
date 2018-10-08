<template>
    <div>
        <midea-header title="timeCycle时间转盘" :isImmersion="isImmersion" @leftImgClick="back" :showRightImg="true" rightImg="../assets/img/smart_ic_reline@3x.png" @rightImgClick="reload"></midea-header>

        <!-- <midea-title-bar title="时间:"></midea-title-bar>
        <textarea type="text" placeholder="Input Text" class="textarea" :value="messageParamString" @input="dataChange" rows=3 /> -->
        <div class="time-cycle">
            <div class="time-cycle-left">
                <image ref="leftImg" class="time-cycle-left-img" resize="contain" src="../assets/img/time_cycle_left.png"></image>
            </div>
            <div class="time-cycle-right">
                <image ref="rightImg" class="time-cycle-right-img" resize="contain" src="../assets/img/time_cycle_right.png"></image>
            </div>
        </div>
        <midea-button text="开始旋转" @mideaButtonClicked="mideaButtonClicked">
        </midea-button>
    </div>
</template>

<style scoped>
.time-cycle {
  width: 450px;
  margin-top: 20px;
  margin-left: 150px;
  margin-right: 150px;
  margin-bottom: 20px;
  height: 450px;
  flex-direction: row;
}
.time-cycle-left {
  flex: 1;
  overflow: hidden;
  background-color: aliceblue;
}
.time-cycle-left-img {
  height: 450px;
  width: 225px;
  right: -112.5px;
}
.time-cycle-right {
  flex: 1;
  overflow: hidden;
  background-color: aliceblue;
}
.time-cycle-right-img {
  height: 450px;
  width: 225px;
  left: -112.5px;
}
.display-text {
  font-size: 30px;
  margin-left: 10px;
  margin-right: 10px;
}
</style>
<script>  
import base from '../base'
import mideaHeader from '@/midea-component/header.vue'
import mideaButton from '@/midea-component/button.vue'
import nativeService from '@/common/services/nativeService'

const animation = weex.requireModule('animation')
const dom = weex.requireModule('dom')
export default {
    components: { mideaHeader, mideaButton },
    mixins: [base],
    data() {
        return {
            messageParam: 5
        }
    },
    computed: {
        messageParamString() {
            return JSON.stringify(this.messageParam)
        }
    },
    methods: {
        dataChange(event) {
            try {
                this.messageParam = event.value
            } catch (error) {
            }
        },
        mideaButtonClicked() {
            let halfDuration = this.messageParam / 2
            this.move(halfDuration)
        },
        move(duration, position = 'rightImg') {
            let imgEl = this.$refs[position];
            animation.transition(imgEl, {
                styles: {
                    transform: 'rotate(180deg)',
                    // transform: 'rotate(100)',
                    // transform: 'rotate("' + 360 + 'deg")',
                    transformOrigin: 'center center'
                },
                duration: duration * 1000, //ms
                timingFunction: 'linear',
                delay: 0 //ms
            }, () => {
                if (position == 'rightImg') {
                    this.move(duration, 'leftImg')
                }
            })
        }
    },
}
</script>