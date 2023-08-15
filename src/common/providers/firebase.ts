import { App, initializeApp } from 'firebase-admin/app';
import { Auth, getAuth } from 'firebase-admin/auth';
import { Firestore, getFirestore } from 'firebase-admin/firestore';

function initializeFirebase() {
  if (process.env.NODE_ENV !== 'test') {
    const app = initializeApp();
    const auth = getAuth(app);
    const db = getFirestore(app);

    return {
      app,
      auth,
      db
    };
  }

  return {
    app: {} as App,
    auth: {} as Auth,
    db: {} as Firestore
  };
}

export default initializeFirebase();
