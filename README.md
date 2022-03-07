## Description

Firebase Admin v10 Module for [Nest.js Framework](https://nestjs.com/)

## Installation

```bash
$ yarn add @repulsetech/nestjs-firebase-admin
```
```bash
$ npi i @repulsetech/nestjs-firebase-admin -S
```

### Import module

```typescript
import { Module } from '@nestjs/common';
import { FirebaseAdminModule } from '@repulsetech/nestjs-firebase-admin'
import * as admin from 'firebase-admin'

@Module({
  imports: [
    FirebaseAdminModule.forRootAsync({
      useFactory: () => ({
        credential: admin.credential.applicationDefault()
      })
    }),
  ],
})
export class AppModule {}
```

## Example

### Inject Authentication Service

```typescript
import { Injectable } from '@nestjs/common';
import { Auth } from 'firebase-admin/auth';

@Injectable()
export class AppService {
  constructor(private firebaseAuth: Auth) {}

  getUsers() {
    return this.firebaseAuth.listUsers()
  }
}
```

## Compatibility Table

| firebase-admin    | NestJS Library |
| ----------------- |----------------|
| `10.xx`            | `master`       |

## License

MIT © [Repulse Technologies Pvt. Ltd.](https://github.com/RepulseTech/nestjs-firebase-admin)
