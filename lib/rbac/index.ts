/**
 * RBAC (Role-Based Access Control) Module
 *
 * This module provides a complete RBAC system for managing permissions
 * across warehouses in the application.
 *
 * Structure:
 * - types: Type definitions for permissions
 * - service: Business logic for transforming permissions
 * - checker: Utility functions for checking permissions
 * - queries: Database queries for fetching permission data
 * - utils: Helper functions for working with permissions
 */

// Types
export type {
  PermissionKey,
  PermissionMap,
  UserWarehouseRoleWithPermissions,
  UserWarehouseData,
} from "@/lib/rbac/types";

// Services
export { permissionService } from "@/lib/rbac/service";

// Checkers
export {
  can,
  canAny,
  canAll,
  hasNavigationPermission,
  hasRoleInWarehouse,
} from "@/lib/rbac/checker";

// Queries
export { permissionQueries } from "@/lib/rbac/queries";

// Utils
export { createPermissionKey, parsePermissionKey } from "@/lib/rbac/utils";
