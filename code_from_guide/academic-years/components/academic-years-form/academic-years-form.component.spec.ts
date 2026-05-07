import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcademicYearsFormComponent } from './academic-years-form.component';

describe('AcademicYearsFormComponent', () => {
  let component: AcademicYearsFormComponent;
  let fixture: ComponentFixture<AcademicYearsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcademicYearsFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcademicYearsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
