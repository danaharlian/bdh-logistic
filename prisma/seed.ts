import "dotenv/config";
import { prisma } from "@/lib/prisma";
import {
  PermissionModule,
  PermissionAction,
  RoleType,
  WarehouseType,
} from "@/lib/generated/prisma/enums";

async function main() {
  console.log("🌱 Starting seed...");

  console.log("📦 Creating warehouses...");

  const warehouseManajemen = await prisma.warehouse.upsert({
    where: { code: "WH-MNG" },
    update: {},
    create: {
      code: "WH-MNG",
      name: "Gudang Manajemen",
      type: WarehouseType.MANAJEMEN,
    },
  });

  const warehouseGizi = await prisma.warehouse.upsert({
    where: { code: "WH-GIZI" },
    update: {},
    create: {
      code: "WH-GIZ",
      name: "Gudang Gizi",
      type: WarehouseType.GIZI,
    },
  });

  const warehouseSanitasi = await prisma.warehouse.upsert({
    where: { code: "WH-SAN" },
    update: {},
    create: {
      code: "WH-SAN",
      name: "Gudang Sanitasi",
      type: WarehouseType.SANITASI,
    },
  });

  const permissions = [
    // Dashboard
    {
      name: "view_dashboard",
      module: PermissionModule.DASHBOARD,
      action: PermissionAction.VIEW,
    },

    // Warehouse Management
    {
      name: "view_warehouse",
      module: PermissionModule.WAREHOUSE,
      action: PermissionAction.VIEW,
    },
    {
      name: "create_warehouse",
      module: PermissionModule.WAREHOUSE,
      action: PermissionAction.CREATE,
    },
    {
      name: "update_warehouse",
      module: PermissionModule.WAREHOUSE,
      action: PermissionAction.UPDATE,
    },
    {
      name: "delete_warehouse",
      module: PermissionModule.WAREHOUSE,
      action: PermissionAction.DELETE,
    },

    // Item Management (Master Data Barang)
    {
      name: "view_item",
      module: PermissionModule.ITEM,
      action: PermissionAction.VIEW,
    },
    {
      name: "create_item",
      module: PermissionModule.ITEM,
      action: PermissionAction.CREATE,
    },
    {
      name: "update_item",
      module: PermissionModule.ITEM,
      action: PermissionAction.UPDATE,
    },
    {
      name: "delete_item",
      module: PermissionModule.ITEM,
      action: PermissionAction.DELETE,
    },

    // Category Management
    {
      name: "view_category",
      module: PermissionModule.CATEGORY,
      action: PermissionAction.VIEW,
    },
    {
      name: "create_category",
      module: PermissionModule.CATEGORY,
      action: PermissionAction.CREATE,
    },
    {
      name: "update_category",
      module: PermissionModule.CATEGORY,
      action: PermissionAction.UPDATE,
    },
    {
      name: "delete_category",
      module: PermissionModule.CATEGORY,
      action: PermissionAction.DELETE,
    },

    // Request
    {
      name: "view_request",
      module: PermissionModule.REQUEST,
      action: PermissionAction.VIEW,
    },
    {
      name: "create_request",
      module: PermissionModule.REQUEST,
      action: PermissionAction.CREATE,
    },
    {
      name: "update_request",
      module: PermissionModule.REQUEST,
      action: PermissionAction.UPDATE,
    },
    {
      name: "delete_request",
      module: PermissionModule.REQUEST,
      action: PermissionAction.DELETE,
    },
    {
      name: "approve_request",
      module: PermissionModule.REQUEST,
      action: PermissionAction.APPROVE,
    },
    {
      name: "reject_request",
      module: PermissionModule.REQUEST,
      action: PermissionAction.REJECT,
    },

    // Pengadaan
    {
      name: "view_procurement",
      module: PermissionModule.PROCUREMENT,
      action: PermissionAction.VIEW,
    },
    {
      name: "create_procurement",
      module: PermissionModule.PROCUREMENT,
      action: PermissionAction.CREATE,
    },
    {
      name: "update_procurement",
      module: PermissionModule.PROCUREMENT,
      action: PermissionAction.UPDATE,
    },
    {
      name: "delete_procurement",
      module: PermissionModule.PROCUREMENT,
      action: PermissionAction.DELETE,
    },
    {
      name: "approve_procurement",
      module: PermissionModule.PROCUREMENT,
      action: PermissionAction.APPROVE,
    },

    // User Management
    {
      name: "view_user",
      module: PermissionModule.USER_MANAGEMENT,
      action: PermissionAction.VIEW,
    },
    {
      name: "create_user",
      module: PermissionModule.USER_MANAGEMENT,
      action: PermissionAction.CREATE,
    },
    {
      name: "update_user",
      module: PermissionModule.USER_MANAGEMENT,
      action: PermissionAction.UPDATE,
    },
    {
      name: "delete_user",
      module: PermissionModule.USER_MANAGEMENT,
      action: PermissionAction.DELETE,
    },

    // Role Management
    {
      name: "view_role",
      module: PermissionModule.ROLE_MANAGEMENT,
      action: PermissionAction.VIEW,
    },
    {
      name: "create_role",
      module: PermissionModule.ROLE_MANAGEMENT,
      action: PermissionAction.CREATE,
    },
    {
      name: "update_role",
      module: PermissionModule.ROLE_MANAGEMENT,
      action: PermissionAction.UPDATE,
    },
    {
      name: "delete_role",
      module: PermissionModule.ROLE_MANAGEMENT,
      action: PermissionAction.DELETE,
    },

    // Settings
    {
      name: "view_settings",
      module: PermissionModule.SETTINGS,
      action: PermissionAction.VIEW,
    },
    {
      name: "update_settings",
      module: PermissionModule.SETTINGS,
      action: PermissionAction.UPDATE,
    },
  ];

  console.log("🔐 Creating permissions...");

  for (const permission of permissions) {
    await prisma.permission.upsert({
      where: { name: permission.name },
      update: {},
      create: permission,
    });
  }

  console.log("🚦Creating roles...");

  const stafRuanganRole = await prisma.role.upsert({
    where: { name: "Staf Ruangan" },
    update: {},
    create: {
      name: "Staf Ruangan",
      roleType: RoleType.STAF_RUANGAN,
      description: "Staf yang melakukan permintaan barang ke gudang",
    },
  });

  const stafPengadaanRole = await prisma.role.upsert({
    where: { name: "Staf Pengadaan" },
    update: {},
    create: {
      name: "Staf Pengadaan",
      roleType: RoleType.STAF_PENGADAAN,
      description: "Staf yang mengelola pengadaan barang untuk gudang",
    },
  });

  const adminGudangRole = await prisma.role.upsert({
    where: { name: "Admin Gudang" },
    update: {},
    create: {
      name: "Admin Gudang",
      roleType: RoleType.ADMIN_GUDANG,
      description: "Admin yang mengelola satu gudang spesifik",
    },
  });

  const superAdminRole = await prisma.role.upsert({
    where: { name: "Super Admin" },
    update: {},
    create: {
      name: "Super Admin",
      roleType: RoleType.SUPER_ADMIN,
      description: "Administrator sistem dengan akses penuh",
    },
  });

  console.log("🔗 Assigning permissions to roles...");

  // STAF RUANGAN - Hanya bisa request barang
  const stafRuanganPermissions = [
    "view_dashboard",
    "view_item",
    "view_request",
    "create_request",
    "update_request",
    "delete_request",
  ];

  for (const permissionName of stafRuanganPermissions) {
    const permission = await prisma.permission.findUnique({
      where: { name: permissionName },
    });

    if (permission) {
      await prisma.rolePermission.upsert({
        where: {
          roleId_permissionId: {
            roleId: stafRuanganRole.id,
            permissionId: permission.id,
          },
        },
        update: {},
        create: {
          roleId: stafRuanganRole.id,
          permissionId: permission.id,
        },
      });
    }
  }

  // STAF PENGADAAN
  const stafPengadaanPermissions = [
    "view_dashboard",
    "view_warehouse",
    "view_item",
    "create_item",
    "update_item",
    "view_category",
    "view_procurement",
    "create_procurement",
    "update_procurement",
    "delete_procurement",
    "approve_procurement",
  ];

  for (const permissionName of stafPengadaanPermissions) {
    const permission = await prisma.permission.findUnique({
      where: { name: permissionName },
    });

    if (permission) {
      await prisma.rolePermission.upsert({
        where: {
          roleId_permissionId: {
            roleId: stafPengadaanRole.id,
            permissionId: permission.id,
          },
        },
        update: {},
        create: {
          roleId: stafPengadaanRole.id,
          permissionId: permission.id,
        },
      });
    }
  }

  // ADMIN GUDANG - Full control untuk gudangnya sendiri
  const adminGudangPermissions = [
    "view_dashboard",
    "view_warehouse", // Hanya gudangnya sendiri
    "view_item",
    "create_item",
    "update_item",
    "delete_item",
    "import_item",
    "view_category",
    "create_category",
    "update_category",
    "delete_category",
    "view_request",
    "approve_request",
    "reject_request",
    "view_procurement",
  ];

  for (const permissionName of adminGudangPermissions) {
    const permission = await prisma.permission.findUnique({
      where: { name: permissionName },
    });

    if (permission) {
      await prisma.rolePermission.upsert({
        where: {
          roleId_permissionId: {
            roleId: adminGudangRole.id,
            permissionId: permission.id,
          },
        },
        update: {},
        create: {
          roleId: adminGudangRole.id,
          permissionId: permission.id,
        },
      });
    }
  }

  // SUPER ADMIN - All permissions
  const allPermissions = await prisma.permission.findMany();
  for (const permission of allPermissions) {
    await prisma.rolePermission.upsert({
      where: {
        roleId_permissionId: {
          roleId: superAdminRole.id,
          permissionId: permission.id,
        },
      },
      update: {},
      create: {
        roleId: superAdminRole.id,
        permissionId: permission.id,
      },
    });
  }

  console.log("👤 Creating users...");

  const hashedPassword =
    "f42ce506f95d92242e5795b7d0b80666:a81999b1f4a5946b9aeaa477726705ec4c9a204019adbccd0a315708bd24b471122e3d33b4f505b48ff212c7cbdda2cb86f77ec2ae28a6925149e827abccb169"; // 11111111

  const superAdmin = await prisma.user.upsert({
    where: { email: "superadmin@bdh.com" },
    update: {},
    create: {
      name: "Super Admin",
      email: "superadmin@bdh.com",
      accounts: {
        create: {
          accountId: "superadmin",
          providerId: "credential",
          password: hashedPassword,
        },
      },
    },
  });

  const adminGudangManajemen = await prisma.user.upsert({
    where: { email: "admin.manajemen@bdh.com" },
    update: {},
    create: {
      name: "Admin Gudang Manajemen",
      email: "admin.manajemen@bdh.com",
      accounts: {
        create: {
          accountId: "admin-manajemen",
          providerId: "credential",
          password: hashedPassword,
        },
      },
    },
  });

  const adminGudangGizi = await prisma.user.upsert({
    where: { email: "admin.gizi@bdh.com" },
    update: {},
    create: {
      name: "Admin Gudang Gizi",
      email: "admin.gizi@bdh.com",
      accounts: {
        create: {
          accountId: "admin-gizi",
          providerId: "credential",
          password: hashedPassword,
        },
      },
    },
  });

  const adminGudangSanitasi = await prisma.user.upsert({
    where: { email: "admin.sanitasi@bdh.com" },
    update: {},
    create: {
      name: "Admin Gudang Sanitasi",
      email: "admin.sanitasi@bdh.com",
      accounts: {
        create: {
          accountId: "admin-sanitasi",
          providerId: "credential",
          password: hashedPassword,
        },
      },
    },
  });

  const stafPengadaan = await prisma.user.upsert({
    where: { email: "staf.pengadaan@bdh.com" },
    update: {},
    create: {
      name: "Staf Pengadaan",
      email: "staf.pengadaan@bdh.com",
      accounts: {
        create: {
          accountId: "staf-pengadaan",
          providerId: "credential",
          password: hashedPassword,
        },
      },
    },
  });

  const stafRuangan = await prisma.user.upsert({
    where: { email: "staf.ruangan@bdh.com" },
    update: {},
    create: {
      name: "Staf Ruangan",
      email: "staf.ruangan@bdh.com",
      accounts: {
        create: {
          accountId: "staf-ruangan",
          providerId: "credential",
          password: hashedPassword,
        },
      },
    },
  });

  console.log("✅ Users created");

  console.log("🔗 Assigning users to warehouses...");

  // Super Admin - Access ke semua gudang
  await prisma.userWarehouseRole.upsert({
    where: {
      userId_warehouseId_roleId: {
        userId: superAdmin.id,
        warehouseId: warehouseManajemen.id,
        roleId: superAdminRole.id,
      },
    },
    update: {},
    create: {
      userId: superAdmin.id,
      warehouseId: warehouseManajemen.id,
      roleId: superAdminRole.id,
    },
  });

  await prisma.userWarehouseRole.upsert({
    where: {
      userId_warehouseId_roleId: {
        userId: superAdmin.id,
        warehouseId: warehouseGizi.id,
        roleId: superAdminRole.id,
      },
    },
    update: {},
    create: {
      userId: superAdmin.id,
      warehouseId: warehouseGizi.id,
      roleId: superAdminRole.id,
    },
  });

  await prisma.userWarehouseRole.upsert({
    where: {
      userId_warehouseId_roleId: {
        userId: superAdmin.id,
        warehouseId: warehouseSanitasi.id,
        roleId: superAdminRole.id,
      },
    },
    update: {},
    create: {
      userId: superAdmin.id,
      warehouseId: warehouseSanitasi.id,
      roleId: superAdminRole.id,
    },
  });

  // Admin Gudang Manajemen
  await prisma.userWarehouseRole.upsert({
    where: {
      userId_warehouseId_roleId: {
        userId: adminGudangManajemen.id,
        warehouseId: warehouseManajemen.id,
        roleId: adminGudangRole.id,
      },
    },
    update: {},
    create: {
      userId: adminGudangManajemen.id,
      warehouseId: warehouseManajemen.id,
      roleId: adminGudangRole.id,
    },
  });

  // Admin Gudang Gizi
  await prisma.userWarehouseRole.upsert({
    where: {
      userId_warehouseId_roleId: {
        userId: adminGudangGizi.id,
        warehouseId: warehouseGizi.id,
        roleId: adminGudangRole.id,
      },
    },
    update: {},
    create: {
      userId: adminGudangGizi.id,
      warehouseId: warehouseGizi.id,
      roleId: adminGudangRole.id,
    },
  });

  // Admin Gudang Sanitasi
  await prisma.userWarehouseRole.upsert({
    where: {
      userId_warehouseId_roleId: {
        userId: adminGudangSanitasi.id,
        warehouseId: warehouseSanitasi.id,
        roleId: adminGudangRole.id,
      },
    },
    update: {},
    create: {
      userId: adminGudangSanitasi.id,
      warehouseId: warehouseSanitasi.id,
      roleId: adminGudangRole.id,
    },
  });

  // Staf Pengadaan
  await prisma.userWarehouseRole.upsert({
    where: {
      userId_warehouseId_roleId: {
        userId: stafPengadaan.id,
        warehouseId: warehouseManajemen.id,
        roleId: stafPengadaanRole.id,
      },
    },
    update: {},
    create: {
      userId: stafPengadaan.id,
      warehouseId: warehouseManajemen.id,
      roleId: stafPengadaanRole.id,
    },
  });

  await prisma.userWarehouseRole.upsert({
    where: {
      userId_warehouseId_roleId: {
        userId: stafPengadaan.id,
        warehouseId: warehouseSanitasi.id,
        roleId: stafPengadaanRole.id,
      },
    },
    update: {},
    create: {
      userId: stafPengadaan.id,
      warehouseId: warehouseSanitasi.id,
      roleId: stafPengadaanRole.id,
    },
  });

  // Staf Ruangan
  await prisma.userWarehouseRole.upsert({
    where: {
      userId_warehouseId_roleId: {
        userId: stafRuangan.id,
        warehouseId: warehouseManajemen.id,
        roleId: stafRuanganRole.id,
      },
    },
    update: {},
    create: {
      userId: stafRuangan.id,
      warehouseId: warehouseManajemen.id,
      roleId: stafRuanganRole.id,
    },
  });

  await prisma.userWarehouseRole.upsert({
    where: {
      userId_warehouseId_roleId: {
        userId: stafRuangan.id,
        warehouseId: warehouseGizi.id,
        roleId: stafRuanganRole.id,
      },
    },
    update: {},
    create: {
      userId: stafRuangan.id,
      warehouseId: warehouseGizi.id,
      roleId: stafRuanganRole.id,
    },
  });

  await prisma.userWarehouseRole.upsert({
    where: {
      userId_warehouseId_roleId: {
        userId: stafRuangan.id,
        warehouseId: warehouseSanitasi.id,
        roleId: stafRuanganRole.id,
      },
    },
    update: {},
    create: {
      userId: stafRuangan.id,
      warehouseId: warehouseSanitasi.id,
      roleId: stafRuanganRole.id,
    },
  });

  console.log("\n🎉 Seed completed successfully!");
  console.log("\n🔑 Login Credentials (password untuk semua user: 11111111):");
  console.log("- superadmin@bdh.com (Super Admin - All Warehouses)");
  console.log("- admin.manajemen@bdh.com (Admin - Gudang Manajemen)");
  console.log("- admin.gizi@bdh.com (Admin - Gudang Gizi)");
  console.log(
    "- staf.pengadaan@bdh.com (Staf Pengadaan - Gudang Manajemen & Gudang Sanitasi)"
  );
  console.log("- staf.ruangan@bdh.com (Staf Ruangan - Semua Gudang)");
}

main()
  .catch((e) => {
    console.error("❌ Error during seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
