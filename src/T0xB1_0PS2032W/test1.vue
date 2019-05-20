<style lang="less" type="text/less">

</style>

<template>
    <time-picker :value="value" :hms="hms" @change="onChange"></time-picker>
</template>

<script>

    import nativeService from '@/common/services/nativeService';
    import timePicker from '@/midea-component/sf/custom/timePicker.vue'

    Array.prototype.multiply = function(){
        this.map(()=>{
            this.push(item*item);
        },this)
    };

    // Array.prototype.multiply = function(){
    //     this.push(...this.map(i => i*i));
    // };

    const actions = new Map([
        [1, ['processing','IndexPage']],
        [2, ['fail','FailPage']],
        [3, ['fail','FailPage']],
        [4, ['success','SuccessPage']],
        [5, ['cancel','CancelPage']],
        ['default', ['other','Index']]
    ]);

    const users = [{
        name: 'Yazeed',
        age: 25
    }, {
        name: 'Sam',
        age: 30
    }, {
        name: 'Bill',
        age: 20
    }];

    export default {
        data(){
            return {
                value: [1,1,0],
                hms:[1,1,1]
            }
        },
        created(){
            // const a = [1,2,3,4,5];
            // a.multiply()
            // nativeService.alert(a);
            nativeService.alert(users.map(this.getName))
            // this.test()

        },
        components:{timePicker},
        methods: {
            onChange(e){
                // nativeService.alert(e.value);
            },
            test : (status)=>{
                let action = actions.get(status) || actions.get('default')
                nativeService.alert(action)
            },
            sayHi : (name) => `Hi, ${name}!`,
            double: (x) => x*2,
            getFirstName: (obj) => obj.firstName,
            len: (array) => array.length,
            even: (num) => num%2 === 0,
            getName: (user) => user.name
        }
    }
</script>


