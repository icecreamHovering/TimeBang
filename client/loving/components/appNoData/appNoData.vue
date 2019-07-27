<template>
	<!--
	* appNoData.isShow:设置显示无数据组件的显示隐藏
	* appNoData.wrapStyle:设置最外部view的样式，垂直居中
	* appNoData.imgStyle:设置图片大小，内外边距
	* appNoData.imgUrl:设置图片链接
	* appNoData.showTitleFlag:设置是否需要显示无数据提示语
	* appNoData.titleStyle:设置无数据提示语的样式
	* appNoData.title:设置无数据提示语的值
	-->
	<view v-if="appNoData.isShow" :style="appNoData.wrapStyle" class="lotus-no-data">
		<image :style="appNoData.imgStyle" class="lotus-no-data-pic" :src="appNoData.imgUrl?appNoData.imgUrl:imgUrl" mode="aspectFit"></image>
		<view v-if="appNoData.showTitleFlag" :style="appNoData.titleStyle" class="lotus-no-data-title" v-text="appNoData.title"></view>
	</view>
</template>

<script>
	export default {
		props:["appNoData"],
		data() {
			return {
				imgUrl:'/static/images/no-data.png'
			};
		}
	}
</script>

<style lang="scss">
@import "./appNoData.scss";
</style>
