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
                type: Object,
                default: ()=> ({
                    "width": "750px",
                    "height": "400px",
                    "position":"relative"
                })
            },
            indicatorStyle: {
                type: Object,
                default: ()=> ({})
            },
            items: {
                type: Array,
                default: []
            },
            interval: {
                type: Number,
                default: 2000
            },
            autoplay: {
                type: Boolean,
                default: true
            },
            infinite: {
                type: Boolean,
                default: true
            },
            imgResize: {
                type: String,
                default: "stretch"
            },
            imgWidth: {
                type: String,
                default: "750px"
            },
            imgHeight: {
                type: String,
                default: "400px"
            },
            placeholder: {
                type: String,
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
