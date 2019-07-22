<template>
	<view class="component-item" :itemInfo="itemInfo">
		<view class="item-info">
			<view class="images"></view>
			<view class="infomation">
				<view class="infomation-item">
					<view>
						<text>{{itemInfo.name}}</text>
						<image class="sex" :src="itemInfo.gender === 'male'?'../../static/icon-male.png':'../../static/icon-female.png'" mode=""></image>
					</view>
					<view>
						<text class="age">{{itemInfo.age?itemInfo.age+'岁':'保密'}}</text>
					</view>
				</view>
				<view class="infomation-item">
					<view>
						<text>{{itemInfo.income}}</text>
					</view>
					<view>
						<text :class="item==='house'?'asset-car asset-house':'asset-car'" v-for="(item,index) in itemInfo.asset" :key="index">{{item==='car'?'车':'房'}}</text>
					</view>
				</view>
			</view>
		</view>
		<view class="item-operation">
			<view class="item">
				<image src="../../static/items-shoucang-d.png" mode=""></image>
				<text>收藏</text>
			</view>
			<view class="item">
				<image src="../../static/items-xihuan-d.png" mode=""></image>
				<text>相亲</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'items',
		props:["itemInfo"],
		data() {
			return {

			};
		}
	}
</script>

<style scoped lang="scss">
	@import "./item";
</style>
