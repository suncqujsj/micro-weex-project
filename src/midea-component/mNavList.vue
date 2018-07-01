<template>
    <div>
        <div class="item-wrapper" :class="[type=='spaceBetween'?'item-wrapper-sb':'']" v-for="(row, i) in dList" :key="i">
            <div class="item-inner-wrapper" :class="[disableClick? '' : activeClass(i*cols+index)]" :style="innerStyle" v-for="(item,index) in row" :key="index" @click="itemClicked(i*cols+index)" @touchstart="touchIndex=(i*cols+index)" @touchend="touchIndex=null" @touchleave="touchIndex=null" >
                <image :class="[direction=='v'?'item-img-v':'item-img-h']" :src="(touchIndex==i*cols+index)?(item.img_actived||item.img):item.img" :style="imgStyle"></image>
                <text v-if="item.title" :class="[direction=='v'?'item-txt-v':'item-txt-h']" :style="titleStyle">{{item.title}}</text>
                <image style="height:0px;width:0;" :src="item.img_actived"></image>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        list: {
            type: Array,
            default: () => ([])
        },
        cols: {
            type: Number,
            default: 4
        },
        type: {
            type: String,
            default: 'center'
        },
        direction: {
            type: String,
            default: 'v'
        },
        height: {
            type: String,
            default: ''
        },
        imgStyle: {
            type: Object,
            default: () => ({
                height: '58px',
                width: '58px'
            })
        },
        titleStyle: {
            type: Object,
            default: () => ({
                fontSize: '18px'
            })
        },
        customStyles: {
            type: Object,
            default: () => ({})
        },
        disableClick: {
            type: Boolean,
            default: false
        }
    },
    data: () => ({
        touchIndex: null
    }),
    computed: {
        dList() {
            let result = []
            const { cols, type } = this;
            //按个数拆分数组
            const list = this.list.concat([]) //拷贝，不改变原数组
            while (list.length > 0) {
                result.push(list.splice(0, cols))
            }

            //补足
            let lastArray = result[result.length - 1]
            if (type != 'spaceBetween' && lastArray.length != cols) {
                let paddingCount = cols - lastArray.length
                for (let index = 0; index < paddingCount; index++) {
                    lastArray.push({})
                }
            }

            return result;
        },
        innerStyle() {
            const { type, direction, height, width } = this

            let itemHeight
            if (height) {
                itemHeight = height
            } else {
                itemHeight = direction == 'v' ? '142' : '88'
            }

            let style = {
                'height': itemHeight + 'px',
                'flex-direction': direction == 'v' ? 'column' : 'row',
                'justify-content': direction == 'v' ? 'center' : 'flex-start',
                'flex': type == 'spaceBetween' ? 'auto' : '1',
                ...this.customStyles
            }

            return style
        }
    },
    created() {
    },
    methods: {
        activeClass(index) {
            //space-between和补足位不显示按下时的效果
            const { type } = this
            if (type != 'spaceBetween' && index < this.list.length) {
                return 'item-inner-active'
            }

            return ''
        },
        itemClicked(index) {
            //若是点击补足位，不处理
            if (index >= this.list.length) return

            this.$emit('itemClicked', { 'index': index, 'item': this.list[index] })
        }
    }
}
</script>

<style scoped>
.item-wrapper {
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
}

.item-wrapper-sb {
  justify-content: space-between;
}

.item-inner-wrapper {
  align-items: center;
  padding-left: 20px;
  padding-right: 20px;
}
.item-inner-active:active {
  background-color: #f5f5f5;
}

.item-img-v {
  height: 58px;
  width: 58px;
}
.item-img-h {
  height: 38px;
  width: 38px;
}

.item-txt-v {
  margin-top: 15px;
  font-size: 18px;
  line-height: 25px;
  color: #5f5f5f;
  text-align: center;
}
.item-txt-h {
  padding-left: 20px;
  font-size: 24px;
  line-height: 32px;
  color: #020f13;
  text-align: left;
}
</style>