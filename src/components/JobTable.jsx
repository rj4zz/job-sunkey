import { Badge } from "@/components/ui/badge";
import { db } from "@/lib/db";
import { useLiveQuery } from "dexie-react-hooks";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Button } from "./ui/button";
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
            console.log("Listing with {id} deleted successfully.");
        } catch (error) {
            console.error(`Failed to delete listing with ID {id}`, error);
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
                                <Button
                                    variant="destructive"
                                    make very small
                                    size="sm"
                                    onClick={() => handleDelete(job.id)}
                                >
                                    Delete
                                </Button>
                            </TableCell>
                        </TableRow>
                    )})}
                </TableBody>
            </Table>
        </div>
    )
}