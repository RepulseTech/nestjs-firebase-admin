import { Global, Module, DynamicModule, Provider } from '@nestjs/common';
import { App, getApps, initializeApp } from 'firebase-admin/app';
import { FirebaseAdminModuleAsyncOptions, FirebaseAdminModuleOptions } from './firebase-admin.interface';
import { FIREBASE_ADMIN_MODULE_OPTIONS } from './firebase-admin.constant';
import { getAuth, Auth } from 'firebase-admin/auth';
import { getMessaging, Messaging } from 'firebase-admin/messaging';
import { getRemoteConfig, RemoteConfig } from 'firebase-admin/remote-config';
import { getFirestore, Firestore } from 'firebase-admin/firestore';
import { getStorage, Storage } from 'firebase-admin/storage';


const PROVIDERS = [{
  cls: Auth,
  get: getAuth
},
{
  cls: Messaging,
  get: getMessaging
},
{
  cls: RemoteConfig,
  get: getRemoteConfig
},
{
  cls: Firestore,
  get: getFirestore
},
{
  cls: Storage,
  get: getStorage
},
]

const EXPORTS = [...PROVIDERS.map(provider => provider.cls)];

@Global()
@Module({})
export class FirebaseAdminCoreModule {
  static forRoot(options: FirebaseAdminModuleOptions): DynamicModule {
    const firebaseAdminModuleOptions = {
      provide: FIREBASE_ADMIN_MODULE_OPTIONS,
      useValue: options,
    };

    const app = getApps().length === 0 ? initializeApp(options) : getApps()[0];

    const providers = this.createProviders(app);

    return {
      module: FirebaseAdminCoreModule,
      providers: [firebaseAdminModuleOptions, ...providers],
      exports: [...EXPORTS],
    };
  }

  private static createProviders(app: App): Provider<any>[] {
    return PROVIDERS.map<Provider>((ProviderService) => ({
      provide: ProviderService.cls,
      useFactory: () => ProviderService.get(app),
    }));
  }

  static forRootAsync(options: FirebaseAdminModuleAsyncOptions): DynamicModule {
    const firebaseAdminModuleOptions = {
      provide: FIREBASE_ADMIN_MODULE_OPTIONS,
      useFactory: options.useFactory,
      inject: options.inject || [],
    };

    const providers = this.createAsyncProviders();

    return {
      module: FirebaseAdminCoreModule,
      imports: options.imports,
      providers: [firebaseAdminModuleOptions, ...providers],
      exports: [...EXPORTS],
    };
  }

  private static createAsyncProviders(): Provider<any>[] {
    return PROVIDERS.map<Provider>((ProviderService) => ({
      provide: ProviderService.cls,
      useFactory: (options: FirebaseAdminModuleOptions) => {
        const app = getApps().length === 0 ? initializeApp(options) : getApps()[0];
        return ProviderService.get(app);
      },
      inject: [FIREBASE_ADMIN_MODULE_OPTIONS],
    }));
  }
}
