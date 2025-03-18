import { useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ChevronDown, Plus, Trash } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
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
import DeleteSelectedRows from "./DeleteSelectedRows";
import CreatePhonePool from "./CreatePhonePool";
import { useAuth } from "@/context/AuthContext";

const columns = [
  {
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
  },
  {
    accessorKey: "first_name",
    header: "First name",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("first_name")}</div>
    ),
  },
  {
    accessorKey: "last_name",
    header: "Last name",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("last_name")}</div>
    ),
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

      return <div className="w-28">{phoneFormatted}</div>;
    },
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
];

const PhonePoolTable = ({ records, setRecords }) => {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});
  const [open, setOpen] = useState(false);
  const [createLead, setCreateLead] = useState(false);

  const [deleteRows, setDeleteRows] = useState([]);

  const { user } = useAuth();

  const table = useReactTable({
    data: records,
    columns:
      user.user_metadata.role === "admin"
        ? columns
        : columns.filter((column) => column.id !== "select"),
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

  const handlerDeleteRows = (records) => {
    setOpen(true);
    setDeleteRows(records);
  };

  return (
    <div className="w-full">
      {table.getFilteredSelectedRowModel().rows.length > 0 ? (
        <div className="flex items-center py-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              handlerDeleteRows(
                table
                  .getFilteredSelectedRowModel()
                  .rows.map((row) => row.original.id)
              );
            }}
          >
            <Trash className="h-4 w-4" />
            Delete {table.getFilteredSelectedRowModel().rows.length} selected
          </Button>
        </div>
      ) : (
        <div className="flex flex-col sm:flex-row py-4 gap-4">
          <div className="md:max-w-sm flex items-center gap-2">
            <Input
              placeholder="Filter phones..."
              value={table.getColumn("phone")?.getFilterValue() ?? ""}
              onChange={(event) =>
                table.getColumn("phone")?.setFilterValue(event.target.value)
              }
            />
            {user.user_metadata.role === "admin" && (
              <Button
                className="bg-green-500 hover:bg-green-300 hover:text-green-600"
                onClick={() => setCreateLead(true)}
              >
                <p className="hidden xs:block">Insert row</p>
                <Plus className="xs:hidden" />
              </Button>
            )}
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="hidden sm:flex ml-auto">
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
      )}
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
        {user.user_metadata.role === "admin" && (
          <div className="flex-1 text-sm text-muted-foreground">
            {table.getFilteredSelectedRowModel().rows.length} of{" "}
            {table.getFilteredRowModel().rows.length} row(s) selected.
          </div>
        )}
        <div
          className={`${
            user.user_metadata.role === "company" && "flex-1"
          } text-sm text-muted-foreground`}
        >
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
      {open && (
        <DeleteSelectedRows
          tableName="phone_pool"
          isOpen={open}
          onClose={setOpen}
          records={deleteRows}
          setNewRecords={setRecords}
          setRowSelection={setRowSelection}
        />
      )}
      {createLead && (
        <CreatePhonePool
          isOpen={createLead}
          onClose={setCreateLead}
          setNewRecords={setRecords}
        />
      )}
    </div>
  );
};

export default PhonePoolTable;
