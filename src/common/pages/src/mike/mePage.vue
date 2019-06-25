<style lang="less" type="text/less">

    @header-height: 580px;
    .me-page-container {

        flex: 1;
        display: flex;
        flex-direction: column;
        position: relative;

    }


    .eaten-scroller {
        position: relative;
        padding-top: @header-height;
    }


    .segment-content {
        flex: 3;
        flex-grow: 3;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;

    }

    .favorite-segment-content {

        position: relative;

        flex-direction: column;


    }

    .favorite-waterfall {

        width: 750px;
        padding: @header-height+100px 39px 100px 39px;
    }

    .share-segement-content {

    }

    .share-list {

    }

    .share-list-empty-cell-content {
        width: 750;
        height: @header-height;
    }

    .share-list-cell {
        padding: 50px 57px;
    }

    .section {

        padding: 66px 40px;
    }

    .section-title {
        margin-bottom: 27px;

        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }

    .section-title-text {
        font-size: 16px*2;
        color: #333333;
        font-weight: bold;
    }

    .more {
        padding-right: 30px;
        font-size: 11px*2;
        color: #1a1a1a;
    }

    .me-header-wrapper {
        position: absolute;
        top: 0;
        left: 0;

        width: 750px;
    }

</style>
<template>
    <div class="me-page-container">

        <!--        烹饪过的/看过的/用过的模式 -->

        <div class="segment-content eaten-segment-content" v-if="isEatenShown">

            <scroller class="eaten-scroller" ref="eatenScroller">


                <div class="section" @scroll="onScroll">
                    <div class="section-title">

                        <text class="section-title-text">烹饪过的食谱</text>
                        <text class="more">more</text>
                    </div>

                    <image-grid :images="images"></image-grid>
                </div>
                <div class="section">
                    <div class="section-title">

                        <text class="section-title-text">使用过的模式</text>
                        <text class="more">more</text>
                    </div>

                    <commend-list-item v-for="item in commends" :type="item.type" :degree="item.degree"
                                       :time="item.time"></commend-list-item>

                </div>


                <div class="section">
                    <div class="section-title">

                        <text class="section-title-text">我看过的</text>
                        <text class="more">more</text>
                    </div>

                    <image-grid :images="images"></image-grid>
                </div>


            </scroller>

        </div>
        <!--        收藏的 -->
        <div class="segment-content favorite-segment-content" v-if="isFavShown">
            <!--            <my-favorite-waterfall></my-favorite-waterfall>-->

            <waterfall column-count="2" column-width="322" column-gap="28" show-scrollbar="false" scrollable="true"
                       class="favorite-waterfall" @scroll="onScroll" ref="waterfallScroller">

                <!--                <header ref="waterfallHeader">-->
                <!--                    <me-header :is-eaten-shown="isEatenShown" :is-fav-shown="isFavShown"-->
                <!--                               :is-shared-shown="isSharedShown"-->
                <!--                               :user="user"></me-header>-->
                <!--                </header>-->
                <cell v-for="(item,index) in favoriteData" class="cell">

                    <my-favorite-waterfall-item :img-height="index%2===0?500:250"></my-favorite-waterfall-item>

                    <!--          -->
                </cell>
            </waterfall>
        </div>

        <!--        分享过的 -->
        <div class="segment-content share-segement-content" v-if="isSharedShown">


            <list class="share-list " @scroll="onScroll" ref="shareScroller">

                <cell class="share-list-empty-cell">
                    <div class="share-list-empty-cell-content">

                    </div>
                </cell>
                <!--                <cell ref="shareHeader">-->
                <!--                    <me-header :is-eaten-shown="isEatenShown" :is-fav-shown="isFavShown"-->
                <!--                               :is-shared-shown="isSharedShown"-->
                <!--                               :user="user"></me-header>-->
                <!--                </cell>-->
                <cell class="share-list-cell" v-for="item in shareList">
                    <recipe-share-list-item :menu="item"></recipe-share-list-item>

                </cell>
            </list>
        </div>


        <div class="me-header-wrapper" ref="meHeader">
            <me-header :is-eaten-shown="isEatenShown" :is-fav-shown="isFavShown" :is-shared-shown="isSharedShown"
                       :user="user" @onTagItemChanged="clickOnTagItem"></me-header>
        </div>


    </div>


</template>

