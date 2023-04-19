import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialsButtonComponent } from './socials-button.component';

describe('SocialsButtonComponent', () => {
  let component: SocialsButtonComponent;
  let fixture: ComponentFixture<SocialsButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SocialsButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SocialsButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
