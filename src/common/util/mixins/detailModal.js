/**
 * Created by sf
 * 2018/11/1
 */
let detailModalMixin  = {
    data(){
        return {
            showDetailVisibility: false
        };
    },
    computed:{
        detailEmpty: function(){
            return !this.currentItem || !this.currentItem.detail;
        },
        foodMaterialItems(){
            if(this.detailEmpty) {
                return [];
            }

            let list = [];
            let foodMaterial= JSON.parse(JSON.stringify(this.currentItem.detail.foodMaterial));
            let foodMaterialItems = foodMaterial.split('\n');
            if(foodMaterial.indexOf("end") != -1){
                foodMaterialItems = foodMaterial.split('end');
            }
            let itemLen = foodMaterialItems.length;
            for(let i=0;i<itemLen;i++) {
                let itemArr = foodMaterialItems[i].split(/\s+/);
                let item = {
                    name: itemArr[0],
                    weight: itemArr[1]
                };
                list.push(JSON.parse(JSON.stringify(item)));
            }
            return list;
        },
        cookingSteps(){
            if(this.detailEmpty) {
                return [];
            }

            let list = [];
            let cookingSteps = this.currentItem.detail.cookingSteps;
            let steps = cookingSteps.split('\n');
            if(cookingSteps.indexOf("end") != -1){
                steps = cookingSteps.split('end');
            }
            let stepLen = steps.length;
            for(let i=0;i<stepLen;i++) {
                let step = steps[i];
                list.push(step.split('.')[1]);
            }
            return list;
        }
    },
    methods: {
        showDetailModal(){
            this.settingClickRecord = true;
            this.showDetailVisibility = true;
        },
        closeDetailModal(){
            this.settingClickRecord = false;
            this.showDetailVisibility = false;
        }
    }
};

export default detailModalMixin;