import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Video, CreateVideo, UpdateVideo, FilterVideos } from '../models/video.model';
import { PaginatedResponse } from '../models/paginated.model';

@Injectable({ providedIn: 'root' })
export class VideoService {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:3000/videos';

  create(dto: CreateVideo): Observable<Video> {
    return this.http.post<Video>(this.baseUrl, dto);
  }

  selectMany(filter?: FilterVideos): Observable<PaginatedResponse<Video>> {
    let params = new HttpParams();
    if (filter?.search) params = params.set('search', filter.search);
    if (filter?.authorId) params = params.set('authorId', filter.authorId);
    if (filter?.page) params = params.set('page', filter.page);
    if (filter?.limit) params = params.set('limit', filter.limit);
    return this.http.get<PaginatedResponse<Video>>(this.baseUrl, { params });
  }

  selectById(id: string): Observable<Video> {
    return this.http.get<Video>(`${this.baseUrl}/${id}`);
  }

  update(id: string, dto: UpdateVideo): Observable<Video> {
    return this.http.put<Video>(`${this.baseUrl}/${id}`, dto);
  }

  remove(id: string): Observable<Video> {
    return this.http.delete<Video>(`${this.baseUrl}/${id}`);
  }
}
