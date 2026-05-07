import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcademicYearsDatatableComponent } from './academic-years-datatable.component';

describe('AcademicYearsDatatableComponent', () => {
  let component: AcademicYearsDatatableComponent;
  let fixture: ComponentFixture<AcademicYearsDatatableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcademicYearsDatatableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcademicYearsDatatableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
