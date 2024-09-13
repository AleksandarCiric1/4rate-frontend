import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
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
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { ReactNode, useState } from "react";
import { Input } from "@/components/ui/input";
import { User } from "@/types/user";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  children: ReactNode;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  children,
}: DataTableProps<TData, TValue>) {
  const [globalFilter, setGlobalFilter] = useState("");

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: (row, columnId, filterValue) => {
      const searchValue = filterValue.toLowerCase();
      const username = (row.original as User).username?.toLowerCase() || "";
      const firstName = (row.original as User).first_name?.toLowerCase() || "";
      const lastName = (row.original as User).last_name?.toLowerCase() || "";

      return (
        username.includes(searchValue) ||
        firstName.includes(searchValue) ||
        lastName.includes(searchValue)
      );
    },
  });

  const pageCount = table.getPageCount();
  const currentPage = table.getState().pagination.pageIndex + 1;

  const pageRange = 3;

  const getVisiblePages = () => {
    let pages = [];
    const startPage = Math.max(1, currentPage - Math.floor(pageRange / 2));
    const endPage = Math.min(pageCount, startPage + pageRange - 1);

    if (endPage - startPage < pageRange - 1) {
      pages = Array.from({ length: pageRange }, (_, i) => startPage + i).filter(
        (page) => page <= pageCount
      );
    } else {
      pages = Array.from(
        { length: endPage - startPage + 1 },
        (_, i) => startPage + i
      );
    }

    return pages;
  };

  const visiblePages = getVisiblePages();

  return (
    <div>
      <div className="flex items-center py-4 justify-between">
        <Input
          placeholder="Filter users ..."
          value={globalFilter ?? ""}
          onChange={(event) => setGlobalFilter(event.target.value)}
          className="max-w-sm"
        />
        {children}
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
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() =>
                  table.setPageIndex(table.getState().pagination.pageIndex - 1)
                }
                disabled={!table.getCanPreviousPage()}
              />
            </PaginationItem>
            {currentPage > pageRange + 1 && (
              <>
                <PaginationItem>
                  <PaginationLink
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      table.setPageIndex(0);
                    }}
                  >
                    1
                  </PaginationLink>
                </PaginationItem>
                {currentPage >= pageRange + 2 && <PaginationEllipsis />}
              </>
            )}

            {visiblePages.map((page) => (
              <PaginationItem key={page}>
                <PaginationLink
                  href="#"
                  isActive={page === currentPage}
                  onClick={(e) => {
                    e.preventDefault();
                    table.setPageIndex(page - 1);
                  }}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}

            {currentPage < pageCount - pageRange - 1 && (
              <>
                {currentPage <= pageCount - pageRange - 2 && (
                  <PaginationEllipsis />
                )}
                <PaginationItem>
                  <PaginationLink
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      table.setPageIndex(pageCount - 1);
                    }}
                  >
                    {pageCount}
                  </PaginationLink>
                </PaginationItem>
              </>
            )}
            <PaginationItem>
              <PaginationNext
                onClick={() =>
                  table.setPageIndex(table.getState().pagination.pageIndex + 1)
                }
                disabled={!table.getCanNextPage()}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
