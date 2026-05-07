import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { VideoViewsResponse, CreateVideoViewDto, FilterVideoViewsDto, VideoView, VideoViewsModuleRoot } from "./video-views.types";

@Injectable({ providedIn: "root" })
export class VideoViewsService {
  private apiUrl = `${environment.apiBaseUrl}/${VideoViewsModuleRoot}`;
  constructor(private http: HttpClient) {}
  private buildQueryParams(params: Record<string, any>): HttpParams {
    let httpParams = new HttpParams();
    Object.entries(params || {}).forEach(([key, value]) => {
      if (value === undefined || value === null || value === "") return;
      httpParams = httpParams.set(key, String(value));
    });
    return httpParams;
  }
  selectMany(params: FilterVideoViewsDto): Observable<VideoViewsResponse> {
    return this.http.get<VideoViewsResponse>(this.apiUrl, { params: this.buildQueryParams(params) });
  }
  selectById(id: string): Observable<VideoView> { return this.http.get<VideoView>(`${this.apiUrl}/${id}`); }
  create(dto: CreateVideoViewDto): Observable<VideoView> { return this.http.post<VideoView>(this.apiUrl, dto); }
  delete(id: string): Observable<void> { return this.http.delete<void>(`${this.apiUrl}/${id}`); }
}
