"use client"

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  SortingState,
  getSortedRowModel,
  Row,
  ColumnFiltersState,
  getFilteredRowModel,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "../ui/button"
import { useState } from "react"
import { ArrowLeftToLine, ArrowRightToLine, MoveLeft, MoveRight } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { ProductDTO } from "@/lib/DTO/product"
interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  editProduct: (product: ProductDTO) => void
}

export function DataTable<TData, TValue>({
  columns,
  data,
  editProduct,
}: DataTableProps<TData, TValue>) {
  const [pageIndex, setPageIndex] = useState(0)
  const [sorting, setSorting] = useState<SortingState>([])
  const [pageSize, setPageSize] = useState(5)
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
    []
  )
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
      pagination: {
        pageSize,
        pageIndex,
      }
    }
  })
  const tablePrevPage = () => {
    if (table.getCanPreviousPage()) setPageIndex(pageIndex - 1)
  }
  const tableNextPage = () => {
    if (table.getCanNextPage()) setPageIndex(pageIndex + 1)
  }
  const editProductOnClick = (rowId: string) => {
    let index = parseInt(rowId)
    if (data[index]) {
      editProduct(data[index] as ProductDTO)
    }
  }
  const startIndex = pageIndex * pageSize + 1;
  const endIndex = Math.min((pageIndex + 1) * pageSize, data.length);
  const lastPageIndex = (Math.ceil(data.length / pageSize)) - 1;
  const pageSizeOption = [
    { label: "5 items per page", value: 5 },
    { label: "10 items per page", value: 10 },
    { label: "15 items per page", value: 15 },
    { label: "20 items per page", value: 20 }
  ]
  return (
    <div>
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter products..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
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
                  )
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
                  onClick={() => editProductOnClick(row.id)}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex flex-col md:flex-row md:justify-between pt-10">
        <Select onValueChange={(value) => setPageSize(parseInt(value))}>
          <SelectTrigger className="w-[200px]">
            <SelectValue> {pageSizeOption.find((option) => option.value === pageSize)?.label} </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {
              pageSizeOption.map((option) => (<SelectItem key={option.value} value={`${option.value}`}>{option.label}</SelectItem>))
            }
          </SelectContent>
        </Select>
        <div className="flex items-center md:justify-end space-x-2 py-4">
          <span>{`${startIndex} - ${endIndex} of ${data.length}`}</span>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
            className=" rounded-full"
          >
            <ArrowLeftToLine className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={tablePrevPage}
            disabled={!table.getCanPreviousPage()}
            className=" rounded-full"
          >
            <MoveLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={tableNextPage}
            disabled={!table.getCanNextPage()}
            className=" rounded-full"
          >
            <MoveRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setPageIndex(lastPageIndex)}
            disabled={!table.getCanNextPage()}
            className=" rounded-full"
          >
            <ArrowRightToLine className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
