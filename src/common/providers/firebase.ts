import { App, initializeApp } from 'firebase-admin/app';
import { Auth, getAuth } from 'firebase-admin/auth';
import { Firestore, getFirestore } from 'firebase-admin/firestore';

function initializeFirebase() {
  if (process.env.NODE_ENV !== 'test') {
    const app = initializeApp();

    return {
      app,
      auth: getAuth(app),
      firestore: getFirestore(app)
    };
  }

  return {
    app: {} as App,
    auth: {} as Auth,
    firestore: {} as Firestore
  };
}

export default initializeFirebase();
