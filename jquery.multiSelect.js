
/**
* @todo MultiSelect
* @namespace MultiSelect
* @author haze.liu
* @since 2016年1月20日 下午12:34:22
*/
(function($) {
/**
* 依赖 artTemplate
*/
/**
* 参数说明<BR>
* height: 容器高度
* width:容器宽度
*
*/
/**
* 方法说明<BR>
* getSelect:function 获取被选择的集合(以数组返回)  $("#multiSelect").multiSelect('getSelect');
* setSource:function 设置左侧数据(原始数据)
* 			模式1:$("#multiSelect").multiSelect('setSource',array,1);	
*			//其中array的格式为[{mid:'1',title:'1'},{mid:'2',title:'2'}]
*
* 			模式2:$("#multiSelect").multiSelect('setSource',array,2);	
*			//其中array的格式为['1','2']; //title,mid都为item项
*
*/

var MultiSelect= function (element, options) {
	this.element = $(element);
	this.options={};
	this.options.height = options.height || '400';
	this.options.width = options.width || '650';
	this.options.height = this.options.height<=250?250:this.options.height;
	this.options.width = this.options.width<=620?620:this.options.width;

	this._init();
}
MultiSelect.prototype ={
	constructor: MultiSelect,
	_init:function(){
		this.initDOM();
		this.initEvent();
	},
	initDOM:function(){
		var $this=this.element;
		$this.css({'width':this.options.width,'height':this.options.height}).addClass('multiSelect');
		var $this=this.element;
		var html='<ul class="sourceSelect">'+
		'</ul>'+
		'<div class="buttonGroup">'+
			'<div>'+
				'<a class="addSelect">添加</a>'+
				'<a class="removeSelect">移除</a>'+
				'<a class="addAll">添加所有</a>'+
				'<a class="removeAll">移除所有</a>'+
			'</div>'+
		'</div>'+
		'<ul class="newSelect">'+
		'</ul>';
		$this.html(html);
		if($("#multiSelect_template1").html()!=''){
			var template='<script id="multiSelect_template1" type="text/html">'+
							'{{each list as n i}}'+
								'<li data-mid="{{n.mid}}">{{n.title}}</li>'+
							'{{/each}}'+
					'</script>'+
					'<script id="multiSelect_template2" type="text/html">'+
							'{{each list as n i}}'+
								'<li data-mid="{{n}}">{{n}}</li>'+
							'{{/each}}'+
					'</script>';
			$('body').append(template);
		}
	},
	initEvent:function(){
		var $this=this.element;
		var opt=this;
		$this.find(".sourceSelect").delegate('li','click',function(){
			opt.clickOne($(this));
		});
		$this.find(".newSelect").delegate('li','click',function(){
			opt.clickOne($(this));
		});
		$this.find(".buttonGroup .addSelect").click(function(){
			opt.addSelect();
		});
		$this.find(".buttonGroup .removeSelect").click(function(){
			opt.removeSelect();
		});
		$this.find(".buttonGroup .addAll").click(function(){
			opt.addAll();
		});
		$this.find(".buttonGroup .removeAll").click(function(){
			opt.removeAll();
		});

	},
	getSelect:function(){
		var a=[];
		$.each(this.element.find(" .newSelect li"),function(i,n){
			a.push($(n).attr('data-mid'));
		});
		return a;
	},
	setSource:function(array,type){
		var $this=this.element;
		var html='';
		if(type=='1'){
			html=template('multiSelect_template1',{list:array});
		}else if(type=='2'){
			html=template('multiSelect_template2',{list:array});
		}
		$this.find(".sourceSelect").html(html).animate({scrollTop:0},1);
		$this.find(".newSelect").html('');
	},
	clickOne:function(li){
		if(li.hasClass('select')){
			li.removeClass('select');
		}else{
			li.addClass('select');
		}
	},
	addAll:function(){
		var opt=this;
		$.each(this.element.find(".sourceSelect li"),function(i,n){
			if($(n)[0]){
				opt.addOne($(n),false);
				opt.removeOne($(n));
			}
		});
	},
	removeAll:function(){
		var opt=this;
		$.each(this.element.find(".newSelect li"),function(i,n){
			if($(n)[0]){
				opt.addOne($(n),true);
				opt.removeOne($(n));
			}
		});
	},
	removeSelect:function(){
		var opt=this;
		$.each(this.element.find(".newSelect li.select"),function(i,n){
			if($(n)[0]){
				opt.addOne($(n),true);
				opt.removeOne($(n));
			}
		});
	},
	addSelect:function(){
		var opt=this;
		$.each(this.element.find(".sourceSelect li.select"),function(i,n){
			if($(n)[0]){
				opt.addOne($(n),false);
				opt.removeOne($(n));
			}
		});
	},
	addOne:function(li,reverse){
		li.removeClass('select');
		if(reverse){
			this.element.find(".sourceSelect").append(li[0].outerHTML);
		}else{
			this.element.find(".newSelect").append(li[0].outerHTML);
		}
	},
	removeOne:function(li){
		li.remove();
	},
}





$.fn.multiSelect = function(option) {
	var args = Array.apply(null, arguments);
	args.shift();
	var internal_return;
	this.each(function() {
		var $this = $(this),
			data = $this.data('multiSelect'),
			options = typeof option == 'object' && option;
		if (!data) {
			$this.data('multiSelect', (data = new MultiSelect(this, $.extend({}, $.fn.multiSelect.defaults, options))));
		}
		if (typeof option == 'string' && typeof data[option] == 'function') {
			internal_return = data[option].apply(data, args);
			if (internal_return !== undefined) {
				return false;
			}
		}
	});
	if (internal_return !== undefined)
		return internal_return;
	else
		return this;
};
$.fn.multiSelect.defaults = {};
})(jQuery);