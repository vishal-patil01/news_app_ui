import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StoryListComponent } from './story-list.component';
import { LoaderComponent } from '../loader/loader.component';
import { HackernewsService } from '../../services/hackernews.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('StoryListComponent', () => {
  let component: StoryListComponent;
  let fixture: ComponentFixture<StoryListComponent>;
  let mockHackernewsService: Partial<HackernewsService>;

  beforeEach(async () => {
    // Mock HackernewsService
    mockHackernewsService = {
      getTopStories: jasmine.createSpy('getTopStories').and.returnValue({
        subscribe: (callbacks: any) => {
          callbacks.next({ Data: [{ Title: 'Story 1', Url: 'http://example.com/story1' }] });
          callbacks.complete();
        },
      }),
      searchStories: jasmine.createSpy('searchStories').and.returnValue({
        subscribe: (callbacks: any) => {
          callbacks.next({ Data: [{ Title: 'Search Result 1', Url: 'http://example.com/search1' }] });
        },
      }),
    };

    await TestBed.configureTestingModule({
      imports: [StoryListComponent, LoaderComponent, FormsModule, HttpClientTestingModule],
      providers: [
        { provide: HackernewsService, useValue: mockHackernewsService }, // Inject mocked service
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render loader when loading is true', () => {
    component.loading = true;
    fixture.detectChanges();
    const loaderElement = fixture.debugElement.query(By.css('app-loader'));
    expect(loaderElement).toBeTruthy();
  });

  it('should render stories in cards', () => {
    component.stories = [
      { Title: 'Story 1', Url: 'http://example.com/story1' },
      { Title: 'Story 2', Url: 'http://example.com/story2' },
    ];
    fixture.detectChanges();
    const storyCards = fixture.debugElement.queryAll(By.css('.story-card'));
    expect(storyCards.length).toBe(2);
    expect(storyCards[0].nativeElement.textContent).toContain('Story 1');
    expect(storyCards[1].nativeElement.textContent).toContain('Story 2');
  });

  it('should call HackernewsService to fetch top stories on init', () => {
    expect(mockHackernewsService.getTopStories).toHaveBeenCalled();
  });

  it('should call searchStories method when search button is clicked', () => {
    component.searchQuery = 'Angular';
    fixture.detectChanges();
    spyOn(component, 'searchStories');
    const searchButton = fixture.debugElement.query(By.css('button')).nativeElement;
    searchButton.click();
    expect(component.searchStories).toHaveBeenCalled();
  });
});
