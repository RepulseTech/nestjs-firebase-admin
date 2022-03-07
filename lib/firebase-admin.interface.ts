import { ModuleMetadata } from '@nestjs/common/interfaces';
import { AppOptions } from 'firebase-admin/app';

export interface FirebaseAdminModuleOptions extends AppOptions {}

export interface FirebaseAdminModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  name?: string;
  useFactory?: (...args: any[]) => Promise<FirebaseAdminModuleOptions> | FirebaseAdminModuleOptions;
  inject?: any[];
}
