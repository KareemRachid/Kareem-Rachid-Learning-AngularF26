import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SavedPlayers } from './saved-players';

describe('SavedPlayers', () => {
  let component: SavedPlayers;
  let fixture: ComponentFixture<SavedPlayers>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SavedPlayers],
    }).compileComponents();

    fixture = TestBed.createComponent(SavedPlayers);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
