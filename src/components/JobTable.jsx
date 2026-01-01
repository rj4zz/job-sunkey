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
import { useState, useMemo } from "react";

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

    const [sortConfig, setSortConfig] = useState({ 
        key: null, 
        direction: 'asc' 
    });

    const requestSort = (key) => {
        let direction = 'asc'
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
           direction = 'desc'
        }
        setSortConfig({ key, direction })
    }

    const sortedJobs = useMemo(() => {
        if (!sortConfig.key) return jobs;
        return [...jobs].sort((a,b) => {
            if (a[sortConfig.key] < b[sortConfig.key]) {
                return sortConfig.direction === 'asc' ? -1 : 1
                
            } else if (a[sortConfig.key] > b[sortConfig.key]) {
               return sortConfig.direction === 'asc' ? 1 : -1
            }
            return 0
        })
    }, [jobs, sortConfig])

    const handleDelete = async (id) => {
        try {
            await db.jobs.delete(id)
            toast.success("Listing deleted successfully.")
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
                        <TableHead 
                            onClick={() => requestSort('company')}
                        >
                            Company {sortConfig.key === 'company' && (sortConfig.direction === 'asc' ? '🔼' : '🔽')}
                        </TableHead>
                        <TableHead 
                            onClick={() => requestSort('position')}
                        >
                            Position {sortConfig.key === 'position' && (sortConfig.direction === 'asc' ? '🔼' : '🔽')}
                        </TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Date Added</TableHead>
                        <TableHead> </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {sortedJobs.map((job) => {return(
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