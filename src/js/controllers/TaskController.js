app.controller(
    'TaskController',
    function ($scope,
              $rootScope,
              $element,
              $state,
              $stateParams,
              ModalService,
              TaskResource,
              SubmissionResource,
              UserToDoResource,
              PostResource,
              CommentResource) {

        $rootScope.pageTitle = '';
        $rootScope.loading = true;

        /**
         * Task
         */
        $scope.task = null;
        $scope.isOnToDoList = false;

        function onTaskLoad(task) {
            $scope.task = task;
            $scope.isOnToDoList = $scope.task.isOnToDoList;
            $element.css('background-image', 'url(' + task.bgUrl + ')');
        }

        /**
         * Posts List
         */
        $scope.showPostTasks = false;
        $scope.postsOrder = 'featured';
        $scope.posts = PostResource.getTaskPosts({taskSlug: $stateParams.slug}, {type: $scope.postType});

        /**
         * Post
         */
        $scope.post = null;
        $scope.comments = null;
        if ($stateParams.postSlug) {

            PostResource.get({postSlug:$stateParams.postSlug}, function (response) {
                $rootScope.loading = false;
                //$rootScope.pageTitle = response.post.title;
                $scope.post = response.post;
                onTaskLoad(response.post.task);

                if (response.post) {
                    $scope.comments = CommentResource.getPostsComments({postId: response.post.id})
                }
            });

        } else {

            TaskResource.get({slug: $stateParams.slug}, function (task) {
                $rootScope.loading = false;
                //$rootScope.pageTitle = task.name;
                onTaskLoad(task);
            });
        }

        $scope.goToTask = function($event, task) {
            /*preventDefault($event);
            $scope.post = null;
            onTaskLoad(task);*/
        };

        // TODO: paginate posts

        $scope.setPostsOrder = function(order) {
            $scope.postsOrder = order;
        };

        $scope.showSubmissionForm = function() {
            ModalService.showModal({
                templateUrl: 'views/modals/submission-form.html',
                controller: 'SubmissionFormController',
                inputs: {
                    task: $scope.task,
                }
            }).then(function(modal) {

                modal.close.then(function (post) {
                    if (post) {
                        $scope.posts.posts.unshift(post);
                    }
                });

            });

        };

        $scope.showPostForm = function(type) {
            ModalService.showModal({
                templateUrl: 'views/modals/post-form.html',
                controller: 'PostFormController',
                inputs: {
                    task: $scope.task,
                    postType: type
                }
            }).then(function(modal) {

                modal.close.then(function (post) {
                    if (post) {
                        $scope.posts.posts.unshift(post);
                    }
                });

            });

        };

        $scope.addToDo = function () {
            console.log('addToDo');
            UserToDoResource.save(
                {username: $rootScope.currentUser.username},
                {taskId: $scope.task.id},
                function (result) {
                    alertSuccess('Added to To Do List');
                    $scope.isOnToDoList = true;
                },
                function (result) {
                    alertError(result.data.message);
                }
            );
        };

        $scope.removeToDo = function () {
            UserToDoResource.delete(
                {username: $rootScope.currentUser.username},
                {taskId: $scope.task.id},
                function (result) {
                    alertSuccess('Removed from To Do List');
                    $scope.isOnToDoList = false;
                },
                function (result) {
                    alertError(result.data.message);
                }
            );
        };

        $scope.submissionFormData = {
            loading: false,
            text: '',
            image: ''
        };

        $scope.addSubmission = function () {
            $scope.submissionFormData.loading = true;
            SubmissionResource.save(
                {
                    taskId: $scope.task.id,
                    text: $scope.submissionFormData.text,
                    image: $scope.submissionFormData.image
                },
                function (response) {

                },
                function (response) {
                    alertError(response.data.message);
                }
            );
        };

        /**
         * Comments
         */

        $scope.commentFormVisible = false;
        $scope.showCommentForm = function($event, replyToComment) {
            preventDefault($event);

            $scope.commentFormVisible = true;

            if (replyToComment) {
                $scope.commentFormData.replyTo = replyToComment;
                // Move comment form to reply hole
                $('.comment[data-commentid='+replyToComment.id+'] > .replies').prepend($('.comment-form'));
            } else {
                $scope.commentFormData.replyTo = null;
                // Move comment form to top level hole
                $('.comment-form-container').prepend($('.comment-form'));
            }

        };

        $scope.hideCommentForm = function (clear) {
            if (clear) {
                $scope.commentFormData.comment = '';
            }
            $scope.commentFormVisible = false;
            //$('.comment-form-container').prepend($('.comment-form'));
        };

        $scope.loadCommentReplies = function ($event, comment) {
            preventDefault($event);
            CommentResource.getCommentReplies(
                {
                    'commentId': comment.id
                },
                function (response) {
                    comment.replies = response.comments
                },
                function (response) {
                    alertError(response.data.message);
                }
            )
        };

        $scope.commentFormData = {
            loading: false,
            replyTo: null,
            comment: ''
        };

        $scope.addComment = function () {

            //CKEDITOR.instances['comment-text'].fire('change');
            $scope.commentFormData.loading = true;

            if ($scope.commentFormData.replyTo) {

                CommentResource.saveReply(
                    {
                        commentId: $scope.commentFormData.replyTo.id,
                        //postId: $scope.post.id,
                        comment: $scope.commentFormData.comment,
                    },
                    function (response) {
                        if (!$scope.commentFormData.replyTo.replies) {
                            $scope.commentFormData.replyTo.replies = [];
                        }
                        $scope.commentFormData.replyTo.replies.unshift(response.comment);
                        $scope.commentFormData.replyTo.replyCount += 1;
                        $scope.hideCommentForm(true);
                    },
                    function (response) {
                        alertError(response.data.message);
                    }
                );

            } else {

                CommentResource.save(
                    {
                        postId: $scope.post.id,
                        comment: $scope.commentFormData.comment,
                    },
                    function (response) {
                        $scope.comments.comments.unshift(response.comment);
                        $scope.hideCommentForm(true);
                    },
                    function (response) {
                        alertError(response.data.message);
                    }
                );

            }

        };
    }
);
