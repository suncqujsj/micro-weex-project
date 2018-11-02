/**
 * Created by sf
 * 2018/11/1
 */

let detailModalMixin  = {
    data(){
        return {
            showDetailModal: true
        };
    },
    methods: {
        showDetailModal(){
            this.showDetailModal = true;
        },
        closeDetailModal(){
            this.showDetailModal = false;
        }
    }
};

export default detailModalMixin;