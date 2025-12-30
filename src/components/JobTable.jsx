import { db } from "@/lib/db";
import { useLiveQuery } from "dexie-react-hooks";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";

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
                        </TableRow>
                    )})}
                </TableBody>
            </Table>
        </div>
    )
}