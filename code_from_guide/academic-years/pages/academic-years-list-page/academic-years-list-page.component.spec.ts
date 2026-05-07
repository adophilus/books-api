import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcademicYearsListPageComponent } from './academic-years-list-page.component';

describe('AcademicYearsListPageComponent', () => {
  let component: AcademicYearsListPageComponent;
  let fixture: ComponentFixture<AcademicYearsListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcademicYearsListPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcademicYearsListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
