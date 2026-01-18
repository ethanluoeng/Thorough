import faiss
import json
import numpy as np

INDEX_PATH = "backend/data/index.faiss"
META_PATH = "backend/data/metadata.json"

class VectorStore:
    def __init__(self, dim: int):
        self.index = faiss.IndexFlatL2(dim)
        self.metadata = []

    def add(self, vectors, metadata):
        self.index.add(vectors)
        self.metadata.extend(metadata)

    def search(self, query_vector, k=5):
        distances, indices = self.index.search(query_vector, k)
        results = []
        for i, idx in enumerate(indices[0]):
            if idx == -1:
                continue
            meta = self.metadata[idx]
            results.append({
                "page": meta["page"],
                "score": float(distances[0][i]),
                "text_preview": meta["text"][:300]
            })
        return results

    def save(self):
        faiss.write_index(self.index, INDEX_PATH)
        with open(META_PATH, "w") as f:
            json.dump(self.metadata, f)

    def load(self):
        self.index = faiss.read_index(INDEX_PATH)
        with open(META_PATH) as f:
            self.metadata = json.load(f)
