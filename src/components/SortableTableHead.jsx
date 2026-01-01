import { TableHead } from "./ui/table";
import { ArrowUpNarrowWide, ArrowDownWideNarrow } from "lucide-react";

export default function SortableTableHead({ 
    children, 
    sortConfig, 
    requestSort, 
    columnKey}) 
{
    return (
        <TableHead 
            onClick={() => requestSort(columnKey)}
            className="hover:bg-gray-100 cursor-pointer"
        >
            <div className="flex items-center gap-1">
                {children} 
                {sortConfig.key === columnKey && (sortConfig.direction === 'asc' 
                    ? <ArrowUpNarrowWide className="h-4 w-4"/> 
                    : <ArrowDownWideNarrow className="h-4 w-4"/>
                    )}
            </div>
        </TableHead>
    )
}