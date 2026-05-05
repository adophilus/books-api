import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthorService } from './core/services/author.service';
import { CurrentAuthorService } from './core/services/current-author.service';
import { Author } from './core/models/author.model';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  private authorService = inject(AuthorService);
  private currentAuthorService = inject(CurrentAuthorService);

  authors = signal<Author[]>([]);
  selectedAuthorId = this.currentAuthorService.authorId;
  selectedAuthorName = this.currentAuthorService.authorName;
  showDropdown = signal(false);

  ngOnInit() {
    this.authorService.selectMany({ limit: 100 }).subscribe({
      next: (res) => this.authors.set(res.data),
      error: (err) => console.error('Failed to load authors', err)
    });
  }

  selectAuthor(author: Author) {
    this.currentAuthorService.setAuthor(author.id, author.name);
    this.showDropdown.set(false);
  }

  toggleDropdown() {
    this.showDropdown.update(v => !v);
  }
}
