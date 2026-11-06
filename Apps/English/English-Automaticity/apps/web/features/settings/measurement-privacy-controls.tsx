"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

/** Existing participants can withdraw or delete their data without staff access. */
export function MeasurementPrivacyControls({
  hasData,
  consented,
  status,
  onWithdraw,
  onDelete,
}: {
  hasData: boolean;
  consented: boolean;
  status: string;
  onWithdraw: () => void;
  onDelete: () => void;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Your optional research participation</CardTitle>
      </CardHeader>
      <CardContent className="settings-section">
        <p>
          You can stop participating or delete this data. Your learning progress
          stays saved.
        </p>
        <div className="settings-export-actions">
          <Button disabled={!consented} onClick={onWithdraw} variant="outline">
            Stop participating
          </Button>
          <Button disabled={!hasData} onClick={onDelete} variant="outline">
            Delete optional research data
          </Button>
        </div>
        {status ? (
          <p role="status" aria-live="polite">
            {status}
          </p>
        ) : null}
      </CardContent>
    </Card>
  );
}
