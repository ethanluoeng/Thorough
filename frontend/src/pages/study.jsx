import { useState } from 'react'
import PdfViewer from "../components/PdfViewer.jsx"

export default function PdfPage({ buttons, pdfFile }) {
  const [page, setPage] = useState(1)

  return (
    <div className="min-h-screen p-12">
      
      <div className="h-[calc(100vh-3rem)] grid grid-cols-12 gap-6 w-full">
        {/* Left: PDF - takes up most of the space */}
        <div className="h-full overflow-auto col-span-9 custom-scrollbar">
          <PdfViewer
          fileUrl={pdfFile}
          page={page}
          />
        </div>

        {/* Right: thin panel for navigation */}
        <div className="space-y-2 col-span-3">
          {buttons.map((p) => {
            const isActive = page === p;
            return (
              <button
                key={p}
                className="w-full text-left relative bg-amber-900/10 rounded-lg"
                onClick={() => {
                  setPage(p)
                  document.getElementById(`page-${p}`)?.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                <div
                  className="px-4 py-3 rounded-md border-l-2 transition-all duration-300 ease-out"
                  style={{
                    backgroundColor: isActive ? 'var(--stone-medium)' : 'var(--stone-lighter)',
                    borderLeftColor: isActive ? 'var(--stone-accent)' : 'transparent',
                    borderTop: '1px solid var(--stone-border)',
                    borderRight: '1px solid var(--stone-border)',
                    borderBottom: '1px solid var(--stone-border)',
                    color: 'var(--stone-text)',
                    boxShadow: isActive 
                      ? '0 2px 8px var(--stone-shadow)' 
                      : '0 1px 3px var(--stone-shadow)',
                    transform: 'translateX(0)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateX(4px)';
                    e.currentTarget.style.backgroundColor = 'var(--stone-medium)';
                    e.currentTarget.style.borderLeftColor = 'var(--stone-accent)';
                    e.currentTarget.style.boxShadow = '0 4px 12px var(--stone-shadow)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateX(0)';
                    e.currentTarget.style.backgroundColor = isActive ? 'var(--stone-medium)' : 'var(--stone-lighter)';
                    e.currentTarget.style.borderLeftColor = isActive ? 'var(--stone-accent)' : 'transparent';
                    e.currentTarget.style.boxShadow = isActive 
                      ? '0 2px 8px var(--stone-shadow)' 
                      : '0 1px 3px var(--stone-shadow)';
                  }}
                >
                  <span 
                    className="text-sm font-medium"
                    style={{
                      fontWeight: isActive ? '600' : '500',
                      letterSpacing: '0.025em'
                    }}
                  >
                    Page {p}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  )
}
