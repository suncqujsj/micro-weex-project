const MIN_DISTANCE = 10
function getDirection (x, y) {
  if (x > y && x > MIN_DISTANCE) {
    return 'horizontal'
  }
  if (y > x && y > MIN_DISTANCE) {
    return 'vertical'
  }
  return ''
}

const TouchMixin = {
  data () {
    return {
      direction: ''
    }
  },

  methods: {
    touchStart (event) {
      this.resetTouchStatus()
      this.startX = event.changedTouches[0].pageX
      this.startY = event.changedTouches[0].pageY
    },

    touchMove (event) {
      const touch = event.changedTouches[0]
      this.deltaX = touch.pageX - this.startX
      this.deltaY = touch.pageY - this.startY
      this.offsetX = Math.abs(this.deltaX)
      this.offsetY = Math.abs(this.deltaY)
      this.direction = this.direction || getDirection(this.offsetX, this.offsetY)
    },

    resetTouchStatus () {
      this.direction = ''
      this.deltaX = 0
      this.deltaY = 0
      this.offsetX = 0
      this.offsetY = 0
    }
  }
}

export default TouchMixin
