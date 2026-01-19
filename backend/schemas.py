from pydantic import BaseModel
from typing import List

class Chapter(BaseModel):
    chapter_id: int
    chapter_title: str

class SearchResult(BaseModel):
    page: int
    score: float
    text_preview: str
    chapter: Chapter

class SearchResponse(BaseModel):
    results: List[SearchResult]

SearchResponse.model_rebuild()
