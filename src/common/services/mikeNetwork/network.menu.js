export default {

    // 获取人气菜谱
    getHotMenus: {
        url: '/home/midea/menu/hot',
        method: 'POST'
    },
    // 获取所有合集
    getAllCollections: {
        url: "/home/midea/collection/all",
        method: "POST"
    },
    // 获取合集详情
    getCollectionDetail: {
        url: "/home/midea/collection/{{collectionId}}",
        method: "POST",
        segments: ['collectionId']
    },
    // 获取菜谱分类
    getMenuSort: {
        url: '/home/midea/menu/sort',
        method: 'POST'
    }
}