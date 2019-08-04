<template>
	<view class="details">
		<view class="details-pictures margin-bottom">
            <view class="details-pictures-text">小姐姐</view>
			<view class="details-pictures-images">
				<image class="image-big" mode="aspectFill" src="../../static/images/example-image1.png"></image>
				<view class="image-wrap">
					<image class="image-wrap-item" v-for="index in 4" :key="index" mode="aspectFill" src="../../static/images/example-image1.png"></image>
				</view>
			</view>
			<view class="details-pictures-info">
				<view class="left">
					<view class="left-top">
						<text class="name">小姐姐</text>
						<text class="tag">顶</text>
						<image class="image" src="../../static/images/icon-phone.png"></image>
					</view>
					<view class="left-bottom">
						<text class="tag">♀20岁</text>
						<text class="tag">藤县太平镇</text>
					</view>
				</view>
				<view class="right">
					<view class="collect">收藏</view>
					<view class="upgrade">升级VIP</view>
				</view>
			</view>
		</view>
		<view class="details-item margin-bottom">
            <view class="item-title">
                <view class="item-title-line"></view>
                <view class="item-title-text">个人资料</view>
                <view class="item-title-annotation">(ID:9051904063)</view>
            </view>
            <view class="item-contain">
                <view class="item-contain-tags pink" v-for="(item,index) in informationArr" :key="index">
                    <text>{{item}}</text>
                </view>
            </view>
            <view class="item-contain">
                <view class="item-contain-tags pink2">
                    <text>查看更多...</text>
                </view>
            </view>
        </view>
        <view class="details-item margin-bottom">
            <view class="item-title">
                <view class="item-title-line"></view>
                <view class="item-title-text">联系方式</view>
            </view>
            <view class="item-contain">
                <view class="item-contain-tags red">
                    <image class="image" mode="aspectFill" src="../../static/images/icon-phone.png"></image>
                    <text>点击升级VIP查看联系方式以及更多信息</text>
                </view>
            </view>
        </view>
        <view class="details-item margin-bottom">
            <view class="item-title">
                <view class="item-title-line"></view>
                <view class="item-title-text">择偶条件</view>
            </view>
            <view class="item-contain">
                <view class="item-contain-tags blue" v-for="(item,index) in mateChoiceArr" :key="index">
                    <text>{{item}}</text>
                </view>
            </view>
        </view>
	</view>
</template>

<script>
    import util from '../../static/utils/utils';
	export default {
		data() {
			return {
			    informationArr: ['158CM','49KG','兔','双子座','汉族','本科','籍贯：藤县','单身','房：与父母同住','车：暂无购车'],
                mateChoiceArr: ['婚姻状况：不限','年龄：20-26岁','有车','有房']
            }
		},
		components: {},
		onLoad() {},
		onShow() {

		},
		methods: {
		    previewImage(image) {
		        util.previewImage(image);
            }
		}
	}
</script>

<style scoped lang="scss">
	@import './index';
</style>
