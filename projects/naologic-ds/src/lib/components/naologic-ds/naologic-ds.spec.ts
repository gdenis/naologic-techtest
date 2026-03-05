import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NaologicDs } from './naologic-ds';

describe('NaologicDs', () => {
  let component: NaologicDs;
  let fixture: ComponentFixture<NaologicDs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NaologicDs],
    }).compileComponents();

    fixture = TestBed.createComponent(NaologicDs);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
