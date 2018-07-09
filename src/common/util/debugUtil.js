// ************ debug 相关 *************
const storage = weex.requireModule('storage');
const mm = weex.requireModule('modal');
const debugInfoDataChannel = new BroadcastChannel('debugInfoDataChannel')
const debugUtil = {
    isEnableDebugInfo: true,
    debugInfoKey: 'debugInfo',
    debugInfoDataChannel: debugInfoDataChannel,
    debugInfoExist: '',
    debugInfo: '',
    debugLogSizeLmite: 50000,
    debugLog(...messages) {
        if (!this.isEnableDebugInfo) return

        if (!this.debugInfoExist) {
            this.getDebugLog().then((data) => {
                this.debugInfoExist = (data || ' ***>>> ')
                this.debugLog(...messages)
            })
        } else {
            let debugInfoArray = []
            for (let index = 0; index < messages.length; index++) {
                let message = messages[index];
                if (typeof message == 'object') {
                    try {
                        message = JSON.stringify(message, null, 2)
                    } catch (error) {
                        debugInfoArray.push(error)
                    }
                } else if (typeof message == 'string') {
                    try {
                        message = JSON.stringify(JSON.parse(message), null, 2)
                    } catch (error) { }
                }
                debugInfoArray.push(message)
            }
            let newDebugInfo = new Date() + '\n' + debugInfoArray.join(", ") + '\n\n'
            this.debugInfo += newDebugInfo
            this.setItem(this.debugInfoKey, this.debugInfoExist + this.debugInfo)
        }
    },
    getDebugLog() {
        return new Promise((resolve, reject) => {
            this.getItem(this.debugInfoKey, (resp) => {
                let result = resp.data || ''
                resolve(result.substr(-this.debugLogSizeLmite))
            })
        })
    },
    resetDebugLog() {
        this.debugInfoExist = ''
        this.debugInfo = ''
    },
    cleanDebugLog() {
        this.debugInfoExist = '***'
        this.debugInfo = ''
        return new Promise((resolve, reject) => {
            this.removeItem(this.debugInfoKey, () => {
                this.debugInfoExist = '***'
                this.debugInfo = ''
                resolve()
            })
        })
    },


    getItem(key, callback) {
        storage.getItem(key, callback)
    },
    setItem(key, value, callback) {
        if (typeof value == 'object') {
            value = JSON.stringify(value);
        }
        value = value.substr(-this.debugLogSizeLmite)
        storage.setItem(key, value, callback)
    },
    removeItem(key, callback) {
        storage.removeItem(key, callback)
    }
}


debugInfoDataChannel.onmessage = (event) => {
    debugUtil.cleanDebugLog()
}

export default debugUtil