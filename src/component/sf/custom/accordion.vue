<template>
    <div class="accordion-wrapper">
        <div class="accordion-item" @click="makeSwitch">
            <text class="accordion-title">{{title}}</text>
            <image class="accordion-icon" :src="isFoldedStatus?foldIcon:unfoldIcon"></image>
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
            isFoldedStatus: true
        }
    },
    methods: {
        makeSwitch(e) {
            this.isFoldedStatus = !this.isFoldedStatus
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
  font-family: PingFangSC-Regular;
  font-size: 32px;
  color: #000000;
}
.accordion-icon {
  height: 40px;
  width: 40px;
  margin-right: 24px;
}
</style>