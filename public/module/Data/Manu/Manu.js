var Dao = require('Dao');
var _ = require('Underscore');

function Manu () {
	this.init();
};

_.extend(Manu.prototype, {
	/**
	 * 初始化，创建各种表的Dao对象
	 */
	init: function () {
		this.postDao = new Dao('Post');
	},
	/**
	 * 添加一篇post
	 * @param {Object} obj post的内容
	 * obj = {
	 *     title: 'title',
	 *     content: 'content'
	 * }
	 */
	addOnePost: function (obj) {
		var postDao = this.postDao;
		postDao.add(obj);
	},
	find10Posts: function (callback) {
		var postDao = this.postDao;
		postDao.findAll(function (res) {
			callback(res);
		});
	},
	queryPost: function (condition, callback) {
		var postDao = this.postDao;
		postDao.query(condition, function (res) {
			callback(res);
		})
	},
	findPostById: function (id, callback) {
		this.queryPost('objectId == ' + id, function (res) {
			callback(res);
		})
	}
});

module.exports = new Manu();