<template>
    <div>
        <text :style="tipStyle" class="tip-txt" v-if="!showTip">{{tipTxt}}</text>
        <midea-seek-bar :max="max" :min="min" :value="value" :unit="unit" :showTip="showTip" :step="step" :axisH="axisH" :pointH="pointH" :pointColor='pointColor' :axisColor='axisColor' :axisBgColor="axisBgColor" :disable='disable' @slideChange="slideChange" @slideEnd="slideEnd"></midea-seek-bar>
    </div>
</template>
<style scoped>
.tip-txt {
}
</style>
<script>
import nativeService from '../common/services/nativeService'
export default {
    components: {},
    props: {
        max: {
            type: [String, Number],
            default: '100'
        },
        min: {
            type: [String, Number],
            default: '0'
        },
        value: {
            type: [String, Number],
            default: '50'
        },
        step: {
            type: [String, Number],
            default: '1'
        },
        index: {
            type: [String, Number],
            default: '0'
        },
        attr: {
            type: String,
            default: 'level'
        },
        axisH: {
            type: [String, Number],
            default: '4'
        },
        pointH: {
            type: [String, Number],
            default: '20'
        },
        pointColor: {
            type: String,
            default: '#5d75f6'
        },
        axisColor: {
            type: String,
            default: '#DFE5E7'
        },
        axisBgColor: {
            type: String,
            default: '#5d75f6'
        },
        showTip: {
            type: Boolean,
            default: false
        },
        tipTxt: {
            type: String,
            default: ''
        },
        tipColor: {
            type: String,
            default: '#267AFF'
        },
        tipPadding: {
            type: String,
            default: '60px'
        },
        tipFontSize: {
            type: String,
            default: '46px'
        },
        tipAlign: {
            type: String,
            default: 'center'
        },
        unit: {
            type: String,
            default: ''
        },
        disable: {
        	type: Boolean,
            default: false
        }
    },
    data: () => ({}),
    computed: {
        tipStyle() {
            const { tipColor, tipFontSize, tipAlign, tipPadding } = this;
            return {
                'color': tipColor,
                'font-size': tipFontSize,
                'text-align': tipAlign,
                'padding': tipPadding

            }
        }
    },
    methods: {
        slideEnd(event) {
            const { unit, attr, index } = this;
            this.$emit('slideEnd', { value: event.value, attr: attr, index: index });
            if (this.showTip == false) {
                this.$emit('tipFormat', { value: event.value, attr: attr, index: index });
            }
        },
        slideChange(event) {
            const { unit, attr, index } = this;
            this.$emit('slideChange', { value: event.value, attr: attr, index: index });
            if (this.showTip == false) {
                this.$emit('tipFormat', { value: event.value, attr: attr, index: index });
            }
        }
    },
    created() {
        if (this.showTip == false) {
            this.$emit('tipFormat', { value: this.value });
        }

    }
}
</script>