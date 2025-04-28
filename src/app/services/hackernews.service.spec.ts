import { TestBed } from '@angular/core/testing';
import { HackernewsService } from './hackernews.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from '../../environments/environment';

describe('HackernewsService', () => {
  let service: HackernewsService;
  let httpMock: HttpTestingController;
  const baseUrl = environment.baseUrl; // Ensure correct environment value

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HackernewsService]
    });

    service = TestBed.inject(HackernewsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch top stories when no query is provided', () => {
    service.getStories().subscribe((response) => {
      expect(response).toEqual({ Data: [{ Title: 'Story 1' }] });
    });

    const req = httpMock.expectOne(`${baseUrl}/stories`);
    expect(req.request.method).toBe('GET');
    req.flush({ Data: [{ Title: 'Story 1' }] });
  });

  it('should fetch search results when query is provided', () => {
    service.getStories('Angular').subscribe((response) => {
      expect(response).toEqual({ Data: [{ Title: 'Angular News' }] });
    });

    const req = httpMock.expectOne(`${baseUrl}/stories?searchTerm=Angular`);
    expect(req.request.method).toBe('GET');
    req.flush({ Data: [{ Title: 'Angular News' }] });
  });

  it('should return an error when API call fails', () => {
    service.getStories().subscribe({
      next: () => fail('Expected error'),
      error: (err) => {
        expect(err.status).toBe(500);
        expect(err.statusText).toBe('Internal Server Error');
      }
    });

    const req = httpMock.expectOne(`${baseUrl}/stories`);
    req.flush({}, { status: 500, statusText: 'Internal Server Error' });
  });

  it('should return an empty response when API sends no data', () => {
    service.getStories().subscribe((response) => {
      expect(response.Data).toEqual([]);
    });

    const req = httpMock.expectOne(`${baseUrl}/stories`);
    req.flush({ Data: [] });
  });

  it('should prevent malformed URLs when query is empty', () => {
    service.getStories('').subscribe((response) => {
      expect(response).toEqual({ Data: [] });
    });

    const req = httpMock.expectOne(`${baseUrl}/stories`);
    expect(req.request.method).toBe('GET');
    req.flush({ Data: [] });
  });
});
