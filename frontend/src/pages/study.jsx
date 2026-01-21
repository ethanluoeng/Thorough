import { useState } from 'react'
import PdfViewer from "../components/pdfViewer.jsx"

export default function PdfPage() {
  const [page, setPage] = useState(1)

  return (
    <div className="grid grid-cols-2 gap-6">
      {/* Left: search results */}
      <div className="space-y-3">
        {[3, 12, 45].map((p) => (
          <button
            key={p}
            className="w-full text-left p-3 border rounded-lg hover:bg-gray-50"
            onClick={() => setPage(p)}
          >
            Jump to page {p}
          </button>
        ))}
      </div>

      {/* Right: PDF */}
      <PdfViewer
        fileUrl="/Textbook.pdf"
        page={page}
      />
    </div>
  )
}
