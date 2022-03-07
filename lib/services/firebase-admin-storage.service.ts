import { Injectable } from '@nestjs/common';
import { Bucket } from '@google-cloud/storage';
import { getStorage, Storage } from 'firebase-admin/storage';
import { App } from 'firebase-admin/app';

@Injectable()
export class FirebaseStorageService extends Storage {
  constructor(public readonly _app: App) {
    super();
  }

  get storage() {
    if (!this.app) {
      throw new Error('Firebase instance is undefined.');
    }
    return getStorage(this.app);
  }

  bucket(name?: string): Bucket {
    return this.storage.bucket(name);
  }
}
