import { useEffect, useState, useRef } from "react"
import { Document, Page } from "react-pdf"
import "react-pdf/dist/Page/AnnotationLayer.css"
import "react-pdf/dist/Page/TextLayer.css"

export default function PdfViewer({ fileUrl, page }) {
  const [numPages, setNumPages] = useState(null)
  const [currentPage, setCurrentPage] = useState(page)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const [pageWidth, setPageWidth] = useState(800)
  const containerRef = useRef(null)

  useEffect(() => {
    setCurrentPage(page)
  }, [page])

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth - 32 // account for padding
        setPageWidth(Math.min(width, 1000))
      }
    }
    updateWidth()
    window.addEventListener('resize', updateWidth)
    return () => window.removeEventListener('resize', updateWidth)
  }, [])

  const onLoadError = (err) => {
    console.error("PDF load error:", err)
    setError(err.message || "Failed to load PDF")
    setLoading(false)
  }

  return (
    <div 
      ref={containerRef}
      className="flex flex-col items-center gap-6 p-6 rounded-2xl h-full"
    >
      {error && (
        <div 
          className="p-4 rounded-xl w-full"
          style={{
            backgroundColor: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            color: '#fca5a5'
          }}
        >
          <strong>Error:</strong> {error}
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
        loading={
          <div 
            className="p-8 text-center rounded-xl"
            style={{
              backgroundColor: 'transparent',
              color: 'var(--stone-text)'
            }}
          >
            <div className="text-2xl mb-3 opacity-60">📄</div>
            <div className="text-sm opacity-80">Loading PDF…</div>
          </div>
        }
      >
        {numPages && Array.from({ length: numPages }, (_, i) => i + 1).map((pageNum) => (
          <div key={pageNum} id={`page-${pageNum}`}>
            <Page
              pageNumber={pageNum}
              width={pageWidth}
              renderTextLayer={true}
              renderAnnotationLayer={true}
              onRenderError={(err) => console.error("Page render error:", err)}
            />
          </div>
        ))}
      </Document>

      {numPages && (
        <div 
          className="text-sm px-5 py-2.5 rounded-full sticky bottom-6"
          style={{
            backgroundColor: 'black',
            color: 'white',
            fontWeight: '500',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)'
          }}
        >
          Page {currentPage} / {numPages}
        </div>
      )}
    </div>
  )
}