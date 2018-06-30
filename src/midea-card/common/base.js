
const bundleUrl = weex.config.bundleUrl
const globalEvent = weex.requireModule('globalEvent')
const storage = weex.requireModule('storage')


export default {
    components: {
    },
    data: () => ({
        pushKey: "receiveMessage",
        pushKeyOnline: "receiveMessageFromApp",
        onlineStatus: ""
    }),
    computed: {
        pageHeight() {
            return 750 / weex.config.env.deviceWidth * weex.config.env.deviceHeight
        }
    },
    methods: {
        handleNotification() {
        	console.log("handleNotification");
        	let me = this;
        	globalEvent.addEventListener(this.pushKey, (data) => {
        		me.queryStatus();
	        });
	        globalEvent.addEventListener(this.pushKeyOnline, (data) => {
        		if(data && data.messageType == "deviceOnlineStatus") {
        			if(data.messageBody && data.messageBody.onlineStatus == "online") {
        				me.onlineStatus = "1";
        			} else if(data.messageBody && data.messageBody.onlineStatus == "offline") {
        				me.onlineStatus = "0";
        			} else {
        				me.onlineStatus = "0";
        			}
        		}
	        });
        }
    },
    init() {
        console.log('init');
    },
    ready() {
        console.log("ready")
    },
    created() {
    	console.log("created");
        this.handleNotification();
    },
    destroyed() {
        console.log("destroyed")
    }
};