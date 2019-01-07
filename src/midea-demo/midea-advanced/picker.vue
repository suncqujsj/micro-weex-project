<template>
    <div class="wrapper" :style="{paddingTop:isIos?'0px':'0px'}">
        <midea-header title="Picker" :isImmersion="isImmersion" @leftImgClick="back" :showRightImg="true" rightImg="../assets/img/smart_ic_reline@3x.png" @rightImgClick="reload"></midea-header>
        <midea-title-bar title="选择城市（单列选择）"></midea-title-bar>
        <midea-cell title="城市" :hasTopBorder="true" :rightText="city ? city :'请选择城市'" @mideaCellClick="pickCity">
        </midea-cell>

        <midea-title-bar title="选择属性（多列选择）"></midea-title-bar>
        <midea-cell title="属性" :hasTopBorder="true" :rightText="attribute" @mideaCellClick="pickAttribute">
        </midea-cell>

        <midea-title-bar title="选择地址（多列选择级联）"></midea-title-bar>
        <midea-cell title="属性" :hasTopBorder="true" :rightText="cascadedDesc" @mideaCellClick="pickCascade">
        </midea-cell>

        <midea-title-bar title="选择日期"></midea-title-bar>
        <midea-cell title="日期" :rightText="date?date:'请选择日期'" :hasTopBorder="true" @mideaCellClick="pickDate">
        </midea-cell>
        <midea-cell title="时间" :rightText="time?time:'请选择时间'" @mideaCellClick="pickTime">
        </midea-cell>
    </div>
