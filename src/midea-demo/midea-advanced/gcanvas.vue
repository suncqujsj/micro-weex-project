<template>
    <div>
        <midea-header title="gcanvas" :isImmersion="isImmersion" @leftImgClick="back" :showRightImg="true" rightImg="../assets/img/smart_ic_reline@3x.png" @rightImgClick="reload"></midea-header>

        <div style="height:200px;">
            <text class="display-text">GCanvas主页和接口支持 (请使用桌面浏览器打开)</text>
            <text class="display-link" @click="openWeb('https://alibaba.github.io/GCanvas/')">主页：https://alibaba.github.io/GCanvas/</text>
            <text class="display-link" @click="openWeb('https://alibaba.github.io/GCanvas/docs/Graphics%202D.html')">2D接口:https://alibaba.github.io/GCanvas/docs/Graphics%202D.html</text>
            <text class="display-link" @click="openWeb('https://alibaba.github.io/GCanvas/docs/WebGL.html')">WebGL接口：https://alibaba.github.io/GCanvas/docs/WebGL.html  {{positionY}}</text>
        </div>
        <gcanvas @touchstart="touchstart" @touchmove="touchmove" @touchend="touchend" ref="gcanvess" style="width: 750;height: 600px;background-color: yellow;">
        </gcanvas>
        <scroller ref="test" style="flex:1;background-color: #1ba1e2">
            <gcanvas ref="canvas_holder" style="width:750px; height:600px; background-color:rgba(0, 0, 0, 0.1)"></gcanvas>
        </scroller>
    </div>
</template>

<style scoped>
.display-text {
  font-size: 30px;
  margin-left: 10px;
  margin-right: 10px;
}
.display-link {
  font-size: 24px;
  margin-left: 10px;
  margin-right: 10px;
  margin-bottom: 10px;
  color: blue;
  text-decoration: blue;
}
</style>
<script>  
import base from '../base'
import mideaHeader from '@/midea-component/header.vue'
import nativeService from '@/common/services/nativeService'

