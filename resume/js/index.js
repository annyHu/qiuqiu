
window.onload=function(){
	
		// 加载时的js
		var $loading = $('.loading');
		var $welcome = $('.welcome');
		var $toHome = $('.toHome');
		var $showWrap = $('.showWrap');
		var $go = $('.go');
		// 获取元素
		var $myPic=$('.myPic');
		var $name=$('.name');
		var $tag=$('.tag');
		var $wrap=$('.skill .wrap');
		var $info=$('.about .info');
		var $title=$('.about .title');
		$loading.animate({
			top: '-100%'
		}, 2000, function(){
			setTimeout(function(){
				$welcome.removeClass('flipOutY').addClass('flipInY');
				$toHome.animate({top:'0'},1000);
			}, 500);
		});
		$go.click(function(){
			$showWrap.fadeOut();
			run(0);
		})
		//滚动事件
		var $main=$('.main');
		var $li=$main.find('li');
		var $nav=$('.head a');
		var iNow=0;
		var clock=false;
		function onmousewheel(ev){
			if(clock){
				return;
			}

			clock=true;
			if(ev.wheelDelta>0&&ev.wheelDelta ||ev.detail<0){
				iNow--;
				if(iNow==-1){
					iNow=0;
					clock=false;
				}

			}else{
				iNow++;
				if(iNow==5){
					iNow=4;
					clock=false;
				}
			}
			
			$li.removeClass('active').eq(iNow).addClass('active');
			$main.css('top',-iNow+'00%');
			$nav.removeClass('active').eq(iNow).addClass('active');
			run(iNow);
		}
		window.addEventListener('mousewheel',onmousewheel,false);
		window.addEventListener('transitionend',function(){
			clock=false;
		},false)
		// 向下翻页
		$('.toNext').click(function(){
			iNow++;
			if(iNow==5){
				iNow=4;
			}			
			$main.css('top',-iNow+'00%');
			$li.removeClass('active').eq(iNow).addClass('active');
			$nav.removeClass('active').eq(iNow).addClass('active');
			run(iNow);
		})
		//导航条的点击事件
		change($nav);
		//li的点击事件
		change($li);
		//点击切换页面的函数
		function change($obj){
			$obj.each(function(i,elem){
				$(elem).click(function(){
					$nav.removeClass('active').eq(i).addClass('active');
					$li.removeClass('active').eq(i).addClass('active');
					$main.css('top',-i+'00%');
					run(i);
					iNow=i;
				})
			})
		}	
		function run(i){
			if(i===0){
				$myPic.stop(true).animate({top:'50px'},800);
				$name.stop(true).animate({left:'50%',marginLeft:'-150px'},800);
				$tag.stop(true).animate({right:'50%',marginRight:'-170px'},800);
			}else{
				$myPic.stop(true).animate({top:'0px'});
				$name.stop(true).animate({left:'0'});
				$tag.stop(true).animate({right:'0'});
			}
			if(i===1){
				$info.stop(true).animate({opacity:1,marginLeft:'0'},800);
				$title.stop(true).animate({opacity:1,marginLeft:'50%'},800);	
			}else{
				$info.stop(true).animate({marginLeft:'100%',opacity:0});
				$title.stop(true).animate({opacity:0,marginLeft:'0'});
			}
			if(i===3){
				$wrap.stop(true).animate({top:'60px',opacity:1},800);
			}else{
				$wrap.stop(true).animate({top:'100%',opacity:0});
			}
		}	

		//关于界面js代码
		var canvas=document.querySelectorAll('.canvas');
		var degree=document.querySelectorAll('.degree');
		canvas.forEach(function(elem,i){
			var num=degree[i].innerHTML;
			num=parseInt(num)/100;
			var ctx=elem.getContext('2d');
			ctx.lineWidth='10';
			//背景圆圈
			ctx.arc(90,90,80,0,2*Math.PI);
			ctx.strokeStyle='rgba(0,0,0,0.5)';
			ctx.stroke();
			ctx.beginPath();
			ctx.arc(90,90,80,0,2*Math.PI*num);
			ctx.strokeStyle='#c2c';
			ctx.stroke();
		})
		//project动画代码
		$('.imgBox').mouseenter(function(ev){
		var $mask = $(this).find('.mask');
	
		var direction = detectDirection($(this), ev);
		$mask.find('p').hide().fadeIn(1000);
		if(direction==='top'){
			$mask.css({
				left: 0,
				top: '-100%'
			});
			$mask.stop(true).animate({
				top: 0
			})
		}
		else if(direction==='right'){
			$mask.css({
				left: '100%',
				top: 0
			});
			$mask.stop(true).animate({
				left: 0
			})
		}
		else if(direction==='bottom'){
			$mask.css({
				left: 0,
				top: '100%'
			});
			$mask.stop(true).animate({
				top: 0
			})
		}
		else if(direction==='left'){
			$mask.css({
				left: '-100%',
				top: 0
			});
			$mask.stop(true).animate({
				left: 0
			})
		}
	});


	$('.imgBox').mouseleave(function(ev){
		var $mask = $(this).find('.mask');
		var direction = detectDirection($(this), ev);

		if(direction==='top'){
			$mask.stop(true).animate({
				top: '-100%'
			})
		}
		else if(direction==='right'){
			$mask.stop(true).animate({
				left: '100%'
			})
		}
		else if(direction==='bottom'){
			$mask.stop(true).animate({
				top: '100%'
			})
		}
		else if(direction==='left'){
			$mask.stop(true).animate({
				left: '-100%'
			})
		}
	});

	function detectDirection($elem, ev){

		//div到文档顶部距离
		var offset = $elem.offset();
		//div高
		var h = $elem.height();
		//div宽
		var w = $elem.width();
		var center = {
			x: offset.left+w/2,
			y: offset.top + h/2
		}

		var angle = Math.atan(h/w);//这个单位是弧度
		angle = angle*(180/Math.PI);

		var mouse = {
			x: ev.clientX,
			y: ev.clientY+ window.scrollY
		}

		//鼠标与中心点连线与水平轴的夹角
		var mouseAngle = Math.atan(  (mouse.y-center.y)/(mouse.x-center.x) )

		mouseAngle = mouseAngle*(180/Math.PI);

		mouseAngle = Math.abs(mouseAngle);

		//方向
		var direction = '';

		// 区域1
		if(mouse.y<center.y && mouse.x < center.x){
			if(mouseAngle>angle){
				direction = 'top';
			}
			else{
				direction = 'left'
			}
		}
		else if(mouse.y<center.y && mouse.x > center.x){
			if(mouseAngle>angle){
				direction = 'top';
			}
			else{
				direction = 'right'
			}
		}
		else if(mouse.y>center.y && mouse.x > center.x){
			if(mouseAngle>angle){
				direction = 'bottom';
			}
			else{
				direction = 'right'
			}
		}
		else if(mouse.y>center.y && mouse.x < center.x){
			if(mouseAngle>angle){
				direction = 'bottom';
			}
			else{
				direction = 'left'
			}
		}

		return direction;
	}
}