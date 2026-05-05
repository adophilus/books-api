import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VideoComment, CreateVideoComment, UpdateVideoComment, FilterVideoComments } from '../models/video-comment.model';
import { PaginatedResponse } from '../models/paginated.model';

@Injectable({ providedIn: 'root' })
export class VideoCommentService {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:3000/video-comments';

  create(dto: CreateVideoComment): Observable<VideoComment> {
    return this.http.post<VideoComment>(this.baseUrl, dto);
  }

  selectMany(filter?: FilterVideoComments): Observable<PaginatedResponse<VideoComment>> {
    let params = new HttpParams();
    if (filter?.videoId) params = params.set('videoId', filter.videoId);
    if (filter?.authorId) params = params.set('authorId', filter.authorId);
    if (filter?.page) params = params.set('page', filter.page);
    if (filter?.limit) params = params.set('limit', filter.limit);
    return this.http.get<PaginatedResponse<VideoComment>>(this.baseUrl, { params });
  }

  selectById(id: string): Observable<VideoComment> {
    return this.http.get<VideoComment>(`${this.baseUrl}/${id}`);
  }

  update(id: string, dto: UpdateVideoComment): Observable<VideoComment> {
    return this.http.put<VideoComment>(`${this.baseUrl}/${id}`, dto);
  }

  remove(id: string): Observable<VideoComment> {
    return this.http.delete<VideoComment>(`${this.baseUrl}/${id}`);
  }
}
