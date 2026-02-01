import {
  type LucideIcon,
  LayoutDashboard,
  Package,
  ShoppingCart,
  FileText,
  Settings,
  Users,
  FolderTree,
  ClipboardList,
  TrendingUp,
  Archive,
  Boxes,
  PackageCheck,
  Hospital,
  BookOpen,
  Bell,
  Warehouse,
  Home,
  BarChart,
  Truck,
  Calendar,
  ShieldCheck,
  Blocks,
  List,
  Plus,
  Shield,
} from "lucide-react";

/**
 * Map icon names to actual Lucide components
 * This is used in Client Components to resolve icon strings
 */
export const iconMap: Record<IconName, LucideIcon> = {
  LayoutDashboard,
  Package,
  ShoppingCart,
  FileText,
  Settings,
  Users,
  FolderTree,
  ClipboardList,
  TrendingUp,
  Archive,
  Boxes,
  PackageCheck,
  Hospital,
  BookOpen,
  Bell,
  Warehouse,
  Home,
  BarChart,
  Truck,
  Calendar,
  ShieldCheck,
  Blocks,
  List,
  Plus,
  Shield,
};

/**
 * Get icon component from icon name
 */
export function getIcon(iconName: IconName): LucideIcon {
  return iconMap[iconName];
}

/**
 * Icon names that can be serialized
 */
export type IconName =
  | "LayoutDashboard"
  | "Package"
  | "ShoppingCart"
  | "FileText"
  | "Settings"
  | "Users"
  | "FolderTree"
  | "ClipboardList"
  | "TrendingUp"
  | "Archive"
  | "Boxes"
  | "PackageCheck"
  | "Hospital"
  | "BookOpen"
  | "Bell"
  | "Warehouse"
  | "Home"
  | "BarChart"
  | "Truck"
  | "Calendar"
  | "ShieldCheck"
  | "Blocks"
  | "List"
  | "Plus"
  | "Shield";
