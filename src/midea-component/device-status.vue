<template>
    <div style="width: 750px;">
        <div class="device-status-wrapper">
            <div class="mainStatus-wrapper">
                <image class="device-image" :src="deviceImg"></image>
                <div class="mainStatus">
                    <text class="mainStatus-value" :style="{color: mainStatusColor,fontSize: mainStatusFontSize}">{{mainStatus}}</text>
                    <text class="mainStatus-unit" :style="{color: unitColor,fontSize: unitFontSize}">{{unit}}</text>
                </div>
            </div>
            <div class="container">
                <div class="subStatus-wrapper" v-if="showSubStatus">
                    <slot name="line1"></slot>
                    <slot name="line2"></slot>
                </div>
                <div class="device-tip-wrapper" v-if="deviceTip">
                    <div class="device-tip-container">
                        <text class="device-tip">{{deviceTip}}</text>
                        <image class="delete-icon" :src="deleteIcon" @click="hideDeviceTip"></image>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .device-status-wrapper {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: space-between;
        align-items: flex-start;
        padding-top: 22px;
        padding-left: 20px;
        padding-right: 20px;
    }

    .mainStatus-wrapper {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: space-between;
        align-items: center;
        height: 64px;
    }

    .device-image {
        width: 58px;
        height: 64px;
    }

    .mainStatus {
        padding-left: 26px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: flex-start;
    }

    .mainStatus-value {
        font-size: 86px;
        height: 64px;
        line-height: 64px;
        align-self: flex-start;
    }

    .mainStatus-unit {
        font-size: 20px;
        align-self: flex-start;
    }

    .container {
        display: flex;
        flex-direction: column;
    }

    .subStatus-wrapper {
        display: flex;
        flex-direction: column;
        flex-wrap: nowrap;
        justify-content: space-between;
        align-items: flex-end;
        line-height: 42px;
        margin-bottom: 20px;
    }

    .device-tip-wrapper {
        display: flex;
        flex-direction: row-reverse;
    }

    .device-tip-container {
        align-self: flex-end;
        color: #ffffff;
        height: 38px;
        padding-left: 18px;
        padding-right: 18px;
        background-color: #FA2929;
        border-radius: 19px;
        opacity: 0.4;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }

    .device-tip {
        font-size: 20px;
        color: #ffffff;
        padding-right: 17px;
    }

    .delete-icon {
        width: 15px;
        height: 15px;
    }

</style>

<script>
    import nativeService from '../common/services/nativeService'
    export default {
        components: {  },
        props: {
            deviceImg: {
                type: String,
                default: '../img/deviceStatus/blue_9b@2x.png'
            },
            mainStatus: {
                type: String,
                default: ''
            },
            unit: {
                type: String,
                default: ''
            },
            deviceTip: {
                type: String,
                default: ''
            },
            showSubStatus: {
                type: Boolean,
                default: true
            },
            mainStatusColor: {
                type: String,
                default: '#F9CD2E'
            },
            mainStatusFontSize: {
                type: String,
                default: '68px'
            },
            unitColor: {
                type: String,
                default: '#F9CD2E'
            },
            unitFontSize: {
                type: String,
                default: '20px'
            },
        },
        data: () => ({
            deleteIcon: "../img/deviceStatus/plugin_remind_ @2x.png"
        }),
        computed: {
            
        },
        methods: {
            hideDeviceTip () {
                this.$emit("hideDeviceTip")
            }
        }
    }
</script>
