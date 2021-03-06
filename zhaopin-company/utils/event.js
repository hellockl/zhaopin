/**
 * event.js
 * 用于微信小程序跨页面通讯
 * @date 2017-02-24
 * @author linrui
 */

var events = {};

/**
 * [on description] 
 * @param  {[type]}   name     [description]  event name
 * @param  {[type]}   self     [description]  the obj when event execute
 * @param  {Function} callback [description]  callback function
 * @return {[type]}            [description]
 */
function on(name, self, callback) {
	var tuple = {
		'self': self,
		callback: callback
	};
	var tuples = events[name] || [];
	tuples.push(tuple);
	events[name] = tuples;
}

/**
 * [emit description] 
 * @param  {[type]} name [description]  event name
 * @param  {[type]} data [description]  the callback props
 * @return {[type]}      [description]  
 */
function emit(name, data) {
	var tuples = events[name] || [];
	tuples.map((tuple) => {
		var _this = tuple['self'];
		var callback = tuple['callback'];
		callback.call(_this, data);
	})
}

/**
 * [remove description] remove event listener
 * @param  {[type]} name [description]  event name
 * @param  {[type]} self [description]  the obj when event execute
 * @return {[type]}      [description]
 */
function remove(name, self) {
	var tuples = events[name] || [];
	events[name] = tuples.filter((tuple) => {
		return tuple['self'] != self;
	})
}

/**
 * [cb description] resume修改新建等通用callback 一共3种event_type change add delete
 * @param  {[type]}   data [description] 
 * @return {Function}      [description]
 */
function cb(data) {
	if (!inArray(data.key, Object.keys(this.data.resume))) return;
	let _key = data.key;
	let _resume = this.data.resume;
	if (data.event_type == 'change') {
		if (Array.isArray(_resume[_key])) {
			_resume[_key].forEach((val, index) => {
				if (val.id == data.value.id) {
					_resume[_key][index] = data.value;
					this.setData({
						resume: _resume
					})
				}
			})
		} else {
			_resume[_key] = data.value;
			this.setData({
				resume: _resume
			})
		}
	} else if (data.event_type == 'add') {
		data.value['id'] = parseInt(_resume[_key][_resume[_key].length - 1].id) + 1;
		_resume[_key].push(data.value);
		this.setData({
			resume: _resume
		})
	} else {
		_resume[_key].forEach((val, index) => {
			if (val.id == data.value.id) {
				_resume[_key].splice(index, 1);
				this.setData({
					resume: _resume
				})
			}
		})
	}

}

function inArray(value, arr) {
	for (let t in arr) {
		if (arr[t] == value)
			return true;
	}
	return false;
}

module.exports = {
	on: on,
	emit: emit,
	remove: remove,
	cb: cb
}


