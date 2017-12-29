var CRC8_BABLE = [ 0, 0xFF & 94, 0xFF & 188, 0xFF & 226,
		0xFF & 97, 0xFF & 63, 0xFF & 221, 0xFF & 131, 0xFF & 194, 0xFF & 156, 0xFF & 126,
		0xFF & 32, 0xFF & 163, 0xFF & 253, 0xFF & 31, 0xFF & 65, 0xFF & 157, 0xFF & 195,
		0xFF & 33, 0xFF & 127, 0xFF & 252, 0xFF & 162, 0xFF & 64, 0xFF & 30, 0xFF & 95,
		0xFF & 1, 0xFF & 227, 0xFF & 189, 0xFF & 62, 0xFF & 96, 0xFF & 130, 0xFF & 220,
		0xFF & 35, 0xFF & 125, 0xFF & 159, 0xFF & 193, 0xFF & 66, 0xFF & 28, 0xFF & 254,
		0xFF & 160, 0xFF & 225, 0xFF & 191, 0xFF & 93, 0xFF & 3, 0xFF & 128, 0xFF & 222,
		0xFF & 60, 0xFF & 98, 0xFF & 190, 0xFF & 224, 0xFF & 2, 0xFF & 92, 0xFF & 223,
		0xFF & 129, 0xFF & 99, 0xFF & 61, 0xFF & 124, 0xFF & 34, 0xFF & 192, 0xFF & 158,
		0xFF & 29, 0xFF & 67, 0xFF & 161, 0xFF & 255, 0xFF & 70, 0xFF & 24, 0xFF & 250,
		0xFF & 164, 0xFF & 39, 0xFF & 121, 0xFF & 155, 0xFF & 197, 0xFF & 132, 0xFF & 218,
		0xFF & 56, 0xFF & 102, 0xFF & 229, 0xFF & 187, 0xFF & 89, 0xFF & 7, 0xFF & 219,
		0xFF & 133, 0xFF & 103, 0xFF & 57, 0xFF & 186, 0xFF & 228, 0xFF & 6, 0xFF & 88,
		0xFF & 25, 0xFF & 71, 0xFF & 165, 0xFF & 251, 0xFF & 120, 0xFF & 38, 0xFF & 196,
		0xFF & 154, 0xFF & 101, 0xFF & 59, 0xFF & 217, 0xFF & 135, 0xFF & 4, 0xFF & 90,
		0xFF & 184, 0xFF & 230, 0xFF & 167, 0xFF & 249, 0xFF & 27, 0xFF & 69, 0xFF & 198,
		0xFF & 152, 0xFF & 122, 0xFF & 36, 0xFF & 248, 0xFF & 166, 0xFF & 68, 0xFF & 26,
		0xFF & 153, 0xFF & 199, 0xFF & 37, 0xFF & 123, 0xFF & 58, 0xFF & 100, 0xFF & 134,
		0xFF & 216, 0xFF & 91, 0xFF & 5, 0xFF & 231, 0xFF & 185, 0xFF & 140, 0xFF & 210,
		0xFF & 48, 0xFF & 110, 0xFF & 237, 0xFF & 179, 0xFF & 81, 0xFF & 15, 0xFF & 78,
		0xFF & 16, 0xFF & 242, 0xFF & 172, 0xFF & 47, 0xFF & 113, 0xFF & 147, 0xFF & 205,
		0xFF & 17, 0xFF & 79, 0xFF & 173, 0xFF & 243, 0xFF & 112, 0xFF & 46, 0xFF & 204,
		0xFF & 146, 0xFF & 211, 0xFF & 141, 0xFF & 111, 0xFF & 49, 0xFF & 178, 0xFF & 236,
		0xFF & 14, 0xFF & 80, 0xFF & 175, 0xFF & 241, 0xFF & 19, 0xFF & 77, 0xFF & 206,
		0xFF & 144, 0xFF & 114, 0xFF & 44, 0xFF & 109, 0xFF & 51, 0xFF & 209, 0xFF & 143,
		0xFF & 12, 0xFF & 82, 0xFF & 176, 0xFF & 238, 0xFF & 50, 0xFF & 108, 0xFF & 142,
		0xFF & 208, 0xFF & 83, 0xFF & 13, 0xFF & 239, 0xFF & 177, 0xFF & 240, 0xFF & 174,
		0xFF & 76, 0xFF & 18, 0xFF & 145, 0xFF & 207, 0xFF & 45, 0xFF & 115, 0xFF & 202,
		0xFF & 148, 0xFF & 118, 0xFF & 40, 0xFF & 171, 0xFF & 245, 0xFF & 23, 0xFF & 73,
		0xFF & 8, 0xFF & 86, 0xFF & 180, 0xFF & 234, 0xFF & 105, 0xFF & 55, 0xFF & 213,
		0xFF & 139, 0xFF & 87, 0xFF & 9, 0xFF & 235, 0xFF & 181, 0xFF & 54, 0xFF & 104,
		0xFF & 138, 0xFF & 212, 0xFF & 149, 0xFF & 203, 0xFF & 41, 0xFF & 119, 0xFF & 244,
		0xFF & 170, 0xFF & 72, 0xFF & 22, 0xFF & 233, 0xFF & 183, 0xFF & 85, 0xFF & 11,
		0xFF & 136, 0xFF & 214, 0xFF & 52, 0xFF & 106, 0xFF & 43, 0xFF & 117, 0xFF & 151,
		0xFF & 201, 0xFF & 74, 0xFF & 20, 0xFF & 246, 0xFF & 168, 0xFF & 116, 0xFF & 42,
		0xFF & 200, 0xFF & 150, 0xFF & 21, 0xFF & 75, 0xFF & 169, 0xFF & 247, 0xFF & 182,
		0xFF & 232, 0xFF & 10, 0xFF & 84, 0xFF & 215, 0xFF & 137, 0xFF & 107, 0xFF & 53 ];
