/**
 * Created by sf
 * 2018/11/15
 */

import page1 from "./page1";
import page2 from "./page2";

let pages = [
    {
        name: '纯蒸',
        double: true,
        selected: true,
        tabs: page1.tabs
    },
    {
        name: '烤箱',
        double: true,
        selected: false,
        tabs: page2.tabs
    }
];

export default pages;