import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./features/dashboard/dashboard').then(m => m.Dashboard) },
  { path: 'authors', loadComponent: () => import('./features/authors/author-list/author-list').then(m => m.AuthorList) },
  { path: 'authors/:id', loadComponent: () => import('./features/authors/author-detail/author-detail').then(m => m.AuthorDetail) },
  { path: 'books', loadComponent: () => import('./features/books/book-list/book-list').then(m => m.BookList) },
  { path: 'books/:id', loadComponent: () => import('./features/books/book-detail/book-detail').then(m => m.BookDetail) },
  { path: 'videos', loadComponent: () => import('./features/videos/video-list/video-list').then(m => m.VideoList) },
  { path: 'videos/:id', loadComponent: () => import('./features/videos/video-detail/video-detail').then(m => m.VideoDetail) },
];
