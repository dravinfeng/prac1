$Import('core.util.listener');
STK.register('core.channel.logIn', function(){
	var eventList = ['logIn','logInRefresh','weiboLogin','qqLogin'];
	return STK.core.util.listener.define('core.channel.logIn', eventList);
});