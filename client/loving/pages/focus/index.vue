<template>
	<view class="focus index">
		<view class="index-top">
			<view class="index-tap">
				<view class="index-tap-item" :class="{active: currentIndex === index}" v-for="(item,index) in tabArr" :key='index'
					  @click="changeTab(index)">{{item.text}}</view>
			</view>
		</view>
		<view class="index-scroll">
			<scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-y" @scrolltoupper="upper" @scrolltolower="lower"
						 @scroll="scroll" :style="{height: scrollHeight}">
				<component-item v-for="(item,index) in candidateInfo" :key="index" :itemInfo="item"/>
			</scroll-view>
		</view>
	</view>
</template>

<script>
    import componentItem from '../../components/item/item.vue';
	export default {
		data() {
			return {
                currentIndex: 0,
                tabArr: [{
                    text: '心动了',
                    id: 0
                }, {
                    text: '收藏的',
                    id: 1
                }],
                scrollTop: 0,
                old: {
                    scrollTop: 0
                },
                scrollHeight: 0,
                candidateInfo: [
                    {
                        images: ['../../static/images/example-image1.png'],
                        name: '丽娜',
                        gender: 'female',
                        age: 22,
                        income: '8000/月',
                        asset: ['car']
                    },
                    {
                        images: ['../../static/images/example-image3.png'],
                        name: '李珂',
                        gender: 'male',
                        age: 28,
                        income: '20000/月',
                        asset: ['car','house']
                    },
                    {
                        images: ['../../static/images/example-image1.png'],
                        name: '丽娜',
                        gender: 'female',
                        age: 22,
                        income: '8000/月',
                        asset: ['car']
                    }
                ],
                collectArr: [
                    {
                        images: ['../../static/images/example-image2.png'],
                        name: '李珂',
                        gender: 'male',
                        age: 22,
                        income: '8000/月',
                        asset: ['car']
                    }
                ],
                likeArr: [
                    {
                        images: ['../../static/images/example-image1.png'],
                        name: '丽娜',
                        gender: 'female',
                        age: 22,
                        income: '8000/月',
                        asset: ['car']
                    },
                    {
                        images: ['../../static/images/example-image3.png'],
                        name: '李珂',
                        gender: 'male',
                        age: 28,
                        income: '20000/月',
                        asset: ['car','house']
                    },
                    {
                        images: ['../../static/images/example-image1.png'],
                        name: '丽娜',
                        gender: 'female',
                        age: 22,
                        income: '8000/月',
                        asset: ['car']
                    }
                ]
			}
		},
        components: {
            componentItem
        },
		methods: {
            changeTab(index) {
                this.currentIndex = index;
                switch (index){
                    case 0:
                        this.candidateInfo = this.likeArr;
                        break;
                    case 1:
                        this.candidateInfo = this.collectArr;
                        break;
                }
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
		},
        onLoad() {

        },
        onShow() {
            this.getSysteminfoFun();
        },
        onHide() {}
	}
</script>

<style scoped lang="scss">
    @import '../index/index';
	@import './index';
</style>
