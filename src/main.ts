import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { StoryListComponent } from './app/components/story-list/story-list.component';

bootstrapApplication(StoryListComponent, {
  providers: [provideHttpClient()]
})
  .catch(err => console.error(err));
