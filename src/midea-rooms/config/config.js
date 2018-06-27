export const domain = 'http://iot-ali-test.smartmidea.net'
export const url = {
    scene: {
        applianceAdd: domain +'/v1/scene/appliance/add',
        applianceDelete: domain + '/v1/scene/appliance/delete',
        list: domain + '/v1/scene/list',
        detail: domain + '/v1/scene/detail',
        supportList: domain + '/v1/scene/support/type/list',
        modelSet: domain + '/v1/scene/model/set',
        modeExecute: domain + '/v1/scene/model/execute',
        optimize: domain + '/v1/scene/optimize',
        status: domain + '/v1/scene/status/get',
        record: domain + '/v1/scene/record/list',
        recordDelete: domain + '/v1/scene/record/delete',
    },
    auto: {
        list: domain + '/v1/scene/auto/list',
        add: domain + '/v1/scene/auto/add',
        detail: domain + '/v1/scene/auto/detail',
        update: domain + '/v1/scene/auto/update',
        delete: domain + '/v1/scene/auto/delete',
        execute: domain + '/v1/scene/auto/execute',
        status: domain + '/v1/scene/auto/status/get',
        recordUpload: domain + '/v1/scene/auto/record/upload',
        record: domain + '/v1/scene/auto/record/list',
        recordDelete: domain + '/v1/scene/auto/record/delete',
    }
}
