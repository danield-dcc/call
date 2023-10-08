/*
  Warnings:

  - You are about to drop the column `time_end_in_minuts` on the `UserTimeInterval` table. All the data in the column will be lost.
  - Added the required column `time_end_in_minutes` to the `UserTimeInterval` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_UserTimeInterval" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "week_day" INTEGER NOT NULL,
    "time_start_in_minutes" INTEGER NOT NULL,
    "time_end_in_minutes" INTEGER NOT NULL,
    "user_id" TEXT NOT NULL,
    CONSTRAINT "UserTimeInterval_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_UserTimeInterval" ("id", "time_start_in_minutes", "user_id", "week_day") SELECT "id", "time_start_in_minutes", "user_id", "week_day" FROM "UserTimeInterval";
DROP TABLE "UserTimeInterval";
ALTER TABLE "new_UserTimeInterval" RENAME TO "UserTimeInterval";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
