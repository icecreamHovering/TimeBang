<template>
	<view class="index">
		<view class="top">
			个人照片
		</view>
		<view class="content">
			<view class="header">
				基本信息
			</view>

			<view class="list">
				<view class="title">
					会员ID
				</view>
				<view class="input">
					90820480
				</view>

			</view>

			<view class="list">
				<view class="title">
					姓名
					<text class="red">*</text>
				</view>
				<view class="input">
					<input type="text" value="请输入姓名" />
				</view>
			</view>

			<view class="list">
				<view class="title">
					性别
					<text class="red">*</text>
				</view>
				<view class="input" style="display: flex;">
					<view @tap="selectRaadio(1)" class="radio" :style="radioStyle1">
						<text style="color: #418bff;">♂</text>男
					</view>
					<view @tap="selectRaadio(2)" class="radio"  :style="radioStyle2">
						<text style="color: #fa86ad;">♀</text>女
					</view>
				</view>
			</view>

			<view class="list">
				<view class="title">
					出生日期
					<text class="red">*</text>
				</view>
				<view class="input">
					<view class="uni-list">
						<view class="uni-list-cell">
							<view class="uni-list-cell-db">
								<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
									<view class="uni-input">{{date}}</view>
								</picker>
							</view>
						</view>
					</view>
				</view>
			</view>

			<view class="list">
				<view class="title">
					身高(cm)
					<text class="red">*</text>
				</view>
				<view class="input">
					<input type="text" value="请输入身高" />
				</view>
			</view>

			<view class="list">
				<view class="title">
					体重(kg)
					<text class="red">*</text>
				</view>
				<view class="input">
					<input type="text" value="请输入体重" />
				</view>
			</view>

			<view class="list">
				<view class="title">
					星座
					<!-- <text class="red">*</text> -->
				</view>
				<view class="input">
					<input type="text" value="请输入星座" />
				</view>
			</view>

			<view class="list">
				<view class="title">
					血型
					<!-- <text class="red">*</text> -->
				</view>
				<view class="input">
					<input type="text" value="请输入血型" />
				</view>
			</view>

			<view class="list">
				<view class="title">
					民族
					<!-- <text class="red">*</text> -->
				</view>
				<view class="input">
					<input type="text" value="请输入民族" />
				</view>
			</view>

			<view class="list">
				<view class="title">
					工作单位
					<text class="red">*</text>
				</view>
				<view class="input">
					<input type="text" value="请输入工作单位" />
				</view>
			</view>

			<view class="list">
				<view class="title">
					学历
					<text class="red">*</text>
				</view>
				<view class="input">
					<picker @change="bindPickerChange4" :value="index6" :range="array6">
						<view class="uni-input">{{array6[index6]}}</view>
					</picker>
				</view>
			</view>

			<view class="list">
				<view class="title">
					籍贯所在
					<text class="red">*</text>
				</view>
				<view class="input">
					<picker mode=region @change="bindPickerChange5" :value=" region1">
						<view class="uni-input">{{region1[0]}},{{region1[1]}},{{region1[2]}}</view>
					</picker>
				</view>
			</view>

			<view class="list">
				<view class="title">
					目前所在
					<!-- <text class="red">*</text> -->
				</view>
				<view class="input">
					<picker mode=region @change="bindPickerChange6" :value=" region">
						<view class="uni-input">{{region[0]}},{{region[1]}},{{region[2]}}</view>
					</picker>
				</view>
			</view>

			<view class="list">
				<view class="title">
					婚姻状况
					<!-- <text class="red">*</text> -->
				</view>
				<view class="input">
					<picker @change="bindPickerChange7" :value="index7" :range="array7">
						<view class="uni-input">{{array7[index7]}}</view>
					</picker>
				</view>
			</view>
			<view class="list">
				<view class="title">
					有无子女
					<!-- <text class="red">*</text> -->
				</view>
				<view class="input">
					<picker @change="bindPickerChange8" :value="index8" :range="array8">
						<view class="uni-input">{{array8[index8]}}</view>
					</picker>
				</view>
			</view>
		</view>
		<view class="btn">
			保存修改
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			const currentDate = this.getDate({
				format: true
			})
			return {
				radioStyle1:'',
				radioStyle2:'',
				date: currentDate,
				region1: ['广西省', '梧州市', '藤县'],
				region: ['广西省', '梧州市', '藤县'],
				index6: 0,
				array6: ['博士以上', '博士', '硕士', '本科', '大专', '高中', '初中', '初中以下'],
				index7: 0,
				array7: ['未婚', '已婚'],
				index8: 0,
				array8: ['无', '有']
			}
		},
		computed: {
			startDate() {
				return this.getDate('start');
			},
			endDate() {
				return this.getDate('end');
			}
		},
		methods: {
			selectRaadio(a){
	
				if(a == 1) {
					this.radioStyle1 = 'border:1px solid #418bff'
					this.radioStyle2 = ''
				}else if(a == 2){
					this.radioStyle1 = ''
					this.radioStyle2 = 'border:1px solid #fa86ad'
				}
			},
			bindPickerChange4(e) {
				this.index6 = e.target.value;
			},
			bindPickerChange5(e) {
				this.region1 = e.target.value;
			},
			bindPickerChange6(e) {
				this.region = e.target.value;
			},
			bindPickerChange7(e) {
				this.index7 = e.target.value;
			},
			bindPickerChange8(e) {
				this.index8 = e.target.value;
			},
			bindDateChange: function(e) {
				this.date = e.target.value

			},
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();

				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			}
		},
	}
</script>

<style scoped lang="scss">
	@import './index';
</style>
