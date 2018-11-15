/**
 * Created by sf
 * 2018/11/15
 */

import page1 from "./page1";
import page2 from "./page2";

let pages = [
    {
        name: '蒸汽',
        selected: false,
        tabs: page1.tabs
    },
    {
        name: '烤箱',
        selected: true,
        tabs: page2.tabs
    }
];

export default pages;