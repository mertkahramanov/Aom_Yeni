"use client";

// CookieBanner.tsx'in çok dilli karşılığı (18-10-2026). Davranış (localStorage anahtarı,
// gtag consent update, 12 aylık süre, açık olay dinleyicisi) TAMAMEN AYNI kalır — yalnızca
// gösterilen metin dict üzerinden gelir. Türkçe ve çok dilli bantlar aynı "aom_consent"
// localStorage anahtarını paylaşır (kasıtlı: aynı ziyaretçi, aynı tarayıcı, tek onay).

import { useEffect, useState } from "react";
import type { Dictionary } from "@/i18n/dictionary";
import { OPEN_COOKIE_SETTINGS_EVENT } from "./CookieBanner";

const CONSENT_KEY = "aom_consent";
const CONSENT_MONTHS = 12;

type Consent = { v: 1; analytics: boolean; ads: boolean; ts: string };

function readConsent(): Consent | null {
  try {
    const raw = window.localStorage.getItem(CONSENT_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw) as Partial<Consent>;
    if (data.v !== 1 || typeof data.ts !== "string") return null;
    const ageMs = Date.now() - new Date(data.ts).getTime();
    if (Number.isNaN(ageMs) || ageMs > CONSENT_MONTHS * 30 * 24 * 60 * 60 * 1000) return null;
    return { v: 1, analytics: !!data.analytics, ads: !!data.ads, ts: data.ts };
  } catch {
    return null;
  }
}

function writeConsent(analytics: boolean, ads: boolean) {
  try {
    const data: Consent = { v: 1, analytics, ads, ts: new Date().toISOString() };
    window.localStorage.setItem(CONSENT_KEY, JSON.stringify(data));
  } catch {
    // Depolama başarısız olursa tercih kaydedilemez; bir sonraki ziyarette bant tekrar gösterilir.
  }
}

function updateGtagConsent(analytics: boolean, ads: boolean) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("consent", "update", {
    analytics_storage: analytics ? "granted" : "denied",
    ad_storage: ads ? "granted" : "denied",
    ad_user_data: ads ? "granted" : "denied",
    ad_personalization: ads ? "granted" : "denied",
  });
}

export default function LocaleCookieBanner({ dict }: { dict: Dictionary }) {
  const c = dict.cookie;
  const [barVisible, setBarVisible] = useState(false);
  const [panelOpen, setPanelOpen] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [ads, setAds] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const existing = readConsent();
    if (existing) {
      updateGtagConsent(existing.analytics, existing.ads);
      setAnalytics(existing.analytics);
      setAds(existing.ads);
    } else {
      setBarVisible(true);
    }
    setReady(true);

    function onOpenSettings() {
      const current = readConsent();
      setAnalytics(current?.analytics ?? false);
      setAds(current?.ads ?? false);
      setPanelOpen(true);
    }
    window.addEventListener(OPEN_COOKIE_SETTINGS_EVENT, onOpenSettings);
    return () => window.removeEventListener(OPEN_COOKIE_SETTINGS_EVENT, onOpenSettings);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("has-cookie-bar", barVisible && !panelOpen);
    return () => document.body.classList.remove("has-cookie-bar");
  }, [barVisible, panelOpen]);

  if (!ready) return null;

  function acceptAll() {
    writeConsent(true, true);
    updateGtagConsent(true, true);
    setAnalytics(true);
    setAds(true);
    setBarVisible(false);
    setPanelOpen(false);
  }

  function rejectAll() {
    writeConsent(false, false);
    updateGtagConsent(false, false);
    setAnalytics(false);
    setAds(false);
    setBarVisible(false);
    setPanelOpen(false);
  }

  function saveSettings() {
    writeConsent(analytics, ads);
    updateGtagConsent(analytics, ads);
    setBarVisible(false);
    setPanelOpen(false);
  }

  return (
    <>
      {barVisible && !panelOpen && (
        <div className="cookie-bar" role="region" aria-label={c.regionAria}>
          <p>
            {c.barText}
            <a href="/cerez-politikasi">{c.policyLink}</a>.
          </p>
          <div className="cookie-bar-actions">
            <button type="button" className="btn btn-outline-light" onClick={() => setPanelOpen(true)}>
              {c.settingsBtn}
            </button>
            <button type="button" className="btn btn-outline-light" onClick={rejectAll}>
              {c.reject}
            </button>
            <button type="button" className="btn btn-primary" onClick={acceptAll}>
              {c.acceptAll}
            </button>
          </div>
        </div>
      )}

      {panelOpen && (
        <div className="cookie-panel-overlay">
          <div className="cookie-panel" role="dialog" aria-modal="true" aria-label={c.panelAria}>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 20 }}>{c.panelTitle}</div>
            <p style={{ margin: 0, fontSize: 14, color: "var(--ink-muted)" }}>
              {c.panelIntro}
              <a href="/cerez-politikasi">{c.policyLink}</a> · <a href="/kvkk-aydinlatma-metni">{c.kvkkLink}</a>.
            </p>

            <div className="cookie-toggle-row">
              <div>
                <strong>{c.necessaryTitle}</strong>
                <p>{c.necessaryDesc}</p>
              </div>
              <input type="checkbox" checked disabled aria-label={c.necessaryAria} />
            </div>

            <div className="cookie-toggle-row">
              <div>
                <strong>{c.analyticsTitle}</strong>
                <p>{c.analyticsDesc}</p>
              </div>
              <input
                type="checkbox"
                checked={analytics}
                onChange={(e) => setAnalytics(e.target.checked)}
                aria-label={c.analyticsAria}
              />
            </div>

            <div className="cookie-toggle-row">
              <div>
                <strong>{c.adsTitle}</strong>
                <p>{c.adsDesc}</p>
              </div>
              <input
                type="checkbox"
                checked={ads}
                onChange={(e) => setAds(e.target.checked)}
                aria-label={c.adsAria}
              />
            </div>

            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "flex-end" }}>
              <button type="button" className="btn btn-outline" onClick={rejectAll}>
                {c.rejectAll}
              </button>
              <button type="button" className="btn btn-primary" onClick={saveSettings}>
                {c.save}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
