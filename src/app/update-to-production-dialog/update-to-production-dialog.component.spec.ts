import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateToProductionDialogComponent } from './update-to-production-dialog.component';

describe('UpdateToProductionDialogComponent', () => {
  let component: UpdateToProductionDialogComponent;
  let fixture: ComponentFixture<UpdateToProductionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateToProductionDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateToProductionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
