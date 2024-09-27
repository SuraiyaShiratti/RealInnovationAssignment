import { Injectable } from '@angular/core';
import { openDB, IDBPDatabase } from 'idb';

@Injectable({
  providedIn: 'root',
})
export class IndexDbService {
  private db!: IDBPDatabase;

  constructor() {
    this.initDb();
  }

  private async initDb() {
    this.db = await openDB('EmployeeDB', 1, {
      upgrade(db) {
        db.createObjectStore('emp-store', { keyPath: 'name' }); // Use your unique identifier
      },
    });
  }

  private async ensureDbInitialized() {
    if (!this.db) {
      console.error('Database is not initialized');
      await this.initDb();
    }
  } 
  async saveData(data: any) {
    await this.ensureDbInitialized();
    await this.db.put('emp-store', data);
  }

  async getData(name: string) {
    await this.ensureDbInitialized();
    return await this.db.get('emp-store', name);
  }

  async getAllData() {
    await this.ensureDbInitialized();
    return await this.db.getAll('emp-store');
  }

  async deleteData(name: string) {
    await this.ensureDbInitialized();
    await this.db.delete('emp-store', name);
  }
}
