import { School } from "@modules/schools/schools.types";
import { BaseModel, BaseResponseInterface } from "../../@1hand/base.type";

// === CREATE ===
export interface CreateAcademicYearDto {
  year: string;
  startDate: Date | string;
  endDate: Date | string;
  schoolId: string;
  isCurrent?: boolean;
}

export interface AcademicYear extends BaseModel {
  year: string;
  code: string;
  startDate: Date | string;
  endDate: Date | string;
  school: School;
  isCurrent?: boolean;
}

// === UPDATE ===
export interface UpdateAcademicYearDto {
  id: string;
  year?: string;
  startDate?: Date | string;
  endDate?: Date | string;
  schoolId?: string;
  isCurrent?: boolean;
}

// === FILTER ===
export interface FilterAcademicYearDto {
  schoolId?: string;
  year?: string;
  page?: number;
  limit?: number;
}

export interface AcademicYearFormData {
  year: string; // ex: "2025-2026"
  startDate: string; // format ISO: "2025-09-01"
  endDate: string; // format ISO: "2026-06-30"
  schoolId: string; // ID de l’école concernée
  isCurrent?: boolean; // facultatif, par défaut false
}

export const AcademicYearsModuleRoot = "academic-years";
export interface AcademicYearsResponse
  extends BaseResponseInterface<AcademicYear> {}
export type AcademicYearResponseType = BaseResponseInterface<AcademicYear>;
export type AcademicYearsDeleteDto = string;
