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
    this.searchStories();
  }

  // Function to fetch stories based on the search query or default to top stories
  searchStories(): void {
    this.loading = true; // Set loading to true when starting the fetch
    var query=this.searchQuery.trim();
     // Trim whitespace from the search query
    this.hackernewsService.getStories(query).subscribe({
      next: (data: any) => {
        this.loading = false;
        if (!data.Data || data.Data.length === 0) {
          this.success = false;
          this.message = 'No data found for searched term.';
          this.stories = [];
          return; // Prevents further execution
        }
    
        this.stories = data.Data;
        this.success = true;
        this.message = query ? 'Search completed successfully!' : 'Top stories fetched successfully!';
      },
      error: (err: any) => {
        console.error('Error fetching stories:', err);
        this.loading = false;
        this.success = false;
        this.message = query ? 'No data found for searched term.' : 'Failed to fetch top stories.';
        this.stories = [];
      },
        complete: () => {
          console.log('Fetch completed');
        }
      });
  }
}
