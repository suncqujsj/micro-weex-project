<template>
  <div
    class="midea-swipe-cell"
    @click="onClick('cell')"
    @longpress="onLongPress"
    @touchstart.stop="startDrag"
    @touchmove.stop="onDrag"
    @touchend.stop="endDrag"
    @touchcancel.stop="endDrag">
    <div
      ref="swipeCellWrapper"
      class="midea-swipe-cell__wrapper"
      :style="wrapperStyle"
      @transitionend="onTransitionend">
      <div class="midea-swipe-cell__left" :style="leftStyle" v-if="leftWidth" @click.stop="onClick('left')">
        <slot name="left"></slot>
      </div>
      <slot></slot>
      <div class="midea-swipe-cell__right" :style="rightStyle" v-if="rightWidth" @click.stop="onClick('right')">
        <slot name="right"></slot>
      </div>
    </div>
  </div>
</template>

<script>
import TouchMixin from './mixins/touch'
const range = (num, min, max) => {
  return Math.min(Math.max(num, min), max)
}
const THRESHOLD = 0.15
export default {
  name: 'midea-swipe-cell',
  mixins: [TouchMixin],
  props: {
    onClose: Function,
    height: {
      type: Number,
      default: 96
    },
    disabled: {
      type: Boolean,
      default: false
    },
    leftWidth: {
      type: Number,
      default: 0
    },
    rightWidth: {
      type: Number,
      default: 0
    },
    leftBackground: {
      type: String,
      default: '#ff4444'
    },
    rightBackground: {
      type: String,
      default: '#ff4444'
    },
    color: {
      type: String,
      default: '#ffffff'
    }
  },

  data () {
    return {
      offset: 0,
      dragging: false
    }
  },

  computed: {
    wrapperStyle () {
      let {offset, dragging, leftWidth, rightWidth} = this
      let style = {
        width: `${750 + leftWidth + rightWidth}px`,
        transform: `translateX(${offset - leftWidth}px)`,
        transitionProperty: 'transform',
        transitionDuration: dragging ? '0' : '.6s',
        transitionTimingFunction: dragging ? 'none' : 'cubic-bezier(0.18, 0.89, 0.32, 1)'
      }
      return style
    },

    leftStyle () {
      let {leftWidth, leftBackground, color, height} = this
      let style = {
        width: `${leftWidth}px`,
        height: `${height}px`,
        backgroundColor: leftBackground,
        color
      }
      return style
    },

    rightStyle () {
      let {rightWidth, rightBackground, color, height} = this
      let style = {
        width: `${rightWidth}px`,
        height: `${height}px`,
        backgroundColor: rightBackground,
        color
      }
      return style
    }
  },

  methods: {
    onClick (position = 'outside') {
      this.$emit('click', position)

      if (!this.offset) {
        return
      }

      if (this.onClose) {
        this.onClose(position, this)
      } else {
        this.swipeMove(0)
      }
    },

    onLongPress () {
      if (this.disabled) {
        this.$emit('longpress')
      }
    },

    swipeMove (offset = 0) {
      this.offset = range(offset, -this.rightWidth, this.leftWidth)
      if (this.offset) {
        this.swiping = true
      } else {
        this.opened = false
      }
    },

    resetSwipeStatus () {
      this.swiping = false
      this.opened = true
    },

    open (position) {
      const offset = position === 'left' ? this.leftWidth : -this.rightWidth
      this.swipeMove(offset)
      this.resetSwipeStatus()
    },

    close () {
      this.offset = 0
    },

    swipeLeaveTransition (direction) {
      let {offset, leftWidth, rightWidth} = this
      let threshold = this.opened ? 1 - THRESHOLD : THRESHOLD

      // right
      if (direction === 'right' && -offset > rightWidth * threshold && rightWidth > 0) {
        this.open('right')
        // left
      } else if (direction === 'left' && offset > leftWidth * threshold && leftWidth > 0) {
        this.open('left')
        // reset
      } else {
        this.swipeMove(0)
      }
    },

    startDrag (event) {
      if (this.disabled) {
        return
      }
      this.dragging = true
      this.startOffset = this.offset
      this.touchStart(event)
    },

    onDrag (event) {
      if (this.disabled) {
        return
      }
      this.touchMove(event)
      if (this.direction === 'horizontal') {
        // event.preventDefault()
        this.swipeMove(this.deltaX + this.startOffset)
      }
    },

    endDrag (event) {
      if (this.disabled) {
        return
      }
      this.dragging = false

      if (this.swiping) {
        this.swipeLeaveTransition(this.offset > 0 ? 'left' : 'right')
      }
    },

    onTransitionend () {
      this.swiping = false
    }
  }
}
</script>

<style scoped>
  .midea-swipe-cell {
    position: relative;
    width: 750px;
    overflow: hidden;
  }

  .midea-swipe-cell__wrapper {
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: center;
    box-sizing: content-box;
  }

  .midea-swipe-cell__left,
  .midea-swipe-cell__right {
    height: 96px;
    display: -webkit-flex;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
    background-color: #ff4444;
    font-size: 16px;
    color: #ffffff;
  }
</style>
