<template>
  <div>
    <div class="midea-overlay"
         ref="midea-overlay"
         v-if="show"
         :hack="shouldShow"
         @click="overlayClicked"
         :style="overlayStyle">
    </div>
  </div>
</template>

<style scoped>
  .midea-overlay {
    width: 750px;
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
  }
</style>

<script>
  const animation = weex.requireModule('animation');
  module.exports = {
    props: {
      show: {
        type: Boolean,
        default: true
      },
      hasAnimation: {
        type: Boolean,
        default: true
      },
      duration: {
        type: [Number, String],
        default: 300
      },
      timingFunction: {
        type: Array,
        default: () => (['ease-in', 'ease-out'])
      },
      opacity: {
        type: [Number, String],
        default: 0.6
      },
      canAutoClose: {
        type: Boolean,
        default: true
      }
    },
    computed: {
      overlayStyle () {
        return {
          opacity: this.hasAnimation ? 0 : 1,
          backgroundColor: `rgba(0, 0, 0,${this.opacity})`
        }
      },
      shouldShow () {
        const { show, hasAnimation } = this;
        try {
        hasAnimation && setTimeout(() => {
          this.appearOverlay(show);
        }, 50);
        } catch (error) {
          this.$nextTick(()=>{
            this.appearOverlay(show);
          })
        }
        return show;
      }
    },
    methods: {
      overlayClicked (e) {
        this.canAutoClose ? this.appearOverlay(false) : this.$emit('mideaOverlayBodyClicked', {});
      },
      appearOverlay (bool, duration = this.duration) {
        const { hasAnimation, timingFunction, canAutoClose } = this;
        const needEmit = !bool && canAutoClose;
        needEmit && (this.$emit('mideaOverlayBodyClicked', {}));
        const overlayEl = this.$refs['midea-overlay'];
        if (hasAnimation && overlayEl) {
          animation.transition(overlayEl, {
            styles: {
              opacity: bool ? 1 : 0
            },
            duration,
            timingFunction: timingFunction[bool ? 0 : 1],
            delay: 0
          }, () => {
            needEmit && (this.$emit('mideaOverlayBodyClicked', {}));
          });
        } else {
          needEmit && (this.$emit('mideaOverlayBodyClicked', {}));
        }
      }
    }
  };
</script>
