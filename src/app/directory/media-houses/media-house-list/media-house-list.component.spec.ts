import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaHouseListComponent } from './media-house-list.component';

describe('MediaHouseListComponent', () => {
  let component: MediaHouseListComponent;
  let fixture: ComponentFixture<MediaHouseListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MediaHouseListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaHouseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
