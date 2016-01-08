app.service(
    'AuthService',
    function (localStorageService, SessionResource, $q, $rootScope, angularLoad) {

        var session = null;
        var sessionToken = null;

        return {

            checkSession: function() {
                var self = this;

                if (sessionToken = localStorageService.get('sessionToken')) {
                    SessionResource.get(
                        {sessionToken: sessionToken},
                        function (session) {
                            self.onLogin(session, sessionToken);
                        },
                        function(response) {
                            if (response.status === 400) {
                                self.onLogout();
                            } else {
                                alertError("There was an error logging in to Stickable. Please refresh to try again.");
                            }
                        }
                    );
                } else {
                    self.onLogout();
                }
            },

            /**
             * @param username
             * @param password
             * @returns $q
             */
            login: function(username, password) {
                var self = this;

                return $q(function(resolve, reject) {

                    SessionResource.save({
                        username: username,
                        password: password
                    }, function(response) {

                        self.onLogin(response.session, response.sessionToken);

                        // Resolve promise (sends back user)
                        resolve(response.session.user);

                    }, function (response) {
                        reject(response.data);
                    });

                });
            },

            onLogin: function(newSession, newSessionKey) {

                session = newSession;
                sessionToken = newSessionKey;
                localStorageService.set('sessionToken', newSessionKey);

                console.log('onLogin', newSession);

                // Tell everybody we're logged in
                $rootScope.$broadcast('login', {user: newSession.user});
            },

            logout: function() {
                var self = this;

                SessionResource.delete({
                    sessionToken: sessionToken
                });

                self.onLogout();

            },

            onLogout: function() {

                session = false;
                sessionToken = false;
                localStorageService.remove('sessionToken');

                // Tell everybody we're logged in
                $rootScope.$broadcast('logout');

            },

            getSessionToken: function() {
                return sessionToken;
            },

            getUser: function() {
                if (session === null) {
                    return null;
                }

                return session && session.user ? session.user : false;
            }
        };
    }
);
