
import { StatCard } from "@/components/dashboard/StatCard";
import { Package, ShoppingCart, Users, DollarSign } from "lucide-react";
import { OverviewChart } from "@/components/dashboard/OverviewChart";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { FadeIn } from "@/components/animations/FadeIn";

export default function Index() {
  return (
    <div className="space-y-6">
      <FadeIn>
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              Welcome back! Here's an overview of your system.
            </p>
          </div>
        </div>
      </FadeIn>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Revenue"
          value="$24,780"
          description="Total revenue this month"
          icon={DollarSign}
          iconColor="text-green-500"
          change={12.5}
          delay={50}
        />
        <StatCard
          title="Total Orders"
          value="854"
          description="Orders this month"
          icon={ShoppingCart}
          iconColor="text-blue-500"
          change={8.2}
          delay={100}
        />
        <StatCard
          title="Products"
          value="432"
          description="Active products"
          icon={Package}
          iconColor="text-orange-500"
          change={-2.4}
          delay={150}
        />
        <StatCard
          title="Customers"
          value="1,254"
          description="Total registered users"
          icon={Users}
          iconColor="text-purple-500"
          change={5.7}
          delay={200}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <OverviewChart />
        </div>
        <div>
          <RecentActivity />
        </div>
      </div>
    </div>
  );
}
