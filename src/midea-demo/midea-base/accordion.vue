<template>
    <div class="wrapper">
        <midea-header title="accordion" :isImmersion="isImmersion" @leftImgClick="back"></midea-header>
        <midea-accordion :menus="menus"></midea-accordion>
    </div>
</template>

<style>
</style>

<script>
import base from '../base'
import MideaAccordion from '@/midea-component/accordion.vue'

export default {
    components: { MideaAccordion },
    mixins: [base],
    data: () => ({
        menus: [
            {
                name: '标题标题标题标题标题',
                iconPath: '',
                subMenu: [{
                    title: 'a1',
                    key: ''
                }, {
                    title: 'a2',
                    key: ''
                }, {
                    title: 'a3',
                    key: ''
                }, {
                    title: 'a4',
                    key: ''
                }, {
                    title: 'a5',
                    key: ''
                }, {
                    title: 'a6',
                    key: ''
                }, {
                    title: 'a7',
                    key: ''
                }]
            }, {
                name: '标题标题标题标题标题标题标题',
                subMenu: [{
                    title: 'b1',
                    key: ''
                }]
            }
        ]
    }),
    created() {
    },
    methods: {
    }
};
</script>