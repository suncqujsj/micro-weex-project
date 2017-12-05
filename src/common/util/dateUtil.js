exports.api = {
     timestamptostr(timestamp) {
           var os = weex.config.env.platform;
           if(os.toLowerCase()=='android'){
                timestamp = timestamp + 28800;
            }
			timestamp=timestamp*1000;
			var d = new Date(timestamp);
			var jstimestamp;
			var mou = d.getMonth() + 1;
			var day = d.getDate();
			var hours = d.getHours();
			var min = d.getMinutes();
			var sec = d.getSeconds();
			if(hours < 10) {
				hours = "0" + hours;
			}
			if(mou < 10) {
				mou = "0" + mou;
			}
			if(day < 10) {
				day = "0" + day;
			}
			if(min < 10) {
				min = "0" + min;
			}
			if(sec < 10) {
				sec = "0" + sec;
			}
			jstimestamp = (d.getFullYear()) + "-" + (mou) + "-" +
				(day) + " " + (hours) + ":" + (min) + ":" + (sec);
			return jstimestamp;
	},
	getDate(longTime) {
			var time=this.timestamptostr(longTime);
            if (time != undefined && time != '') {
                time = time.substring(5, 10);
            }
            return time;
     },
    formatDate (longTime) {
			var time=this.timestamptostr(longTime)
            if (time != undefined && time != '') {
                time = time.substring(5, 7) + "月" + time.substring(8, 10) + "日"
            }
            return time;
     },
     formatTime(longTime) {
			var time=this.timestamptostr(longTime)
            if (time != undefined && time != '') {
                time = time.substring(11, 19);
            }
            return time;
     }

	    
    
}