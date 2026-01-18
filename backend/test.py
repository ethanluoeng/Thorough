from backend.pdf_utils import extract_text_by_page

pages = extract_text_by_page("backend/data/textbook.pdf")
print(f"Total pages extracted: {len(pages)}")
print("First page snippet:", pages[0]["text"][:200])
