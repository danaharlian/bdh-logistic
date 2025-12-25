import "dotenv/config";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";
import {
  PermissionModule,
  PermissionAction,
  RoleType,
  WarehouseType,
} from "@/lib/generated/prisma/enums";

async function main() {
  console.log("🌱 Starting seed...");

  // 1. Create Warehouses
  console.log("📦 Creating warehouses...");

  const warehouseManajemen = await prisma.warehouse.upsert({
    where: { code: "WH-MNG-001" },
    update: {},
    create: {
      code: "WH-MNG-001",
      name: "Gudang Manajemen",
      type: WarehouseType.MANAJEMEN,
      isActive: true,
    },
  });

  const warehouseGizi = await prisma.warehouse.upsert({
    where: { code: "WH-GIZ-001" },
    update: {},
    create: {
      code: "WH-GIZ-001",
      name: "Gudang Gizi",
      type: WarehouseType.GIZI,
      isActive: true,
    },
  });

  const warehouseSanitasi = await prisma.warehouse.upsert({
    where: { code: "WH-SAN-001" },
    update: {},
    create: {
      code: "WH-SAN-001",
      name: "Gudang Sanitasi",
      type: WarehouseType.SANITASI,
      isActive: true,
    },
  });

  // 2. Create Permissions
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
    {
      name: "import_item",
      module: PermissionModule.ITEM,
      action: PermissionAction.IMPORT,
    },
    {
      name: "export_item",
      module: PermissionModule.ITEM,
      action: PermissionAction.EXPORT,
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

    // Request Management
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
    {
      name: "export_request",
      module: PermissionModule.REQUEST,
      action: PermissionAction.EXPORT,
    },

    // Procurement Management
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
    {
      name: "export_procurement",
      module: PermissionModule.PROCUREMENT,
      action: PermissionAction.EXPORT,
    },

    // Stock Movement
    {
      name: "view_stock_movement",
      module: PermissionModule.STOCK_MOVEMENT,
      action: PermissionAction.VIEW,
    },
    {
      name: "create_stock_in",
      module: PermissionModule.STOCK_MOVEMENT,
      action: PermissionAction.CREATE,
    }, // Stok masuk
    {
      name: "create_stock_out",
      module: PermissionModule.STOCK_MOVEMENT,
      action: PermissionAction.UPDATE,
    }, // Stok keluar
    {
      name: "create_stock_adjustment",
      module: PermissionModule.STOCK_MOVEMENT,
      action: PermissionAction.DELETE,
    }, // Adjustment
    {
      name: "export_stock_movement",
      module: PermissionModule.STOCK_MOVEMENT,
      action: PermissionAction.EXPORT,
    },

    // Report
    {
      name: "view_report",
      module: PermissionModule.REPORT,
      action: PermissionAction.VIEW,
    },
    {
      name: "export_report",
      module: PermissionModule.REPORT,
      action: PermissionAction.EXPORT,
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

  // 3. Create Roles
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

  // 4. Assign Permissions to Roles
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
          roleId_permissionId_warehouseId: {
            roleId: stafRuanganRole.id,
            permissionId: permission.id,
            warehouseId: warehouseManajemen.id,
          },
        },
        update: {},
        create: {
          roleId: stafRuanganRole.id,
          permissionId: permission.id,
          warehouseId: warehouseManajemen.id,
        },
      });

      await prisma.rolePermission.upsert({
        where: {
          roleId_permissionId_warehouseId: {
            roleId: stafRuanganRole.id,
            permissionId: permission.id,
            warehouseId: warehouseSanitasi.id,
          },
        },
        update: {},
        create: {
          roleId: stafRuanganRole.id,
          permissionId: permission.id,
          warehouseId: warehouseSanitasi.id,
        },
      });

      await prisma.rolePermission.upsert({
        where: {
          roleId_permissionId_warehouseId: {
            roleId: stafRuanganRole.id,
            permissionId: permission.id,
            warehouseId: warehouseGizi.id,
          },
        },
        update: {},
        create: {
          roleId: stafRuanganRole.id,
          permissionId: permission.id,
          warehouseId: warehouseGizi.id,
        },
      });
    }
  }

  // STAF PENGADAAN - Bisa procurement dan stok masuk (multi warehouse)
  const stafPengadaanPermissions = [
    "view_dashboard",
    "view_warehouse",
    "view_item",
    "create_item", // Bisa tambah item baru
    "update_item",
    "view_category",
    "view_procurement",
    "create_procurement",
    "update_procurement",
    "delete_procurement",
    "approve_procurement",
    "export_procurement",
    "view_stock_movement",
    "create_stock_in", // HANYA STOK MASUK, tidak bisa stok keluar
    "create_stock_adjustment",
    "export_stock_movement",
    "view_report",
    "export_report",
  ];

  for (const permissionName of stafPengadaanPermissions) {
    const permission = await prisma.permission.findUnique({
      where: { name: permissionName },
    });

    if (permission) {
      await prisma.rolePermission.upsert({
        where: {
          roleId_permissionId_warehouseId: {
            roleId: stafPengadaanRole.id,
            permissionId: permission.id,
            warehouseId: warehouseManajemen.id,
          },
        },
        update: {},
        create: {
          roleId: stafPengadaanRole.id,
          permissionId: permission.id,
          warehouseId: warehouseManajemen.id,
        },
      });

      await prisma.rolePermission.upsert({
        where: {
          roleId_permissionId_warehouseId: {
            roleId: stafPengadaanRole.id,
            permissionId: permission.id,
            warehouseId: warehouseGizi.id,
          },
        },
        update: {},
        create: {
          roleId: stafPengadaanRole.id,
          permissionId: permission.id,
          warehouseId: warehouseGizi.id,
        },
      });

      await prisma.rolePermission.upsert({
        where: {
          roleId_permissionId_warehouseId: {
            roleId: stafPengadaanRole.id,
            permissionId: permission.id,
            warehouseId: warehouseSanitasi.id,
          },
        },
        update: {},
        create: {
          roleId: stafPengadaanRole.id,
          permissionId: permission.id,
          warehouseId: warehouseSanitasi.id,
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
    "export_item",
    "view_category",
    "create_category",
    "update_category",
    "delete_category",
    "view_request",
    "approve_request", // Bisa approve/reject request
    "reject_request",
    "export_request",
    "view_procurement",
    "export_procurement",
    "view_stock_movement",
    "create_stock_in",
    "create_stock_out", // Bisa stok keluar untuk fulfill request
    "create_stock_adjustment",
    "export_stock_movement",
    "view_report",
    "export_report",
  ];

  for (const permissionName of adminGudangPermissions) {
    const permission = await prisma.permission.findUnique({
      where: { name: permissionName },
    });

    if (permission) {
      await prisma.rolePermission.upsert({
        where: {
          roleId_permissionId_warehouseId: {
            roleId: adminGudangRole.id,
            permissionId: permission.id,
            warehouseId: warehouseManajemen.id,
          },
        },
        update: {},
        create: {
          roleId: adminGudangRole.id,
          permissionId: permission.id,
          warehouseId: warehouseManajemen.id,
        },
      });

      await prisma.rolePermission.upsert({
        where: {
          roleId_permissionId_warehouseId: {
            roleId: adminGudangRole.id,
            permissionId: permission.id,
            warehouseId: warehouseGizi.id,
          },
        },
        update: {},
        create: {
          roleId: adminGudangRole.id,
          permissionId: permission.id,
          warehouseId: warehouseGizi.id,
        },
      });

      await prisma.rolePermission.upsert({
        where: {
          roleId_permissionId_warehouseId: {
            roleId: adminGudangRole.id,
            permissionId: permission.id,
            warehouseId: warehouseSanitasi.id,
          },
        },
        update: {},
        create: {
          roleId: adminGudangRole.id,
          permissionId: permission.id,
          warehouseId: warehouseSanitasi.id,
        },
      });
    }
  }

  // SUPER ADMIN - All permissions
  const allPermissions = await prisma.permission.findMany();
  for (const permission of allPermissions) {
    await prisma.rolePermission.upsert({
      where: {
        roleId_permissionId_warehouseId: {
          roleId: superAdminRole.id,
          permissionId: permission.id,
          warehouseId: warehouseManajemen.id,
        },
      },
      update: {},
      create: {
        roleId: superAdminRole.id,
        permissionId: permission.id,
        warehouseId: warehouseManajemen.id,
      },
    });

    await prisma.rolePermission.upsert({
      where: {
        roleId_permissionId_warehouseId: {
          roleId: superAdminRole.id,
          permissionId: permission.id,
          warehouseId: warehouseGizi.id,
        },
      },
      update: {},
      create: {
        roleId: superAdminRole.id,
        permissionId: permission.id,
        warehouseId: warehouseGizi.id,
      },
    });

    await prisma.rolePermission.upsert({
      where: {
        roleId_permissionId_warehouseId: {
          roleId: superAdminRole.id,
          permissionId: permission.id,
          warehouseId: warehouseSanitasi.id,
        },
      },
      update: {},
      create: {
        roleId: superAdminRole.id,
        permissionId: permission.id,
        warehouseId: warehouseSanitasi.id,
      },
    });
  }

  // 5. Create Users
  console.log("👤 Creating users...");
  const hashedPassword = await bcrypt.hash("11111111", 10);

  const superAdmin = await prisma.user.upsert({
    where: { email: "superadmin@bdh.com" },
    update: {},
    create: {
      name: "Super Admin",
      email: "superadmin@bdh.com",
      emailVerified: false,
      isActive: true,
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
      emailVerified: false,
      isActive: true,
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
      emailVerified: false,
      isActive: true,
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
      emailVerified: false,
      isActive: true,
      accounts: {
        create: {
          accountId: "admin-sanitasi",
          providerId: "credential",
          password: hashedPassword,
        },
      },
    },
  });

  const stafPengadaan1 = await prisma.user.upsert({
    where: { email: "arif@bdh.com" },
    update: {},
    create: {
      name: "Arif",
      email: "arif@bdh.com",
      emailVerified: false,
      isActive: true,
      accounts: {
        create: {
          accountId: "arif",
          providerId: "credential",
          password: hashedPassword,
        },
      },
    },
  });

  const stafPengadaan2 = await prisma.user.upsert({
    where: { email: "santi@bdh.com" },
    update: {},
    create: {
      name: "Santi",
      email: "santi@bdh.com",
      emailVerified: false,
      isActive: true,
      accounts: {
        create: {
          accountId: "santi",
          providerId: "credential",
          password: hashedPassword,
        },
      },
    },
  });

  const stafRuangan1 = await prisma.user.upsert({
    where: { email: "ida@bdh.com" },
    update: {},
    create: {
      name: "Ida Rochmah",
      email: "ida@bdh.com",
      emailVerified: false,
      isActive: true,
      accounts: {
        create: {
          accountId: "ida-rochmah",
          providerId: "credential",
          password: hashedPassword,
        },
      },
    },
  });

  const stafRuangan2 = await prisma.user.upsert({
    where: { email: "gesti@bdh.com" },
    update: {},
    create: {
      name: "Gesti",
      email: "gesti@bdh.com",
      emailVerified: false,
      isActive: true,
      accounts: {
        create: {
          accountId: "gesti",
          providerId: "credential",
          password: hashedPassword,
        },
      },
    },
  });

  console.log("✅ Users created");

  // 6. Assign Users to Warehouses with Roles
  console.log("🔗 Assigning users to warehouses...");

  // Super Admin - Access to all warehouses
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

  // Staf Pengadaan 1
  await prisma.userWarehouseRole.upsert({
    where: {
      userId_warehouseId_roleId: {
        userId: stafPengadaan1.id,
        warehouseId: warehouseManajemen.id,
        roleId: stafPengadaanRole.id,
      },
    },
    update: {},
    create: {
      userId: stafPengadaan1.id,
      warehouseId: warehouseManajemen.id,
      roleId: stafPengadaanRole.id,
    },
  });

  // Staf Pengadaan 2
  await prisma.userWarehouseRole.upsert({
    where: {
      userId_warehouseId_roleId: {
        userId: stafPengadaan2.id,
        warehouseId: warehouseManajemen.id,
        roleId: stafPengadaanRole.id,
      },
    },
    update: {},
    create: {
      userId: stafPengadaan2.id,
      warehouseId: warehouseManajemen.id,
      roleId: stafPengadaanRole.id,
    },
  });

  await prisma.userWarehouseRole.upsert({
    where: {
      userId_warehouseId_roleId: {
        userId: stafPengadaan2.id,
        warehouseId: warehouseSanitasi.id,
        roleId: stafPengadaanRole.id,
      },
    },
    update: {},
    create: {
      userId: stafPengadaan2.id,
      warehouseId: warehouseSanitasi.id,
      roleId: stafPengadaanRole.id,
    },
  });

  // Staf Ruangan 1
  await prisma.userWarehouseRole.upsert({
    where: {
      userId_warehouseId_roleId: {
        userId: stafRuangan1.id,
        warehouseId: warehouseManajemen.id,
        roleId: stafRuanganRole.id,
      },
    },
    update: {},
    create: {
      userId: stafRuangan1.id,
      warehouseId: warehouseManajemen.id,
      roleId: stafRuanganRole.id,
    },
  });

  await prisma.userWarehouseRole.upsert({
    where: {
      userId_warehouseId_roleId: {
        userId: stafRuangan1.id,
        warehouseId: warehouseGizi.id,
        roleId: stafRuanganRole.id,
      },
    },
    update: {},
    create: {
      userId: stafRuangan1.id,
      warehouseId: warehouseGizi.id,
      roleId: stafRuanganRole.id,
    },
  });

  await prisma.userWarehouseRole.upsert({
    where: {
      userId_warehouseId_roleId: {
        userId: stafRuangan1.id,
        warehouseId: warehouseSanitasi.id,
        roleId: stafRuanganRole.id,
      },
    },
    update: {},
    create: {
      userId: stafRuangan1.id,
      warehouseId: warehouseSanitasi.id,
      roleId: stafRuanganRole.id,
    },
  });

  // Staf Ruangan 2
  await prisma.userWarehouseRole.upsert({
    where: {
      userId_warehouseId_roleId: {
        userId: stafRuangan2.id,
        warehouseId: warehouseManajemen.id,
        roleId: stafRuanganRole.id,
      },
    },
    update: {},
    create: {
      userId: stafRuangan2.id,
      warehouseId: warehouseManajemen.id,
      roleId: stafRuanganRole.id,
    },
  });

  await prisma.userWarehouseRole.upsert({
    where: {
      userId_warehouseId_roleId: {
        userId: stafRuangan2.id,
        warehouseId: warehouseGizi.id,
        roleId: stafRuanganRole.id,
      },
    },
    update: {},
    create: {
      userId: stafRuangan2.id,
      warehouseId: warehouseGizi.id,
      roleId: stafRuanganRole.id,
    },
  });

  await prisma.userWarehouseRole.upsert({
    where: {
      userId_warehouseId_roleId: {
        userId: stafRuangan2.id,
        warehouseId: warehouseSanitasi.id,
        roleId: stafRuanganRole.id,
      },
    },
    update: {},
    create: {
      userId: stafRuangan2.id,
      warehouseId: warehouseSanitasi.id,
      roleId: stafRuanganRole.id,
    },
  });

  console.log("🎉 Seed completed successfully!");
  // Summary
  console.log("\n📊 Seed Summary:");
  console.log(`- Warehouses: 3`);
  console.log(`- Roles: 4`);
  console.log(`- Permissions: ${permissions.length}`);
  console.log(`- Users: 7`);
  console.log("\n🎉 Seed completed successfully!");

  console.log("\n🔑 Login Credentials (password untuk semua user: 11111111):");
  console.log("- superadmin@bdh.com (Super Admin - All Warehouses)");
  console.log("- admin.manajemen@bdh.com (Admin - Gudang Manajemen)");
  console.log("- admin.gizi@bdh.com (Admin - Gudang Gizi)");
  console.log("- arif@bdh.com (Staf Pengadaan - Gudang Manajemen)");
  console.log(
    "- santi@bdh.com (Staf Pengadaan - Gudang Manajemen & Gudang Sanitasi)"
  );
  console.log("- gesti@bdh.com (Staf Ruangan - Semua Gudang)");
  console.log("- ida@bdh.com (Staf Ruangan - Semua Gudang)");
}

main()
  .catch((e) => {
    console.error("❌ Error during seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
