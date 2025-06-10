import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewdialogComponent } from './previewdialog.component';

describe('PreviewdialogComponent', () => {
  let component: PreviewdialogComponent;
  let fixture: ComponentFixture<PreviewdialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PreviewdialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreviewdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
