import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BookApiService {

  private API_KEY = 'AIzaSyChiEUF63VdVkRmyUYWG8kU2Lt7PdWwel4';  // Remplacez par votre clé API

  constructor(private http: HttpClient) { }

  searchBooks(query: string) {
    const url = `https://www.googleapis.com/books/v1/volumes?q=${query}&key=${this.API_KEY}`;
    return this.http.get(url);
  }
}
