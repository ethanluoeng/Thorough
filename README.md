# Thorough
University students have all gone through a course where the professor is utterly incomprehensible, their notes are hopelessly illegible, and let's not even get started on their practice problems... 

**Thorough** is a RAG Textbook navigator. It finds and directs you to relevant pages in your textbook based on the query you upload. The query can be any PDF; messy notes, practice problems, tutorials exercises, etc. 
This facilitates multi-source studying for students - quickly finding quality information from textbooks that accompany course material, enabling students to study more broadly, deeply and **"thoroughly"**.


<img width="1919" height="908" alt="image" src="https://github.com/user-attachments/assets/3ab89120-96c8-4265-a073-a6c48157bafb" />

<img width="1919" height="910" alt="image" src="https://github.com/user-attachments/assets/f5940ee0-c647-435a-b192-2b385649c29c" />


## 📖 Usage
**Upload Textbook:** Drag and drop your entire textbook PDF into the upload zone.
**Storage:** The backend extracts and stores the document chunks to FAISS as vector embeddings with their associated metadata.
**Upload Query:** Upload a query PDF file. This could be anything and doesn't have to be very well organized/legible.
**Search:** The backend compares the Query's vector with the document vectors. After filtering out empty/low-information pages, it returns the top 5 results.
**Study:** Use the page buttons to instantly jump to relevant pages in the textbook. 


## Teck Stack

**Frontend**
- React.js
- Tailwind CSS

**Backend**
- Python / FastAPI
- FAISS: Open-source machine learning library for efficient cosine similarity search of high-dimensional vectors
- SentenceTransformer: Lightweigth embeddings model 
- PyMuPDF / PDFPlumber: For PDF handling and text extraction.

**Infrastructure**
- Docker: Containerize the application for consistent deployment anywhere.

In the "Issues", I've documented some of the things I've learned while building this project.
