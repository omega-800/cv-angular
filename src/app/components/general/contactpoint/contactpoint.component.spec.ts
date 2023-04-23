import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactpointComponent } from './contactpoint.component';

describe('ContactpointComponent', () => {
  let component: ContactpointComponent;
  let fixture: ComponentFixture<ContactpointComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactpointComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactpointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
