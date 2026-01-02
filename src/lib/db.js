import Dexie from "dexie";

export const db = new Dexie('JobTrackerDB')

/* 
    SCHEMA:
    * ++id is the auto-incrementing primary key
    * 'company, status, dateAdded' are secondary keys indexed for faster searching/sorting
*/
try {
    db.version(1).stores({
        jobs: 'id, company, status, dateAdded'
    })
    console.log("Database initialized successfully");
} catch (error) {
   console.log("Error initializing database:", error) 
}