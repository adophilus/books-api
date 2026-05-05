import { environment } from '../../../environments/environment';
import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BookComment, CreateBookComment, UpdateBookComment, FilterBookComments } from '../models/book-comment.model';
import { PaginatedResponse } from '../models/paginated.model';

@Injectable({ providedIn: 'root' })
export class BookCommentService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiBaseUrl}/book-comments`;

  create(dto: CreateBookComment): Observable<BookComment> {
    return this.http.post<BookComment>(this.baseUrl, dto);
  }

  selectMany(filter?: FilterBookComments): Observable<PaginatedResponse<BookComment>> {
    let params = new HttpParams();
    if (filter?.bookId) params = params.set('bookId', filter.bookId);
    if (filter?.authorId) params = params.set('authorId', filter.authorId);
    if (filter?.page) params = params.set('page', filter.page);
    if (filter?.limit) params = params.set('limit', filter.limit);
    return this.http.get<PaginatedResponse<BookComment>>(this.baseUrl, { params });
  }

  selectById(id: string): Observable<BookComment> {
    return this.http.get<BookComment>(`${this.baseUrl}/${id}`);
  }

  update(id: string, dto: UpdateBookComment): Observable<BookComment> {
    return this.http.put<BookComment>(`${this.baseUrl}/${id}`, dto);
  }

  remove(id: string): Observable<BookComment> {
    return this.http.delete<BookComment>(`${this.baseUrl}/${id}`);
  }
}