export default {
    convertTo16Str:function(byteArray){
		var str16 = new Array();
		if(byteArray == undefined){return str16.join('');}
		for(var i = 0;i < byteArray.length; i++){
			if(byteArray[i].toString(16).length == 1){
				str16.push("0" + byteArray[i].toString(16).toUpperCase());
			}else{
				str16.push(byteArray[i].toString(16).toUpperCase());
			}
		}
		return str16.join('');
	},
	convertTo2Str:function(byteArray){
		var str2 = new Array();
		if(byteArray == undefined){return str2.join('');}
		for(var i = 0;i < byteArray.length; i++){
			if(byteArray[i].toString(2).length != 8){
				var appendStr = "00000000".substring(0,8-byteArray[i].toString(2).length);
				str2.push(appendStr + byteArray[i].toString(2));
			}else{
				str2.push(byteArray[i].toString(2));
			}
		}
		return str2.join('');
	},
	loadByStr16:function(str16){
		var byteArray = new Array();
		if(str16 == undefined){return byteArray;}
		var data = str16;
		for(var i=0;i<data.length;i++){
			if(i%2 == 0){
				byteArray[i/2] = parseInt(data.substring(i,i+2));
			}
		}
		return byteArray;
	},
	initBytes:function(pBytes, pValue){
		for(var i=0;i<pBytes.length;i++){
			pBytes[i] = pValue & 0xFF;
		}
		return pBytes;
	},
	setByte:function(pBytes,pIndex,pValue){
		pBytes[pIndex] = pValue & 0xFF;
		return pBytes;
	},
	getByte:function(pBytes,pIndex){
		return pBytes[pIndex] & 0xFF;
	},
	_setBit:function(pByte,pIndex,pValue){
		pByte = pByte & (~(0x01 << pIndex) & 0xFF) | (pValue & 0x01) << pIndex;
		return pByte;
	},
	_getBit:function(pByte,pIndex){
		return (pByte >> pIndex) & 0x01;
	},
	getBit:function(pBytes,pIndex,pBitIndex){
		return this._getBit(pBytes[pIndex],pBitIndex);
	},
	setBit:function(pBytes,pIndex,pBitIndex,pValue){
		pBytes[pIndex] = this._setBit(pBytes[pIndex],pBitIndex,pValue);
		return pBytes;
	},
	_getBits:function(pByte,pStartIndex,pEndIndex){
		if(pStartIndex > pEndIndex){
			return this._getBits(pByte,pEndIndex,pStartIndex);
		}
		var tempVal = 0x00;
		for(var i=pStartIndex;i<=pEndIndex;i++){
			tempVal = tempVal | this._getBit(pByte,i) << (i-pStartIndex);
		}
		return tempVal;
	},
	_setBits:function(pByte,pStartIndex,pEndIndex,pValue){
		if(pStartIndex > pEndIndex){
			return this._setBits(pByte,pEndIndex,pStartIndex,pValue);
		}else{
			for(var i=pStartIndex;i<=pEndIndex;i++){
				pByte =this._setBit(pByte,i,this._getBit(pValue,i-pStartIndex));
			}
		}
		return pByte;
	},
	getBits:function(pBytes,pIndex,pBitStartIndex,pBitEndIndex){
		return this._getBits(pBytes[pIndex],pBitStartIndex,pBitEndIndex);
	},
	setBits:function(pBytes,pIndex,pBitStartIndex,pBitEndIndex,pValue){
		pBytes[pIndex] =this._setBits(pBytes[pIndex],pBitStartIndex,pBitEndIndex,pValue);
		return pBytes;
	},
	createMessage:function(pApplianceType,pMessageType,pMessageBody,pApplianceProtocolVersion){
		var _applianceId = [0x00,0x00,0x00,0x00,0x00,0x00];
		if(pApplianceProtocolVersion != undefined){
			_applianceId[5] = pApplianceProtocolVersion & 0xFF;
		}
		var _bytesMessage = new Array();
		_bytesMessage.push(0xAA);
		if(pMessageBody == undefined || pMessageBody.length == 0){
			_bytesMessage.push(0x0A);
		}else{
			_bytesMessage.push(0x0A + pMessageBody.length);
		}
		_bytesMessage.push(pApplianceType);
		_bytesMessage = _bytesMessage.concat(_applianceId);
		_bytesMessage.push(pMessageType);
		if(pMessageBody == undefined || pMessageBody.length == 0){
		}else{
			_bytesMessage = _bytesMessage.concat(pMessageBody);
		}
		var sumContent = 0x00;
		if(pMessageBody == undefined || pMessageBody.length == 0){
		}else{
			for(var i=0;i<pMessageBody.length;i++){
				sumContent = sumContent + pMessageBody[i];
			}
		}
		_bytesMessage.push( (~(_bytesMessage[1] + _bytesMessage[2] + _bytesMessage[3] + _bytesMessage[4] + _bytesMessage[5] + _bytesMessage[7] + _bytesMessage[8] + _bytesMessage[9] + sumContent) + 1) & 0xFF);
		return _bytesMessage;
	},
	createMessageBody:function(pLen){
		var _bytesMessage = new Array(pLen);
		this.initBytes(_bytesMessage, 0x00);
		return _bytesMessage;
	},
	createMessageBodyFA:function(pLen){
		var _bytesMessage = new Array(pLen);
		this.initBytes(_bytesMessage, 0x00);
		// 修改对应：例如摇头和定时这两种状态都会随着机器工作 而变化，如果APP总 是靠 着之前记忆的 数据 发送控制命 令，就会影响机器工作的状态。特别是定时。
		// mdSmart.message.setByte(_bytesMessage,8,0x80);
		// mdSmart.message.setByte(_bytesMessage,14,0xFF);

		this.setBit(_bytesMessage, 4, 7, 0x01); //默认0 1不控制开关机
        this.setBit(_bytesMessage, 8, 7, 0x01); //默认0 1不控制摇头
		return _bytesMessage;
	},
	CRC8:function(pBytes) {
		var crc8Byte = 0x00;
		for (var index = 0; index < pBytes.length - 1; index++) {
			crc8Byte = 0xFF & CRC8_BABLE[0xFFFF & (0x00FF & (crc8Byte ^ pBytes[index]))];
		}
		return crc8Byte;
	},
	converMessageToBridgePStr:function(pMessage){
		return JSON.stringify({
			messageBody: pMessage
		});
	},
	getApplianceProtocolVersion:function(pMessage){
		return pMessage[8] & 0xFF;
	}
 }
