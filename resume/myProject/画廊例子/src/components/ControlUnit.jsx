var React=require('react');
var PubSub=require('../PubSub.js');
var ControlUnit=React.createClass({
	clickHandle:function(){
		var styleInfo=this.props.styleInfo;
		var isCenter=styleInfo.isCenter;
		var index=this.props.index;
		if(isCenter){

			PubSub.publish('setReverse',index);
		}else{
			PubSub.publish('setCenter',index);
		}
		
	},
	render:function(){
		var styleInfo=this.props.styleInfo;
		var className='';
		if(styleInfo.isCenter){
			className='is-center';
		}
		if(styleInfo.isReverse){
			className+=' is-reverse';
		}
		return (				
			<li className={className} onClick={this.clickHandle}></li>
		)
	}
})
module.exports=ControlUnit;