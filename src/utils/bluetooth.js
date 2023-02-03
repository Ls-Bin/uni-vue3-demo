let time=null
export default {
	// 1.初始化蓝牙
	openBluetoothAdapter(){
		let that = this
		uni.openBluetoothAdapter({
		    success() {
		        setTimeout(()=>{
		            that.getBluetoothAdapterState()
		        }, 200)
		    },
		    fail() {
		        console.log('手机蓝牙未打开')
		    }
		})
	},
	// 2.检测手机是否支持蓝牙
	getBluetoothAdapterState() {
		let that = this
	    uni.getBluetoothAdapterState({
	        success(res) {
	          console.log(res)
	            if (res.available) {
	                that.startBluetoothDevicesDiscovery()
	            }
	        },
	        fail(error) {
	            
	        }
	    })
	},
	// 3.蓝牙设备搜索初始化
	startBluetoothDevicesDiscovery() {
		let that = this
	    uni.startBluetoothDevicesDiscovery({
	        success(res) {
				// uni.showLoading({
				//    title: '正在搜索设备',
				// })
				time=setInterval(()=>{
					that.getBluetoothDevices()
				},2000)
	        },
	        fail(error) {
	    
	        }
	    })
	},
	// 4.获取搜索的蓝牙设备
	getBluetoothDevices() {
		let that = this
	    uni.getBluetoothDevices({  //获取目前搜索到全部的蓝牙设备（只执行一次）
	        success(res) {
	            setTimeout(()=>{
	                if(res.devices.length < 1) { //小于1台设备的时候关闭蓝牙和停止搜索
	                    uni.stopBluetoothDevicesDiscovery()
	                    uni.closeBluetoothAdapter()
	                }
	            }, 15000)
	        }
	    })
	    
	    uni.onBluetoothDeviceFound(res=>{  //监听搜索的蓝牙-不断的寻找新的设备
	        let devices = res.devices
			console.log(222222222222222)
	        for(let item of devices) {
	            let advertisData = that.buf2hex(item.advertisData) //安卓和ios通用的广播数据，原本是通过deviceId判断的，但是ios的deviceId不是正确的
	            if(advertisData.toUpperCase().indexOf('蓝牙mac地址') != -1) {  //根据硬件工程师提供或者安卓系统获取的蓝牙mac地址查找，如果存在则拿到蓝牙设备ID
	                let deviceId = item.deviceId //拿到蓝牙设备ID
	                uni.stopBluetoothDevicesDiscovery({  //停止搜索新设备
	                    success(result) {
	                        setTimeout(()=>{
	                            that.createBLEConnection(deviceId)
	                        }, 200)
	                    }
	                })
	            }
	        }
	    })
	},
	// 5.通过蓝牙设备Id连接低功耗蓝牙设备
	createBLEConnection(deviceId) {
		let that = this
	    uni.createBLEConnection({
	        deviceId,
	        success(res) {
	          console.log(res)
	            that.getBLEDeviceServices(deviceId)
	        }
	    })
	},
	// 6.通过蓝牙设备Id获取蓝牙的所有服务
	getBLEDeviceServices(deviceId) {
		let that = this
	    uni.getBLEDeviceServices({
	        deviceId,
	        success(res) {
	          console.log(res)
	          that.getBLEDeviceCharacteristics(deviceId)
	        }
	    })
	},
	// 7.通过蓝牙特征值服务id和蓝牙设备Id获取蓝牙特征值读写的uuid
	getBLEDeviceCharacteristics(deviceId) {
		let that = this
	    uni.getBLEDeviceCharacteristics({
	        deviceId,
	        serviceId: '', //蓝牙特征值服务id
	        success(res) {
	          console.log(res) //主要查看是否有蓝牙特征值读写的uuid
	            setTimeout(()=>{
	                that.notifyBLECharacteristicValueChange(deviceId)
	            }, 200)
	        }
	    })
	},
	// 注意事项:
	// 1.让硬件工程师告诉我们蓝牙特征值。
	// 2.返回的读写uuid是个数组，分不清哪个是读或写，也让硬件工程师提供。
	// 8.启用蓝牙notify功能，用来监听蓝牙之间的数据传输
	notifyBLECharacteristicValueChange(deviceId) {
		let that  = this
	    uni.notifyBLECharacteristicValueChange({
	        deviceId, //蓝牙设备ID
	        serviceId: '', //蓝牙特征值服务id
	        characteristicId: '', //蓝牙特征值读的uuid
	        state: true, //是否启用 notify
	        success(res) {
	            that.onBLECharacteristicValueChange()
	            setTimeout(()=>{
	                that.writeBLECharacteristicValue(deviceId)
	            },200)
	        }
	    })
	},
	// 注意事项:
	// 1.必须先启用 notifyBLECharacteristicValueChange 才能监听到设备 onBLECharacteristicValueChange 事件。
	// 2.安卓平台上，在调用 notifyBLECharacteristicValueChange 成功后立即调用 writeBLECharacteristicValue 接口，在部分机型上会发生 10008 系统错误。
	// 9.接收蓝牙设备的推送
	onBLECharacteristicValueChange() {
		let that = this
		uni.onBLECharacteristicValueChange(res=>{
			let data = that.buf2string(res.value) //解析成十进制，正常文本
			console.log(data)
		})
	},
    // 10.向低功耗蓝牙设备特征值中写入二进制数据
    writeBLECharacteristicValue(deviceId){
		let that = this
		let str = '{code: 1, data: {md5: gffd544, ts: 3654}, msg: "hello"}' //定义数据
		
		//转换成广播数据
		let buffer = new ArrayBuffer(str.length)
		let dataView = new DataView(buffer)
		for (var i = 0; i < str.length; i++) {
		  dataView.setUint8(i, str.charAt(i).charCodeAt())
		}
		
		// let dataHex = buf2hex(buffer); //转换成二进制
		uni.writeBLECharacteristicValue({
		  deviceId, //蓝牙设备id
		  serviceId: '', //蓝牙特征值服务id
		  characteristicId: '', //蓝牙特征值写的uuid
		  value: buffer, 
		  success (res) {
			console.log('writeBLECharacteristicValue success', res.errMsg)
		  }
     })
    },
	// 数据转换
	// 广播数据转成二进制
	buf2hex(buffer) {
	  let hexArr = Array.prototype.map.call(new Uint8Array(buffer), bit=>{
	      return ('00' + bit.toString(16)).slice(-2)
	  })
	  return hexArr.join('')
	},
	// 解析成十进制，正常文本
	buf2string(buffer) {
	    let arr = Array.prototype.map.call(new Uint8Array(buffer), x => x)
	    return arr.map((char, i) => {
	        return String.fromCharCode(char)
	    }).join('')
	}
}