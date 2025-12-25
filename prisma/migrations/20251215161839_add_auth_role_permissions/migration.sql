-- CreateEnum
CREATE TYPE "WarehouseType" AS ENUM ('MANAJEMEN', 'GIZI', 'SANITASI');

-- CreateEnum
CREATE TYPE "RoleType" AS ENUM ('STAF_RUANGAN', 'STAF_PENGADAAN', 'ADMIN_GUDANG', 'SUPER_ADMIN');

-- CreateEnum
CREATE TYPE "PermissionModule" AS ENUM ('DASHBOARD', 'WAREHOUSE', 'ITEM', 'CATEGORY', 'REQUEST', 'PROCUREMENT', 'STOCK_MOVEMENT', 'REPORT', 'USER_MANAGEMENT', 'ROLE_MANAGEMENT', 'SETTINGS', 'APPROVAL');

-- CreateEnum
CREATE TYPE "PermissionAction" AS ENUM ('VIEW', 'CREATE', 'UPDATE', 'DELETE', 'APPROVE', 'REJECT', 'EXPORT', 'IMPORT');

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true;

-- CreateTable
CREATE TABLE "roles" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "roleType" "RoleType" NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "permissions" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "module" "PermissionModule" NOT NULL,
    "action" "PermissionAction" NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "permissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "role_permissions" (
    "id" TEXT NOT NULL,
    "roleId" TEXT NOT NULL,
    "permissionId" TEXT NOT NULL,
    "warehouseId" TEXT,

    CONSTRAINT "role_permissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_warehouse_roles" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "warehouseId" TEXT NOT NULL,
    "roleId" TEXT NOT NULL,

    CONSTRAINT "user_warehouse_roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "warehouses" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "WarehouseType" NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "warehouses_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "roles_name_key" ON "roles"("name");

-- CreateIndex
CREATE UNIQUE INDEX "permissions_name_key" ON "permissions"("name");

-- CreateIndex
CREATE UNIQUE INDEX "permissions_module_action_key" ON "permissions"("module", "action");

-- CreateIndex
CREATE INDEX "role_permissions_roleId_idx" ON "role_permissions"("roleId");

-- CreateIndex
CREATE INDEX "role_permissions_permissionId_idx" ON "role_permissions"("permissionId");

-- CreateIndex
CREATE UNIQUE INDEX "role_permissions_roleId_permissionId_warehouseId_key" ON "role_permissions"("roleId", "permissionId", "warehouseId");

-- CreateIndex
CREATE INDEX "user_warehouse_roles_userId_idx" ON "user_warehouse_roles"("userId");

-- CreateIndex
CREATE INDEX "user_warehouse_roles_warehouseId_idx" ON "user_warehouse_roles"("warehouseId");

-- CreateIndex
CREATE UNIQUE INDEX "user_warehouse_roles_userId_warehouseId_roleId_key" ON "user_warehouse_roles"("userId", "warehouseId", "roleId");

-- CreateIndex
CREATE UNIQUE INDEX "warehouses_code_key" ON "warehouses"("code");

-- AddForeignKey
ALTER TABLE "role_permissions" ADD CONSTRAINT "role_permissions_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "role_permissions" ADD CONSTRAINT "role_permissions_permissionId_fkey" FOREIGN KEY ("permissionId") REFERENCES "permissions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "role_permissions" ADD CONSTRAINT "role_permissions_warehouseId_fkey" FOREIGN KEY ("warehouseId") REFERENCES "warehouses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_warehouse_roles" ADD CONSTRAINT "user_warehouse_roles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_warehouse_roles" ADD CONSTRAINT "user_warehouse_roles_warehouseId_fkey" FOREIGN KEY ("warehouseId") REFERENCES "warehouses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_warehouse_roles" ADD CONSTRAINT "user_warehouse_roles_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE CASCADE;
