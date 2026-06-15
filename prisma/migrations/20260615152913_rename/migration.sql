/*
  Warnings:

  - The values [ACTIVE,PASSIVE] on the enum `OperationCategory` will be removed. If these variants are still used in the database, this will fail.
  - The values [LEASED] on the enum `WagonOwnership` will be removed. If these variants are still used in the database, this will fail.

*/
-- CreateEnum
CREATE TYPE "AuditAction" AS ENUM ('CREATE', 'UPDATE');

-- AlterEnum
BEGIN;
CREATE TYPE "OperationCategory_new" AS ENUM ('PRIMARY', 'SECONDARY');
ALTER TABLE "Operation_types" ALTER COLUMN "category" TYPE "OperationCategory_new" USING ("category"::text::"OperationCategory_new");
ALTER TYPE "OperationCategory" RENAME TO "OperationCategory_old";
ALTER TYPE "OperationCategory_new" RENAME TO "OperationCategory";
DROP TYPE "public"."OperationCategory_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "WagonOwnership_new" AS ENUM ('OWN', 'RENTED');
ALTER TABLE "Wagons" ALTER COLUMN "affiliation_type" TYPE "WagonOwnership_new" USING ("affiliation_type"::text::"WagonOwnership_new");
ALTER TYPE "WagonOwnership" RENAME TO "WagonOwnership_old";
ALTER TYPE "WagonOwnership_new" RENAME TO "WagonOwnership";
DROP TYPE "public"."WagonOwnership_old";
COMMIT;

-- CreateTable
CREATE TABLE "Audit_logs" (
    "id" TEXT NOT NULL,
    "entity_type" TEXT NOT NULL,
    "entity_id" TEXT NOT NULL,
    "action" "AuditAction" NOT NULL,
    "old_data" JSONB,
    "new_data" JSONB,
    "user_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Audit_logs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Audit_logs_entity_type_idx" ON "Audit_logs"("entity_type");

-- CreateIndex
CREATE INDEX "Audit_logs_entity_id_idx" ON "Audit_logs"("entity_id");

-- AddForeignKey
ALTER TABLE "Audit_logs" ADD CONSTRAINT "Audit_logs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
