export default {
    /*增加晒图*/

    addMenuShowPic: {
        url: '/midea/menu/mine/menushowpic/add',
        method: 'POST'
    },

    /*晒图查询*/
    getMenuShowPicDetail: {
        url: '/midea/menu/mine/menushowpic/:menuId',
        method: 'POST',
        segments: ['menuId']
    },

    /*增加菜谱打分*/

    addMenuScore: {
        url: "/midea/menu/mine/score/add",
        method: "POST"
    },

    /*查询菜谱分数*/
    getMenuScore: {
        url: "/midea/menu/mine/score/:menuId",
        method: "POST",
        segments: ['menuId']
    },

    /*增加浏览过的菜谱*/
    addBrowsedMenu: {
        url: "/midea/menu/mine/browse/add",
        method: "POST"
    },

    /*查询浏览过的菜谱*/
    getBrowsedMenu: {
        url: "/midea/menu/mine/browse/:userId",
        method: 'POST',
        segments: ['userId']
    },

    /*增加收藏/点赞的菜谱*/

    addFavoriteMenu: {
        url: '/midea/menu/mine/favorite/add',
        method: "POST",

    },

    /*查询收藏/点赞的菜谱*/

    getFavoriteMenu: {
        url: "/midea/menu/mine/favorite/:userId",
        method: "POST",
        segments: ['userId']
    },

    /*增加转发的菜谱*/

    addTransmitMenu: {
        url: "/midea/menu/mine/transmit/add",
        method: "POST"
    },

    /*查询转发过的菜谱*/
    getTransmitMenu: {
        url: "/midea/menu/mine/transmit/:userId",
        method: "POST"
    }
}