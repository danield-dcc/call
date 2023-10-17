-- DropForeignKey
ALTER TABLE `UserTimeInterval` DROP FOREIGN KEY `UserTimeInterval_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `accounts` DROP FOREIGN KEY `accounts_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `schedulings` DROP FOREIGN KEY `schedulings_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `seccions` DROP FOREIGN KEY `seccions_user_id_fkey`;

-- RenameIndex
ALTER TABLE `UserTimeInterval` RENAME INDEX `UserTimeInterval_user_id_fkey` TO `UserTimeInterval_user_id_idx`;

-- RenameIndex
ALTER TABLE `accounts` RENAME INDEX `accounts_user_id_fkey` TO `accounts_user_id_idx`;

-- RenameIndex
ALTER TABLE `schedulings` RENAME INDEX `schedulings_user_id_fkey` TO `schedulings_user_id_idx`;

-- RenameIndex
ALTER TABLE `seccions` RENAME INDEX `seccions_user_id_fkey` TO `seccions_user_id_idx`;
