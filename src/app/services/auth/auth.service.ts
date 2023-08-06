import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { BehaviorSubject, Observable, map } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    errorMsg: BehaviorSubject<string> = new BehaviorSubject<string>('');
    constructor(private afAuth: AngularFireAuth) { }

    login(email: string, password: string) {
        return this.afAuth.signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                this.errorMsg.next('')
            })
            .catch((error) => {
                this.errorMsg.next(error.code == "auth/wrong-password" ? "Falsches Passwort" : error.code == "auth/user-not-found" ? "Es gibt keinen User mit dieser Email" : error.message)
            });
    }

    register(email: string, password: string) {
        return this.afAuth.createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                this.errorMsg.next('')
                userCredential.user?.sendEmailVerification()
            })
            .catch((error) => {
                this.errorMsg.next(error.code == "auth/email-already-in-use" ? "Es gibt schon einen User mit dieser Email" : error.message)
            });
    }

    logout() {
        return this.afAuth.signOut()
            .then(() => {
                this.errorMsg.next('')
            })
            .catch((error) => {
                this.errorMsg.next(error.message)
            });
    }

    getVerEmail() {
        return this.afAuth.currentUser.then(user => user?.sendEmailVerification())
    }

    get userEmail(): Observable<string> {
        return this.afAuth.authState.pipe(map(user => user?.email || ''));
    }

    get isLoggedIn(): Observable<boolean> {
        return this.afAuth.authState.pipe(map(user => !!user));
    }

    get isAuthenticated(): Observable<boolean> {
        return this.afAuth.authState.pipe(map(user => !!user && user.emailVerified));
    }

    get errorMessage(): BehaviorSubject<string> {
        return this.errorMsg
    }
}