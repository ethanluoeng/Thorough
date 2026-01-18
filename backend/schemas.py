from pydantic import BaseModel
from typing import List

class SearchResult(BaseModel):
    page: int
    score: float
    text_preview: str

class SearchResponse(BaseModel):
    results: List[SearchResult]
