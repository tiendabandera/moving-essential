import { useEffect, useState } from "react";
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

import DeleteSelectedRows from "./DeleteSelectedRows";
import CreatePhonePool from "./CreatePhonePool";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, Plus, Trash } from "lucide-react";

import { supabase } from "@/api/auth";

import { useAuth } from "@/context/AuthContext";
import { Switch } from "./ui/switch";
import CustomToolTips from "./design/CustomTooltips";

const PhonePoolTable = ({ records, setRecords }) => {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});

  const [open, setOpen] = useState(false);
  const [createLead, setCreateLead] = useState(false);
  const [visiblePhones, setVisiblePhones] = useState({});
  const [views, setViews] = useState({});
  const [notificationPool, setNotificationPool] = useState(false);

  const handleViewPhone = async (rowId, initialViews) => {
    setVisiblePhones((prev) => ({
      ...prev,
      [rowId]: !prev[rowId],
    }));

    setViews((prev) => ({
      ...prev,
      [rowId]: (prev[rowId] ?? initialViews) + 1, // Incrementa el número de vistas
    }));

    await supabase.rpc("increment_views", { id_input: rowId });
  };

  const [deleteRows, setDeleteRows] = useState([]);
  const { user, userInfo } = useAuth();

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
        const rowId = row.original.id; // Asegúrate de que cada fila tiene un ID único
        const isPhoneVisible = visiblePhones[rowId];

        let phoneFormatted = phone
          ? phone.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3")
          : "";

        return (
          <div className="w-28">
            {user.user_metadata.role === "admin" || isPhoneVisible ? (
              phoneFormatted
            ) : (
              <div>
                <Eye
                  onClick={() => {
                    handleViewPhone(rowId, row.getValue("views") || 0);
                  }}
                  className={`cursor-pointer ${
                    isPhoneVisible && "hidden"
                  } text-green-500`}
                  strokeWidth={1.5}
                  size={20}
                />
              </div>
            )}
          </div>
        );
      },
    },
    {
      accessorKey: "views",
      header: () => {
        return (
          <div className="flex gap-2">
            <p>Views</p>
            <CustomToolTips
              content={`
                Views: The number of times this lead has been accessed by different users in the Phone Pool.
              `}
              size={"size-4"}
              className={"w-70 mr-5"}
            />
          </div>
        );
      },
      cell: ({ row }) => {
        const rowId = row.original.id;
        return <div>{views[rowId] ?? row.getValue("views")}</div>;
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

  const handleNotification = async (value) => {
    setNotificationPool(value);
    await supabase
      .from("premium_features")
      .update({ notification_pool: value })
      .eq("company_id", userInfo.company.id);
  };

  useEffect(() => {
    if (
      userInfo &&
      user.user_metadata.role === "company" &&
      userInfo.company.premium_features
    ) {
      setNotificationPool(userInfo.company.premium_features.notification_pool);
    }
  }, [userInfo]);

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
          {user.user_metadata.role === "company" && (
            <div className="ml-auto flex flex-col items-end gap-2">
              <CustomToolTips
                content={`
                This is an on & off switch for notifications in the phone pool. 
                When switched 'on', you will receive alerts and updates. 
                When 'off' all notifications are silenced, ensuring uninterrupted workflow or focus.
              `}
                className={"w-70 mr-5"}
              />
              <div className="flex flex-col items-center">
                <Switch
                  onCheckedChange={handleNotification}
                  checked={notificationPool}
                />
                <span className="text-xs font-semibold">off/on</span>
              </div>
            </div>
          )}
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
