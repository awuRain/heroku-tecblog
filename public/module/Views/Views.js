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

function Views () {
	this.init();
}

_.extend(Views.prototype, {
	renderPostList: function (postList) {
		var tpl = '' + 
			'<ul>'+
				'{@each postList as item, index}' +
					'<li class="post-item">'+
						'<div class="item-header">'+
							'<a href="/post/detail?id=${item.info.id}"><h1>${item.data.title}</h1></a>'+
							'<span class="item-info">${item.info.updatedAt|time}</span>' +
						'</div>' +
						'<div class="item-content">$${item.data.content|markdown}</div>' +
					'</li>' +
				'{@/each}' +
			'</ul>';
		return Juicer(tpl, {
			postList: postList
		});
	},
	renderPostDetail: function (post) {
		var tpl = '' +
			'<h1>${post.data.title}</h1>' +
			'<span class="item-info">${post.info.updatedAt|time}</span>' +
			'<div class="markdown-container">' +
				'$${post.data.content|markdown}' +
			'</div>'
		return Juicer(tpl, {
			post: post
		});
	}
});

module.exports = Views;