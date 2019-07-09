<template>
	<view class="index">
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
			<view class="index-tap-item" :class="{active: currentIndex === index}" v-for="(item,index) in tabArr" :key='index' @click="changeTab(index)">{{item.text}}</view>
		</view>
		<view></view>
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
				tabArr: [
					{
						text: 'text1',
						id: 0
					},{
						text: 'text2',
						id: 1
					},{
						text: 'text3',
						id: 2
					}
				]
			}
		},
		onLoad() {

		},
		methods: {
			changeTab(index) {
				this.currentIndex = index;
			}
		}
	}
</script>

<style scoped lang="scss">
	@import './index';
</style>