</template>
<style scoped>
</style>
<script> 
import base from '../base'
import mideaCell from '@/component/cell.vue'
import mideaTitleBar from '@/midea-component/title-bar.vue'
import nativeService from '@/common/services/nativeService'
const modal = weex.requireModule('modal');
const picker = weex.requireModule('picker')
export default {
    components: { mideaCell, mideaTitleBar },
    mixins: [base],
    data() {
        return {
            index: 0,
            date: "",
            city: "",
            cityIndex: 0,
            attribute: "请选择属性",
            cascadedDesc: "请选择属性",
            cascadedItem: [{ id: '' }, { id: '' }, { id: '' }], //默认值
            colorIndex: 0,
            sizeIndex: 0,
            time: ""
        }
    },
    computed() {
    },
    methods: {
        pickCity() {
            const items = ['北京', '上海', '广州'];
            var that = this;
            var pickItem = [{
                index: that.cityIndex,
                item: items,
                label: ""
            }]
            picker.pick({
                'items': pickItem,
                'title': '选择城市', //取消和确定中间那标题
                'cancelTxt': '取消', //取消按钮文字
                'confirmTxt': '确定', //确定按钮文字,
                'cancelTxtColor': '#666666', //取消颜色
                'confirmTxtColor': '#000000', //标题颜色
                'titleColor': '#000000', //标题颜色
                'titleBgColor': '#E7EDEF' //标题栏颜色
            }, event => {
                nativeService.toast(event.result)
                if (event.result == 'success') {
                    var dataArr = event.data.replace("[", "").replace("]", "").split(",");
                    that.cityIndex = dataArr[0];
                    that.city = items[dataArr[0]];
                }
            });
        },
        pickAttribute() {
            const itemsColor = ['红色', '白色', '粉色'];
            const itemsSize = ["XL", 'L', 'M', 'S'];
            var that = this;
            var pickItem = [{
                index: that.colorIndex,
                item: itemsColor,
                label: "颜色"
            },
            {
                index: that.sizeIndex,
                item: itemsSize,
                label: "尺寸"
            },
            ]
            picker.pick({
                'items': pickItem,
                'title': '选择地址', //取消和确定中间那标题
                'cancelTxt': '取消', //取消按钮文字
                'confirmTxt': '确定', //确定按钮文字,
                'cancelTxtColor': '#666666', //取消颜色
                'confirmTxtColor': '#000000', //标题颜色
                'titleColor': '#000000', //标题颜色
                'titleBgColor': '#E7EDEF' //标题栏颜色
            }, event => {
                nativeService.toast(event.result)
                if (event.result == 'success') {
                    var data = event.data;
                    var dataArr = data.replace("[", "").replace("]", "").split(",");
                    that.colorIndex = dataArr[0];
                    that.sizeIndex = dataArr[1];
                    that.attribute = itemsColor[dataArr[0]] + ',' + itemsSize[dataArr[1]];
                }
            });
        },
        pickCascade() {
            let pickItem = [
                {
                    index: this.cascadedItem[0].id | 2,
                    label: "省"
                },
                {
                    index: this.cascadedItem[1].id || 22,
                    label: "市"
                },
                {
                    index: this.cascadedItem[2].id || 222,
                    label: "区/县"
                },
            ]
            let pickItemMap = [
                { id: 1, pId: 0, name: '北京' },
                { id: 101, pId: 1, name: '北京' },
                { id: 1011, pId: 101, name: '朝阳区' },
                { id: 1012, pId: 101, name: '密云区' },
                { id: 2, pId: 0, name: '广东' },
                { id: 201, pId: 2, name: '广州' },
                { id: 2011, pId: 201, name: '天河区' },
                { id: 2012, pId: 201, name: '越秀区' },
                { id: 202, pId: 2, name: '深圳' },
                { id: 2021, pId: 202, name: '罗湖区' },
                { id: 2022, pId: 202, name: '福田区' },
                { id: 3, pId: 0, name: '广西' },
                { id: 301, pId: 3, name: '南宁' },
                { id: 3011, pId: 301, name: '宾阳县' },
                { id: 3012, pId: 301, name: '横县' },
                { id: 302, pId: 3, name: '北海' },
                { id: 3021, pId: 302, name: '海城区' },
                { id: 3022, pId: 302, name: '银海区' }
            ]
            picker.pickCascade({
                'items': pickItem,
                'itemMaps': pickItemMap,
                'title': '选择地址', //取消和确定中间那标题
                'cancelTxt': '取消', //取消按钮文字
                'confirmTxt': '确定', //确定按钮文字,
                'cancelTxtColor': '#666666', //取消颜色
                'confirmTxtColor': '#000000', //标题颜色
                'titleColor': '#000000', //标题颜色
                'titleBgColor': '#E7EDEF' //标题栏颜色
            }, event => {
                nativeService.toast(event.result)
                if (event.result == 'success') {
                    this.cascadedItem = JSON.parse(event.data)
                    let tempStr = "";
                    for(let i=0;i<this.cascadedItem.length;i++) {
                    	tempStr += this.cascadedItem[i].name + ","
                    }
                    this.cascadedDesc = tempStr.substring(0,tempStr.length-1);
                    
//                  this.cascadedDesc = this.cascadedItem[0].name + "," + this.cascadedItem[1].name + "," + this.cascadedItem[2].name
                }
            });
        },
        pickDate() {
            var self = this;
            picker.pickDate({
                'value': this.date || '2016-11-28',
                'max': '2029-11-28',
                'min': '2015-11-28',
                'title': '选择日期', //取消和确定中间那标题
                'cancelTxt': '取消', //取消按钮文字
                'confirmTxt': '确定', //确定按钮文字,
                'cancelTxtColor': '#020F13', //取消颜色
                'confirmTxtColor': '#020F13', //标题颜色
                'titleColor': '#020F13', //标题颜色
                'titleBgColor': '#E7EDEF' //标题栏颜色

            }, event => {
                nativeService.toast(event.result)
                var result = event.result;
                if (result == 'success') {
                    self.date = event.data;
                }
            });
        },
        pickTime() {
            picker.pickTime({
                'value': this.time,
                'title': '选择时间', //取消和确定中间那标题
                'cancelTxt': '取消', //取消按钮文字
                'confirmTxt': '确定', //确定按钮文字,
                'cancelTxtColor': '#020F13', //取消颜色
                'confirmTxtColor': '#020F13', //标题颜色
                'titleColor': '#020F13', //标题颜色
                'titleBgColor': '#E7EDEF' //标题栏颜色
            }, event => {
                nativeService.toast(event.result)
                if (event.result === 'success') {
                    this.time = event.data;
                }
            })
        }
    },
    created() {
        this.isIos = weex.config.env.platform == 'iOS' ? true : false;
    }
};
</script>