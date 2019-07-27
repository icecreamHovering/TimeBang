<template>
	<view class="index">
		<view class="index-top">
			<view class="index-swiper">
				<swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
					<swiper-item v-for="index in 3" :key="index">
						<view class="swiper-item">
							<image src="../../static/images/common-top-ad.png"></image>
						</view>
					</swiper-item>
				</swiper>
			</view>
			<view class="index-tap">
				<view class="index-tap-item" :class="{active: currentIndex === index}" v-for="(item,index) in tabArr" :key='index'
				 @click="changeTab(index)">{{item.text}}</view>
			</view>
		</view>
		<view class="index-scroll">
			<scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-y" @scrolltoupper="upper" @scrolltolower="lower"
			 @scroll="scroll" :style="{height: scrollHeight}">
				<component-item v-for="(item,index) in candidateInfo" :key="index" :itemInfo="item"></component-item>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import componentItem from '../../components/item/item.vue';
	export default {
		data() {
			return {
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500,
				currentIndex: 0,
				tabArr: [{
					text: '最新',
					id: 0
				}, {
					text: '最匹配',
					id: 1
				}, {
					text: '筛选',
					id: 2
				}],
				scrollTop: 0,
				old: {
					scrollTop: 0
				},
				scrollHeight: 0,
				candidateInfo: [
					{
						images: [],
						name: '丽娜',
						gender: 'female',
						age: 22,
						income: '8000/月',
						asset: ['car']
					},
					{
						images: [],
						name: '李珂',
						gender: 'male',
						age: 28,
						income: '20000/月',
						asset: ['car','house']
					},
					{
						images: [],
						name: '丽娜',
						gender: 'female',
						age: 22,
						income: '8000/月',
						asset: ['car']
					},
					{
						images: [],
						name: '李珂',
						gender: 'male',
						age: 28,
						income: '20000/月',
						asset: ['car','house']
					}
				]
			}
		},
		components: {
			componentItem
		},
		onLoad() {},
		onShow() {
			this.getSysteminfoFun();
		},
		methods: {
			changeTab(index) {
				this.currentIndex = index;
			},
			upper: function(e) {
				console.log(e)
			},
			lower: function(e) {
				console.log(e)
			},
			scroll: function(e) {
				this.old.scrollTop = e.detail.scrollTop
			},
			// 获取系统信息
			getSysteminfoFun() {
				const _this = this;
				const domSelect = uni.createSelectorQuery().in(this).select(".index-scroll");
				domSelect.boundingClientRect(data => {
					_this.scrollHeight = data.height + 'px';
				}).exec();
			}
		}
	}
</script>

<style scoped lang="scss">
	@import './index';
</style>
