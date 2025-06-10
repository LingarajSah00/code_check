import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadwordpdfdialogComponent } from './downloadwordpdfdialog.component';

describe('DownloadwordpdfdialogComponent', () => {
  let component: DownloadwordpdfdialogComponent;
  let fixture: ComponentFixture<DownloadwordpdfdialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DownloadwordpdfdialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DownloadwordpdfdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
