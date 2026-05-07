import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { BookViewsResponse, CreateBookViewDto, FilterBookViewsDto, BookView, BookViewsModuleRoot } from "./book-views.types";

@Injectable({ providedIn: "root" })
export class BookViewsService {
  private apiUrl = `${environment.apiBaseUrl}/${BookViewsModuleRoot}`;
  constructor(private http: HttpClient) {}
  private buildQueryParams(params: Record<string, any>): HttpParams {
    let httpParams = new HttpParams();
    Object.entries(params || {}).forEach(([key, value]) => {
      if (value === undefined || value === null || value === "") return;
      httpParams = httpParams.set(key, String(value));
    });
    return httpParams;
  }
  selectMany(params: FilterBookViewsDto): Observable<BookViewsResponse> {
    return this.http.get<BookViewsResponse>(this.apiUrl, { params: this.buildQueryParams(params) });
  }
  selectById(id: string): Observable<BookView> { return this.http.get<BookView>(`${this.apiUrl}/${id}`); }
  create(dto: CreateBookViewDto): Observable<BookView> { return this.http.post<BookView>(this.apiUrl, dto); }
  delete(id: string): Observable<void> { return this.http.delete<void>(`${this.apiUrl}/${id}`); }
}
