import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VideoView, CreateVideoView, FilterVideoViews } from '../models/video-view.model';
import { PaginatedResponse } from '../models/paginated.model';

@Injectable({ providedIn: 'root' })
export class VideoViewService {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:3000/video-views';

  create(dto: CreateVideoView): Observable<VideoView> {
    return this.http.post<VideoView>(this.baseUrl, dto);
  }

  selectMany(filter?: FilterVideoViews): Observable<PaginatedResponse<VideoView>> {
    let params = new HttpParams();
    if (filter?.videoId) params = params.set('videoId', filter.videoId);
    if (filter?.authorId) params = params.set('authorId', filter.authorId);
    if (filter?.page) params = params.set('page', filter.page);
    if (filter?.limit) params = params.set('limit', filter.limit);
    return this.http.get<PaginatedResponse<VideoView>>(this.baseUrl, { params });
  }

  selectById(id: string): Observable<VideoView> {
    return this.http.get<VideoView>(`${this.baseUrl}/${id}`);
  }

  remove(id: string): Observable<VideoView> {
    return this.http.delete<VideoView>(`${this.baseUrl}/${id}`);
  }
}
