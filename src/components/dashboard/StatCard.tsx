
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { FadeIn } from "../animations/FadeIn";

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: LucideIcon;
  iconColor?: string;
  change?: number;
  delay?: number;
}

export function StatCard({
  title,
  value,
  description,
  icon: Icon,
  iconColor = "text-primary",
  change,
  delay = 0,
}: StatCardProps) {
  return (
    <FadeIn delay={delay}>
      <Card className="glass-effect hover-scale active-scale transition-all">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
          <Icon className={`h-5 w-5 ${iconColor}`} />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{value}</div>
          {description && (
            <CardDescription className="text-xs text-muted-foreground mt-1">
              {description}
            </CardDescription>
          )}
          {typeof change === "number" && (
            <p
              className={`text-xs font-medium mt-2 ${
                change > 0
                  ? "text-green-500"
                  : change < 0
                  ? "text-red-500"
                  : "text-muted-foreground"
              }`}
            >
              {change > 0 ? "+" : ""}{change}% from last month
            </p>
          )}
        </CardContent>
      </Card>
    </FadeIn>
  );
}
