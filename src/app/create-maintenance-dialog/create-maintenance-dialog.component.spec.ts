import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMaintenanceDialogComponent } from './create-maintenance-dialog.component';

describe('CreateMaintenanceDialogComponent', () => {
  let component: CreateMaintenanceDialogComponent;
  let fixture: ComponentFixture<CreateMaintenanceDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateMaintenanceDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateMaintenanceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
