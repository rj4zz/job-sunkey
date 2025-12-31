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
import { Badge } from "@/components/ui/badge";
import { db } from "@/lib/db";
import { useLiveQuery } from "dexie-react-hooks";
import { toast } from "sonner";
import { Button } from "./ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "./ui/table";

function getStatusVariant(status) {
    switch (status) {
        case 'rejected':
            return 'destructive'
        case 'offer':
            return 'success'
        case 'interviewing':
            return 'info' 
        default:
            return 'default';
    }
}
export default function JobTable() {
    const jobs = useLiveQuery(() => {
        try {
            return db.jobs.toArray();
        } catch (error) {
            console.error('Failed to fetch jobs:', error);
            return []
        }
    })

    const handleDelete = async (id) => {
        try {
            await db.jobs.delete(id)
            console.log("Listing deleted successfully.")
            toast.success("Listing deleted successfully.")
            console.log("Sonner Reached.");
        } catch (error) {
            toast.error("Failed to delete listing. Please try again.")
            console.error(`Failed to delete job. Please try again`, error)
        }
        
    }

    if (!jobs) {
        return <div className="text-center">Loading...</div>
    }

    if (jobs.length === 0) {
        return <div className="text-center">No jobs found. Add a job to get started.</div>
    }

    return (
        <div className="overflow-x-auto">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Company</TableHead>
                        <TableHead>Position</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Date Added</TableHead>
                        <TableHead> </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {jobs.map((job) => {return(
                        <TableRow key={job.id}>
                            <TableCell>{job.company}</TableCell>
                            <TableCell>{job.position}</TableCell>
                            <TableCell>
                                <Badge 
                                    variant={getStatusVariant(job.status)}>
                                    {job.status}
                                </Badge>
                            </TableCell>
                            <TableCell>
                                {new Date(job.dateAdded).toLocaleDateString()}
                            </TableCell>
                            <TableCell>
                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <Button variant="destructive" size="sm">
                                            Delete
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
                                            <AlertDialogAction onClick={() => handleDelete(job.id)}>
                                                Continue
                                            </AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </TableCell>
                        </TableRow>
                    )})}
                </TableBody>
            </Table>
        </div>
    )
}