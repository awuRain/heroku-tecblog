var _ = require('Underscore');
var Juicer = require('Juicer');
var moment = require('Moment');
var Showdown = require('Showdown');

Juicer.register('time', function (data) {
	return moment(data).format('YYYY/MM/DD');
});

Juicer.register('markdown', function (data) {
	var converter = new Showdown.Converter();
	return converter.makeHtml(data)
});

Juicer.register('str2spanArr', function (data) {
	var _res = '';
	_.map(data.split(' '), function (val) {
		_res += '<span class="info-keyword">'+ val +'</span>'
	});
	return _res
});

function Views () {
	this.init();
}

_.extend(Views.prototype, {
	renderPostList: function (postList, $target) {
		var tpl = '' + 
			'<ul>'+
				'{@each postList as item, index}' +
					'<li class="post-item">'+
						'<div class="item-header">'+
							'<a href="/post/detail?id=${item.info.id}"><h1>${item.data.title}</h1></a>'+
							'<span class="item-time">${item.info.updatedAt|time}</span>' +
							'<div class="item-info hide">'+
								'<span class="info-type">${item.data.type}</span>' +
								'$${item.data.keyword|str2spanArr}' +
							'</div>'+
						'</div>' +
						'<div class="item-content">$${item.data.content|markdown}</div>' +
					'</li>' +
				'{@/each}' +
			'</ul>';

		$target.html(Juicer(tpl, {
			postList: postList
		}));
	},

	renderPostDetail: function (post, $target) {
		var tpl = '' +
			'<h1>${post.data.title}</h1>' +
			'<span class="item-info">${post.info.updatedAt|time}</span>' +
			'<div class="markdown-container">' +
				'$${post.data.content|markdown}' +
			'</div>';

		$target.html(Juicer(tpl, {
			post: post
		}));
	}
});

module.exports = Views;