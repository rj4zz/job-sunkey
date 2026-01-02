import DataControls from '@/components/DataControls'
import JobForm from '@/components/JobForm'
import JobTable from '@/components/JobTable'
import { Toaster } from '@/components/ui/sonner'
import './App.css'

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-4">
      <h1 className="text-2x1 font-bold mb-6">Job Tracker</h1>
      <div className="w-full max-w-md">
        <JobForm />
      </div>
      <div className="w-full max-w-4xl mt-8">
        <DataControls />
        <JobTable />
      </div>
      <Toaster />
    </div>
  )
}

export default App