<script>

    import Binding from 'weex-bindingx';


    import ImageGrid from "@/common/pages/src/mike/component/imageGrid.vue";

    const dom = weex.requireModule('dom');
    import nativeService from "@/common/services/nativeService";
    import CommendListItem from "@/common/pages/src/mike/component/commendListItem.vue";
    import RecipeShareListItem from "@/common/pages/src/mike/component/recipeShareListItem.vue";
    import MyFavoriteWaterfallItem from "@/common/pages/src/mike/component/myFavoriteWaterfallItem.vue";
    import MeHeader from "@/common/pages/src/mike/component/meHeader.vue";


    export default {
        props: [],
        data() {
            return {
                selectingTag: 0, // 0 : eaten 1 : hearted/faved 2 : shared

                user: {},
                isHeaderFixed: false,
                commends: [
                    {
                        type: '发酵',
                        degree: '100度',
                        time: '01分 00秒'

                    },
                    {
                        type: '发酵',
                        degree: '100度',
                        time: '01分 00秒'

                    }, {
                        type: '发酵',
                        degree: '100度',
                        time: '01分 00秒'

                    }
                ],
                shareList: [
                    {
                        name: "牛肉披萨",
                    }, {
                        name: "牛肉披萨",
                    }, {
                        name: "牛肉披萨",
                    }, {
                        name: "牛肉披萨",
                    }, {
                        name: "牛肉披萨",
                    }
                ],
                favoriteData: [
                    {
                        name: "牛肉披萨",
                    }, {
                        name: "牛肉披萨",
                    }, {
                        name: "牛肉披萨",
                    }, {
                        name: "牛肉披萨",
                    }, {
                        name: "牛肉披萨",
                    },
                    {
                        name: "牛肉披萨",
                    }, {
                        name: "牛肉披萨",
                    }, {
                        name: "牛肉披萨",
                    }, {
                        name: "牛肉披萨",
                    }, {
                        name: "牛肉披萨",
                    },
                    {
                        name: "牛肉披萨",
                    }, {
                        name: "牛肉披萨",
                    }, {
                        name: "牛肉披萨",
                    }, {
                        name: "牛肉披萨",
                    }, {
                        name: "牛肉披萨",
                    },
                    {
                        name: "牛肉披萨",
                    }, {
                        name: "牛肉披萨",
                    }, {
                        name: "牛肉披萨",
                    }, {
                        name: "牛肉披萨",
                    }, {
                        name: "牛肉披萨",
                    },
                ],
                images: [
                    {
                        src: 'https://via.placeholder.com/215?text=Loading'
                    },
                    {
                        src: 'https://via.placeholder.com/215?text=Loading'
                    },
                    {
                        src: 'https://via.placeholder.com/215?text=Loading'
                    },
                    {
                        src: 'https://via.placeholder.com/215?text=Loading'
                    },
                    {
                        src: 'https://via.placeholder.com/215?text=Loading'
                    },
                    {
                        src: 'https://via.placeholder.com/215?text=Loading'
                    },
                    {
                        src: 'https://via.placeholder.com/215?text=Loading'
                    }, {
                        src: 'https://via.placeholder.com/215?text=Loading'
                    }, {
                        src: 'https://via.placeholder.com/215?text=Loading'
                    }
                ],
                eatenBindingToken: undefined,
                favBindingToken: undefined,
                shareBindingToken: undefined,
            }
        },
        components: {
            MeHeader,
            MyFavoriteWaterfallItem,
            RecipeShareListItem,
            CommendListItem,
            ImageGrid
        },

        computed: {
            isEatenShown() {
                return this.selectingTag === 0;
            },
            isFavShown() {
                return this.selectingTag === 1;
            },
            isSharedShown() {
                return this.selectingTag === 2;
            },


        },
        created() {

            this.loadUserInfo();
        },
        mounted() {
            this.bindingHeadAnimation();

        },
        destroyed() {

            this.unbindAnimation();
        },


        methods: {


            clickOnTagItem(index) {

                // this.unbindAnimation();

                this.selectingTag = index;


                setTimeout(() => {

                    this.bindingHeadAnimation()
                })

            },

            unbindAnimation() {


                Binding.unbindAll()
                // if (this.eatenBindingToken && this.eatenBindingToken.token) {
                //     BindingX.unbind({
                //         token: this.eatenBindingToken.token,
                //         eventType: 'scroll'
                //     })
                // }
                // if (this.favBindingToken && this.favBindingToken.token) {
                //     BindingX.unbind({
                //         token: this.favBindingToken.token,
                //         eventType: 'scroll'
                //     })
                // }
                // if (this.shareBindingToken && this.shareBindingToken.token) {
                //     BindingX.unbind({
                //         token: this.shareBindingToken.token,
                //         eventType: 'scroll'
                //     })
                // }


            },

            bindingHeadAnimation() {


                let scroller = this.isEatenShown ? this.$refs.eatenScroller.ref : (this.isFavShown ? this.$refs.waterfallScroller.ref : this.$refs.shareScroller.ref)
                let header = this.$refs.meHeader.ref;

                Binding.bind({
                    eventType: 'scroll',
                    anchor: scroller,
                    props: [
                        {
                            element: header,
                            property: "transform.translateY",
                            expression: "y>0?(0-y<-520?-520:0-y):0"
                        },


                    ]
                }, function (e) {
                });


            },

            onScroll(e) {

                // let contentOffset = e.contentOffset;
                //
                // nativeService.toast(contentOffset)
                // if (!this.headerSize) {
                //     dom.getComponentRect(this.$refs.header, (res) => {
                //         this.headerSize = res.size;
                //     })
                //     return;
                // }
                //
                // if (-contentOffset.y > this.headerSize.height - 200) {
                //     this.isHeaderFixed = true;
                // } else {
                //     this.isHeaderFixed = false;
                // }
                // TODO: need more testing on the scrolling


            },


            loadUserInfo() {
                nativeService.getUserInfo().then(res => {
                    this.user = res;
                })
            }

        }
    }
</script>