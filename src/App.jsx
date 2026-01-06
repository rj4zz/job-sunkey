import { Toaster } from '@/components/ui/sonner'
import './App.css'
import JobDashboard from './components/JobDashboard'

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-4">
      <h1 className="text-2x1 font-bold mb-6">Job Tracker</h1>
      <div className="mt-8">
        <JobDashboard />
      </div>
      <Toaster />
    </div>
  )
}

export default App
