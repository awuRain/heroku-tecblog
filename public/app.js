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
			$('.loader').css('display', 'block');
		}).on('dataLoaded', function () {
			$('.loader').css('display', 'none');
		});

		$('body').on('mouseover', '.item-header', function (e) {
			var dom = $(e.currentTarget);
			dom.find('.item-info').removeClass('hide');
		}).on('mouseout', '.item-header', function (e) {
			var dom = $(e.currentTarget);
			dom.find('.item-info').addClass('hide');
		})
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
