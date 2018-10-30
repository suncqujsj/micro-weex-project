/**
 * Created by sf
 * 2018/10/30
 */

let commonMixin = {
    data(){
        return {
            wrapHeight: weex.config.env.deviceHeight / weex.config.env.deviceWidth * 750,
        };
    }
};

export default commonMixin