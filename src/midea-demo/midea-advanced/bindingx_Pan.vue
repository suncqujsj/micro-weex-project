<template>
    <div>
        <midea-header title="bindingx" :isImmersion="isImmersion" @leftImgClick="back" :showRightImg="true" rightImg="../assets/img/smart_ic_reline@3x.png" @rightImgClick="reload"></midea-header>
        <div class="scroller">
            <div :ref="'box'" class="box" @touchstart="ontouchstart" @appear="onappear"></div>
        </div>
    </div>
</template>

<style scoped>
.scroller {
    flex: 1;
    overflow: hidden;
    background-color: yellow;
}
.box {
    border-width: 2px;
    border-style: solid;
    border-color: #bbbbbb;
    width: 250px;
    height: 250px;
    margin-top: 250px;
    margin-left: 250px;
    background-color: #eeeeee;
    margin-bottom: 500px;
}
</style>

<script>
import base from '../base'
import mideaHeader from '@/midea-component/header.vue'
import bindingx from 'weex-bindingx';


function getEl(el) {
    if (typeof el === 'string' || typeof el === 'number') return el;
    return true ? el.ref : el instanceof HTMLElement ? el : el.$el;
}


export default {
    mixins: [base],
    data() {
        return {
            x: 0,
            y: 0,
            flag: 0
        }
    },
    methods: {
        onappear() {
            this.bind();
        },
        bind() {
            var box = getEl(this.$refs.box);
            bindingx.bind({
                anchor: box,
                eventType: 'pan',
                props: [
                    {
                        element: box,
                        property: 'transform.translateX',
                        expression: {
                            origin: `x+${this.x}`,
                            transformed: `{\"type\":\"+\",\"children\":[{\"type\":\"Identifier\",\"value\":\"x\"},{\"type\":\"NumericLiteral\",\"value\":\"${this.x}\"}]}`
                        }
                    },
                    {
                        element: box,
                        property: 'transform.translateY',
                        expression: {
                            origin: `y+${this.y}`,
                            transformed: `{\"type\":\"+\",\"children\":[{\"type\":\"Identifier\",\"value\":\"y\"},{\"type\":\"NumericLiteral\",\"value\":\"${this.y}\"}]}`
                        }
                    }
                ]
            }, (e) => {
                if (e.state === 'end') {
                    this.x += e.deltaX;
                    this.y += e.deltaY;
                }
            });
        },
        ontouchstart(event) {
            this.bind();
        }
    },
    mounted(){
        this.bind();
    }
}
</script>