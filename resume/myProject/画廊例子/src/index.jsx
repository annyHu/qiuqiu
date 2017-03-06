require('./css/style.css');

var React=require('react');
var ReactDOM=require('react-dom');

var ImgData =require('./data/img-data.json')
var Main=require('./components/Main.jsx')
ImgData.forEach(function(item,i){
	item.imgUrl=require('./img/1.jpg')//给ImgData的每项添加一个imgUrl属性，为图片路径
})

window.onload=function(){
	ReactDOM.render(
		<Main ImgData={ImgData} />,
		document.querySelector('.app')
	)
}
