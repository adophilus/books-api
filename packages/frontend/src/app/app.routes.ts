import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./features/dashboard/dashboard').then(m => m.Dashboard) },
  { path: 'authors', loadChildren: () => import('./features/authors/authors.module').then(m => m.AuthorsModule) },
  { path: 'books', loadChildren: () => import('./features/books/books.module').then(m => m.BooksModule) },
  { path: 'videos', loadChildren: () => import('./features/videos/videos.module').then(m => m.VideosModule) },
  { path: 'book-views', loadChildren: () => import('./features/book-views/book-views.module').then(m => m.BookViewsModule) },
  { path: 'video-views', loadChildren: () => import('./features/video-views/video-views.module').then(m => m.VideoViewsModule) },
  { path: 'book-comments', loadChildren: () => import('./features/book-comments/book-comments.module').then(m => m.BookCommentsModule) },
  { path: 'video-comments', loadChildren: () => import('./features/video-comments/video-comments.module').then(m => m.VideoCommentsModule) },
];
