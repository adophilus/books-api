import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { VideosResponse, CreateVideoDto, UpdateVideoDto, FilterVideoDto, Video, VideosModuleRoot } from "./videos.types";

@Injectable({ providedIn: "root" })
export class VideosService {
  private apiUrl = `${environment.apiBaseUrl}/${VideosModuleRoot}`;
  constructor(private http: HttpClient) {}
  private buildQueryParams(params: Record<string, any>): HttpParams {
    let httpParams = new HttpParams();
    Object.entries(params || {}).forEach(([key, value]) => {
      if (value === undefined || value === null || value === "") return;
      httpParams = httpParams.set(key, String(value));
    });
    return httpParams;
  }
  selectMany(params: FilterVideoDto): Observable<VideosResponse> {
    return this.http.get<VideosResponse>(this.apiUrl, { params: this.buildQueryParams(params) });
  }
  selectById(id: string): Observable<Video> { return this.http.get<Video>(`${this.apiUrl}/${id}`); }
  create(dto: CreateVideoDto): Observable<Video> { return this.http.post<Video>(this.apiUrl, dto); }
  update(id: string, dto: UpdateVideoDto): Observable<Video> { return this.http.put<Video>(`${this.apiUrl}/${id}`, dto); }
  delete(id: string): Observable<void> { return this.http.delete<void>(`${this.apiUrl}/${id}`); }
}
