<template>
    <slider :style="sliderStyle" :interval="interval" :auto-play="autoplay" :infinite="infinite"
            @change="_change">
        <div v-for="(item,index) in items">
            <image @click="_click($event,index)"
                   :resize="imgResize"
                   :style="{width:imgWidth,height:imgHeight}"
                   :src="item.url"
                   >
            </image>
        </div>
        <indicator class="indicator" :style="indicatorStyle"></indicator>
    </slider>
</template>

<style>
    .indicator {
        width: 750px;
        height: 100px;
        position: absolute;
        bottom: 0;
        left: 0;
        item-color: rgba(255, 255, 255, .5);
        item-selectedColor: rgba(255, 255, 255, 1);
        item-size: 12px;
    }
</style>
<script>
    module.exports = {
        props: {
            sliderStyle: {
                default: {
                    "width": "750px",
                    "height": "400px",
                    "position":"relative"
                }
            },
            indicatorStyle: {
                default: ""
            },
            items: {
                default: []
            },
            interval: {
                default: 2000
            },
            autoplay: {
                default: true
            },
            infinite: {
                default: true
            },
            imgResize: {
                default: "stretch"
            },
            imgWidth: {
                default: "750px"
            },
            imgHeight: {
                default: "400px"
            },
            placeholder: {
                default: ""
            }
        },
        data: function () {
            return {}
        },
        methods: {
            "_change": function (e) {
                this.$emit("change", e);
            },
            "_click": function (e, index) {
                this.$emit("itemClick", e, index);
            }
        }
    }
</script>
