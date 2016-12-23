var _ = require('Underscore');
var showdown = require('Showdown');

require('./style/main.less');
var Manu = require('Manu');
var Views = require('Views');

function app () {
	this.init();
}

_.extend(app.prototype, {

	init: function () {
		var _this = this;
		setTimeout(function () {
			_this._bind();
		}, 500);
	},
	_bind: function () {
		$('body').on('click', '.add-btn', function () {
			Manu.addOnePost({
				'title': 'qwe',
				'content': 'sss'
			})
		}).on('click', '.find-btn', function () {
			Manu.find10Posts(function (res) {
				console.log(res);
			});
		}).on('click', '.2md-btn', function () {
			var text = '#hello';
			var converter = new showdown.Converter();
			console.log(converter.makeHtml(text));
		}).on('click', '.query-btn', function () {
			var condition = 'title == 1337';
			Manu.queryPost(condition, function (res) {
				console.log(res);
			});
		});
	},
	markDonw: function (text) {
		var converter = new showdown.Converter();
		return converter.makeHtml(text);
	},
	Manu: Manu
}, Views.prototype);

var appInstance = new app();

module.exports = appInstance;
window.app = appInstance;