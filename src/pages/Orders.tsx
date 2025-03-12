
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Eye, Plus } from "lucide-react";
import { FadeIn } from "@/components/animations/FadeIn";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

type Order = {
  id: string;
  customer: string;
  date: string;
  total: number;
  status: "pending" | "processing" | "completed" | "cancelled";
  items: number;
};

const data: Order[] = [
  {
    id: "ORDER-12345",
    customer: "John Doe",
    date: "2023-09-15",
    total: 1299,
    status: "completed",
    items: 3,
  },
  {
    id: "ORDER-12346",
    customer: "Jane Smith",
    date: "2023-09-16",
    total: 799,
    status: "processing",
    items: 2,
  },
  {
    id: "ORDER-12347",
    customer: "Bob Johnson",
    date: "2023-09-16",
    total: 349,
    status: "pending",
    items: 1,
  },
  {
    id: "ORDER-12348",
    customer: "Alice Brown",
    date: "2023-09-17",
    total: 999,
    status: "cancelled",
    items: 2,
  },
  {
    id: "ORDER-12349",
    customer: "Charlie White",
    date: "2023-09-17",
    total: 1599,
    status: "processing",
    items: 4,
  },
  {
    id: "ORDER-12350",
    customer: "Diana Green",
    date: "2023-09-18",
    total: 699,
    status: "completed",
    items: 2,
  },
  {
    id: "ORDER-12351",
    customer: "Edward Black",
    date: "2023-09-18",
    total: 249,
    status: "pending",
    items: 1,
  },
];

export default function Orders() {
  const handleViewDetails = (id: string) => {
    toast.success(`Viewing order ${id}`);
  };

  const columns: ColumnDef<Order>[] = [
    {
      accessorKey: "id",
      header: "Order ID",
    },
    {
      accessorKey: "customer",
      header: "Customer",
    },
    {
      accessorKey: "date",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="p-0 hover:bg-transparent"
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
    },
    {
      accessorKey: "items",
      header: "Items",
    },
    {
      accessorKey: "total",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="p-0 hover:bg-transparent"
        >
          Total
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => <div>${row.getValue("total")}</div>,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as string;
        const map: Record<string, { label: string; variant: "default" | "secondary" | "outline" | "destructive" }> = {
          "pending": { label: "Pending", variant: "secondary" },
          "processing": { label: "Processing", variant: "default" },
          "completed": { label: "Completed", variant: "outline" },
          "cancelled": { label: "Cancelled", variant: "destructive" },
        };
        
        const { label, variant } = map[status];
        
        return <Badge variant={variant}>{label}</Badge>;
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const order = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                >
                  <circle cx="12" cy="12" r="1" />
                  <circle cx="12" cy="5" r="1" />
                  <circle cx="12" cy="19" r="1" />
                </svg>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                className="cursor-pointer"
                onClick={() => handleViewDetails(order.id)}
              >
                <Eye className="mr-2 h-4 w-4" />
                <span>View Details</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return (
    <div className="space-y-6">
      <FadeIn>
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Orders</h1>
            <p className="text-muted-foreground mt-1">
              View and manage customer orders
            </p>
          </div>
          <Button className="active-scale">
            <Plus className="mr-2 h-4 w-4" />
            Create Order
          </Button>
        </div>
      </FadeIn>

      <FadeIn delay={100}>
        <DataTable columns={columns} data={data} searchKey="customer" />
      </FadeIn>
    </div>
  );
}
