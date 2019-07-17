<template>
	<view class="index">
		<view class="index-top">
			<view class="index-swiper">
				<swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
					<swiper-item>
						<view class="swiper-item">A</view>
					</swiper-item>
					<swiper-item>
						<view class="swiper-item">B</view>
					</swiper-item>
				</swiper>
			</view>
			<view class="index-tap">
				<view class="index-tap-item" :class="{active: currentIndex === index}" v-for="(item,index) in tabArr" :key='index'
				 @click="changeTab(index)">{{item.text}}</view>
			</view>
		</view>
		<view class="index-scroll" id="srcoll-wrap">
			<scroll-view :scroll-top="scrollTop" scroll-y="true" enable-back-to-top="true" class="scroll-y" @scrolltoupper="upper" @scrolltolower="lower"
			 @scroll="scroll" :style="{height: scrollHeight}">
				<view class="scroll-y-item" v-for="index in 100" :key="index">{{index}}</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
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
				scrollHeight: 0
			}
		},
		onLoad() {},
		onShow() {
			this.getDomInfoFun();
		},
		methods: {
			changeTab(index) {
				this.currentIndex = index;
			},
			upper(e) {
				console.log(e)
			},
			lower(e) {
				console.log(e)
			},
			scroll(e) {
				this.old.scrollTop = e.detail.scrollTop
			},
			// 获取系统信息
			getDomInfoFun() {
				let view = uni.createSelectorQuery().select("#srcoll-wrap");
				view.boundingClientRect(data => {
					console.log("高" + data.height);
					this.scrollHeight = data.height + 'px';
				}).exec();
			}
		}
	}
</script>

<style scoped lang="scss">
	@import './index';
</style>
