import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullFilterComponent } from './full-filter.component';

describe('FullFilterComponent', () => {
  let component: FullFilterComponent;
  let fixture: ComponentFixture<FullFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FullFilterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FullFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
