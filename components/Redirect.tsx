"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

/** Static-export stand-in for a server redirect — keeps old URLs working */
export default function Redirect({ to }: { to: string }) {
  const router = useRouter();

  useEffect(() => {
    router.replace(to);
  }, [router, to]);

  return (
    <main className="page-shell">
      <Link href={to}>Continue →</Link>
    </main>
  );
}
