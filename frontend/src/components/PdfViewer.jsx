import { useEffect, useState } from "react"
import { Document, Page } from "react-pdf"
import "react-pdf/dist/Page/AnnotationLayer.css"
import "react-pdf/dist/Page/TextLayer.css"

export default function PdfViewer({ fileUrl, page }) {
  const [numPages, setNumPages] = useState(null)
  const [currentPage, setCurrentPage] = useState(page)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setCurrentPage(page)
  }, [page])

  const onLoadError = (err) => {
    console.error("PDF load error:", err)
    setError(err.message || "Failed to load PDF")
    setLoading(false)
  }

  return (
    <div className="flex flex-col items-center gap-2 border p-4">
      <div className="text-xs text-gray-400 mb-2">
        Debug: fileUrl={fileUrl}, page={currentPage}, loading={String(loading)}, numPages={numPages}
      </div>
      {error && (
        <div className="text-red-500 p-4 border border-red-300 rounded">
          Error: {error}
        </div>
      )}
      <Document
        file={fileUrl}
        onLoadSuccess={({ numPages }) => {
          console.log("PDF loaded successfully, pages:", numPages)
          setNumPages(numPages)
          setError(null)
          setLoading(false)
        }}
        onLoadError={onLoadError}
        loading={<div className="p-4">Loading PDF…</div>}
      >
        <Page
          pageNumber={currentPage}
          width={700}
          renderTextLayer={true}
          renderAnnotationLayer={true}
          onRenderError={(err) => console.error("Page render error:", err)}
        />
      </Document>

      {numPages && (
        <div className="text-sm text-gray-500">
          Page {currentPage} / {numPages}
        </div>
      )}
    </div>
  )
}