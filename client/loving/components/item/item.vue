<template>
	<!--
	* lotusNoData.isShow:设置显示无数据组件的显示隐藏
	* lotusNoData.wrapStyle:设置最外部view的样式，垂直居中
	* lotusNoData.imgStyle:设置图片大小，内外边距
	* lotusNoData.imgUrl:设置图片链接
	* lotusNoData.showTitleFlag:设置是否需要显示无数据提示语
	* lotusNoData.titleStyle:设置无数据提示语的样式
	* lotusNoData.title:设置无数据提示语的值
	-->
	<view class="component-item">
		测试
	</view>
</template>

<script>
	export default {
		name: 'items',
		props:["showItem"],
		data() {
			return {
				
			};
		}
	}
</script>

<style scoped lang="scss">
	@import "./item";
</style>
