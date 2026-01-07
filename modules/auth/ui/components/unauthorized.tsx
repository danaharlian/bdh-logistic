"use client";

import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty";
import { useRouter } from "next/navigation";

export function Unauthorized() {
  const router = useRouter();

  return (
    <Empty>
      <EmptyHeader>
        <EmptyTitle>401 - Unauthorized</EmptyTitle>
        <EmptyDescription>
          You are not authorized to access this page.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button
          variant="outline"
          size="sm"
          onClick={() => router.back()}
          className="hover:cursor-pointer"
        >
          Back
        </Button>
      </EmptyContent>
    </Empty>
  );
}
