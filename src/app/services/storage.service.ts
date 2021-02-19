import { Injectable } from '@angular/core';

import { AppConfigService } from './app-config.service';

type SimpleType = string | number | boolean | null | undefined;
type SerializableArray = Array<SimpleType | SerializableArray | SerializableObject>;
type SerializableType = SimpleType | SerializableArray | SerializableObject;

interface SerializableObject {
  [key: string]: SimpleType | SerializableArray | SerializableObject;
}


/**
 * Service for persistent storing the data
 */
@Injectable({
  providedIn: 'root',
})
export class StorageService {
  /**
   * Prefix for all stored data.
   * This prefix will be auto added to all keys
   */
  private readonly appPrefix: string;

  constructor(
    private readonly appConfigService: AppConfigService,
  ) {
    this.appPrefix = appConfigService.storagePrefix;
  }


  /**
   * Read the value from storage by the key
   * @param key key without any prefixes
   */
  public get<T extends SerializableType>(key: string): T | undefined {
    return this.getItem(this.generateKey(key));
  }

  /**
   * Write the value to storage for specific key.
   * @param key key without any prefixes
   * @param value json-serializable value
   */
  public set<T extends SerializableType>(key: string, value: T): void {
    return this.setItem(this.generateKey(key), value);
  }

  /**
   * Remove storage pair by the key
   * @param key key without any prefixes
   */
  public delete(key: string): void {
    return this.removeItem(this.generateKey(key));
  }

  /**
   * Read value from storage
   * @param key key with prefix
   */
  private getItem<T extends SerializableType>(key: string): T | undefined {
    const json = localStorage.getItem(key);
    if (json) {
      try {
        return JSON.parse(json);
      } catch {
      }
    }
    return undefined;
  }

  /**
   * Read value from storage
   * @param key key with prefix
   * @param value json-serializable value
   */
  private setItem<T extends SerializableType>(key: string, value: T): void {
    const json = JSON.stringify(value);
    localStorage.setItem(key, json);
  }

  /**
   * Remove all data from the storage
   * @param key key with prefix
   */
  private removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  private generateKey(key: string): string {
    return `${this.appPrefix}_${key}`;
  }
}
