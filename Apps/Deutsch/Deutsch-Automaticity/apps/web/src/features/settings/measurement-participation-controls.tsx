import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

/** Existing participation stays withdrawable without entering the staff area. */
export function MeasurementParticipationControls({
  active,
  onWithdraw,
  onDelete,
  status,
}: Readonly<{
  active: boolean;
  onWithdraw: () => void;
  onDelete: () => void;
  status: string;
}>) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Deine freiwillige Teilnahme</CardTitle>
        <CardDescription>
          Du kannst deine frühere Zustimmung zurücknehmen oder die lokalen
          Teilnahmedaten löschen. Dein Lernfortschritt bleibt erhalten.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex flex-wrap gap-3">
          <Button disabled={!active} onClick={onWithdraw} variant="outline">
            Zustimmung zurücknehmen
          </Button>
          <Button onClick={onDelete} variant="outline">
            Teilnahmedaten löschen
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
