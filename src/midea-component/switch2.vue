<template>
    <div class="switch-container" :style="{'width': width+'px', 'height':height+'px'}" @click="onchange" v-on:swipe="onSwipe($event)">
        <div class="switch-bar" :style="{'width': width+'px', 'height':height+'px'}">
            <div :class="['container', checked?'selected':'unselected']" :style="{'width':(width-2)+'px'}"></div>
            <!-- <div class="container unselected" :style="{'width':width}"></div> -->
            <image ref="switchBar" class="switch-icon" :src="icon" resize='contain' :style="{'width':height+'px','height':height+'px', 'left':width-height+2+'px'}"></image>
        </div>
    </div>
</template>

<script>
const animation = weex.requireModule('animation')
const modal = weex.requireModule('modal')
export default {
    props: {
        value: {
            type: Number,
            default: -1
        },
        // 是否选中
        iconOn: {
            type: String,
            default: './img/smart_ic_switch_l@2x.png'
        },
        iconOff: {
            type: String,
            default: './img/smart_ic_switch_l@2x.png'
        },
        width: {
            type: String,
            default: '106',
        },
        height: {
            type: String,
            default: '48',
        },
        checked: {
            type: Boolean,
            default: false
        }

    },
    computed: {
        icon() {
            return this.checked ? this.iconOn : this.iconOff;
        }
    },
    data() {
        return {
        }
    },
    watch: {
        checked(value) {
            this.updateIcon()
        }
    },
    methods: {
        onSwipe(event) {
            if (this.checked && event.direction == 'left') {
                this.onchange()
            } else if (!this.checked && event.direction == 'right') {
                this.onchange()
            }
        },
        onchange(event) {
            this.checked = !this.checked
            this.updateIcon()

            this.$emit('change', { value: this.checked })
        },
        updateIcon(durationTime = 100) {
            var switchBar = this.$refs.switchBar;
            if (this.checked) {
                animation.transition(switchBar, {
                    styles: {
                        transform: 'translateX(0px)'
                    },
                    duration: durationTime, //ms
                    timingFunction: 'linear',
                    delay: 0 //ms
                }, () => {
                })
            } else {
                animation.transition(switchBar, {
                    styles: {
                        transform: 'translateX(' + (-(this.width - this.height + 4)) + 'px)'
                    },
                    duration: durationTime, //ms
                    timingFunction: 'linear',
                    delay: 0 //ms
                }, () => {
                })
            }
        }

    },
    mounted() {
        this.updateIcon(0)
    }
}
</script>

<style scoped>
.switch-container {
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.switch-bar {
  position: relative;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.container {
  border-radius: 20px;
  height: 10px;
}
.selected {
  background-color: #267aff;
}
.unselected {
  background-color: #e5e5e8;
}
.switch-icon {
  position: absolute;
  top: 0;
}
</style>
