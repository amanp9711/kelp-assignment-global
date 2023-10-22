import { Injectable } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
export interface HistoryData {
  id: string,
  searchString: string,
  usersResultCount: number,
  searchResult: string
}

@Injectable({
  providedIn: 'root'
})

export class StorageService {

  private storageKey: string = 'searchHistory';

  constructor() { }

  saveSearch(query: string, usersResultCount: number) {
    const history: HistoryData[] = this.getSearchHistory();
    const uniqueId = uuidv4();
    history.push({ id: uniqueId, searchString: query, usersResultCount: usersResultCount, searchResult: usersResultCount > 0 ? 'Successful' : 'Unsuccessful' });
    localStorage.setItem(this.storageKey, JSON.stringify(history));
  }

  getSearchHistory(): HistoryData[] {
    const historyJSON = localStorage.getItem(this.storageKey);
    return historyJSON ? JSON.parse(historyJSON) : [];
  }

  deleteSearch(deleteId: string){
    let history: HistoryData[] = this.getSearchHistory();
    history = history.filter((data: HistoryData ) => data.id !== deleteId);
    localStorage.setItem(this.storageKey, JSON.stringify(history));
  }
}
