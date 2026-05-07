import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcademicYearsCreatePageComponent } from './academic-years-create-page.component';

describe('AcademicYearsCreatePageComponent', () => {
  let component: AcademicYearsCreatePageComponent;
  let fixture: ComponentFixture<AcademicYearsCreatePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcademicYearsCreatePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcademicYearsCreatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
