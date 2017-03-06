var React=require('react');
var ImgItem=require('./ImgItem.jsx');
var ImgList=React.createClass({
	render:function(){
		var ImgData = this.props.ImgData;
		var styleList = this.props.styleList;
		return (
			<section className="img-list">
				{
					ImgData.map(function(item,i){
						return (<ImgItem key={i} item= {item} styleInfo={styleList[i]} index={i}/>)//传入index索引，后面点击的时候可以获取
					})
				}	
			</section>
		)
	}
})

module.exports=ImgList;