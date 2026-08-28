"use client";

import * as React from "react";
import { BookOpen, FileText, Headphones, PlayCircle, RefreshCw } from "lucide-react";
import type { CefrLevel } from "@grammar/content";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select } from "@/components/ui/select";

type AssetKind = "audio" | "video" | "document";
type Asset = { kind: AssetKind; label: string; path: string };
type Catalog = {
  available: boolean;
  levels: Array<{ level: number; units: Array<{ unit: number; assets: Asset[] }> }>;
};

const initialLevel: Record<CefrLevel, number> = {
  A1: 1,
  A2: 1,
  B1: 2,
  B2: 3,
  C1: 4,
  C2: 5,
};

function resourceUrl(asset: Asset) {
  return `/api/qskills/resource?path=${encodeURIComponent(asset.path)}`;
}

const icons: Record<AssetKind, typeof Headphones> = {
  audio: Headphones,
  video: PlayCircle,
  document: FileText,
};

export function QSkillsResources({ cefr }: { cefr: CefrLevel }) {
  const [catalog, setCatalog] = React.useState<Catalog>();
  const [loading, setLoading] = React.useState(true);
  const [selectedLevel, setSelectedLevel] = React.useState(initialLevel[cefr]);
  const [selectedUnit, setSelectedUnit] = React.useState(1);

  const refresh = React.useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/qskills", { cache: "no-store" });
      setCatalog((await response.json()) as Catalog);
    } catch {
      setCatalog({ available: false, levels: [] });
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    void refresh();
  }, [refresh]);

  React.useEffect(() => {
    setSelectedLevel(initialLevel[cefr]);
    setSelectedUnit(1);
  }, [cefr]);

  const level = catalog?.levels.find((candidate) => candidate.level === selectedLevel);
  const unit = level?.units.find((candidate) => candidate.unit === selectedUnit);
  const assets = unit?.assets ?? [];
  const visibleAssets = assets.slice(0, 8);

  return (
    <Card className="border-sky-300 bg-sky-50/70">
      <CardHeader>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <CardTitle className="flex items-center gap-2">
              <BookOpen aria-hidden className="size-5 text-sky-800" /> QSkills companion material
            </CardTitle>
            <CardDescription className="mt-2 max-w-3xl">
              Your licensed local QSkills files stay on this computer. Use them for input, then save your own evidence in the mission above.
            </CardDescription>
          </div>
          <Button onClick={() => void refresh()} size="sm" variant="outline">
            <RefreshCw aria-hidden className="size-4" /> Refresh library
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {loading ? <p className="text-sm text-slate-700">Checking your local QSkills library…</p> : null}
        {!loading && !catalog?.available ? (
          <p className="rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm leading-6 text-amber-950">
            QSkills was not found at the local course location. The automaticity mission still works, but companion audio, video, and book files are unavailable on this device.
          </p>
        ) : null}
        {!loading && catalog?.available ? (
          <>
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="space-y-1 text-sm font-bold">
                QSkills level
                <Select
                  aria-label="QSkills level"
                  onChange={(event) => {
                    setSelectedLevel(Number(event.target.value));
                    setSelectedUnit(1);
                  }}
                  value={String(selectedLevel)}
                >
                  {catalog.levels.map((candidate) => (
                    <option key={candidate.level} value={candidate.level}>Level {candidate.level}</option>
                  ))}
                </Select>
              </label>
              <label className="space-y-1 text-sm font-bold">
                QSkills unit
                <Select aria-label="QSkills unit" onChange={(event) => setSelectedUnit(Number(event.target.value))} value={String(selectedUnit)}>
                  {(level?.units ?? []).map((candidate) => (
                    <option key={candidate.unit} value={candidate.unit}>Unit {candidate.unit}</option>
                  ))}
                </Select>
              </label>
            </div>
            <div className="flex flex-wrap gap-2" aria-label="Available QSkills files">
              {visibleAssets.map((asset) => {
                const Icon = icons[asset.kind];
                return (
                  <a className="inline-flex max-w-full items-center gap-2 rounded-xl border border-sky-300 bg-white px-3 py-2 text-sm font-bold text-sky-950 hover:bg-sky-100" href={resourceUrl(asset)} key={asset.path} rel="noreferrer" target="_blank">
                    <Icon aria-hidden className="size-4 shrink-0" />
                    <span className="truncate">{asset.label}</span>
                  </a>
                );
              })}
              {assets.length > visibleAssets.length ? <Badge variant="secondary">{assets.length - visibleAssets.length} more files in this unit</Badge> : null}
              {!assets.length ? <p className="text-sm text-slate-700">No recognised source file was found for this unit.</p> : null}
            </div>
          </>
        ) : null}
      </CardContent>
    </Card>
  );
}
