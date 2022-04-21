import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MySecretFilesComponent } from './my-secret-files.component';

describe('MySecretFilesComponent', () => {
  let component: MySecretFilesComponent;
  let fixture: ComponentFixture<MySecretFilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MySecretFilesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MySecretFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
