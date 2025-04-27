import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HackernewsService } from '../../services/hackernews.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { LoaderComponent } from '../loader/loader.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';


@Component({
  standalone: true,
  imports: [CommonModule, FormsModule,NgxPaginationModule,LoaderComponent,MatCardModule
,MatToolbarModule,MatFormFieldModule,MatInputModule,MatButtonModule],
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

  constructor(private hackernewsService: HackernewsService) {}

  ngOnInit(): void {
    this.getTopStories();
  }

  getTopStories(): void {
    this.loading = true; 
  
    this.hackernewsService.getTopStories().subscribe({
      next: (data) => {
        this.stories = data.Data; 
        this.loading = false; 
        this.page = 1; 
      },
      error: (err) => {
        console.error('Error fetching stories:', err); 
        this.loading = false; 
      },
      complete: () => {
        console.log('Fetch completed'); 
      }
    });
  }
  

  searchStories(): void {
    if (this.searchQuery.trim()) {
      this.loading = true;
      this.hackernewsService.searchStories(this.searchQuery).subscribe((data) => {
        this.stories = data.Data;
        this.loading = false;
        this.page = 1;
      }, () => {
        this.stories = [];
        this.loading = false; 
      });
    } else {
      this.getTopStories();
    }
  }
}