const dom = weex.requireModule("dom");
var GCanvas = require('weex-gcanvas')
var Image = require('weex-gcanvas/gcanvasimage');
var modal = weex.requireModule("modal");
export default {
    mixins: [base],
    data() {
        return {
            positionX: 0,
            positionY: 0,
            startX: 0,
            startY: 0,
            currentX: 0,
            currentY: 0,
            context: {},
            canvasObj: {}
        }
    },
    methods: {
        openWeb(url) {
            nativeService.weexBundleToWeb({
                url: url,
                title: "GCanvas主页"
            })
        },
        touchstart(event) {
            this.startX = event.changedTouches[0].pageX;
            this.startY = event.changedTouches[0].pageY;
            this.context.strokeStyle = "#17acf6";  //设置线的颜色状态
            this.context.lineWidth = 10;  //设置线宽状态
        },
        touchmove(event) {
            this.currentX = event.changedTouches[0].pageX;
            this.currentY = event.changedTouches[0].pageY;
            //进行绘制
            this.context.moveTo(this.startX, this.startY - this.positionY);
            this.context.lineTo(this.currentX, this.currentY - this.positionY);
            this.context.stroke();

            this.startX = event.changedTouches[0].pageX;
            this.startY = event.changedTouches[0].pageY;

        },
        touchend(event) {

        },
        test1() {
            // 第一部分canvas
            //1、初始化 GCanvas
            var ref = this.$refs.canvas_holder;
            var gcanvas = GCanvas.start(ref);
            var ctx = gcanvas.getContext('2d');

            //2、执行渲染操作
            //rect
            ctx.fillStyle = 'red';
            ctx.fillRect(0, 0, 100, 100);

            //rect
            ctx.fillStyle = 'black';
            ctx.fillRect(100, 100, 100, 100);
            ctx.fillRect(25, 210, 700, 5);

            //circle
            ctx.arc(450, 200, 100, 0, Math.PI * 2, true);
            ctx.fill();

            //drawImage
            var image = new Image();
            image.onload = function () {
                ctx.drawImage(image, 100, 330);
                ctx.drawImage(image, 100, 330, 225, 75);
            }
            image.src = 'https://www.khronos.org/assets/uploads/ceimg/made/assets/uploads/apis/OpenGL-ES_100px_May16_225_75.png';
        },
        test2() {
            // 第二部分canvas
            /*获取元素引用*/
            var ref = this.$refs.gcanvess
            /*通过元素引用获取canvas对象*/
            this.canvasObj = GCanvas.start(ref)
            /*获取绘图所需的上下文，目前不支持3d*/
            this.context = this.canvasObj.getContext('2d')
            /*设置字体大小*/
            this.context.font = '34px'
            /*在指定位置绘制文字*/
            this.context.fillText('Hello Word', 200, 100)
            /*指定绘制图形的线的宽度*/
            this.context.lineWidth = 10
            /*在指定位置绘制矩形*/
            this.context.strokeRect(200, 200, 200, 90)
            /*绘制三角形*/
            this.context.beginPath()
            this.context.moveTo(20, 20)
            this.context.lineTo(20, 100)
            this.context.lineTo(0, 100)
            this.context.closePath()
            this.context.stroke()
        },
        test3() {
            // 第二部分canvas
            /*获取元素引用*/
            var ref = this.$refs.gcanvess
            /*通过元素引用获取canvas对象*/
            this.canvasObj = GCanvas.start(ref)
            /*获取绘图所需的上下文，目前不支持3d*/
            this.context = this.canvasObj.getContext('2d')

            this.context.save();
            this.context.globalAlpha = 0.1;     //此时  画出的图片的透明度为0.5
            this.context.clearRect(0, 0, 500, 500);
            this.context.lineWidth = 3;

            this.context.beginPath()
            this.context.moveTo(200, 100)
            this.context.lineTo(400, 200)
            this.context.lineTo(200, 300)
            this.context.lineTo(0, 200)
            this.context.closePath()
            let gradient = this.context.createLinearGradient(0, 200, 400, 200);
            gradient.addColorStop(0, 'rgb(0,0,0)');
            gradient.addColorStop(1, 'rgb(86,59,235)');
            this.context.strokeStyle = gradient;
            this.context.fill();
            this.context.restore();

            this.context.save();
            this.context.globalAlpha = 0.6;     //此时  画出的图片的透明度为0.5
            this.context.fillStyle = 'rgb(86,59,235)';
            this.context.fillRect(0, 0, 100, 100);
            this.context.restore();

            this.context.fillStyle = 'rgb(86,59,235)';
            this.context.fillRect(150, 0, 100, 100);

            this.context.fillStyle = 'rgba(86,59,235,0.3)';
            this.context.fillRect(300, 0, 100, 100);

            this.context.beginPath()
            this.context.moveTo(200, 400)
            this.context.lineTo(400, 500)
            this.context.lineTo(200, 600)
            this.context.lineTo(0, 500)
            this.context.closePath()
            let gradient1 = this.context.createLinearGradient(0, 500, 400, 500);
            gradient1.addColorStop(0, 'rgba(0,0,0,0.8)');
            gradient1.addColorStop(1, 'rgba(86,59,235,0.2)');
            this.context.strokeStyle = gradient1;
            this.context.fill();
        }
    },
    mounted() {
        this.test1()
        // this.test2()
        this.test3()

        if (weex.config.env.platform == 'iOS') {
            // 处理iOS手势中pageY从页面算起的问题
            var elName = "gcanvess"
            var el = this.$refs[elName];
            if (el) {
                let sid = setInterval(() => next(), 100)
                let next = () => {
                    dom.getComponentRect(el, (options) => {
                        if (options.result && options.size.bottom) {
                            this.positionX = options.size.left
                            this.positionY = options.size.top
                        } else {
                            setTimeout(() => next(), 100)
                        }
                    })
                    clearInterval(sid)
                }
            }
        }
    }
}
</script>