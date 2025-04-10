import { useState } from "react";

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { reportingTypes } from "@/constants";
import { Eye, Trash } from "lucide-react";
import DetailsAppeal from "./DetailsAppeal";
import DeleteSelectedRows from "@/components/DeleteSelectedRows";
import { Input } from "@/components/ui/input";

const AppealsTable = ({ records, setRecords }) => {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});

  const [openDeleteRows, setOpenDeleteRows] = useState(false);

  const [seeDetails, setSeeDetails] = useState(false);
  const [details, setDetails] = useState({});

  const [deleteRows, setDeleteRows] = useState([]);
  const { user } = useAuth();

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
      accessorKey: "review_id",
      header: "Review ID",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("review_id")}</div>
      ),
    },
    {
      accessorKey: "type",
      header: "Type",
      cell: ({ row }) => {
        const type = reportingTypes.find(
          (type) => type.value === row.getValue("type")
        );

        return (
          <div
            className={`w-40 md:w-fit text-center capitalize px-2 rounded-md font-normal ${type.bg} text-slate-50`}
          >
            {type.label}
          </div>
        );
      },
    },
    {
      accessorKey: "message",
      header: "Message",
      cell: ({ row }) => (
        <div className="truncate w-48 lg:w-96">{row.getValue("message")}</div>
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
        const record = row.original;

        return (
          <Eye
            className="cursor-pointer"
            size={20}
            strokeWidth={1.5}
            onClick={() => {
              setDetails(record);
              setSeeDetails(true);
            }}
          />
        );
      },
    },
  ];

  const table = useReactTable({
    data: records,
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

  const handlerDeleteRows = (records) => {
    setOpenDeleteRows(true);
    setDeleteRows(records);
  };

  return (
    <div className="w-full">
      {table.getFilteredSelectedRowModel().rows.length > 0 ? (
        <div className="flex items-center py-4">
          <Button
            variant="outline"
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
              placeholder="Filter message..."
              value={table.getColumn("message")?.getFilterValue() ?? ""}
              onChange={(event) =>
                table.getColumn("message")?.setFilterValue(event.target.value)
              }
            />
          </div>
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
      {seeDetails && (
        <DetailsAppeal
          record={details}
          isOpen={seeDetails}
          onClose={setSeeDetails}
          setNewRecords={setRecords}
        />
      )}
      {openDeleteRows && (
        <DeleteSelectedRows
          tableName="appeal_reviews"
          isOpen={open}
          onClose={setOpenDeleteRows}
          records={deleteRows}
          setNewRecords={setRecords}
          setRowSelection={setRowSelection}
        />
      )}
    </div>
  );
};

export default AppealsTable;
