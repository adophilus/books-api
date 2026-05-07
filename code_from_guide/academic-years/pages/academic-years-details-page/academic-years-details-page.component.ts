import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { AcademicYearsService } from "../../academic-years.service";
import { AcademicYear } from "../../academic-years.types";
import { UrlManagerService } from "../../../core/services/url-manager.service";

@Component({
  selector: "app-academic-years-details-page",
  templateUrl: "./academic-years-details-page.component.html",
})
export class AcademicYearsDetailsPageComponent implements OnInit {
  academicYear: AcademicYear | null = null;
  isLoading = false;
  hasError = false;
  errorMessage = "";
  isActivating = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private academicYearsService: AcademicYearsService,
    private urlManager: UrlManagerService
  ) {}

  ngOnInit(): void {
    this.loadAcademicYear();
  }

  loadAcademicYear(): void {
    const code = this.route.snapshot.paramMap.get("academicYearCode");

    console.log("Code: ", this.route.snapshot.paramMap);

    if (!code) {
      this.hasError = true;
      this.errorMessage = "Code de l'année académique non trouvé";
      return;
    }

    this.isLoading = true;
    this.hasError = false;

    this.academicYearsService.selectByCode(code).subscribe({
      next: (academicYear) => {
        this.academicYear = academicYear;
        this.isLoading = false;
      },
      error: (error) => {
        console.error("Error loading academic year:", error);
        this.hasError = true;
        this.errorMessage = "Erreur lors du chargement de l'année académique";
        this.isLoading = false;
      },
    });
  }

  onActivateAcademicYear(): void {
    if (!this.academicYear) return;

    this.isActivating = true;
    this.hasError = false;

    this.academicYearsService
      .activateAcademicYear(this.academicYear.code)
      .subscribe({
        next: (updatedAcademicYear) => {
          this.academicYear = updatedAcademicYear;
          this.isActivating = false;
          // Optionally show success message
        },
        error: (error) => {
          console.error("Error activating academic year:", error);
          this.hasError = true;
          this.errorMessage =
            "Erreur lors de l'activation de l'année académique";
          this.isActivating = false;
        },
      });
  }

  onEdit(): void {
    if (this.academicYear) {
      this.router.navigate(["../update", this.academicYear.code], {
        relativeTo: this.route,
      });
    }
  }

  onBack(): void {
    this.router.navigate(["../list"], { relativeTo: this.route });
  }
}
