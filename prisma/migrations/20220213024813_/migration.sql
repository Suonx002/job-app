-- AlterTable
ALTER TABLE `User` ADD COLUMN `firstName` VARCHAR(191) NULL,
    ADD COLUMN `lastName` VARCHAR(191) NULL,
    ADD COLUMN `location` VARCHAR(191) NULL,
    ADD COLUMN `password` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `Job` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `companyName` VARCHAR(100) NOT NULL,
    `jobPosition` VARCHAR(100) NOT NULL,
    `jobStatus` ENUM('interview', 'pending', 'accepted', 'declined') NOT NULL DEFAULT 'pending',
    `jobType` ENUM('internship', 'partTime', 'fullTime', 'remote') NOT NULL DEFAULT 'fullTime',
    `jobLocation` VARCHAR(100) NOT NULL,
    `createdAt` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updatedAt` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `userId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
