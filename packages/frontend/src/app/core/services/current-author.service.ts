import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CurrentAuthorService {
  private storageKey = 'currentAuthorId';
  private _authorId = signal<string | null>(null);
  private _authorName = signal<string | null>(null);

  constructor() {
    const stored = localStorage.getItem(this.storageKey);
    if (stored) {
      this._authorId.set(stored);
    }
  }

  readonly authorId = this._authorId.asReadonly();
  readonly authorName = this._authorName.asReadonly();

  setAuthor(id: string, name: string) {
    this._authorId.set(id);
    this._authorName.set(name);
    localStorage.setItem(this.storageKey, id);
  }

  clearAuthor() {
    this._authorId.set(null);
    this._authorName.set(null);
    localStorage.removeItem(this.storageKey);
  }
}
