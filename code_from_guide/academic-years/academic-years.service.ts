import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "@env/environment";
import {
  AcademicYearsResponse as ModuleResponse,
  CreateAcademicYearDto as ModuleCreateDto,
  UpdateAcademicYearDto as ModuleUpdateDto,
  AcademicYearsDeleteDto as ModuleDeleteDto,
  AcademicYear as ModuleObject,
  AcademicYearsModuleRoot as ModuleRoot,
} from "./academic-years.types";
import { BaseParamsQuery } from "../../@1hand/base.type";

@Injectable({
  providedIn: "root",
})
export class AcademicYearsService {
  private apiUrl = `${environment.apiUrl}/${ModuleRoot}`;
  constructor(private http: HttpClient) {}

  private buildQueryParams(params: BaseParamsQuery): HttpParams {
    let httpParams = new HttpParams();
    for (const key in params) {
      if (
        params.hasOwnProperty(key) &&
        params[key as keyof BaseParamsQuery] !== undefined &&
        params[key as keyof BaseParamsQuery] !== null &&
        params[key as keyof BaseParamsQuery] !== ""
      ) {
        if (Array.isArray(params[key as keyof BaseParamsQuery])) {
          (params[key as keyof BaseParamsQuery] as string[]).forEach((item) => {
            httpParams = httpParams.append(key, item); // Si l'API attend plusieurs paramètres "tag"
          });
          // Si l'API attend une chaîne comma-separated:
          // httpParams = httpParams.set(key, (params[key as keyof BaseParamsQuery] as string[]).join(','));
        } else {
          httpParams = httpParams.set(
            key,
            String(params[key as keyof BaseParamsQuery])
          );
        }
      }
    }
    return httpParams;
  }

  selectMany(params: BaseParamsQuery): Observable<ModuleResponse> {
    const queryParams = this.buildQueryParams(params);
    return this.http.get<ModuleResponse>(`${this.apiUrl}`, {
      params: queryParams,
    });
  }

  selectById(itemId: string): Observable<ModuleObject> {
    return this.http.get<ModuleObject>(`${this.apiUrl}/${itemId}`);
  }

  create(item: ModuleCreateDto): Observable<ModuleObject> {
    return this.http.post<ModuleObject>(`${this.apiUrl}`, item);
  }

  update(id: string, item: ModuleUpdateDto): Observable<ModuleObject> {
    return this.http.patch<ModuleObject>(`${this.apiUrl}/${id}`, item);
  }

  delete(dto: ModuleDeleteDto): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${dto}`);
  }

  selectByCode(code: string): Observable<ModuleObject> {
    return this.http.get<ModuleObject>(`${this.apiUrl}/${code}`);
  }

  activateAcademicYear(code: string): Observable<ModuleObject> {
    return this.http.patch<ModuleObject>(`${this.apiUrl}/${code}/activate`, {});
  }

  getCurrentAcademicYear(schoolId: string): Observable<ModuleObject> {
    return this.http.get<ModuleObject>(
      `${this.apiUrl}/school/${schoolId}/current`
    );
  }
}
