
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Edit, Lock, Plus, Trash2 } from "lucide-react";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";

type User = {
  id: string;
  name: string;
  email: string;
  role: "admin" | "editor" | "viewer";
  status: "active" | "inactive";
  lastActive: string;
  image?: string;
};

const data: User[] = [
  {
    id: "USR-12345",
    name: "John Doe",
    email: "john.doe@example.com",
    role: "admin",
    status: "active",
    lastActive: "2023-09-18 10:30",
    image: "https://i.pravatar.cc/150?img=1",
  },
  {
    id: "USR-12346",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    role: "editor",
    status: "active",
    lastActive: "2023-09-17 09:15",
    image: "https://i.pravatar.cc/150?img=2",
  },
  {
    id: "USR-12347",
    name: "Bob Johnson",
    email: "bob.johnson@example.com",
    role: "viewer",
    status: "inactive",
    lastActive: "2023-09-10 15:45",
    image: "https://i.pravatar.cc/150?img=3",
  },
  {
    id: "USR-12348",
    name: "Alice Brown",
    email: "alice.brown@example.com",
    role: "editor",
    status: "active",
    lastActive: "2023-09-18 08:20",
    image: "https://i.pravatar.cc/150?img=4",
  },
  {
    id: "USR-12349",
    name: "Charlie White",
    email: "charlie.white@example.com",
    role: "viewer",
    status: "active",
    lastActive: "2023-09-17 14:30",
    image: "https://i.pravatar.cc/150?img=5",
  },
  {
    id: "USR-12350",
    name: "Diana Green",
    email: "diana.green@example.com",
    role: "admin",
    status: "inactive",
    lastActive: "2023-09-15 11:10",
    image: "https://i.pravatar.cc/150?img=6",
  },
];

export default function Users() {
  const getInitials = (name: string) => {
    const parts = name.split(" ");
    return parts.length > 1
      ? `${parts[0][0]}${parts[1][0]}`
      : name.slice(0, 2).toUpperCase();
  };

  const handleDelete = (id: string) => {
    toast.success(`User ${id} deleted`);
  };

  const handleResetPassword = (id: string) => {
    toast.success(`Password reset for user ${id}`);
  };

  const columns: ColumnDef<User>[] = [
    {
      id: "user",
      header: "User",
      cell: ({ row }) => {
        const user = row.original;
        return (
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={user.image} />
              <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium">{user.name}</div>
              <div className="text-sm text-muted-foreground">{user.email}</div>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "role",
      header: "Role",
      cell: ({ row }) => {
        const role = row.getValue("role") as string;
        const map: Record<string, { label: string; variant: "default" | "secondary" | "outline" }> = {
          "admin": { label: "Admin", variant: "default" },
          "editor": { label: "Editor", variant: "secondary" },
          "viewer": { label: "Viewer", variant: "outline" },
        };
        
        const { label, variant } = map[role];
        
        return <Badge variant={variant}>{label}</Badge>;
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as string;
        return (
          <Badge variant={status === "active" ? "outline" : "secondary"}>
            {status === "active" ? "Active" : "Inactive"}
          </Badge>
        );
      },
    },
    {
      accessorKey: "lastActive",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="p-0 hover:bg-transparent"
        >
          Last Active
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const user = row.original;

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
                className="cursor-pointer"
                onClick={() => handleResetPassword(user.id)}
              >
                <Lock className="mr-2 h-4 w-4" />
                <span>Reset Password</span>
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="cursor-pointer text-destructive focus:text-destructive"
                onClick={() => handleDelete(user.id)}
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
            <h1 className="text-3xl font-bold">Users</h1>
            <p className="text-muted-foreground mt-1">
              Manage user accounts and permissions
            </p>
          </div>
          <Button className="active-scale">
            <Plus className="mr-2 h-4 w-4" />
            Add User
          </Button>
        </div>
      </FadeIn>

      <FadeIn delay={100}>
        <DataTable columns={columns} data={data} searchKey="name" />
      </FadeIn>
    </div>
  );
}
