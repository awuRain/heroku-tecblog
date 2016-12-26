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
		// _this._bind();
		setTimeout(function () {
			_this._bind();
		}, 500);
	},

	_bind: function () {
		$('body').on('dataLoading', function () {
			console.log(2);
			$('.loader').css('display', 'block');
		}).on('dataLoaded', function () {
			console.log(1);
			$('.loader').css('display', 'none');
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
