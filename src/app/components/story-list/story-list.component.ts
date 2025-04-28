import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HackernewsService } from '../../services/hackernews.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { LoaderComponent } from '../loader/loader.component';
import { AlertComponent } from '../alert/alert.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Observable } from 'rxjs/internal/Observable';


@Component({
  standalone: true,
  imports: [CommonModule, FormsModule,NgxPaginationModule,LoaderComponent,MatCardModule
,MatToolbarModule,MatFormFieldModule,MatInputModule,MatButtonModule,AlertComponent],
  selector: 'app-story-list',
  templateUrl: './story-list.component.html',
  styleUrls: ['./story-list.component.css']
})
export class StoryListComponent implements OnInit {
  stories: any[] = [];
  searchQuery: string = '';
  loading: boolean = true;
  page: number = 1; 
  itemsPerPage: number = 10; 
  success:boolean = false;
  message:string = '';

  constructor(private hackernewsService: HackernewsService) {}

  ngOnInit(): void {
    this.getTopStories();
  }

  getStories(apiCall: Observable<any>, successMessage: string, fallback?: boolean): void {
    this.loading = true;
  
    apiCall.subscribe({
      next: (data:any) => {
        this.stories = data.Data;
        this.loading = false;
        this.page = 1;
        this.success = true;
        this.message = successMessage;
      },
      error: (err:any) => {
        console.error('Error fetching stories:', err);
        this.loading = false;
        this.success = false;
        this.message = fallback ? 'Failed to fetch top stories.' : 'No data found for searched term.';
        this.stories = [];
      },
      complete: () => {
        console.log('Fetch completed');
      }
    });
  }
  
  getTopStories(): void {
    this.getStories(this.hackernewsService.getTopStories(), 'Top stories fetched successfully!', true);
  }
  
  searchStories(): void {
    if (this.searchQuery.trim()) {
      this.getStories(this.hackernewsService.searchStories(this.searchQuery), 'Search completed successfully!');
    } else {
      this.getTopStories();
    }
  }
}
