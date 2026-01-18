import { isUUID } from "../utils";
import { BREADCRUMB_IGNORE_SEGMENTS } from "./breadcrumb-constants";
import { FEATURE_BREADCRUMB_MAP } from "./breadcrumb-map";

export type BreadcrumbItem = {
    label: string;
    href: string;
};

export function buildBreadcrumb(pathname: string): BreadcrumbItem[] {
    const segments = pathname.split("/").filter(Boolean);

    const crumbs: BreadcrumbItem[] = [];
    let accumulatedPath = "";

    for (const segment of segments) {
        if (
            BREADCRUMB_IGNORE_SEGMENTS.includes(segment) ||
            isUUID(segment)
        ) {
            accumulatedPath += `/${segment}`;
            continue;
        }

        const label =
            FEATURE_BREADCRUMB_MAP[segment] ??
            segment.replace(/-/g, " ");

        accumulatedPath += `/${segment}`;

        crumbs.push({
            label,
            href: accumulatedPath,
        });
    }

    return crumbs;
}