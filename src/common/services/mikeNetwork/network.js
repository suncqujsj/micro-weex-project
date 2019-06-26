import nativeService from "@/common/services/nativeService";
import menu from './network.menu'
import mine from './network.mine';

let networkActions = {
    'menu': menu,
    'mine': mine
};

import {NetworkAPIBase} from "./network.consts"

let networkModel = {};

Object.keys(networkActions).map((collectionKey) => {
    let collection = networkActions[collectionKey];
    let structuredCollection = {}
    Object.keys(collection).map((requestKey) => {
        let request = collection[requestKey];
        structuredCollection[requestKey] = transformActionToRequest(request)
    })

    networkModel[collectionKey] = structuredCollection;
})

function transformActionToRequest(networkAction) {


    return (options) => {

        let params = options || {};


        let url = NetworkAPIBase + networkAction.url;
        if (typeof url === "undefined") {

            return
        }
        if (networkAction.segments && network.segments.length > 0) {
            // has segment params
            for (let segment of networkAction.segments) {
                if (segment in params) {
                    url = url.replace(':' + segment, params[segment])
                }
            }
        }

        const requestOptions = {
            url: url,
            type: 'json',
            method: networkAction.method,
            headers: {'Content-Type': 'application/json'},

            body: params && params.length > 0 ? JSON.stringify(params) : params
        };

        return new Promise((resolve, reject) => {

            nativeService.sendHttpRequest(requestOptions).then(function (res) {
                let data = res.data;

                //TODO :check on status code

                if (res.code && res.code !== 200) {

                    if (res.reason && res.reason.length > 0) {
                        nativeService.toast(res.reason)
                    }
                    reject(res)
                    return;
                }

                if (typeof networkAction.response === 'function') {

                    // TODO : structure on model to handle data , and sepecify the key/values
                    resolve(networkAction.response(data));
                } else {
                    resolve(data)
                }
            }).catch((resp) => {
                nativeService.alert(resp);

                reject(resp)
            });
        })


    }
}

export default networkModel;