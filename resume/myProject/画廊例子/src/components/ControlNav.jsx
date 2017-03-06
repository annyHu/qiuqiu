var React=require('react');
var ControlUnit=require('./ControlUnit.jsx')
var PubSub=require('../PubSub.js');
var ControlNav=React.createClass({

	render:function(){
		var styleList=this.props.styleList;
		return (
			<nav className="control-nav">
				<ul>
					{
						styleList.map(function(item,i){
							return <ControlUnit styleInfo={item} index={i} key={i} />
						})
					}
					
				</ul>
			</nav>
		)
	}
})

module.exports=ControlNav;