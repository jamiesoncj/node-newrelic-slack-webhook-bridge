var config = require('./config.json');
var Slack = require('./slack');

var slack = new Slack(config.slack.hook_url);

function monitoringEvent(body){
	var msg = '[' + body.application_name + '][' + body.severity +
		'] <' + body.alert_url + '|' + body.message +
		'> -- ' + body.long_description;
	slack.send({
		text: msg,
		channel: config.slack.room,
		username: config.slack.sender,
		icon_url: 'http://i.imgur.com/ePrknxm.png'
	}, function(err, resp){
		if (err){
			console.error('ERROR:\n', err);
		}
	});
}

function deployEvent(body){
	var msg = '[' + body.application_name + '][' + body.created_at +
		'] <' + body.deployment_url + '|' + body.deployed_by +
		'> -- ' + body.description;
	slack.send({
		text: msg,
		channel: config.slack.room,
		username: config.slack.sender,
		icon_url: 'http://i.imgur.com/ePrknxm.png'
	}, function(err, resp){
		if (err){
			console.error('ERROR:\n', err);
		}
	});
}

module.exports = {
	handlePost: function(body){
		if (body.hasOwnProperty('severity')){
			monitoringEvent(body);
		}else{
			deployEvent(body);
		}
	}
};
