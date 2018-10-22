<template>
    <div class="accordion-wrapper">
        <div class="accordion-item" @click="makeSwitch">
            <text class="accordion-title">{{title}}</text>
            <text v-if="value" class="accordion-value">{{value}}{{unit}}</text>
            <image v-if="!hideArrow" class="accordion-icon" :src="isFoldedStatus?foldIcon:unfoldIcon"></image>
            <slot v-if="hideArrow" name="right"></slot>
        </div>
        <div v-if="!isFoldedStatus">
            <slot name="content"></slot>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            title: "",
            index: {
                type: Number,
                default: -1
            },
            value: {
                type: Number,
                default: 0
            },
            unit: {
                type:String,
                default:''
            },
            hideArrow: {
                type: Boolean,
                default: false
            },
            isFolded: {
                type: Boolean,
                default: true
            }
        },
        watch: {
            isFolded(value) {
                this.isFoldedStatus = value
            }
        },
        data() {
            return {
                unfoldIcon: '../img/service_ic_show@3x.png',
                foldIcon: '../img/service_ic_hide@3x.png',
                isFoldedStatus: this.isFolded
            }
        },
        methods: {
            makeSwitch(e) {
                this.isFoldedStatus = !this.isFoldedStatus;
                if(this.index === -1) return;
                this.$emit('callback', this.index, this.isFoldedStatus);
            }
        }
    }
</script>

<style>
    .accordion-wrapper {
        padding-left: 32px;
    }
    .accordion-item {
        align-items: center;
        justify-content: space-between;
        flex-direction: row;
        height: 92px;
        border-bottom-color: #e5e5e8;
        border-bottom-width: 1px;
    }
    .accordion-title {
        flex: 1;
        font-size: 32px;
        color: #000000;
    }
    .accordion-value{
        font-size: 28px;
        color:#666;
        margin-right: 16px;
    }
    .accordion-icon {
        height: 40px;
        width: 40px;
        margin-right: 24px;
    }
</style>