var React=require('react');
var ImgList=require('./ImgList.jsx');
var ControlNav=require('./ControlNav.jsx');
var PubSub=require('../PubSub.js');

function getRandom(lower,higher){
	return parseInt(Math.random()*(higher-lower) )+lower
}
var Main=React.createClass({
	getInitialState:function(){
		var imgLength = this.props.ImgData.length;
		var styleList = [];
		for(var i=1;i<=imgLength;i++){
			styleList.push({
				//位置信息
				pos:{
					top: 0,
					left: 0
				},
				// 旋转角度
				rotate:0,
				//是否是中心图片
				isCenter: false,
				isReverse:false
			});
		}		
		return {
				styleList:styleList
		}
	},
	//定义位置取值范围
	posRange:{
		//中心点的位置
		centerPoint:{
			left:0,
			top:0
		},
		//左边的位置取值范围，left[0],是最小值，left[1]，是最大值
		leftSide:{
			left:[0,0],
			top:[0,0]
		},
		//右边的位置取值范围，left[0],是最小值，left[1]，是最大值
		rightSide:{
			left:[0,0],
			top:[0,0]
		},
		//上边的位置取值范围，left[0],是最小值，left[1]，是最大值
		topSide:{
			left:0,
			top:[0,0]
		}

	},
	//componentDidMount回调函数，组件挂载完成之后触发, 可以在这个函数里获取到真实的dom
	componentDidMount:function(){
		var self = this;
		PubSub.subscribe('setCenter',function(evName,index){
			self.computePos(index);//调用计算图片位置信息和旋转角度的函数；
		});

		PubSub.subscribe('setReverse',function(evName,index){
			self.reverse(index);//调用使图片翻转的函数；
		});

		//图片的高宽
		var imgItemW = 280;
		var imgItemH = 323;
		//获取舞台的节点
		var stageDom=this.refs.stage;
		//获取舞台的高宽
		var stageH=stageDom.offsetHeight;
		var stageW=stageDom.offsetWidth;

		var posRange=this.posRange;
		//设置图片位置的取值范围；
		posRange.centerPoint={
			left:stageW/2-imgItemW/2,
			top:stageH/2-imgItemH/2
		};
		posRange.leftSide={
			left:[-imgItemW/2,stageW/2-3*imgItemW/2],
			top:[-imgItemH/2,stageH-imgItemH]
		};
		posRange.rightSide={
			left:[imgItemW/2+stageW/2,stageW-imgItemW/2],
			top:[-imgItemH/2,stageH-imgItemH]
		};
		posRange.topSide={
			left:stageW/2-imgItemW/2,
			top:[-imgItemH/2,stageH/2-3*imgItemH/2]
		}
		this.computePos(0);
	},
	//翻转图片
	reverse:function(centerIndex){
		var styleList=this.state.styleList;
		var centerItem = styleList.splice(centerIndex, 1)[0];//取出中心位置的图片，
		centerItem.isReverse=!centerItem.isReverse;
		styleList.forEach(function(item){
			item.isReverse=false;
		});
		// console.log(centerItem.isReverse)
		styleList.splice(centerIndex, 0,centerItem);//将取出的图片加回去
		this.setState({
			styleList:styleList
		})
	},
	//计算图片位置信息和旋转角度；
	//centerIndex中心图片的索引
	computePos:function(centerIndex){
		var posRange=this.posRange;
		var styleList=this.state.styleList;
		var centerItem = styleList.splice(centerIndex, 1)[0];
		centerItem.pos=posRange.centerPoint;
		centerItem.rotate=0;//中心位置的图片不旋转
		centerItem.isCenter=true;//将中心位置的图片属性设为true，后面g改中心位置图片的z-index
		//上边图片索引
		var topIndex=getRandom(0,styleList.length-1);
		var topItem = styleList.splice(topIndex, 1)[0];
		//设置上边图片的位置
		topItem.pos={
			top:getRandom(posRange.topSide.top[0],posRange.topSide.top[1]),
			left: posRange.topSide.left
		};
		//	//设置左边和右边图片的位置	
		styleList.forEach(function(styleItem,i){
			if( i<=styleList.length/2 ){//左边
				styleItem.pos={
					top:getRandom(posRange.leftSide.top[0],posRange.leftSide.top[1]),
					left:getRandom(posRange.leftSide.left[0],posRange.leftSide.left[1])
				}
			}else{//右边
				styleItem.pos={
					top:getRandom(posRange.rightSide.top[0],posRange.rightSide.top[1]),
					left:getRandom(posRange.rightSide.left[0],posRange.rightSide.left[1])
				}
			};

			
		});
		//把删掉的图片加进去
		styleList.splice(topIndex, 0, topItem);
		//设置图片旋转角度信息
		styleList.forEach(function(item){
			item.rotate=getRandom(-30,30);
			item.isCenter=false;
			item.isReverse=false;
		});

		styleList.splice(centerIndex, 0, centerItem);
		this.setState({
			styleList:styleList
		})

	},
	render:function(){
		var ImgData=this.props.ImgData;
		return (
			<section className="stage" ref="stage">
				<ImgList ImgData={ImgData} styleList={this.state.styleList} />
				<ControlNav styleList={this.state.styleList}/>
			</section>
		)
	}
})

module.exports=Main;