import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./features/dashboard/dashboard').then(m => m.Dashboard) },
  {
    path: 'authors',
    children: [
      { path: '', loadComponent: () => import('./features/authors/pages/authors-list-page/authors-list-page.component').then(m => m.AuthorsListPageComponent) },
      { path: 'create', loadComponent: () => import('./features/authors/pages/authors-create-page/authors-create-page.component').then(m => m.AuthorsCreatePageComponent) },
      { path: ':id/update', loadComponent: () => import('./features/authors/pages/authors-update-page/authors-update-page.component').then(m => m.AuthorsUpdatePageComponent) },
      { path: ':id', loadComponent: () => import('./features/authors/pages/authors-details-page/authors-details-page.component').then(m => m.AuthorsDetailsPageComponent) },
    ]
  },
  { path: 'books', loadComponent: () => import('./features/books/book-list/book-list').then(m => m.BookList) },
  { path: 'books/:id', loadComponent: () => import('./features/books/book-detail/book-detail').then(m => m.BookDetail) },
  { path: 'videos', loadComponent: () => import('./features/videos/video-list/video-list').then(m => m.VideoList) },
  { path: 'videos/:id', loadComponent: () => import('./features/videos/video-detail/video-detail').then(m => m.VideoDetail) },
];
