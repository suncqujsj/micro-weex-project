<template>
    <div class="switch-container" :style="{'width': width+'px', 'height':height+'px'}" @click="onchange" v-on:swipe="onSwipe($event)">
        <div class="switch-bar" :style="{'width': width+'px', 'height':height+'px'}">
            <div :class="['container', isChecked?'selected':'unselected']" :style="{'width':(width-4)+'px'}"></div>
            <image ref="switchBar" class="switch-icon" :src="icon" resize='contain' :style="{'width':height+'px','height':height+'px', 'left':width-height+2+'px'}"></image>
        </div>
    </div>
</template>

<script>
const animation = weex.requireModule('animation')
const modal = weex.requireModule('modal')
export default {
    props: {
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
            return this.isChecked ? this.iconOn : this.iconOff;
        }
    },
    data() {
        return {
            isChecked: false
        }
    },
    watch: {
        checked(value) {
            this.isChecked = this.checked
            this.updateIcon()
        }
    },
    methods: {
        switchValue(value) {
            if (value != undefined) {
                this.isChecked = value
                this.updateIcon()
            } else {
                this.onchange()
            }
        },
        onSwipe(event) {
            if (this.isChecked && event.direction == 'left') {
                this.onchange()
            } else if (!this.isChecked && event.direction == 'right') {
                this.onchange()
            }
        },
        onchange(event) {
            this.isChecked = !this.isChecked
            this.updateIcon()

            this.$emit('change', { value: this.isChecked })
        },
        updateIcon(durationTime = 100) {
            var switchBar = this.$refs.switchBar;
            if (this.isChecked) {
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
    },
    created() {
        this.isChecked = this.checked
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
