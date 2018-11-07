<template>
    <div class="midea-progress" :style="progressWrapperStyle">
        <div class="progress" :style="progressStyle"></div>
    </div>
</template>

<style scoped>
.midea-progress {
  position: relative;
  background-color: #dfe5ef;
}
</style>

<script>
export default {
    props: {
        barStartColor: {
            type: String,
            default: '#7ECEF4'
        },
        needGradient: {
            type: Boolean,
            default: false
        },
        barEndColor: {
            type: String,
            default: '#0e90ff'
        },
        barColor: {
            type: String,
            default: '#0e90ff'
        },
        barWidth: {
            type: Number,
            default: 600
        },
        barHeight: {
            type: Number,
            default: 10
        },
        value: {
            type: Number,
            default: 0
        },
        isRadius: {
            type: Boolean,
            default: true
        }
    },
    computed: {
        progressWrapperStyle() {
            const { barWidth, barHeight } = this;
            return {
                width: barWidth + 'px',
                height: barHeight + 'px',
                borderRadius: this.isRadius ? barHeight / 2 + 'px' : '0px'
            }
        },
        progressStyle() {
            const { value, barWidth, barHeight, needGradient, barColor, barStartColor, barEndColor } = this;
            const newValue = value < 0 ? 0 : (value > 100 ? 100 : value);
            var obj = {};
            if (needGradient) {
                obj.backgroundImage = "linear-gradient(to right," + barStartColor + "," + barEndColor + ")";
            } else {
                obj.backgroundColor = barColor;
            }
            return {
                ...obj,
                borderRadius:  this.isRadius ? barHeight / 2 + '0px' : '0px',
                height: barHeight + 'px',
                width: newValue / 100 * barWidth + 'px'
            }
        }
    }
}
</script>
