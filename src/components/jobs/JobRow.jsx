import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { db } from "@/lib/db";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { TableCell, TableRow } from "../ui/table";
import { COLUMNS } from "@/lib/constants";

export default function JobRow({ job, visibleColumns }) {
    
    const handleDelete = async (id) => {
        try {
            await db.jobs.delete(id)
            toast.success("Listing deleted successfully.")
        } catch (error) {
            toast.error("Failed to delete listing. Please try again.")
            console.error(`Failed to delete job. Please try again`, error)
        }
    }

    return (
        <TableRow>
            {COLUMNS.map((col) => 
                visibleColumns[col.key] && (
                    <TableCell key={col.key}>
                        {/* If the render func does'nt exist insert the label  */}
                        {col.render?.(job[col.key]) || job[col.key]}
                    </TableCell>
                )
            )}
            <TableCell>
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button variant="destructive" size="sm">
                            <Trash2 />
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>
                                Are you sure you want to delete this listing?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete the job.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction 
                                onClick={() => handleDelete(job.id)}
                            >
                                Continue
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </TableCell>
        </TableRow>
    )
}