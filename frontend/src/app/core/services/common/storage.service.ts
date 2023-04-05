import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  get(key: string) {
    return localStorage.getItem(key);
  }

  getUser() {
    const user = this.get('user');
    if (!user) return;
    
    return JSON.parse(user);
  }

  save(key: string, value: any) {
    localStorage.setItem(key, value);
  }

  remove(key: string) {
    localStorage.removeItem(key);
  }

  clear() {
    localStorage.clear();
  }
}
