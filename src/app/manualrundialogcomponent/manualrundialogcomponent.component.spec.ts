import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManualrundialogcomponentComponent } from './manualrundialogcomponent.component';

describe('ManualrundialogcomponentComponent', () => {
  let component: ManualrundialogcomponentComponent;
  let fixture: ComponentFixture<ManualrundialogcomponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManualrundialogcomponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManualrundialogcomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
