import faiss
import json
import numpy as np

INDEX_PATH = "backend/data/index.faiss"
META_PATH = "backend/data/metadata.json"

class VectorStore:
    def __init__(self, dim: int):
        self.index = faiss.IndexFlatIP(dim)
        self.metadata = []

    def add(self, vectors, metadata):
        faiss.normalize_L2(vectors)
        self.index.add(vectors)
        self.metadata.extend(metadata)

    def search(self, query_vector, k, min_tokens):
        faiss.normalize_L2(query_vector)
        scores, indices = self.index.search(query_vector, k)
        results = []
        print("Index size:", self.index.ntotal)
        print("Requested k:", k)


        for i, idx in enumerate(indices[0]):
            print("Checking result", i + 1)
            if idx == -1:
                continue
            meta = self.metadata[idx]

            if len(meta["text"].split()) < min_tokens:
                continue

            results.append({
                "page": meta["page"],
                "score": float(scores[0][i]),  # cosine similarity
                "text_preview": meta["text"][:300],
                "chapter": meta["chapter"]
            })
            print("Found result", i + 1)
        return results[:5]  # return top 5 results

    def save(self):
        faiss.write_index(self.index, INDEX_PATH)
        with open(META_PATH, "w") as f:
            json.dump(self.metadata, f)

    def load(self):
        self.index = faiss.read_index(INDEX_PATH)
        with open(META_PATH) as f:
            self.metadata = json.load(f)
