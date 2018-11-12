/**
 * Created by sf
 * 2018/10/30
 */

let commonMixin = {
    data(){
        return {
            wrapHeight: weex.config.env.deviceHeight / weex.config.env.deviceWidth * 750,
        };
    },
    methods:{
        dList(list, cols){
            var length=list.length;
            var mod=list.length%cols;
            if(mod!=0){
                var appendLen= cols-mod;
                for(var i=0;i<appendLen;i++){
                    list.push('');
                }
            }
            var resultList=[];
            var obj={};
            var index=0;
            // debugger;
            for(var j=0;j<list.length;j++){
                var item=list[j];
                // item.index=index;
                index++;
                if(j%cols==0){
                    obj.items=[];
                }
                obj.items.push(item);
                if(j%cols==cols-1){
                    resultList.push(Object.assign({}, obj));
                }
            }
            return resultList;
        }
    }
};

export default commonMixin