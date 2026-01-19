import pdfplumber
import re

def extract_text_by_page(pdf_path: str):
    pages = []
    chapter_id = 0
    current_chapter = {
        "chapter_id": chapter_id,
        "chapter_title": "Preface"
    }

    chapter_pattern = re.compile(r'(?:CHAPTER|Chapter)\s+(\d+):?\s*(.*)', re.IGNORECASE)

    with pdfplumber.open(pdf_path) as pdf:
        for i, page in enumerate(pdf.pages):
            text = page.extract_text()
            
            if not text or not text.strip():
                continue

            first_line = text.split("\n")[0].strip()
            match = chapter_pattern.search(first_line)

            if match:
                current_chapter = {
                    "chapter_id": int(match.group(1)),
                    "chapter_title": match.group(2).strip()
                }

            pages.append({
                "page": i + 1,
                "text": text,
                "chapter": current_chapter
            })

    return pages

