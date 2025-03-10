import { useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const data = [
  {
    id: "m5gr84i9",
    full_name: "Lewis Hamilton",
    phone: "1234567890",
    amount: 316,
    email: "ken99@yahoo.com",
    message: "Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
    createdAt: "2021-10-03",
  },
  {
    id: "3u1reuv4",
    full_name: "Valentino Rossi",
    phone: "1234567890",
    amount: 242,
    email: "Abe45@gmail.com",
    message: "Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
    createdAt: "2021-10-03",
  },
  {
    id: "derv1ws0",
    full_name: "Carlos Sainz",
    phone: null,
    amount: 837,
    email: "Monserrat44@gmail.com",
    message: "Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
    createdAt: "2021-10-03",
  },
  {
    id: "5kma53ae",
    full_name: "Lance Stroll",
    phone: "1234567890",
    amount: 874,
    email: "Silas22@gmail.com",
    message:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
    createdAt: "2021-10-03",
  },
  {
    id: "bhqecj4p",
    full_name: "max verstappen",
    amount: 721,
    phone: null,
    email: "carmella@hotmail.com",
    message: "Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
    createdAt: "2021-10-03",
  },
  {
    id: "bhqecj4p2",
    full_name: "max verstappen",
    amount: 721,
    phone: null,
    email: "carmella@hotmail.com",
    message: "Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
    createdAt: "2021-10-03",
  },
  {
    id: "bhqecj4p3",
    full_name: "max verstappen",
    amount: 721,
    phone: null,
    email: "carmella@hotmail.com",
    message: "Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
    createdAt: "2021-10-03",
  },
  {
    id: "bhqecj4p4",
    full_name: "max verstappen",
    amount: 721,
    phone: null,
    email: "carmella@hotmail.com",
    message: "Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
    createdAt: "2021-10-03",
  },
  {
    id: "bhqecj4p5",
    full_name: "max verstappen",
    amount: 721,
    phone: null,
    email: "carmella@hotmail.com",
    message: "Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
    createdAt: "2021-10-03",
  },
  {
    id: "bhqecj4p5",
    full_name: "max verstappen",
    amount: 721,
    phone: null,
    email: "carmella@hotmail.com",
    message: "Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
    createdAt: "2021-10-03",
  },
  {
    id: "bhqecj4p33",
    full_name: "max verstappen",
    amount: 721,
    phone: null,
    email: "carmella@hotmail.com",
    message: "Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
    createdAt: "2021-10-03",
  },
  {
    id: "bhqecj4p222",
    full_name: "max verstappen",
    amount: 721,
    phone: null,
    email: "carmella@hotmail.com",
    message: "Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
    createdAt: "2021-10-03",
  },
];

export const columns = [
  /* {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  }, */
  {
    accessorKey: "full_name",
    header: "Full name",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("full_name")}</div>
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
  },
  {
    accessorKey: "phone",
    header: "Phone",
    cell: ({ row }) => {
      const phone = row.getValue("phone");
      let phoneFormatted = "";

      if (phone) {
        phoneFormatted = phone.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
      }

      return <div>{phoneFormatted}</div>;
    },
  },
  {
    accessorKey: "message",
    header: "Message",
    cell: ({ row }) => (
      <div className="truncate w-96">{row.getValue("message")}</div>
    ),
  },
  {
    accessorKey: "created_at",
    header: "Created At",
    cell: ({ row }) => {
      const createdAt = new Date(row.getValue("created_at")).toLocaleString(
        "en-GB",
        {
          day: "2-digit",
          month: "short", // Short month (Jan, Feb, Mar, etc.)
          year: "numeric",
        }
      );

      return <div>{createdAt}</div>;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

const MyLeadsTable = ({ leads }) => {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data: leads,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });
  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter emails..."
          value={table.getColumn("email")?.getFilterValue() ?? ""}
          onChange={(event) =>
            table.getColumn("email")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id
                      .split("_")
                      .map((word) => word)
                      .join(" ")}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        {/* <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div> */}
        <div className="flex-1 text-sm text-muted-foreground">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()} ({table.getFilteredRowModel().rows.length}{" "}
          items)
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MyLeadsTable;
