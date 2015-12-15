angular.module("ReConnectApp.config")
	.constant('ApiEndpoint', {
		'base': "http://localhost:8100/api",
		'auth': "http://localhost:8100/api/authentication/api/authentication",
		'autosave': "http://localhost:8100/api/autosaver/api/autosaver",
		'forum': "http://localhost:8100/api/forum/api/forum",
		'forumThread': "http://localhost:8100/api/forum/api/thread",
		'forumEntry': "http://localhost:8100/api/forum/api/entry",
		'profile': "http://localhost:8100/api/profile/api/profile",
		'avatar': "http://localhost:8100/api/avatar/api/avatar",
		'feed': "http://localhost:8100/api/feed/api/feed",
		'registration': "http://localhost:8100/api/registration/api/registration",
		'messages': "http://localhost:8100/api/commonmessages/api/commonmessages",
		'event': "http://localhost:8100/api/event/api/event"
	
/*		'base': "http://sps.rr-research.no/test/connectApi",
		'auth': "http://sps.rr-research.no/test/connectApi/authentication/api/authentication",
		'autosave': "http://sps.rr-research.no/test/connectApi/autosaver/api/autosaver",
		'forum': "http://sps.rr-research.no/test/connectApi/forum/api/forum",
		'forumThread': "http://sps.rr-research.no/test/connectApi/forum/api/thread",
		'forumEntry': "http://sps.rr-research.no/test/connectApi/forum/api/entry",
		'profile': "http://sps.rr-research.no/test/connectApi/profile/api/profile",
		'avatar': "http://sps.rr-research.no/test/connectApi/avatar/api/avatar",
		'feed': "http://sps.rr-research.no/test/connectApi/feed/api/feed",
		'registration': "http://sps.rr-research.no/test/connectApi/registration/api/registration",
		'messages': "http://sps.rr-research.no/test/connectApi/commonmessages/api/commonmessages",
		'event': "http://sps.rr-research.no/test/connectApi/event/api/event"
*/

/*		'base': "http://sps.rr-research.no/demo/connectApi",
		'auth': "http://sps.rr-research.no/demo/connectApi/authentication/api/authentication",
		'autosave': "http://sps.rr-research.no/demo/connectApi/autosaver/api/autosaver",
		'forum': "http://sps.rr-research.no/demo/connectApi/forum/api/forum",
		'forumThread': "http://sps.rr-research.no/demo/connectApi/forum/api/thread",
		'forumEntry': "http://sps.rr-research.no/demo/connectApi/forum/api/entry",
		'profile': "http://sps.rr-research.no/demo/connectApi/profile/api/profile",
		'avatar': "http://sps.rr-research.no/demo/connectApi/avatar/api/avatar",
		'feed': "http://sps.rr-research.no/demo/connectApi/feed/api/feed",
		'registration': "http://sps.rr-research.no/demo/connectApi/registration/api/registration",
		'messages': "http://sps.rr-research.no/demo/connectApi/commonmessages/api/commonmessages",
		'event': "http://sps.rr-research.no/demo/connectApi/event/api/event"
*/
	});