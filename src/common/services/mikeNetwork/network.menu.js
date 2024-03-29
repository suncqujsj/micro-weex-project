import MikeMenu from "@/common/pages/src/mike/model/MMenu";
import nativeService from "@/common/services/nativeService";

export default {

    // 获取人气菜谱
    getHotMenus: {
        url: '/home/midea/menu/hot',
        method: 'POST'
    },
    // 获取所有合集
    getAllCollections: {
        url: "/home/midea/menu/collection/all",
        method: "POST"
    },
    // 获取合集详情
    getCollectionDetail: {
        url: "/home/midea/collection/:collectionId",
        method: "POST",
        segments: ['collectionId']
    },
    // 获取菜谱分类
    getMenuTypes: {
        url: '/home/midea/menu/listall/alltabs',
        method: 'POST'
    },

    // 根据分类和词汇查询菜谱
    searchMenus: {
        url: "/home/midea/menu/listall/tab",
        method: "POST",
        response: (data) => {

            data = data.map((item) => {
                return new MikeMenu(item);
            });
            return data
        }
    }
}