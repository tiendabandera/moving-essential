import { useState } from "react";
import { supabase } from "@/api/auth";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import SelectWithSearch from "./SelectWithSearch";
import { ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";

const MyNotificationsTable = ({ notifications }) => {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({
    type_id: false,
  });
  const [rowSelection, setRowSelection] = useState({});

  const columns = [
    {
      accessorKey: "type_id",
      header: "Type id",
      filterFn: (row, columnId, filterValue) => {
        return Number(row.getValue(columnId)) === Number(filterValue);
      },
      cell: ({ row }) => (
        <div>
          <p>{row.getValue("type_id")}</p>
        </div>
      ),
    },
    {
      accessorKey: "notifications_types",
      header: "Type",
      cell: ({ row }) => {
        const typeName = row.getValue("notifications_types").name;
        const typeId = row.original.type_id;

        let bg = "";

        switch (typeId) {
          case 1:
            bg = "bg-blue-500 text-slate-50";
            break;
          case 2:
            bg = "bg-yellow-500 text-slate-50";
            break;

          case 3:
            bg = "bg-sky-500 text-slate-50";
            break;

          case 4:
            bg = "bg-green-500 text-slate-50";
            break;
          default:
            break;
        }

        return (
          <div
            className={`w-24 text-center capitalize ${bg} px-2 rounded-md font-normal`}
          >
            {typeName}
          </div>
        );
      },
    },
    {
      accessorKey: "message",
      header: "Message",
      cell: ({ row }) => (
        <div className="truncate w-auto">{row.getValue("message")}</div>
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
            hour: "numeric",
            minute: "numeric",
          }
        );

        return <div>{createdAt}</div>;
      },
    },
  ];

  const table = useReactTable({
    data: notifications,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    globalFilterFn: "equals",
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const [filter, setFilter] = useState("message");
  const navigate = useNavigate();

  const types = [
    { value: 1, label: "Form Quote" },
    { value: 2, label: "Like" },
    { value: 3, label: "Review" },
    { value: 4, label: "Lead Pool" },
  ];

  const handlerMarkAsRead = async (record) => {
    if (!record.was_read) {
      await supabase
        .from("notifications")
        .update({ was_read: true })
        .eq("id", record.id);
    }

    if (record.link) navigate(record.link);
  };

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row items-center py-4">
        <div className="w-full lg:max-w-md flex flex-col xs:flex-row items-start gap-2 md:pr-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                Filter <ChevronDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuCheckboxItem
                checked={filter === "type"}
                onCheckedChange={() => {
                  setFilter("type");
                  table.setColumnFilters([]);
                }}
              >
                Type
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={filter === "message"}
                onCheckedChange={() => {
                  setFilter("message");
                  table.setColumnFilters([]);
                }}
              >
                Message
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
          {filter === "message" ? (
            <Input
              placeholder="Filter message..."
              value={table.getColumn("message")?.getFilterValue() ?? ""}
              onChange={(event) =>
                table.getColumn("message")?.setFilterValue(event.target.value)
              }
              className="w-full"
            />
          ) : (
            <SelectWithSearch
              id="state"
              label="state"
              name="state"
              readOnly={false}
              options={types}
              required={false}
              placeholder="Select type"
              onOptionChange={(selectedValue) => {
                table
                  .getColumn("type_id")
                  ?.setFilterValue(Number(selectedValue));
              }}
            />
          )}
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="hidden ml-auto md:flex">
              Columns <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter(
                (column) => column.getCanHide() && column.id !== "type_id"
              )
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
          <TableHeader className="bg-gray-100">
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
              table.getRowModel().rows.map((row) => {
                return (
                  <TableRow
                    key={row.id}
                    data-state={
                      (row.getIsSelected() || !row.original.was_read) &&
                      "review"
                    }
                    onClick={() => handlerMarkAsRead(row.original)}
                    className="cursor-pointer"
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
                );
              })
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

export default MyNotificationsTable;
