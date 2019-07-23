<template>
	<view class="forbid">
        <AppNoData :appNoData="appNoData"></AppNoData>
    </view>
</template>

<script>
	export default{
		data(){
			return{
				//无数据组件数据
                appNoData:{
					isShow:true,
					showTitleFlag:true,
					title:'亲，您暂无数据查看^_^',
					imgUrl:'/static/images/404-icon.png',
					imgStyle:'width:250rpx;height:250rpx;',
					titleStyle:'padding-top:30rpx;',
					wrapStyle:'margin-top:150rpx;'
				}
			}
		},
		methods:{
			
		},
		onLoad() {
			
		},
		onShow() {
			
		}
	}
</script>

<style lang="scss">

</style>
