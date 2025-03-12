
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Edit, Trash2, Plus } from "lucide-react";
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

type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: "in-stock" | "low-stock" | "out-of-stock";
};

const data: Product[] = [
  {
    id: "PROD-1234",
    name: "iPhone 13 Pro",
    category: "Electronics",
    price: 999,
    stock: 34,
    status: "in-stock",
  },
  {
    id: "PROD-2345",
    name: "MacBook Air M1",
    category: "Electronics",
    price: 1299,
    stock: 12,
    status: "in-stock",
  },
  {
    id: "PROD-3456",
    name: "AirPods Pro",
    category: "Audio",
    price: 249,
    stock: 3,
    status: "low-stock",
  },
  {
    id: "PROD-4567",
    name: "Apple Watch Series 7",
    category: "Wearables",
    price: 399,
    stock: 0,
    status: "out-of-stock",
  },
  {
    id: "PROD-5678",
    name: "iPad Pro 11-inch",
    category: "Electronics",
    price: 799,
    stock: 8,
    status: "in-stock",
  },
  {
    id: "PROD-6789",
    name: "Magic Mouse",
    category: "Accessories",
    price: 99,
    stock: 2,
    status: "low-stock",
  },
  {
    id: "PROD-7890",
    name: "HomePod Mini",
    category: "Audio",
    price: 99,
    stock: 15,
    status: "in-stock",
  },
];

export default function Products() {
  const handleDelete = (id: string) => {
    toast.success(`Product ${id} deleted`);
  };

  const columns: ColumnDef<Product>[] = [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="p-0 hover:bg-transparent"
          >
            Product Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: "category",
      header: "Category",
    },
    {
      accessorKey: "price",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="p-0 hover:bg-transparent"
        >
          Price
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => <div>${row.getValue("price")}</div>,
    },
    {
      accessorKey: "stock",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="p-0 hover:bg-transparent"
        >
          Stock
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as string;
        const map: Record<string, { label: string; variant: "default" | "secondary" | "destructive" }> = {
          "in-stock": { label: "In Stock", variant: "default" },
          "low-stock": { label: "Low Stock", variant: "secondary" },
          "out-of-stock": { label: "Out of Stock", variant: "destructive" },
        };
        
        const { label, variant } = map[status];
        
        return <Badge variant={variant}>{label}</Badge>;
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const product = row.original;

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
              <DropdownMenuItem className="cursor-pointer">
                <Edit className="mr-2 h-4 w-4" />
                <span>Edit</span>
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="cursor-pointer text-destructive focus:text-destructive"
                onClick={() => handleDelete(product.id)}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                <span>Delete</span>
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
            <h1 className="text-3xl font-bold">Products</h1>
            <p className="text-muted-foreground mt-1">
              Manage your product inventory
            </p>
          </div>
          <Button className="active-scale">
            <Plus className="mr-2 h-4 w-4" />
            Add Product
          </Button>
        </div>
      </FadeIn>

      <FadeIn delay={100}>
        <DataTable columns={columns} data={data} searchKey="name" />
      </FadeIn>
    </div>
  );
}
