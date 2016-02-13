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

                progress.completed = sticker.progress.completed.length;

                for (var i = 0; i < sticker.progress.completed.length; i++) {
                    progress.completedIds.push(sticker.progress.completed[i].id);
                }

                for (var i = 0; i < sticker.progress.pending.length; i++) {
                    progress.pendingIds.push(sticker.progress.pending[i].id);
                }

                for (var i = 0; i < sticker.progress.rejected.length; i++) {
                    progress.rejectedIds.push(sticker.progress.rejected[i].id);
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
