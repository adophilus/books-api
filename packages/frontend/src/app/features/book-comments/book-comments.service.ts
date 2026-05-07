import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { BookCommentsResponse, CreateBookCommentDto, UpdateBookCommentDto, FilterBookCommentsDto, BookComment, BookCommentsModuleRoot } from "./book-comments.types";

@Injectable({ providedIn: "root" })
export class BookCommentsService {
  private apiUrl = `${environment.apiBaseUrl}/${BookCommentsModuleRoot}`;
  constructor(private http: HttpClient) {}
  private buildQueryParams(params: Record<string, any>): HttpParams {
    let httpParams = new HttpParams();
    Object.entries(params || {}).forEach(([key, value]) => {
      if (value === undefined || value === null || value === "") return;
      httpParams = httpParams.set(key, String(value));
    });
    return httpParams;
  }
  selectMany(params: FilterBookCommentsDto): Observable<BookCommentsResponse> {
    return this.http.get<BookCommentsResponse>(this.apiUrl, { params: this.buildQueryParams(params) });
  }
  selectById(id: string): Observable<BookComment> { return this.http.get<BookComment>(`${this.apiUrl}/${id}`); }
  create(dto: CreateBookCommentDto): Observable<BookComment> { return this.http.post<BookComment>(this.apiUrl, dto); }
  update(id: string, dto: UpdateBookCommentDto): Observable<BookComment> { return this.http.put<BookComment>(`${this.apiUrl}/${id}`, dto); }
  delete(id: string): Observable<void> { return this.http.delete<void>(`${this.apiUrl}/${id}`); }
}
