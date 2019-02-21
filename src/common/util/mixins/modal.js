/**
 * Created by sf
 * 2018/11/14
 */

let modalMixin  = {
    data(){
        return {
            modalVisibility: false
        };
    },
    methods: {
        showModal(){
            this.modalVisibility = true;
        },
        closeModal(){
            this.modalVisibility = false;
        }
    }
};

export default modalMixin;