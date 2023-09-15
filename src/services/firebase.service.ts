import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { ServiceAccount } from 'firebase-admin';
import { Bucket } from '@google-cloud/storage';

@Injectable()
export class FirebaseService {
  private bucket: Bucket;

  constructor() {
    const serviceAccount: ServiceAccount = {
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    };

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      storageBucket: 'trustport-auth.appspot.com',
    });

    this.bucket = admin.storage().bucket();
  }

  async uploadImage(filename: string, imageBuffer: Buffer): Promise<string> {
    const filePath = `organizations/${filename}`;
    const file = this.bucket.file(filePath);
    const stream = file.createWriteStream({
      metadata: {
        contentType: 'image/png',
      },
    });

    return new Promise((resolve, reject) => {
      stream.on('error', (err) => {
        reject(err);
      });

      stream.on('finish', async () => {
        try {
          const signedUrls = await file.getSignedUrl({
            action: 'read',
            expires: '01-01-2200',
          });
          const publicUrl = signedUrls[0];
          resolve(publicUrl);
        } catch (error) {
          reject(error);
        }
      });

      stream.end(imageBuffer);
    });
  }

  async deleteImageFromPublicUrl(publicUrl: string): Promise<void> {
    // Extraer el nombre del archivo de la URL pública
    const pathRegex = /\/trustport-auth\.appspot\.com\/(.*?)\?GoogleAccessId=/;
    const match = pathRegex.exec(publicUrl);

    if (!match || match.length < 2) {
      throw new Error('URL no válida.');
    }

    const filePath = decodeURIComponent(match[1]);

    // Eliminar el archivo usando Firebase Admin SDK
    const file = this.bucket.file(filePath);
    await file.delete();
  }
}
