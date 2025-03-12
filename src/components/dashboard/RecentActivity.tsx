
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FadeIn } from "../animations/FadeIn";

type ActivityItem = {
  id: string;
  user: {
    name: string;
    image?: string;
    initials: string;
  };
  action: string;
  date: string;
  timestamp: string;
};

const RECENT_ACTIVITIES: ActivityItem[] = [
  {
    id: "1",
    user: {
      name: "John Doe",
      image: "https://i.pravatar.cc/150?img=1",
      initials: "JD",
    },
    action: "created a new order #ORD-12345",
    date: "Today",
    timestamp: "10:30 AM",
  },
  {
    id: "2",
    user: {
      name: "Jane Smith",
      image: "https://i.pravatar.cc/150?img=2",
      initials: "JS",
    },
    action: "updated product 'iPhone 13 Pro'",
    date: "Today",
    timestamp: "09:15 AM",
  },
  {
    id: "3",
    user: {
      name: "Robert Johnson",
      image: "https://i.pravatar.cc/150?img=3",
      initials: "RJ",
    },
    action: "deleted user account 'michael@example.com'",
    date: "Yesterday",
    timestamp: "03:45 PM",
  },
  {
    id: "4",
    user: {
      name: "Emily Wilson",
      image: "https://i.pravatar.cc/150?img=4",
      initials: "EW",
    },
    action: "completed order #ORD-9876",
    date: "Yesterday",
    timestamp: "01:30 PM",
  },
];

export function RecentActivity() {
  return (
    <FadeIn delay={300}>
      <Card className="glass-effect h-full">
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>
            Latest actions performed in the system
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {RECENT_ACTIVITIES.map((activity, index) => (
              <div
                key={activity.id}
                className="flex items-center gap-4 pb-4 border-b last:border-b-0 last:pb-0"
              >
                <Avatar>
                  <AvatarImage src={activity.user.image} />
                  <AvatarFallback>{activity.user.initials}</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {activity.user.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {activity.action}
                  </p>
                </div>
                <div className="text-right text-sm">
                  <p className="font-medium">{activity.date}</p>
                  <p className="text-xs text-muted-foreground">
                    {activity.timestamp}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </FadeIn>
  );
}
