<template>
    <div class="wrap">
        <div class="left" :style="style.line"></div>
        <div>
            <text class="text" :style="style.font">{{content}}</text>
        </div>
        <div class="right" :style="style.line"></div>
    </div>
</template>

<script>
    export default {
        props: {
            content: {
                type: String,
                default: '分割线'
            },
            styles: {
                type: Object,
                default: function(){
                    return {
                        lineWidth: 200,
                        lienHeight: 2,
                        bgColor: '#e5e5e5',
                        fontSize: 32,
                        fontColor: '#aaa'
                    }
                }
            }
        },
        computed: {
            style(){
                return {
                    line: {
                        width: this.styles.lineWidth + 'px',
                        height: this.styles.lienHeight + 'px',
                        backgroundColor: this.styles.bgColor,
                    },
                    font: {
                        fontSize: this.styles.fontSize + 'px',
                        color: this.styles.fontColor
                    }
                }
            },
        },
        data() {
            return {
               
            }
        },
        methods: {
           
        },
        created() {
           
        }
    }
</script>

<style>
.wrap{
    flex-direction: row;
    margin: 25px;
    align-items: center;
    justify-content: center
}
.text{
    margin-left: 25px;
    margin-right: 25px;
}
</style>