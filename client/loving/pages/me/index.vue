<!--suppress ALL -->
<template>
	<view class="me">
		<view class="me-info">
			<view class="me-info-left">
				<image class="avatar" :src="infoData.avatarUrl || '../../static/images/example-image3.png'" mode="aspectFill"></image>
				<view>
					<view class="name">{{infoData.nickName || '你好鸭'}}</view>
					<view>会员ID：9070107925</view>
				</view>
			</view>
			<view class="me-info-right" @tap="toAddInfo">
				修改个人资料
			</view>
		</view>
		<view class="me-items">
			<view class="item" v-for="(item,index) in itemData" :key="index">
				<view class="item-left">
					<image class="icon" :src="item.iconUrl" mode=""></image>
					<text>{{item.leftText}}</text>
				</view>
				<view class="item-right">
					<text :class="item.color">{{item.rightText}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {checkUserRegister} from '../../static/utils/checkUserStatus'
	export default {
		data() {
			return {
			    infoData: {},
				itemData: [{
						iconUrl: '../../static/images/me-phone.png',
						leftText: '手机认证',
						rightText: '未认证',
						color: 'gray'
					}, {
						iconUrl: '../../static/images/me-renzheng.png',
						leftText: '实名认证',
						rightText: '未认证',
						color: 'gray'
					},
					{
						iconUrl: '../../static/images/me-xiangqingka.png',
						leftText: '我的相亲卡',
						rightText: '点击生成相亲卡',
						color: 'orange'
					}, {
						iconUrl: '../../static/images/me-xianshishoujihao.png',
						leftText: '是否显示手机号',
						rightText: '不显示 点击显示',
						color: 'gray'
					}, {
						iconUrl: '../../static/images/me-pingtai.png',
						leftText: '平台名称',
						rightText: '小爱',
						color: 'gray'
					}
				]
			}
		},
		methods: {
			toAddInfo() {
				uni.navigateTo({
					url: '../addInfo/index'
				})
			},
		},
		onShow() {

		},
		onLoad() {
            if(uni.getStorageSync('wxUserInfo')){
                const wxUserInfo = JSON.parse(uni.getStorageSync('wxUserInfo'));
                this.infoData = wxUserInfo.userInfo;
            }
		}
	}
</script>

<style scoped lang="scss">
	@import './index';
</style>
