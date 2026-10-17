"use client";

import { useEffect, useState } from "react";
import CampaignGrid from "@/components/CampaignGrid";
import { CAMPAIGN_TABS } from "@/lib/commercials";

type TabId = (typeof CAMPAIGN_TABS)[number]["id"];

/** Commercials / Creators switch — the active tab is mirrored in the URL hash */
export default function CampaignTabs() {
  const [active, setActive] = useState<TabId>("commercials");

  useEffect(() => {
    const fromHash = window.location.hash.slice(1);
    if (CAMPAIGN_TABS.some((t) => t.id === fromHash)) setActive(fromHash as TabId);
  }, []);

  const pick = (id: TabId) => {
    setActive(id);
    history.replaceState(null, "", `#${id}`);
  };

  return (
    <>
      <div className="campaign-tabs" role="tablist" aria-label="Commercial work">
        {CAMPAIGN_TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            id={`tab-${t.id}`}
            aria-selected={active === t.id}
            aria-controls="campaign-panel"
            className={`campaign-tabs__tab${active === t.id ? " campaign-tabs__tab--active" : ""}`}
            onClick={() => pick(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div id="campaign-panel" role="tabpanel" aria-labelledby={`tab-${active}`}>
        <CampaignGrid category={active} />
      </div>
    </>
  );
}
