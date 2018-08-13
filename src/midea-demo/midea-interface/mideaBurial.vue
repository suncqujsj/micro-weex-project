<template>
    <div>
        <midea-header title="burialPoint埋点" :isImmersion="false" @leftImgClick="back"></midea-header>
        <midea-button text="执行burialPoint" type="green" @mideaButtonClicked="mideaButtonClicked">
        </midea-button>
    </div>
</template>
<style>

</style>
<script>
    import mideaHeader from '@/midea-component/header.vue'
    import mideaButton from '@/midea-component/button.vue'
    import nativeService from '@/common/services/nativeService'
        
    module.exports = {
        components: { mideaHeader, mideaButton },
        data() {
            return {}
        },
        methods: {
            mideaButtonClicked() {
                nativeService.burialPoint({//埋点客厅
                    pageName: 'testPageName',
                    subAction: 'meiju_test_operate'
                })
            }
        },
        created() {
        }
    };
</script>


