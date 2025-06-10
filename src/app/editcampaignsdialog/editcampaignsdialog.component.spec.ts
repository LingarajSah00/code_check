import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditcampaignsdialogComponent } from './editcampaignsdialog.component';

describe('EditcampaignsdialogComponent', () => {
  let component: EditcampaignsdialogComponent;
  let fixture: ComponentFixture<EditcampaignsdialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditcampaignsdialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditcampaignsdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
