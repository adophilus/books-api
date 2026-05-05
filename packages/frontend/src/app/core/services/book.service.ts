import { environment } from '../../../environments/environment';
import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book, CreateBook, UpdateBook, FilterBooks } from '../models/book.model';
import { PaginatedResponse } from '../models/paginated.model';

@Injectable({ providedIn: 'root' })
export class BookService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiBaseUrl}/books`;

  create(dto: CreateBook): Observable<Book> {
    return this.http.post<Book>(this.baseUrl, dto);
  }

  selectMany(filter?: FilterBooks): Observable<PaginatedResponse<Book>> {
    let params = new HttpParams();
    if (filter?.search) params = params.set('search', filter.search);
    if (filter?.authorId) params = params.set('authorId', filter.authorId);
    if (filter?.page) params = params.set('page', filter.page);
    if (filter?.limit) params = params.set('limit', filter.limit);
    return this.http.get<PaginatedResponse<Book>>(this.baseUrl, { params });
  }

  selectById(id: string): Observable<Book> {
    return this.http.get<Book>(`${this.baseUrl}/${id}`);
  }

  update(id: string, dto: UpdateBook): Observable<Book> {
    return this.http.put<Book>(`${this.baseUrl}/${id}`, dto);
  }

  remove(id: string): Observable<Book> {
    return this.http.delete<Book>(`${this.baseUrl}/${id}`);
  }
}
