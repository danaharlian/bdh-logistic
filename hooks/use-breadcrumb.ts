"use client";

import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { isUUID } from "@/lib/utils";
import {
  BREADCRUMB_IGNORE_SEGMENTS,
  FEATURE_BREADCRUMB_MAP,
} from "@/lib/navigation/breadcrumb-config";

export type BreadcrumbItem = {
  title: string;
  url: string;
};

export function buildBreadcrumb(pathname: string): BreadcrumbItem[] {
  const segments = pathname.split("/").filter(Boolean);

  const crumbs: BreadcrumbItem[] = [];
  let accumulatedPath = "";

  for (const segment of segments) {
    if (BREADCRUMB_IGNORE_SEGMENTS.includes(segment) || isUUID(segment)) {
      accumulatedPath += `/${segment}`;
      continue;
    }

    const title = FEATURE_BREADCRUMB_MAP[segment] ?? segment.replace(/-/g, " ");

    accumulatedPath += `/${segment}`;

    crumbs.push({
      title,
      url: accumulatedPath,
    });
  }

  return crumbs;
}

export function useBreadcrumb() {
  const pathname = usePathname();

  const crumbs = useMemo(() => buildBreadcrumb(pathname), [pathname]);
  const lastCrumb = crumbs.at(-1);

  return {
    crumbs,
    lastCrumb,
    pathname,
  };
}
