import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { VideoCommentsResponse, CreateVideoCommentDto, UpdateVideoCommentDto, FilterVideoCommentsDto, VideoComment, VideoCommentsModuleRoot } from "./video-comments.types";

@Injectable({ providedIn: "root" })
export class VideoCommentsService {
  private apiUrl = `${environment.apiBaseUrl}/${VideoCommentsModuleRoot}`;
  constructor(private http: HttpClient) {}
  private buildQueryParams(params: Record<string, any>): HttpParams {
    let httpParams = new HttpParams();
    Object.entries(params || {}).forEach(([key, value]) => {
      if (value === undefined || value === null || value === "") return;
      httpParams = httpParams.set(key, String(value));
    });
    return httpParams;
  }
  selectMany(params: FilterVideoCommentsDto): Observable<VideoCommentsResponse> {
    return this.http.get<VideoCommentsResponse>(this.apiUrl, { params: this.buildQueryParams(params) });
  }
  selectById(id: string): Observable<VideoComment> { return this.http.get<VideoComment>(`${this.apiUrl}/${id}`); }
  create(dto: CreateVideoCommentDto): Observable<VideoComment> { return this.http.post<VideoComment>(this.apiUrl, dto); }
  update(id: string, dto: UpdateVideoCommentDto): Observable<VideoComment> { return this.http.put<VideoComment>(`${this.apiUrl}/${id}`, dto); }
  delete(id: string): Observable<void> { return this.http.delete<void>(`${this.apiUrl}/${id}`); }
}
