-- CreateTable
CREATE TABLE `votes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `post_id` INTEGER NULL,
    `thread_id` INTEGER NULL,
    `userId` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    INDEX `votes_post_id_idx`(`post_id`),
    INDEX `votes_thread_id_idx`(`thread_id`),
    INDEX `votes_userId_idx`(`userId`),
    UNIQUE INDEX `votes_post_id_userId_key`(`post_id`, `userId`),
    UNIQUE INDEX `votes_thread_id_userId_key`(`thread_id`, `userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
