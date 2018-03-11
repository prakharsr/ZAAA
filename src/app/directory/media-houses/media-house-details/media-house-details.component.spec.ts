import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaHouseDetailsComponent } from './media-house-details.component';

describe('MediaHouseDetailsComponent', () => {
  let component: MediaHouseDetailsComponent;
  let fixture: ComponentFixture<MediaHouseDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MediaHouseDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaHouseDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
