<template>
    <div>
        <midea-accordion :menus="menus"></midea-accordion>
    </div>
</template>

<style>
</style>

<script>
  const modal = weex.requireModule('modal');
  import MideaAccordion from '@/midea-component/accordion.vue'

  export default {
    components: { MideaAccordion },
    data: () => ({
        menus: [
            {
                name: 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                iconPath: '',
                subMenu: [{
                    title: 'a1',
                    key: ''
                },{
                    title: 'a2',
                    key: ''
                },{
                    title: 'a3',
                    key: ''
                },{
                    title: 'a4',
                    key: ''
                },{
                    title: 'a5',
                    key: ''
                },{
                    title: 'a6',
                    key: ''
                },{
                    title: 'a7',
                    key: ''
                }]
            },{
                name: 'BBBBBBBBBB',
                subMenu: [{
                    title: 'b1',
                    key: ''
                }]
            },{
                name: 'CCCCCCCCCCCCCC',
                subMenu: [{
                    title: 'c1',
                    key: ''
                }]
            },{
                name: 'DDDDDDDDDDDDDDD',
                subMenu: [{
                    title: 'd1',
                    key: ''
                }]
            },{
                name: 'EEEEEEEEEEEEEE',
                subMenu: [{
                    title: 'e1',
                    key: ''
                }]
            },{
                name: 'FFFFFFFFFFF',
                subMenu: [{
                    title: 'f1',
                    key: ''
                }]
            },{
                name: 'GGGGGGGGGGGGGGGGGG',
                subMenu: [{
                    title: 'g1',
                    key: ''
                }]
            },{
                name: 'HHHHHHHHHHHHHHHHHHH',
                subMenu: [{
                    title: 'h1',
                    key: ''
                }]
            },{
                name: 'IIIIIIIIIIIIIIIIIIIIIII',
                subMenu: [{
                    title: 'i1',
                    key: ''
                }]
            },{
                name: 'JJJJJJJJJJJJJJJJJJJ',
                subMenu: [{
                    title: 'j1',
                    key: ''
                }]
            },{
                name: 'KKKKKKKKKKKKKKKKKKKKK',
                subMenu: [{
                    title: 'k1',
                    key: ''
                }]
            },{
                name: 'LLLLLLLLLLLLLLLLLLLLLL',
                subMenu: [{
                    title: 'l1',
                    key: ''
                }]
            },{
                name: 'MMMMMMMMMMMMMM',
                subMenu: [{
                    title: 'm1',
                    key: ''
                }]
            },{
                name: 'NNNNNNNN',
                subMenu: [{
                    title: 'n1',
                    key: ''
                }]
            },{
                name: 'OOOOOOOO',
                subMenu: [{
                    title: 'o1',
                    key: ''
                }]
            },{
                name: 'PPPPPPPPPPP',
                subMenu: [{
                    title: 'p1',
                    key: ''
                }]
            },{
                name: 'QQQQQQQQQQQQQQQQQQQ',
                subMenu: [{
                    title: 'q1',
                    key: ''
                }]
            },{
                name: 'RRRRRRRRRRRRR',
                subMenu: [{
                    title: 'r1',
                    key: ''
                }]
            }
        ]
    }),
    created () {
    },
    methods: {
    }
  };
</script>