import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BookView, CreateBookView, FilterBookViews } from '../models/book-view.model';
import { PaginatedResponse } from '../models/paginated.model';

@Injectable({ providedIn: 'root' })
export class BookViewService {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:3000/book-views';

  create(dto: CreateBookView): Observable<BookView> {
    return this.http.post<BookView>(this.baseUrl, dto);
  }

  selectMany(filter?: FilterBookViews): Observable<PaginatedResponse<BookView>> {
    let params = new HttpParams();
    if (filter?.bookId) params = params.set('bookId', filter.bookId);
    if (filter?.authorId) params = params.set('authorId', filter.authorId);
    if (filter?.page) params = params.set('page', filter.page);
    if (filter?.limit) params = params.set('limit', filter.limit);
    return this.http.get<PaginatedResponse<BookView>>(this.baseUrl, { params });
  }

  selectById(id: string): Observable<BookView> {
    return this.http.get<BookView>(`${this.baseUrl}/${id}`);
  }

  remove(id: string): Observable<BookView> {
    return this.http.delete<BookView>(`${this.baseUrl}/${id}`);
  }
}
