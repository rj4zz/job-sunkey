import { useState } from 'react'
import './App.css'

function App() {
  return (
   <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-4">
      {/* Test a Shadcn-style Card */}
      <div className="max-w-md w-full bg-card text-card-foreground rounded-xl shadow-lg border border-border p-8 space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-primary">
            Shadcn Theme Test
          </h1>
          <p className="text-muted-foreground">
            If this text is gray and the heading is dark blue/black, variables are working.
          </p>
        </div>

        <div className="flex justify-center">
          <button className="px-6 py-2 bg-primary text-primary-foreground font-medium rounded-md hover:opacity-90 transition-opacity">
            Primary Button
          </button>
        </div>

        {/* Test the secondary color */}
        <div className="p-4 bg-secondary text-secondary-foreground rounded-md text-center text-sm">
          This box uses the Secondary theme color.
        </div>
      </div>
    </div>
  )
}

export default App
