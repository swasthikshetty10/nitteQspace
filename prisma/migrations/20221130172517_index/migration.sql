-- CreateIndex
CREATE INDEX `Post_authorId_idx` ON `Post`(`authorId`);

-- CreateIndex
CREATE INDEX `Post_category_id_idx` ON `Post`(`category_id`);

-- CreateIndex
CREATE INDEX `Thread_parent_id_idx` ON `Thread`(`parent_id`);

-- CreateIndex
CREATE INDEX `Thread_postId_idx` ON `Thread`(`postId`);

-- CreateIndex
CREATE INDEX `Thread_authorId_idx` ON `Thread`(`authorId`);

-- CreateIndex
CREATE INDEX `accounts_user_id_idx` ON `accounts`(`user_id`);

-- CreateIndex
CREATE INDEX `follows_followingId_idx` ON `follows`(`followingId`);

-- CreateIndex
CREATE INDEX `resources_category_id_idx` ON `resources`(`category_id`);

-- CreateIndex
CREATE INDEX `sessions_user_id_idx` ON `sessions`(`user_id`);
