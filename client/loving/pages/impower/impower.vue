<template>
	<!--授权登录-->
    <view class="impower">
        <view class="impower-title">小爱来啦</view>
        <text class="impower-tips">为了正常使用小程序，需要您授权公开信息^_^。</text>
        <button class="impower-btn" open-type="getUserInfo" lang="zh_CN" @getuserinfo="userInfoHandler" @tap="isSupport">好的，去授权</button>
        <!--授权获取手机号-->
        <view v-if="isNoBind" class="impower-get-phone">
            <view class="impower-get-phone-mask"></view>
            <view class="impower-get-phone-wrap">
                <text class="impower-get-phone-title">授权手机号码</text>
                <text class="impower-get-phone-tip">我们需要您的授权获得您在微信中绑定的手机号码</text>
                <button class="impower-get-phone-btn" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber" @tap="isSupport">同意授权</button>
            </view>
        </view>
    </view>
</template>
<style lang="scss">
@import "./impower.scss";
</style>
<script>
	export default {
		data() {
			return {
				Code: '',
				isFlag: wx.canIUse('button.open-type.getUserInfo'),
				isNoBind:false,
				wxDetailCode:''
			}
		},
		methods: {
			//判断是否支持button组件
            isSupport(){
                if(!this.isFlag){
                    wx.showModal({
                        title: '更新提示',
                        content: '微信版本过低，使用旧版本微信，将无法使用一些功能，请及时更新微信！',
                        success: function (res) {
                            if (res.confirm||res.cancel) {
                            }
                        }
                    });
                }
            },
            //授权获取电话号码
            async getPhoneNumber(e){
                if(e.detail.encryptedData){
                    const _this = this;
                    this.phoneCode =  await getCode();
                    wx.checkSession({
                        success: function(){
                            //session_key 未过期，并且在本生命周期一直有效
                            console.log('未过期，并且在本生命周期一直有效');
                            // _this.bindPhoneNum(_this.phoneCode,e.detail);
                        },
                        fail: function(){
                            //失败重新获取
                            console.log('失败重新获取');
                            getCode().then((Code)=>{
                                // _this.bindPhoneNum(Code,e.detail);
                            });
                        }
                    });
                }
            },
			//获取加密微信用户信息
			userInfoHandler(e){
				const _this = this;
				wx.checkSession({
					success: function(){
						//session_key 未过期，并且在本生命周期一直有效
						if(e.detail.userInfo){
							_this.getUserMsg(e);
						}
					},
					fail: function(){
						//失败重新获取
						_this.$appUtils.getCode().then((res)=>{
							_this.Code = res;
							if(e.detail.userInfo){
								_this.getUserMsg(e);
							}
						});
					}
				});
			},
			//获取用户信息
			async getUserMsg(e){
				let str='';
				if(this.option){
					for(let itemKey in this.option){
						str += `${itemKey}=${this.option[itemKey]}&`
					}
				}
				
				//缓存微信用于解密用户信息
				/* const wxUserInfo = JSON.stringify(e.detail);
				wx.setStorageSync('wxUserInfo', wxUserInfo); */
				
				//注册登录
				/*this.userLogin(e.detail).then((response)=>{
					const result = response.Data;
					//有用户信息
					if (result) {
						this.wxDetailCode = result.WxDetailCode;
						const userDataMsg = JSON.stringify(result);
						wx.setStorageSync('userDataMsg', userDataMsg);
						//获取API配置数据
						const tConfig = JSON.parse(wx.getStorageSync('configData'));
						//提审打开开关visible:0关闭1打开
						if(tConfig.visible*1){
							//有绑定电话号码
							if(result.MobilePhone){
								//获取参数
								if(wx.getStorageSync('loadPageRoute')){
									const loadPageRoute = wx.getStorageSync('loadPageRoute');
									setTimeout(()=>{
										//返回着陆页
										wx.redirectTo({
											url:`/${loadPageRoute}?${str}`
										});
									},100);
								}
							}else{
								this.isNoBind = true;
							}
						}else{
                            //有绑定电话号码
                            if(result.MobilePhone){
                                //console.log(tConfig.visible*1);
                                //跳转无权限页面visible:0关闭1打开
                                if(!tConfig.visible*1){
                                    wx.redirectTo({
                                        url:'/pages/common/forbid'
                                    });
                                    return false;
                                }

                                //获取参数
                                if(wx.getStorageSync('loadPageRoute')){
                                    const loadPageRoute = wx.getStorageSync('loadPageRoute');
                                    setTimeout(()=>{
                                        //返回着陆页
                                        wx.redirectTo({
                                            url:`/${loadPageRoute}?${str}`
                                        });
                                    },100);
                                }
                            }else{
                                this.isNoBind = true;
                            }
						}
					}
				});*/
			},
			//注册登录
			userLogin(userData){
				if(this.Code){
					return this.$appUtils.ajax('Login/Login', 'POST',{
						Code:this.Code,
						Iv:encodeURIComponent(userData.iv),
						EncryptedData:encodeURIComponent(userData.encryptedData)
					});
				}else{
					return new Promise((resolve,reject)=>{
						resolve(false)
					})
				}
			},
			//绑定手机号
			async bindPhoneNum(code,data) {
				const EncryptedData = encodeURIComponent(data.encryptedData);
				const Iv = encodeURIComponent(data.iv);
				return this.$appUtils.ajax('Login/BindMobile','POST', {
					Iv: Iv,
					EncryptedData: EncryptedData,
					Code: code,
					WxDetailCode: this.wxDetailCode
				}).then((response) => {
					const result = response.Data;
					if (result) {
						wx.setStorageSync('MobilePhone', result.MobilePhone);
						//获取用户信息
						wx.getStorage({
							key: 'userDataMsg',
							success(res) {
								let oldData = JSON.parse(res.data);
								oldData.MobilePhone = result.MobilePhone;
								wx.setStorageSync('userDataMsg', JSON.stringify(oldData));
								if(wx.getStorageSync('loadPageRoute')){
									const loadPageRoute = wx.getStorageSync('loadPageRoute');
									setTimeout(()=>{
										//返回着陆页
										wx.redirectTo({
											url:`/${loadPageRoute}`
										});
									},100);
								}

							}
						})
					}
				})
			}		
		}
	}
</script>

<style>

</style>
