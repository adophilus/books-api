import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import {
  AuthorsResponse,
  CreateAuthorDto,
  UpdateAuthorDto,
  Author,
  AuthorsModuleRoot,
  FilterAuthorDto,
} from "./authors.types";

@Injectable({ providedIn: "root" })
export class AuthorsService {
  private apiUrl = `${environment.apiBaseUrl}/${AuthorsModuleRoot}`;

  constructor(private http: HttpClient) {}

  private buildQueryParams(params: Record<string, any>): HttpParams {
    let httpParams = new HttpParams();
    Object.entries(params || {}).forEach(([key, value]) => {
      if (value === undefined || value === null || value === "") return;
      httpParams = httpParams.set(key, String(value));
    });
    return httpParams;
  }

  selectMany(params: FilterAuthorDto): Observable<AuthorsResponse> {
    return this.http.get<AuthorsResponse>(this.apiUrl, {
      params: this.buildQueryParams(params),
    });
  }

  selectById(id: string): Observable<Author> {
    return this.http.get<Author>(`${this.apiUrl}/${id}`);
  }

  create(dto: CreateAuthorDto): Observable<Author> {
    return this.http.post<Author>(this.apiUrl, dto);
  }

  update(id: string, dto: UpdateAuthorDto): Observable<Author> {
    return this.http.put<Author>(`${this.apiUrl}/${id}`, dto);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
