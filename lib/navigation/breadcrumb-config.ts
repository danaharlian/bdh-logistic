/**
 * Breadcrumb configuration
 * Contains all constants and mappings for breadcrumb generation
 */

/**
 * Segments to ignore when building breadcrumbs
 * These segments are part of the URL structure but shouldn't appear in breadcrumbs
 */
export const BREADCRUMB_IGNORE_SEGMENTS = [
  "w",
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
  outgoing: "Pengeluaran",
  incoming: "Pemasukan",
  items: "Items",
  categories: "Categories",
  reports: "Reports",
};

/**
 * General breadcrumb labels (currently unused but kept for future use)
 */
export const BREADCRUMB_LABELS: Record<string, string> = {
  dashboard: "Dashboard",
  w: "Warehouse",
  admin: "Admin",
  procurement: "Procurement",
  request: "Requests",
  profile: "Profile",
};
