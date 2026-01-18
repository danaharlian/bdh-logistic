"use client";

import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { buildBreadcrumb } from "@/lib/navigation/breadcrumb-builder";

export const NavbarBreadcrumb = () => {
  const pathname = usePathname();
  const crumbs = buildBreadcrumb(pathname);
  const lastCrumb = crumbs.at(-1);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {
          crumbs.map((crumb, idx) => (
            <BreadcrumbItem key={idx} className="hidden md:block">
              {idx > 0 && ` / `}
              <BreadcrumbLink href={crumb.href}>{crumb.label}</BreadcrumbLink>
            </BreadcrumbItem>
          ))
        }
        <BreadcrumbSeparator className="hidden md:block" />
        <BreadcrumbItem>
          <BreadcrumbPage>{lastCrumb?.label}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};
