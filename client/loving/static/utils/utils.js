let config = {
	versionUrl: 'https://config.xiaoyaozhan.com/',
	appVersion: 'YWCMV1.0.3',
	apiUrl:'https://loudata.xiaoyaozhan.com/api/',
	curEnv:'production',//当前环境开发为evelopment，生成环境production
}

const appUtils = {
	//图片预览
	imagesPreviewer(obj) {
		uni.previewImage(obj);
	},
	//接口请求封装url=>api请求url,method=>请求的方法GET OR POST,options=>api请求data参数
	async ajax(url, method, options, contentType) {
		if(options.showLoading){
			uni.showLoading({
				title: '加载中',
				mask: true
			});
		}
		//获取动态api url
		const tObj = await appUtils.getApiUrl();
		return new Promise((resolve, reject) => {
			uni.request({
				url: `${tObj.apiUrl}${url}`, //api接口地址。
				method: method,
				data: options,
				header: {
					'content-type': contentType || 'application/x-www-form-urlencoded', //自定义请求头信息
				},
				success: (res) => {
					if(options.showLoading){
						uni.hideLoading();
					}
					resolve(res.data);
				},
				fail: (err) => {
					uni.showToast({
						title: `${JSON.stringify(err)}`,
						icon: 'none'
					})
				},
				complete: (res) => {
					/* uni.showToast({
						title: `${JSON.stringify(res)}`,
						icon: 'none'
					}) */
				}
			});
		});
	},
	//设置本地缓存
	setStorageFn(sKey, sVal, type) {
		//同步设置本地缓存
		if (type === "sync") {
			return new Promise((resolve, reject) => {
				try {
					uni.setStorageSync(sKey, sVal);
					resolve(true);
				} catch (e) {
					// error
					resolve(false);
				}
			});
		} else {
			//异步设置本地缓存
			return new Promise((resolve, reject) => {
				uni.setStorage({
					key: sKey,
					data: sVal,
					success: function(res) {
						resolve(true);
					},
					fail: function(error) {
						resolve(false);
					}
				});
			});
		}
	},
	//获取缓存信息
	getStorageFn(sKey, type) {
		//同步获取本地缓存
		if (type === "sync") {
			return new Promise((resolve, reject) => {
				try {
					const value = uni.getStorageSync(sKey);
					resolve(value);
				} catch (e) {
					// error
					resolve(false);
				}
			});
		} else {
			//异步获取本地缓存
			return new Promise((resolve, reject) => {
				uni.getStorage({
					key: sKey,
					success: function(res) {
						resolve(res.data);
					},
					fail: function(error) {
						resolve(false);
					}
				});
			});
		}
	},
	//获取系统的信息
	getSystemInfor() {
		return new Promise((resolve, reject) => {
			uni.getSystemInfo({
				success: function(res) {
					/* 
					console.log(res.model);//手机型号
					console.log(res.pixelRatio);//设备像素比
					console.log(res.screenWidth); //屏幕宽度
					console.log(res.screenHeight); //屏幕高度
					console.log(res.windowWidth);//可使用窗口宽度
					console.log(res.windowHeight);//可使用窗口高度
					console.log(res.windowTop); //可使用窗口的顶部位置
					console.log(res.windowBottom); //可使用窗口的底部位置
					console.log(res.statusBarHeight); //状态栏的高度
					console.log(res.language);//应用设置的语言
					console.log(res.version);//引擎版本号
					console.log(res.platform); //客户端平台
					console.log(res.SDKVersion); //客户端基础库版本
					*/
					resolve(res);
				},
				fail: function() {
					resolve(false);
				}
			});
		});
	},
	//动态获取apiUrl
	async getApiUrl(){
		//生产环境
		if(config.curEnv === 'production'){
			//获取缓存
			let configData = await appUtils.getStorageFn('configData');
			//有缓存
			if(configData){
				return new Promise((resolve,reject)=>{
					const t = JSON.parse(configData);
					config.apiUrl = t.apiUrl;
					config.visible = t.visible;
					config.type = t.type;
					config.apiRequestFlag = true;
					resolve(config);
				});
			}else{
				//没有缓存，通过接口获取，并写入缓存
				return new Promise((resolve, reject) => {
					uni.showLoading({
						title: '加载中',
						mask: true
					});
					wx.request({
						url: config.versionUrl + 'api/Dics/FindDics',
						data: {
							typeCode: `${config.appVersion}`,
							bigTypeCode: 'Web'
						},
						header: {
							'content-type': 'application/x-www-form-urlencoded'
						},
						method: 'GET',
						success: function (response) {
							uni.hideLoading();
							const res = response.data;
							//重置config的值  开发时屏蔽
							config.apiUrl = `${res.Data.loudata}/api/`;
							config.visible = res.Data.visible;
							config.type = res.Data.type;
							config.apiRequestFlag = true;
							//设置缓存请求配置信息
							//appUtils.setStorageFn('configData',JSON.stringify(config),'sync');
							wx.setStorage({
								key: 'configData',
								data: JSON.stringify(config)
							});
							resolve(config);
						}
					});
				});
			}
			
		}else{
			//开发环境
			return new Promise((resolve,reject)=>{
				resolve(config);
			});
		}
	},
	//获取code
	getCode(){
		return new Promise((resolve, reject) => {
			wx.login({
				success: function (res) {
					if (res.code) {
						return resolve(res.code)
					}
				}
			});
		});
	},
	//获取系统设置
	getSetting(){
		return new Promise((resolve, reject) => {
			wx.getSetting({
				success: function (res) {
					//console.log(res);
					resolve(res)
				}
			});
		});
	}
}

export {
	appUtils
}
