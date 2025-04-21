
import React from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ReuseSuggestionCardProps {
  suggestions: string[];
  status: "good" | "warning" | "critical";
}

const statusMap = {
  good: { label: "Safe for Multiple Uses", color: "bg-alert-low" },
  warning: { label: "Limited Reuse Allowed", color: "bg-alert-medium" },
  critical: { label: "Unsafe for Reuse", color: "bg-alert-high" },
};

const ReuseSuggestionCard = ({
  suggestions,
  status,
}: ReuseSuggestionCardProps) => {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-base mb-2">Reuse Recommendations</CardTitle>
        <Badge
          className={`text-xs ${statusMap[status].color}`}
          variant="outline"
        >
          {statusMap[status].label}
        </Badge>
      </CardHeader>
      <CardContent>
        <ul className="list-disc ml-5 mt-2 text-sm">
          {suggestions.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default ReuseSuggestionCard;
