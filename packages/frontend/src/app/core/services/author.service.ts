import { environment } from '../../../environments/environment';
import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Author } from '../models/author.model';

export interface PaginatedResponse<T> {
  page: number;
  limit: number;
  total: number;
  data: T[];
}

export interface AuthorFilter {
  page?: number;
  limit?: number;
  search?: string;
}

@Injectable({ providedIn: 'root' })
export class AuthorService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiBaseUrl}/authors`;

  selectMany(filter: AuthorFilter = {}): Observable<PaginatedResponse<Author>> {
    let params = new HttpParams();
    if (filter.page) params = params.set('page', filter.page);
    if (filter.limit) params = params.set('limit', filter.limit);
    if (filter.search) params = params.set('search', filter.search);

    return this.http.get<PaginatedResponse<Author>>(this.baseUrl, { params });
  }

  selectById(id: string): Observable<Author> {
    return this.http.get<Author>(`${this.baseUrl}/${id}`);
  }

  create(dto: { name: string; email: string }): Observable<Author> {
    return this.http.post<Author>(this.baseUrl, dto);
  }

  update(id: string, dto: { name?: string; email?: string; bio?: string }): Observable<Author> {
    return this.http.put<Author>(`${this.baseUrl}/${id}`, dto);
  }

  remove(id: string): Observable<Author> {
    return this.http.delete<Author>(`${this.baseUrl}/${id}`);
  }
}
