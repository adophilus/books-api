import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcademicYearsListComponent } from './academic-years-list.component';

describe('AcademicYearsListComponent', () => {
  let component: AcademicYearsListComponent;
  let fixture: ComponentFixture<AcademicYearsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcademicYearsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcademicYearsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
