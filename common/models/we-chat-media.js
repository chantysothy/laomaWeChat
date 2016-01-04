var WechatAPI = require('wechat-api');

var weApi = new WechatAPI('wx98ab62481a491de2', '584c19534af18d27fdd77e3e03fbe073');
// api.updateRemark('open_id', 'remarked', function (err, data, res) {
//   // TODO
// });

module.exports = function(WeChatMedia) {

	WeChatMedia._tmp_getMaterials = function (type, offset, count, cb) {
		weApi.getMaterials(type, offset, count, function(err, result, res){
				var resp = {"err":err, "result":result, "res":res}
				cb(null, resp);
			
		})
	}
	WeChatMedia.remoteMethod(
		'_tmp_getMaterials',
		{
			accepts: [
				{arg:'type', type:'string'},
				{arg:'offset', type:'number'},
				{arg:'count', type:'number'}
			],
			returns: {arg:'media', type:'object'}
		}
	)

	WeChatMedia._tmp_getMaterialById = function (mediaId, cb) {
		weApi.getMaterial(mediaId, function(err, result, res){
				// var bufferToString = result.toString();
				// var objFromBuffer = JSON.parse(bufferToString);
				// var 
				// if(objFromBuffer.news_item){
				// 	var 
				// }
				// var bufferToJSON = result.toJSON();
				// var resp = {"err":err, "result":result, "res":res}
				cb(null, result);
			
		})
	}
	WeChatMedia.remoteMethod(
		'_tmp_getMaterialById',
		{
			accepts: {arg:'mediaId', type:'string'},
			returns: {arg:'media', type:'Buffer'}
		}
	)

	WeChatMedia.getNewsById = function (mediaId, cb) {
		weApi.getMaterial(mediaId, function(err, result, res){
			if(err!=null){
				var resp = {"err":err, "result":result, "res":res}
				cb(null, resp);
				return false;
			}
			var bufferToString = result.toString();
			var objFromBuffer = JSON.parse(bufferToString);
			var rt;
			if(objFromBuffer.news_item){
				rt = objFromBuffer.news_item[0];
			}
			cb(null, rt);
			
		})
	}
	WeChatMedia.remoteMethod(
		'getNewsById',
		{
			accepts: {arg:'mediaId', type:'string'},
			returns: {arg:'media', type:'object'}
		}
	)

	WeChatMedia.getNews = function (offset, count, cb) {
		var type = "news";
		weApi.getMaterials(type, offset, count, function(err, result, res){
				var resp = {"err":err, "result":result, "res":res}
				cb(null, resp);
			
		})
	}
	WeChatMedia.remoteMethod(
		'getNews',
		{
			accepts: [
				{arg:'offset', type:'number'},
				{arg:'count', type:'number'}
			],
			returns: {arg:'media', type:'object'}
		}
	)

	WeChatMedia.getLatestToken = function (cb) {
		weApi.getLatestToken(function(err, token){
			cb(null, token);
		})
	}
	WeChatMedia.remoteMethod(
		'getLatestToken',
		{
			returns: {arg:'token', type:'string'}
		}
	)

};
