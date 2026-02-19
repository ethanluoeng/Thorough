# 📖 Thorough
A RAG Textbook navigator that directs you to relevant pages in your textbook based on the query you upload (messy notes, practice problems, tutorials exercises, etc.) This facilitates multi-source studying for students by quickly retrieving quality information from textbooks that accompany course material, enabling students to study more broadly, deeply and **thoroughly**. 

## 🚨 Idea
In one of my courses, I had a very hard time understanding the lectures and notes. When I tried pivoting to the textbook instead, constantly searching for pages that match the course material was frustrating and disruptive. Therefore, I wanted to create a simple tool that would make my own studying sessions more enjoyable.

## 🔓 Technologies
* `Docker`
* `React`
* `Javascript`
* `Tailwind CSS`
* `Python`
* `FastAPI`
* `FAISS`
* `SentenceTransformer`

## 🚀 How it Works
- **Upload Textbook:** Upload your entire textbook PDF.
- **Storage:** The backend extracts document chunks, turning them into vector embeddings that are stored in the FAISS database with their associated metadata.
- **Upload Query:** Upload a query PDF file. This could be anything and doesn't have to be very well organized/legible.
- **Search:** The backend compares the Query's vector with document vectors. After filtering out empty/low-information pages, it returns the top 5 results.
- **Study:** Use the page buttons to instantly jump to relevant pages in the textbook.   
_In the "Issues", I've documented some things I've learned while building this project. Next-steps would be to process photos and videos for querying._

## 🎮 Running the Project 
_Requires Docker Desktop_
1. Clone the repository
2. Build the Docker image: `docker build -t thorough .`
3. Run the container: `docker run -p 3000:3000 -p 8000:8000 thorough`
4. Open http://localhost:3000 (frontend) and http://localhost:8000/docs (backend) in your browser

## 🎥 Preview
https://github.com/user-attachments/assets/432bbdd9-8926-4dd1-8fd4-90a15c66348d

