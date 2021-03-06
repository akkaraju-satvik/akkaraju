import { Injectable } from '@angular/core';
import { Auth, GoogleAuthProvider, signInWithPopup, UserCredential } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { addDoc, collection, Firestore, getDocs, query, where } from '@angular/fire/firestore'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authData: any = {
    user: { role: 'user' },
    isLoggedIn: false
  }

  constructor(private authFire: Auth, private firestore: Firestore, public router: Router) { }

  loginWithGoogle() {
    signInWithPopup(this.authFire, new GoogleAuthProvider()).then(
      async (userCredential: UserCredential) => {
        const user = userCredential.user;
        console.log(user);
        // Check if user in Users collection
        const users = await getDocs(query(collection(this.firestore, 'Users'), where('email', '==', user.email)));
        if(users.empty) {
          let newUser = {
            firstName: user.displayName,
            email: user.email,
            photoUrl: user.photoURL,
            uid: user.uid,
            access: 'denied',
            role: 'user'
          };
          await addDoc(collection(this.firestore, 'Users'), newUser).then(
            async (docRef) => {
              const usersCollection = collection(this.firestore, 'Users');
              const queryForUser = query(usersCollection, where('email', '==', user.email));
              const queryResponse = await getDocs(queryForUser);
              queryResponse.forEach((doc) => {
                this.authData.user = {id: doc.id, ...doc.data()};
                this.authData.isLoggedIn = true;
                localStorage.setItem('authData', JSON.stringify(this.authData));
              })
            }
          );
          this.router.navigate(['/home']);
        } else {
          const usersCollection = collection(this.firestore, 'Users');
          const queryForUser = query(usersCollection, where('email', '==', user.email));
          const queryResponse = await getDocs(queryForUser);
          queryResponse.forEach((doc) => {
            this.authData.user = {id: doc.id, ...doc.data()};
            this.authData.isLoggedIn = true;
            localStorage.setItem('authData', JSON.stringify(this.authData));
          })
          this.authData.user.role === 'admin' ? this.router.navigate(['/admin']) : this.router.navigate(['/home']);
        }
      }
    ).catch((error) => {
      console.log(error);
      // this.router.navigate(['/error'], {queryParams: {error: error.code}});
    });
  }

  logout() {
    this.authFire.signOut().then(() => {
      this.authData.isLoggedIn = false;
      this.authData.user = { role: 'user' };
      localStorage.removeItem('authData');
      this.router.navigate(['/']);
    })
  }
}
