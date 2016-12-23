var _ = require('Underscore');
var utils = require('./utils/utils.js');
var Bmob = window.Bmob;

function dao (tableName) {
	this.Table = Bmob.Object.extend(tableName);
	this.init();
};

_.extend(dao.prototype, {
	init: function () {
		Bmob.initialize("fc6e20fb1a5afed6b5e1e29a9c66b31d", "2ed124849780e8812434560b54504f7f");
		console.log('dao loaded && bomb init successfully');
	},
	add: function (valueObj) {
		/**
		 * 创建一个表实例
		 */
		var table = new this.Table();
		_.map(valueObj, function (value, key) {
			table.set(key, value);
		});
		table.save(null, {
		    success: function (object) {
		      alert("create object success, object id:" + object.id);
		    },
		    error: function (model, error) {
		      alert("create object fail");
		    }
	  	});
	},
	remove: function () {

	},
	findAll: function (callback) {
		/**
		 * 创建一个query实例
		 */
		var query = new Bmob.Query(this.Table);
		var _res = [];
		query.find({
			success: function (res) {
				callback(utils.mapAndRaw2data(res, true));
			},
			error: function (err) {
				console.log(err);
				callback({});
			}
		});
	},
	query: function (condition, callback) {
		/**
		 * 创建一个query实例
		 */
		var query = new Bmob.Query(this.Table);
		/**
		 * 根据传入的参数采取不同的处理方式
		 * @ - string: 直接将这个string作为单个条件进行查询
		 * @ - array: 遍历数组并且将每个元素作为条件and查询
		 */
		if (typeof(condition) === 'string') {
			_doOneQueryCondition(condition);
		} else {
			_.map(condition, function (value) {
				_doOneQueryCondition(value);
			})
		}
		query.find({
			success: function (res) {
				callback(utils.mapAndRaw2data(res, true));
			}, 
			error: function (err) {
				console.log(err);
				callback({});
			}
		});

		function _doOneQueryCondition (_condition) {
			var conditionArr = _condition.split(' ');
			var conditionFunc = utils.mapQueryCondition(conditionArr[1]);
			query[conditionFunc](conditionArr[0], conditionArr[2]);
		}
	}
});

module.exports = dao;