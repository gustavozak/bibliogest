import { Component } from '@angular/core';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { BookApiService } from '../services/book-api.service';
import { Subject, from } from 'rxjs';
import { debounceTime, switchMap, tap } from 'rxjs/operators';

interface BookItem {
  volumeInfo: {
    title: string;
    authors: string[];
    imageLinks?: {
      thumbnail: string;
    };
  };
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  searchTerm: string;
  books: any[] = [];
  selectedBook: any = null;
  private searchSubject: Subject<string> = new Subject();

  constructor(private bookApiService: BookApiService) {
    this.searchTerm = '';
    this.setupSearch();
    // S'abonner à searchSubject pour voir les valeurs émises
    this.searchSubject.subscribe(query => console.log('query:', query));
  }

  async scan() {
    const hasPermission = await BarcodeScanner.checkPermission({ force: true });
    if (!hasPermission) {
      return;
    }
    const result = await BarcodeScanner.startScan();
    console.log(result);
  }

  searchChanged(event: any) {
    const query = event.detail.value;
    console.log('searchChanged:', query); // Vérifier si cette méthode est appelée
    this.searchSubject.next(query);
  }

  itemClicked(book: any) {
    console.log(book); // Log the clicked book details
    this.selectedBook = book;
    this.books = [];  // Hide suggestions
  }

  private setupSearch() {
    this.searchSubject.pipe(
      debounceTime(200),
      tap(query => console.log('searching:', query)), // Vérifier si la recherche est lancée
      switchMap(query => from(this.bookApiService.searchBooks(query))), // Convertir Promise en Observable si nécessaire
      tap(response => console.log('response:', response)) // Vérifier la réponse
    ).subscribe((response: any) => {
      if ('items' in response) {
        this.books = response.items.map((item: BookItem) => ({
          cover_url: item.volumeInfo.imageLinks?.thumbnail || '',
          title: item.volumeInfo.title,
          author: item.volumeInfo.authors ? item.volumeInfo.authors.join(', ') : '',
          thumbnail: item.volumeInfo.imageLinks?.thumbnail,
          authors: item.volumeInfo.authors || []
        }));
      } else {
        console.error('Unexpected API response:', response);
        this.books = [];
      }
    }, err => {
      console.error(err);
      this.books = [];
    });
  }
}
