import {appUtils} from './utils'

//获取是否授权
const getIsAuthor = async () => {
    //是否授权
    let setTing = await appUtils.getSetting();
    //授过权
    if (setTing.authSetting['scope.userInfo']) {
		//获取当前缓存的用户信息
		let userDataMsg = wx.getStorageSync('userDataMsg')&&JSON.parse(wx.getStorageSync('userDataMsg'));
		//当前缓存用户信息为空
		if(!userDataMsg){
			//执行登录api缓存用户信息
			// await userLoginByCode();
			// userDataMsg = wx.getStorageSync('userDataMsg')&&JSON.parse(wx.getStorageSync('userDataMsg'));
		}

		//旧用户授权过但没有获取的微信用户信息
		return new Promise((resolve, reject) => {
		    resolve({
		        Code: 1,
		        Message: '授权过'
		    })
		});
    } else if (setTing.authSetting['scope.userInfo'] === false) {
        //拒绝授权
        console.log(`需要用户重新授权`);
        return new Promise((resolve, reject) => {
            resolve({
                Code: 0,
                Message: '需要用户重新授权'
            })
        });
    } else {
        //首次授权
        return new Promise((resolve, reject) => {
            resolve({
                Code: -1,
                Message: '首次授权'
            })
        });
    }
};

//登录
const userLoginByCode = async () => {
    //获取code
    const Code = await appUtils.getCode();
    return appUtils.ajax('Login/LoginByCode','POST', {
        Code
    }).then((response) => {
        const result = response.Data;
        //有用户信息
        if (result) {
            if(result.MobilePhone){
                const userDataMsg = JSON.stringify(result);
                wx.setStorageSync('userDataMsg', userDataMsg);
                return result;
            }else{
                //跳转授权页
               /* wx.reLaunch({
                    url: `/pages/impower/impower`
                }); */
                return false;
            }
        }
    })
};

const checkUserRegister = async (loadPageRoute, options) => {
    //loadPageRoute,options=>loadPageRoute着陆页路由，options着陆页option
    //获取授权信息
    const isAuthorMsg = await getIsAuthor();
    console.log(isAuthorMsg);

    //缓存需要返回的路由
    if (loadPageRoute) {
        if (isAuthorMsg) {
            //授权过删除缓存route
            if (isAuthorMsg.Code === 1) {
                if (wx.getStorageSync('loadPageRoute')) {
                    wx.removeStorageSync('loadPageRoute')
                }
            } else {
                //首次着陆缓存route
                wx.setStorageSync('loadPageRoute', loadPageRoute);
            }
        }
    }

	//版本比对不一致删除所有缓存信息
	/* if (wx.getStorageSync('lotusAppVersion')) {
		if (config.lotusAppVersion !== wx.getStorageSync('lotusAppVersion')) {
			try {
				wx.clearStorageSync();
			} catch (error) {
				console.log(error);
			}
		}
	} */
	const tUserDataMsg = await appUtils.getStorageFn('userDataMsg');
	//未注册查询不到用户缓存信息
	if (!tUserDataMsg) {
		//首次授权 未登录
		if (isAuthorMsg.Code === -1 || isAuthorMsg.Code === 0) {
			//拼接url参数传入到授权页面
			let str = '';
			const dataOption = options;
			for (let itemKey in dataOption) {
				str += `${itemKey}=${dataOption[itemKey]}&`
			}
			//跳转授权页
			wx.reLaunch({
				url: `/pages/impower/impower?${str}`
			});
			return {
				Code: -1
			};
		}else{
			//授权过执行用户登录
			// return await userLoginByCode();
		}
	} else {
		//已注册
		return new Promise((resolve, reject) => {
			const result = JSON.parse(wx.getStorageSync('userDataMsg'));
			result.Code = 1;

			resolve(result);
		});
	}
};

export {
    checkUserRegister
}
