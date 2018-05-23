<template>
    <div class="wrapper">
        <midea-header :title="title" @leftImgClick="back"></midea-header>
        <scroller class="content-wrapper">
            <div class="item-group">
                <midea-grid-select class="type-select-grid" :cols="3" :single="true" :customStyles="{width:'200px',height:'48px'}" :list="types" @select="typeSelected">
                </midea-grid-select>
            </div>

            <div class="item-group scan-group group-bottom-border">
                <input class="scan-input" placeholder="请输入型号或扫机身条码" :autofocus=false :value="code" @change="onchange" @input="oninput" />

                <image class="scan-icon" src="./assets/img/progress.png" resize='contain' @click="scanCode"></image>
            </div>

            <div class="item-group scan-group group-bottom-border">
                <input class="scan-input" placeholder="请输入配件名称" :autofocus=false :value="code" @change="onchange" @input="oninput" />

                <text class="search" @click="search">查询</text>
            </div>

            <div class="item-group group-bottom-border">
                <text class="result-title">指导价格</text>

                <div class="result-content">
                    <text class="result-product">压缩机ABCS</text>
                    <text class="result-price">200元</text>
                </div>
            </div>

            <div class="item-group">
                <text class="result-desc">若本价格标准高于当地物价部门制定有关标准，请以当地物价部门标准为准</text>
            </div>
        </scroller>
    </div>
</template>

<script>
import base from './base'
import nativeService from '@/common/services/nativeService';


import { MideaGridSelect } from '@/index'


export default {
    components: {
        MideaGridSelect
    },
    mixins: [base],
    data() {
        return {
            title: '配件价格',
            types: [
                {
                    'title': '机身条码',
                    'checked': true
                },
                {
                    'title': '产品型号'
                }
            ],
        }
    },
    computed: {
    },
    methods: {
        typeSelected() {

        },
        onchange() {

        },
        oninput(event) {
            this.code = event.value
        },
        scanCode() {
            nativeService.scanCode().then(
                (resp) => {
                    if (resp.status == 0) {
                        this.code = resp.data
                    }
                }
            )
        },
        search() {

        }
    },
    created() {
        this.initServiePeriod()
        this.initProductData()
    }
}
</script>

<style>
.wrapper {
  background-color: #ffffff;
  position: relative;
}
.content-wrapper {
  padding-bottom: 120px;
}
.item-group {
  padding: 24px;
}

.group-bottom-border {
  border-bottom-color: #e2e2e2;
  border-bottom-width: 1px;
}

.type-select-label {
  font-size: 28px;
  padding-bottom: 15px;
}
.type-select-grid {
  font-size: 28px;
}
.scan-group {
  flex-direction: row;
}
.scan-input {
  flex: 1;
  font-size: 32px;
  margin-right: 20px;
  padding-top: 5px;
  padding-bottom: 5px;
}
.scan-icon {
  height: 40px;
  width: 40px;
}
.search {
  font-size: 26px;
  width: 120px;
  padding: 8px;
  text-align: center;
  background-color: #e2e2e2;
  border-radius: 6px;
}
.result-title {
  font-size: 28px;
  padding-bottom: 15px;
}
.result-content {
  flex-direction: row;
  justify-content: space-between;
}
.result-product {
  font-size: 28px;
}
.result-price {
  font-size: 28px;
}
.result-desc {
  font-size: 26px;
}
</style>
