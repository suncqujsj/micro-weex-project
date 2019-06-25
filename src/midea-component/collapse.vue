<template>
    <div class="collapse-wrapper">
      <div class="collapse-item-wrapper" @click="makeSwitch">
        <slot name="left-icon"></slot>
        <div class="collapse-item" :style="collapseItemStyle">
            <div class="collapse-item-left">
              <text class="collapse-title" v-if="title">{{title}}</text>
              <slot name="desc">
                <text class="collapse-desc" v-if="desc">{{desc}}</text>
              </slot>
            </div>
            <image class="collapse-icon" :src="isFoldedStatus?foldIcon:unfoldIcon"></image>
        </div>
      </div>

      <div v-if="!isFoldedStatus">
        <slot name="content"></slot>
      </div>
    </div>
</template>

<script>
export default {
    props: {
        title: String,
        desc: String,
        isFolded: {
            type: Boolean,
            default: true
        },
        height: {
          type: [String, Number],
          default: 92
        }
    },
    computed: {
      collapseItemStyle() {
        const {height} = this;
        return {
          height: `${height}px`
        };
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
.collapse-wrapper {
  padding-left: 32px;
  height: auto;
}
.collapse-item-wrapper {
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.collapse-item {
  flex: 1;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  height: 92px;
  border-bottom-color: #e5e5e8;
  border-bottom-width: 1px;
}

.collapse-item-left {
  justify-content: center;
  align-items: flex-start;
}
.collapse-title {
  flex: 1;
  font-family: PingFangSC-Regular;
  font-size: 32px;
  color: #000000;
}
.collapse-desc {
  font-family: PingFangSC-Regular;
  font-size: 28px;
  color: #666666;
}
.collapse-icon {
  height: 40px;
  width: 40px;
  margin-right: 24px;
}
</style>