<template>
	<view class="component-item" :itemInfo="itemInfo">
		<view class="item-info" @click="goTo">
			<view class="images">
				<image class="images-item" mode="aspectFill" :src="itemInfo.images[0]"></image>
			</view>
			<view class="infomation">
				<view class="infomation-item">
					<view>
						<text>{{itemInfo.name}}</text>
						<image class="sex" :src="itemInfo.gender === 'male'?'../../static/images/icon-male.png':'../../static/images/icon-female.png'" mode=""></image>
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
				<image src="../../static/images/items-shoucang-d.png" mode=""></image>
				<text>收藏</text>
			</view>
			<view class="item">
				<image src="../../static/images/items-xihuan-d.png" mode=""></image>
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
		},
        methods: {
		    goTo() {
                uni.navigateTo({
                    url: '../details/index'
                });
			}
		}
	}
</script>

<style scoped lang="scss">
	@import "./item";
</style>
