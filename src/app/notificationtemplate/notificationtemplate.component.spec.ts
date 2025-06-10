import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationtemplateComponent } from './notificationtemplate.component';

describe('NotificationtemplateComponent', () => {
  let component: NotificationtemplateComponent;
  let fixture: ComponentFixture<NotificationtemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotificationtemplateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotificationtemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
