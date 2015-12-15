angular.module("ReConnectApp.config")
	.constant("AutosaveInterval", 10000)
	.constant('GuidEmpty', '00000000-0000-0000-0000-000000000000')
    .constant('DefaultLanguage', 'nb-NO')
    .constant('StaticForumId', 1) //null if list should be shown
    .constant('ResourcePath', 'resources/')
    .constant('AvatarPath', '/css/images/avatars/')
    .constant('sessionTimeout', 900000)
    .constant('timeoutIntervalFrequecy', 1000)
    .constant('sessionTimeOutWarning', 720000);