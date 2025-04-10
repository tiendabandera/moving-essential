import { ArchiveRestore, ChevronDown, Eye } from "lucide-react";
import { useState } from "react";

import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import DetailsReview from "./DetailsReview";
import RestoreReviews from "./RestoreReview";

const ReviewsTable = ({ records, setRecords }) => {
  /* TABLE CONFIGURATION
  _______________________________________________ */
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});

  /* OPTIONS
  _______________________________________________ */
  const [filter, setFilter] = useState("id");
  const [seeDetails, setSeeDetails] = useState(false);
  const [details, setDetails] = useState({});
  const [openRestoreRows, setOpenRestoreRows] = useState(false);
  const [restoreRows, setRestoreRows] = useState([]);

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
      accessorKey: "id",
      header: "ID",
      filterFn: (row, columnId, filterValue) => {
        return Number(row.getValue(columnId)) === Number(filterValue);
      },
      cell: ({ row }) => <div className="capitalize">{row.getValue("id")}</div>,
    },
    {
      accessorKey: "company",
      header: "Company/Realtor",
      cell: ({ row }) => {
        const { business_type_id, user_info } = row.getValue("company");

        const name =
          business_type_id === 1
            ? user_info.user_metadata.company_name
            : user_info.user_metadata.name;

        return <div className="capitalize">{name}</div>;
      },
    },
    {
      accessorKey: "origin",
      header: "Origin",
      cell: ({ row }) => (
        <div className="truncate">{row.getValue("origin")}</div>
      ),
    },
    {
      accessorKey: "destination",
      header: "Destination",
      cell: ({ row }) => (
        <div className="truncate">{row.getValue("destination")}</div>
      ),
    },
    {
      accessorKey: "quoted_price",
      header: "Quoted price",
      cell: ({ row }) => (
        <div className="truncate">{row.getValue("quoted_price")}</div>
      ),
    },
    {
      accessorKey: "actual_price",
      header: "Actual price",
      cell: ({ row }) => (
        <div className="truncate">{row.getValue("actual_price")}</div>
      ),
    },
    {
      accessorKey: "message",
      header: "Message",
      cell: ({ row }) => (
        <div className="truncate w-48 lg:w-96">{row.getValue("message")}</div>
      ),
    },
    {
      accessorKey: "rating",
      header: "Rating",
      cell: ({ row }) => (
        <div className="truncate">{row.getValue("rating")}</div>
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
              setDetails({
                review: record,
              });
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

  const handlerRestoreRows = (records) => {
    setOpenRestoreRows(true);
    setRestoreRows(records);
  };

  return (
    <div className="w-full">
      {table.getFilteredSelectedRowModel().rows.length > 0 ? (
        <div className="flex items-center py-4">
          <Button
            variant="outline"
            onClick={() => {
              handlerRestoreRows(
                table
                  .getFilteredSelectedRowModel()
                  .rows.map((row) => row.original.id)
              );
            }}
          >
            <ArchiveRestore className="h-4 w-4" />
            Restore {table.getFilteredSelectedRowModel().rows.length} selected
          </Button>
        </div>
      ) : (
        <div className="flex flex-col sm:flex-row py-4 gap-4">
          <div className="w-full lg:max-w-md flex flex-col xs:flex-row items-start gap-2 md:pr-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  Filter <ChevronDown />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuCheckboxItem
                  checked={filter === "id"}
                  onCheckedChange={() => {
                    setFilter("id");
                    table.setColumnFilters([]);
                  }}
                >
                  ID
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
            <Input
              placeholder="Enter a value for the filter..."
              type={filter === "review_id" ? "number" : "text"}
              value={table.getColumn(filter)?.getFilterValue() ?? ""}
              onChange={(event) =>
                table.getColumn(filter)?.setFilterValue(event.target.value)
              }
              className="w-full"
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
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className={`text-sm text-muted-foreground`}>
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
        <DetailsReview
          record={details}
          isOpen={seeDetails}
          onClose={setSeeDetails}
          setNewRecords={setRecords}
        />
      )}
      {openRestoreRows && (
        <RestoreReviews
          tableName="reviews"
          isOpen={open}
          onClose={setOpenRestoreRows}
          records={restoreRows}
          setNewRecords={setRecords}
          setRowSelection={setRowSelection}
        />
      )}
    </div>
  );
};

export default ReviewsTable;
