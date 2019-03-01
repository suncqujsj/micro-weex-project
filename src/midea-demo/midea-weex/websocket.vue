
<template>
    <scroller>
        <midea-header title="websocket" :isImmersion="isImmersion" @leftImgClick="back" :showRightImg="true" rightImg="../assets/img/smart_ic_reline@3x.png" @rightImgClick="reload"></midea-header>
        <div>
            <div style="background-color: #286090">
                <text class="title" style="height: 80px ;padding: 20px;color: white">websocket</text>
            </div>
            <input type="text" placeholder="please input message to send" class="input" autofocus="false" :value="txtInput" @input="oninput" ref="input" />
            <div style="flex-direction: row; justify-content: center;">
                <text class="button" @click="connect">connect</text>
                <text class="button" @click="send">send</text>
                <text class="button" @click="close">close</text>
            </div>

            <div style="background-color: lightgray">
                <text class="title" style="height: 80px ;padding: 20px;color: black">method = send</text>
            </div>
            <text style="color: black;height: 80px">{{sendinfo}}</text>

            <div style="background-color: lightgray">
                <text class="title" style="height: 80px ;padding: 20px;color: black">method = onopen</text>
            </div>
            <text style="color: black;height: 80px">{{onopeninfo}}</text>

            <div style="background-color: lightgray">
                <text class="title" style="height: 80px ;padding: 20px;color: black">method = onmessage</text>
            </div>
            <text style="color: black;height: 400px">{{onmessage}}</text>

            <div style="background-color: lightgray">
                <text class="title" style="height: 80px ;padding: 20px;color: black">method = onclose</text>
            </div>
            <text style="color: black;height: 80px">{{oncloseinfo}}</text>

            <div style="background-color: lightgray">
                <text class="title" style="height: 80px ;padding: 20px;color: black">method = onerror</text>
            </div>
            <text style="color: black;height: 80px">{{onerrorinfo}}</text>

            <div style="background-color: lightgray">
                <text class="title" style="height: 80px ;padding: 20px;color: black">method = close</text>
            </div>
            <text style="color: black;height: 80px">{{closeinfo}}</text>

        </div>

    </scroller>
</template>

<style scoped>
.input {
    flex: 1;
    font-size: 40px;
    height: 80px;
}
.button {
    font-size: 36px;
    width: 150px;
    color: #41b883;
    text-align: center;
    padding-top: 25px;
    padding-bottom: 25px;
    border-width: 2px;
    border-style: solid;
    margin-right: 20px;
    border-color: rgb(162, 217, 192);
    background-color: rgba(162, 217, 192, 0.2);
}
</style>


<script>
import base from '../base'
import nativeService from '@/common/services/nativeService'
var websocket = weex.requireModule('webSocket')
export default {
    mixins: [base],
    data() {
        return {
            websocket: websocket,
            connectinfo: '',
            sendinfo: '',
            onopeninfo: '',
            onmessage: '',
            oncloseinfo: '',
            onerrorinfo: '',
            closeinfo: '',
            txtInput: '{"infoType":21014,"data":{},"dInfo":{"ts":"' + new Date().getTime() + '", "userId":"4"}}',
            navBarHeight: 88,
            title: 'Navigator',
            dir: 'examples',
            baseURL: ''
        }
    },
    methods: {
        connect: function () {
            if (weex.config.env.platform == "Web") {
                this.websocket = new WebSocket("wss://wss.ldrobot.com")
            } else {
                this.websocket.WebSocket('wss://wss.ldrobot.com');
            }
            
            var self = this;
            self.onopeninfo = 'connecting...'
            this.websocket.onopen = function (e) {
                self.onopeninfo = 'websocket open';
            }
            this.websocket.onmessage = function (e) {
                self.onmessage = e.data;
            }
            this.websocket.onerror = function (e) {
                self.onerrorinfo = e.data;
            }
            this.websocket.onclose = function (e) {
                self.onopeninfo = '';
                self.onerrorinfo = e.code;
            }
        },
        send: function (e) {
            var input = this.$refs.input;
            input.blur();
            this.websocket.send(this.txtInput);
            this.sendinfo = this.txtInput;
        },
        oninput: function (event) {
            this.txtInput = event.value;
        },
        close: function (e) {
            this.websocket.close();
        },
    },
}
</script>
