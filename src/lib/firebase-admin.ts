import { initializeApp, getApps, cert, App } from 'firebase-admin/app';
import { getFirestore, Firestore } from 'firebase-admin/firestore';

let app: App;

function getApp(): App {
    if (getApps().length > 0) {
        return getApps()[0];
    }

    const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT;
    if (!serviceAccount) {
        throw new Error('FIREBASE_SERVICE_ACCOUNT environment variable is not set');
    }

    try {
        const parsedServiceAccount = JSON.parse(serviceAccount);
        app = initializeApp({
            credential: cert(parsedServiceAccount),
        });
        return app;
    } catch (error) {
        console.error('Failed to initialize Firebase Admin:', error);
        throw new Error('Invalid FIREBASE_SERVICE_ACCOUNT JSON');
    }
}

export function getDb(): Firestore {
    return getFirestore(getApp());
}
