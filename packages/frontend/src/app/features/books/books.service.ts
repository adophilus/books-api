import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { BooksResponse, CreateBookDto, UpdateBookDto, FilterBookDto, Book, BooksModuleRoot } from "./books.types";

@Injectable({ providedIn: "root" })
export class BooksService {
  private apiUrl = `${environment.apiBaseUrl}/${BooksModuleRoot}`;
  constructor(private http: HttpClient) {}
  private buildQueryParams(params: Record<string, any>): HttpParams {
    let httpParams = new HttpParams();
    Object.entries(params || {}).forEach(([key, value]) => {
      if (value === undefined || value === null || value === "") return;
      httpParams = httpParams.set(key, String(value));
    });
    return httpParams;
  }
  selectMany(params: FilterBookDto): Observable<BooksResponse> {
    return this.http.get<BooksResponse>(this.apiUrl, { params: this.buildQueryParams(params) });
  }
  selectById(id: string): Observable<Book> { return this.http.get<Book>(`${this.apiUrl}/${id}`); }
  create(dto: CreateBookDto): Observable<Book> { return this.http.post<Book>(this.apiUrl, dto); }
  update(id: string, dto: UpdateBookDto): Observable<Book> { return this.http.put<Book>(`${this.apiUrl}/${id}`, dto); }
  delete(id: string): Observable<void> { return this.http.delete<void>(`${this.apiUrl}/${id}`); }
}
