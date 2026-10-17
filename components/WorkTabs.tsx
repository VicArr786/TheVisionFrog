"use client";

import { useState } from "react";

type Panel = {
  id: string;
  label: string;
  content: React.ReactNode;
};

type WorkTabsProps = {
  panels: Panel[];
};

/** "All" + one tab per panel; All stacks every panel with its heading */
export default function WorkTabs({ panels }: WorkTabsProps) {
  const [active, setActive] = useState("all");
  const tabs = [{ id: "all", label: "All" }, ...panels];

  return (
    <>
      <div className="work-tabs" role="tablist" aria-label="Filter work">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={active === t.id}
            className={`work-tabs__tab${active === t.id ? " work-tabs__tab--active" : ""}`}
            onClick={() => setActive(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>

      {panels.map((p) =>
        active === "all" || active === p.id ? (
          <section key={p.id} className="work-panel" aria-labelledby={`work-${p.id}`}>
            <h2
              id={`work-${p.id}`}
              className={`work-panel__title${active === "all" ? "" : " sr-only"}`}
            >
              {p.label}
            </h2>
            {p.content}
          </section>
        ) : null
      )}
    </>
  );
}
