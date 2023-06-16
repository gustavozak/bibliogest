// src/app/favorites.service.ts

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private favorites: string[] = [];

  constructor() { }

  addFavorite(barcode: string) {
    this.favorites.push(barcode);
  }

  getFavorites() {
    return this.favorites;
  }
}
