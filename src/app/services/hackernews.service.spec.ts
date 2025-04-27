import { TestBed } from '@angular/core/testing';
import { HackernewsService } from './hackernews.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('HackernewsService', () => {
  let service: HackernewsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], 
      providers: [HackernewsService], 
    });

    service = TestBed.inject(HackernewsService); 
    httpMock = TestBed.inject(HttpTestingController); 
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy(); 
  });

  it('should fetch top stories', () => {
    const mockResponse = {
      Data: [
        { Title: 'Story 1', Url: 'http://example.com/story1' },
        { Title: 'Story 2', Url: 'http://example.com/story2' },
      ],
    };

    service.getTopStories().subscribe((data) => {
      expect(data.Data.length).toBe(2); 
      expect(data.Data[0].Title).toBe('Story 1'); 
      expect(data.Data[1].Title).toBe('Story 2');
    });

    const req = httpMock.expectOne('http://localhost:5254/api/news/stories'); 
    expect(req.request.method).toBe('GET'); 
    req.flush(mockResponse); 
  });

  it('should fetch search results', () => {
    const searchQuery = 'Angular';
    const mockResponse = {
      Data: [
        { Title: 'Search Result 1', Url: 'http://example.com/search1' },
        { Title: 'Search Result 2', Url: 'http://example.com/search2' },
      ],
    };

    service.searchStories(searchQuery).subscribe((data) => {
      expect(data.Data.length).toBe(2); 
      expect(data.Data[0].Title).toBe('Search Result 1'); 
    });

    const req = httpMock.expectOne(
      `http://localhost:5254/api/news/stories?searchTerm=${searchQuery}` 
    );
    expect(req.request.method).toBe('GET'); 
    req.flush(mockResponse); 
  });
});
