from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import shutil
import numpy as np
import os

from .pdf_utils import extract_text_by_page
from .embeddings import embed_texts
from .vector_store import VectorStore
from .schemas import SearchResponse
from .config import settings

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.allow_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

vector_store = None

@app.on_event("startup")
def load_index():
    global vector_store
    if os.path.exists("backend/data/index.faiss"):
        vector_store = VectorStore(dim=384)
        vector_store.load()
        print("FAISS index loaded from disk")

@app.post("/upload-textbook")
async def upload_textbook(file: UploadFile = File(...)):
    global vector_store

    path = "backend/data/textbook.pdf"
    with open(path, "wb") as f:
        shutil.copyfileobj(file.file, f)

    pages = extract_text_by_page(path)
    texts = [p["text"] for p in pages]
    vectors = embed_texts(texts)

    vector_store = VectorStore(dim=vectors.shape[1])
    vector_store.add(vectors, pages)
    vector_store.save()

    return {
        "pages_indexed": len(pages)
    }

@app.post("/search", response_model=SearchResponse)
async def search(file: UploadFile = File(...)):
    global vector_store
    print("Received search request")

    if vector_store is None:
        raise RuntimeError("Textbook not indexed yet.")

    path = "backend/data/query.pdf"
    with open(path, "wb") as f:
        shutil.copyfileobj(file.file, f)

    query_pages = extract_text_by_page(path)
    query_text = " ".join(p["text"] for p in query_pages)

    query_vec = embed_texts([query_text])
    results = vector_store.search(query_vec, 10, 50)

    return {"results": results}
