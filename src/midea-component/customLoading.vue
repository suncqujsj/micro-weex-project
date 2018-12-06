<template>
  <div class="loading-wrapper" v-if="display" @touchend="handleTouchend">
    <div class="mask" ref="mask" v-if="isMask" @touchend="handleTouchend"></div>
    <div class="loading-list" :style="loadingBg">
      <div ref="dot1" class="loading-item" :style="itemStyle"></div>
      <div ref="dot2" class="loading-item item-second" :style="itemStyle"></div>
      <div ref="dot3" class="loading-item" :style="itemStyle"></div>
    </div>
  </div>
</template>

<script>
const animation = weex.requireModule('animation');
export default {
  props: {
    display: {
      type: Boolean,
      default: false
    },
    isMask: {
      type: Boolean,
      default: false
    },
    bgColor: {
      type: String,
      default: 'transparent'
    },
    loadingColor: {
      type: String,
      default: '#8a8a8f'
    },
    opacity: {
      type: String | Number,
      default: 0.8
    }
  },
  data() {
    return {
      timer: null
    };
  },
  computed: {
    loadingBg() {
      let {bgColor} = this;
      let style = {
        backgroundColor: bgColor
      };
      return style;
    },

    itemStyle() {
      let {loadingColor, opacity} = this;
      let style = {
        backgroundColor: loadingColor,
        opacity: Number(opacity)
      };
      return style;
    }
  },
  watch: {
    display(nVal) {
      if (!nVal) {
        clearInterval(this.timer);
      } else {
        this.loadingAnimate();
        this.timer = setInterval(() => {
          this.loadingAnimate();
        }, 1500);
      }
    },
    isMask(nVal) {
      this.$nextTick(() => {
        this.maskFade(nVal);
      });
    }
  },
  methods: {
    // 阻止默认事件,点击穿透问题
    handleTouchend(e) {
      let {platform} = weex.config.env
      platform === 'Web' && e.preventDefault && e.preventDefault()
    },

    // 遮罩层动画
    maskFade(bool) {
      let maskEl = this.$refs['mask']
      animation.transition(maskEl, {
        styles: {
          opacity: bool ? 1 : 0
        },
        duration: 200,
        timingFunction: 'ease-in',
        delay: 0
      })
    },

    // 加载动画
    loadingAnimate() {
      let dotEl1 = this.$refs['dot1'];
      let dotEl2 = this.$refs['dot2'];
      let dotEl3 = this.$refs['dot3'];
      let _this = this;
      animation.transition(dotEl1, {
        styles: {
          transform: 'scale(2.8)'
        },
        duration: 250,
        timingFunction: 'linear'
      }, function() {
        animation.transition(dotEl1, {
          styles: {
            transform: 'scale(1)'
          },
          duration: 100,
          timingFunction: 'linear'
        });

        animation.transition(dotEl2, {
          styles: {
            transform: 'scale(2.8)'
          },
          duration: 250,
          timingFunction: 'linear'
        }, function() {
          animation.transition(dotEl2, {
            styles: {
              transform: 'scale(1)'
            },
            duration: 250,
            timingFunction: 'linear'
          });

          animation.transition(dotEl3, {
            styles: {
              transform: 'scale(2.8)'
            },
            duration: 250,
            timingFunction: 'linear'
          }, function() {
            animation.transition(dotEl3, {
              styles: {
                transform: 'scale(1)'
              },
              duration: 250,
              timingFunction: 'linear'
            });
          });
        });
      });
    }
  },
  mounted() {
    clearInterval(this.timer);
  },
  destroyed() {
    clearInterval(this.timer);
  }
}
</script>

<style scoped>
  .mask {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 750px;
    opacity: 1;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1000;
  }
  .loading-list {
    position: fixed;
    top: 500px;
    left: 307px;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding-left: 24px;
    padding-right: 24px;
    width: 136px;
    height: 60px;
    border-radius: 60px;
    box-sizing: border-box;
    overflow-x: hidden;
    overflow-y: hidden;
    z-index: 2018;
  }
  .loading-item {
    width: 10px;
    height: 10px;
    border-radius: 50px;
  }
  .item-second {
    margin-left: 24px;
    margin-right: 24px;
  }
</style>
