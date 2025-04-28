import { TestBed } from '@angular/core/testing';
import { StoryListComponent } from './story-list.component';
import { HackernewsService } from '../../services/hackernews.service';
import { of, throwError } from 'rxjs';

describe('StoryListComponent', () => {
  let component: StoryListComponent;
  let hackernewsService: jasmine.SpyObj<HackernewsService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('HackernewsService', ['getStories']);

    TestBed.configureTestingModule({
      providers: [
        StoryListComponent,
        { provide: HackernewsService, useValue: spy },
      ],
    });

    component = TestBed.inject(StoryListComponent);
    hackernewsService = TestBed.inject(HackernewsService) as jasmine.SpyObj<HackernewsService>;
  });

  it('should fetch top stories when no search query is provided', () => {
    hackernewsService.getStories.and.returnValue(of({ Data: [{ Title: 'Top Story 1', Url: 'https://example.com' }] }));

    component.searchQuery = '';
    component.searchStories();

    expect(hackernewsService.getStories).toHaveBeenCalledWith('');
    expect(component.stories.length).toBe(1);
    expect(component.success).toBeTrue();
    expect(component.message).toBe('Top stories fetched successfully!');
  });

  it('should fetch searched stories when query is given', () => {
    hackernewsService.getStories.and.returnValue(of({ Data: [{ Title: 'Angular News', Url: 'https://angular.io' }] }));

    component.searchQuery = 'Angular';
    component.searchStories();

    expect(hackernewsService.getStories).toHaveBeenCalledWith('Angular');
    expect(component.stories.length).toBe(1);
    expect(component.success).toBeTrue();
    expect(component.message).toBe('Search completed successfully!');
  });

  it('should show "No data found" when search yields empty results', () => {
    hackernewsService.getStories.and.returnValue(of({ Data: [] }));

    component.searchQuery = 'randomterm';
    component.searchStories();

    expect(component.success).toBeFalse();
    expect(component.message).toBe('No data found for searched term.');
    expect(component.stories.length).toBe(0);
  });

  it('should return an error when API call fails', () => {
    hackernewsService.getStories.and.returnValue(throwError(() => new Error('Server error')));

    component.searchStories();

    expect(component.success).toBeFalse();
    expect(component.message).toBe('Failed to fetch top stories.');
    expect(component.stories.length).toBe(0);
  });

  it('should reset stories array when API call fails', () => {
    hackernewsService.getStories.and.returnValue(throwError(() => new Error('Network failure')));

    component.searchStories();

    expect(component.stories).toEqual([]);
  });

  it('should log an error when API fails', () => {
    spyOn(console, 'error');
    hackernewsService.getStories.and.returnValue(throwError(() => new Error('API error')));

    component.searchStories();

    expect(console.error).toHaveBeenCalledWith('Error fetching stories:', jasmine.any(Error));
  });
});
