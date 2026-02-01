/**
 * Breadcrumb configuration
 * Contains all constants and mappings for breadcrumb generation
 */

/**
 * Segments to ignore when building breadcrumbs
 * These segments are part of the URL structure but shouldn't appear in breadcrumbs
 */
export const BREADCRUMB_IGNORE_SEGMENTS = [
  "superadmin",
  "admin",
  "procurement",
];

/**
 * Feature-specific breadcrumb labels
 * Maps URL segments to display labels
 */
export const FEATURE_BREADCRUMB_MAP: Record<string, string> = {
  dashboard: "Dashboard",
  stock: "Stock",
  outgoing: "Out",
  incoming: "In",
  items: "Items",
  categories: "Categories",
  reports: "Reports",
  admin: "Admin",
  warehouse: "Warehouse",
  procurement: "Procurement",
  request: "Requests",
  profile: "Profile",
};
