import { Component, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  private http = inject(HttpClient);
  protected readonly status = signal('checking…');

  constructor() {
    this.http
      .get<{ ok: boolean; service: string }>('http://localhost:3000/health')
      .subscribe({
        next: (r) => this.status.set(`connected to ${r.service}`),
        error: (e) => this.status.set(`failed — ${e.message}`),
      });
  }
}