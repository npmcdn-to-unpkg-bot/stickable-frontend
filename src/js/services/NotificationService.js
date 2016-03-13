app.service(
    'NotificationService',
    function ($rootScope, $timeout, AuthService, UserNotificationsResource) {

        console.log('NotificationService');

        var socket = null;
        var connected = false;

        return {

            getNotifications: function (user) {
                // Fetch notifications
                $rootScope.notifications = UserNotificationsResource.query({username: user.username});
            },

            onLogin: function (user) {
                this.getNotifications(user);

                this.initSocket();
            },

            initSocket: function () {
                var self = this;

                if (socket !== null) {
                    if (connected) {
                        // Already connected, so the connect event isn't going to fire again to set the user
                        self.setUser();
                    }
                    return socket;
                }

                socket = io(socketUrl);

                socket.on('connect', function () {
                    connected = true;
                    self.setUser();
                });

                socket.on('new-notification', function (message) {
                    self.addNewNotification(message.notification);
                });

                return socket;
            },

            setUser: function () {
                socket.emit('set-user', {token: AuthService.getSessionToken()});
            },

            addNewNotification: function (notification) {
                notification.new = true;
                $rootScope.notifications.unshift(notification);
                $rootScope.notificationsPreview += 1;
                $rootScope.$digest();
                //alertSuccess(message.notification.text);

                $timeout(function () {
                    notification.new = false;
                    $rootScope.notificationsPreview -= 1;
                }, 3000);
            }
        }
    }
);
