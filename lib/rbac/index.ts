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
} from "./types";

// Services
export { permissionService } from "./service";

// Checkers
export { can, canAny, canAll } from "./checker";

// Queries
export { permissionQueries } from "./queries";

// Utils
export { createPermissionKey, parsePermissionKey } from "./utils";

