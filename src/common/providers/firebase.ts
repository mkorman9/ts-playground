import { App, initializeApp } from 'firebase-admin/app';
import { Firestore, getFirestore } from 'firebase-admin/firestore';

function initializeFirebase() {
  if (process.env.NODE_ENV !== 'test') {
    const app = initializeApp();
    const db = getFirestore(app);

    return {
      app,
      db
    };
  }

  return {
    app: {} as App,
    db: {} as Firestore
  };
}

export default initializeFirebase();
