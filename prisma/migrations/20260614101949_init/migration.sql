-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('USER', 'ADMIN');

-- CreateEnum
CREATE TYPE "OperationCategory" AS ENUM ('ACTIVE', 'PASSIVE');

-- CreateEnum
CREATE TYPE "StationType" AS ENUM ('INTERNAL', 'EXTERNAL');

-- CreateEnum
CREATE TYPE "WagonOwnership" AS ENUM ('OWN', 'LEASED');

-- CreateEnum
CREATE TYPE "BatchDirection" AS ENUM ('INBOUND', 'OUTBOUND');

-- CreateEnum
CREATE TYPE "BatchType" AS ENUM ('WAYBILL', 'ROUTE_SHEET');

-- CreateEnum
CREATE TYPE "TripStatus" AS ENUM ('ACTIVE', 'COMPLETED');

-- CreateTable
CREATE TABLE "Users" (
    "id" TEXT NOT NULL,
    "login" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "role" "UserRole" NOT NULL DEFAULT 'USER',
    "surname" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "second_name" TEXT NOT NULL,
    "salt" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Batches" (
    "id" TEXT NOT NULL,
    "direction" "BatchDirection" NOT NULL,
    "type" "BatchType" NOT NULL,
    "document_number" TEXT NOT NULL,
    "started_at" TIMESTAMP(3) NOT NULL,
    "cargo_owner_id" TEXT NOT NULL,
    "cargo_id" TEXT,
    "from_station_id" TEXT NOT NULL,
    "to_station_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Batches_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Trips" (
    "id" TEXT NOT NULL,
    "wagon_id" TEXT NOT NULL,
    "batch_id" TEXT NOT NULL,
    "arrival_cargo_id" TEXT,
    "arrival_cargo_weight" DECIMAL(10,3),
    "arrival_wagon_weight" DECIMAL(10,3),
    "started_at" TIMESTAMP(3) NOT NULL,
    "finished_at" TIMESTAMP(3),
    "status" "TripStatus" NOT NULL DEFAULT 'ACTIVE',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Trips_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Wagon_states" (
    "id" TEXT NOT NULL,
    "trip_id" TEXT NOT NULL,
    "wagon_id" TEXT NOT NULL,
    "station_id" TEXT NOT NULL,
    "cargo_id" TEXT,
    "is_empty" BOOLEAN NOT NULL,
    "started_at" TIMESTAMP(3) NOT NULL,
    "ended_at" TIMESTAMP(3),
    "created_by_operation_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Wagon_states_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Wagon_operations" (
    "id" TEXT NOT NULL,
    "trip_id" TEXT NOT NULL,
    "type_id" TEXT NOT NULL,
    "type_name" TEXT NOT NULL,
    "normative" DECIMAL(10,3) NOT NULL,
    "started_at" TIMESTAMP(3) NOT NULL,
    "ended_at" TIMESTAMP(3),
    "wagon_weight" DECIMAL(10,3),
    "cargo_weight" DECIMAL(10,3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Wagon_operations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Operation_types" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "normative" DECIMAL(10,3) NOT NULL,
    "allows_parallel" BOOLEAN NOT NULL DEFAULT false,
    "category" "OperationCategory" NOT NULL,

    CONSTRAINT "Operation_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Wagons" (
    "id" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "affiliation_type" "WagonOwnership" NOT NULL,
    "type_id" TEXT NOT NULL,
    "owner_id" TEXT NOT NULL,
    "bar_package" DECIMAL(10,3) NOT NULL,
    "capacity" DECIMAL(10,3) NOT NULL,
    "volume" DECIMAL(10,3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Wagons_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Wagon_types" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "number_prefix" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Wagon_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Wagon_owners" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Wagon_owners_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cargo_owners" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Cargo_owners_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cargos" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "national_code" TEXT NOT NULL,
    "international_code" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Cargos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Stations" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT,
    "type" "StationType" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Stations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_login_key" ON "Users"("login");

-- CreateIndex
CREATE INDEX "Batches_direction_idx" ON "Batches"("direction");

-- CreateIndex
CREATE INDEX "Batches_type_idx" ON "Batches"("type");

-- CreateIndex
CREATE UNIQUE INDEX "Batches_type_document_number_key" ON "Batches"("type", "document_number");

-- CreateIndex
CREATE INDEX "Trips_wagon_id_idx" ON "Trips"("wagon_id");

-- CreateIndex
CREATE INDEX "Trips_batch_id_idx" ON "Trips"("batch_id");

-- CreateIndex
CREATE UNIQUE INDEX "Wagon_states_created_by_operation_id_key" ON "Wagon_states"("created_by_operation_id");

-- CreateIndex
CREATE INDEX "Wagon_states_wagon_id_idx" ON "Wagon_states"("wagon_id");

-- CreateIndex
CREATE INDEX "Wagon_states_trip_id_idx" ON "Wagon_states"("trip_id");

-- CreateIndex
CREATE INDEX "Wagon_states_station_id_idx" ON "Wagon_states"("station_id");

-- CreateIndex
CREATE INDEX "Wagon_states_ended_at_idx" ON "Wagon_states"("ended_at");

-- CreateIndex
CREATE INDEX "Wagon_states_trip_id_started_at_idx" ON "Wagon_states"("trip_id", "started_at");

-- CreateIndex
CREATE INDEX "Wagon_operations_trip_id_idx" ON "Wagon_operations"("trip_id");

-- CreateIndex
CREATE INDEX "Wagon_operations_type_id_idx" ON "Wagon_operations"("type_id");

-- CreateIndex
CREATE INDEX "Wagon_operations_started_at_idx" ON "Wagon_operations"("started_at");

-- CreateIndex
CREATE INDEX "Wagon_operations_ended_at_idx" ON "Wagon_operations"("ended_at");

-- CreateIndex
CREATE INDEX "Wagon_operations_trip_id_started_at_idx" ON "Wagon_operations"("trip_id", "started_at");

-- CreateIndex
CREATE UNIQUE INDEX "Operation_types_name_key" ON "Operation_types"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Wagons_number_key" ON "Wagons"("number");

-- CreateIndex
CREATE INDEX "Wagons_type_id_idx" ON "Wagons"("type_id");

-- CreateIndex
CREATE INDEX "Wagons_owner_id_idx" ON "Wagons"("owner_id");

-- CreateIndex
CREATE UNIQUE INDEX "Wagon_types_name_key" ON "Wagon_types"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Wagon_owners_name_key" ON "Wagon_owners"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Cargo_owners_name_key" ON "Cargo_owners"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Cargos_name_key" ON "Cargos"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Cargos_national_code_key" ON "Cargos"("national_code");

-- CreateIndex
CREATE UNIQUE INDEX "Cargos_international_code_key" ON "Cargos"("international_code");

-- CreateIndex
CREATE UNIQUE INDEX "Stations_name_key" ON "Stations"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Stations_code_key" ON "Stations"("code");

-- CreateIndex
CREATE INDEX "Stations_type_idx" ON "Stations"("type");

-- AddForeignKey
ALTER TABLE "Batches" ADD CONSTRAINT "Batches_cargo_owner_id_fkey" FOREIGN KEY ("cargo_owner_id") REFERENCES "Cargo_owners"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Batches" ADD CONSTRAINT "Batches_cargo_id_fkey" FOREIGN KEY ("cargo_id") REFERENCES "Cargos"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Batches" ADD CONSTRAINT "Batches_from_station_id_fkey" FOREIGN KEY ("from_station_id") REFERENCES "Stations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Batches" ADD CONSTRAINT "Batches_to_station_id_fkey" FOREIGN KEY ("to_station_id") REFERENCES "Stations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trips" ADD CONSTRAINT "Trips_wagon_id_fkey" FOREIGN KEY ("wagon_id") REFERENCES "Wagons"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trips" ADD CONSTRAINT "Trips_batch_id_fkey" FOREIGN KEY ("batch_id") REFERENCES "Batches"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trips" ADD CONSTRAINT "Trips_arrival_cargo_id_fkey" FOREIGN KEY ("arrival_cargo_id") REFERENCES "Cargos"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Wagon_states" ADD CONSTRAINT "Wagon_states_trip_id_fkey" FOREIGN KEY ("trip_id") REFERENCES "Trips"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Wagon_states" ADD CONSTRAINT "Wagon_states_wagon_id_fkey" FOREIGN KEY ("wagon_id") REFERENCES "Wagons"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Wagon_states" ADD CONSTRAINT "Wagon_states_station_id_fkey" FOREIGN KEY ("station_id") REFERENCES "Stations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Wagon_states" ADD CONSTRAINT "Wagon_states_cargo_id_fkey" FOREIGN KEY ("cargo_id") REFERENCES "Cargos"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Wagon_states" ADD CONSTRAINT "Wagon_states_created_by_operation_id_fkey" FOREIGN KEY ("created_by_operation_id") REFERENCES "Wagon_operations"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Wagon_operations" ADD CONSTRAINT "Wagon_operations_trip_id_fkey" FOREIGN KEY ("trip_id") REFERENCES "Trips"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Wagon_operations" ADD CONSTRAINT "Wagon_operations_type_id_fkey" FOREIGN KEY ("type_id") REFERENCES "Operation_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Wagons" ADD CONSTRAINT "Wagons_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "Wagon_owners"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Wagons" ADD CONSTRAINT "Wagons_type_id_fkey" FOREIGN KEY ("type_id") REFERENCES "Wagon_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
