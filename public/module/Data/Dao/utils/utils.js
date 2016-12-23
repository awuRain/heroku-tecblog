var _  = require('Underscore');

function utils () {
	this.init();
}

_.extend(utils.prototype, {
	init: function () {

	},
	_conditionMap: {
		'<=': 'lessThanOrEqualTo',
		'<': 'lessThan',
		'>=': 'greaterThanOrEqualTo',
		'>': 'greaterThan',
		'==': 'equalTo',
		'===': 'equalTo',
		'!=': 'notEqualTo',
		'!==': 'notEqualTo'
	},
	mapQueryCondition: function (rawCondition) {
		return this._conditionMap[rawCondition];
	},
	/**
	 * 私有方法，转换单条bomb数据为可用数据
	 * @param  {Object}  res      单条bomb数据
	 * @param  {Boolean} withInfo 是否带有info字段
	 * @return {Object}           可用数据
	 */
	_raw2data: function (res, withInfo) {
		var _obj = {
			data: res.attributes,
		};
		if (withInfo) {
			_obj.info = _.pick(res, function (value) {
				return _.isString(value);
			});
		}
		return _obj;
	},
	/**
	 * API，将所有raw数据转换成可用数据
	 * @param  {Array} resArr     raw数据数组
	 * @param  {Boolean} withInfo 是否带有info字段
	 * @return {Array}            可用数据数组
	 */
	mapAndRaw2data: function (resArr, withInfo) {
		var _this = this;
		var _objArr = [];
		_.map(resArr, function (res) {
			_objArr.push(_this._raw2data(res, withInfo));
		});
		return _objArr;
	}
})

module.exports = new utils();