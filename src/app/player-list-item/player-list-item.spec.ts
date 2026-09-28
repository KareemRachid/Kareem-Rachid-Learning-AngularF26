import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlayerListItem } from './player-list-item';

describe('PlayerListItem', () => {
  let component: PlayerListItem;
  let fixture: ComponentFixture<PlayerListItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayerListItem],
    }).compileComponents();

    fixture = TestBed.createComponent(PlayerListItem);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
