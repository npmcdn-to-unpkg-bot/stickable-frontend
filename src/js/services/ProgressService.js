app.service(
    'ProgressService',
    function () {

        return {
            /**
             *
             * @param {Object} sticker
             */
            getProgress: function (sticker) {

                var progress = {
                    completed: 0,
                    completedIds: [],
                    pending: 0,
                    pendingIds: [],
                    rejected: 0,
                    rejectedIds: [],
                    remaining: 0,
                    percent: 0
                };

                var taskIds = [];

                progress.completed = sticker.progress.completed.length;

                for (var i = 0; i < sticker.progress.completed.length; i++) {
                    var taskId = sticker.progress.completed[i].id;
                    progress.completedIds.push(taskId);
                    taskIds.push(taskId);
                }

                for (var i = 0; i < sticker.progress.pending.length; i++) {
                    var taskId = sticker.progress.pending[i].id;
                    if (taskIds.indexOf(taskId) === -1) {
                        progress.pendingIds.push(taskId);
                        taskIds.push(taskId);
                    }
                }

                for (var i = 0; i < sticker.progress.rejected.length; i++) {
                    var taskId = sticker.progress.rejected[i].id;
                    if (taskIds.indexOf(taskId) === -1) {
                        progress.rejectedIds.push(taskId);
                        taskIds.push(taskId);
                    }
                }

                progress.pending = sticker.progress.pending.length;
                progress.rejected = sticker.progress.rejected.length;

                var required = sticker.requiredTasks;
                if (!required) {
                    required = sticker.tasks.length;
                }

                progress.remaining = Math.max(0, required - progress.completed);

                progress.percent = Math.ceil(Math.min(progress.completed, required) / required * 100);

                return progress;
            }
        }
    }
);
