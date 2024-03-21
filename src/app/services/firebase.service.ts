import { Injectable, inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, updateProfile, sendPasswordResetEmail} from 'firebase/auth'
import { User } from '../models/user.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { getFirestore, setDoc, doc, getDoc } from "@angular/fire/firestore";


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  auth = inject(AngularFireAuth);
  firestore = inject (AngularFirestore);


  //===Autenticacion===//

signIn(user: User){
  return signInWithEmailAndPassword(getAuth(), user.email, user.password)
}

 //========acceder=======//

 signUp(user: User){
  return createUserWithEmailAndPassword(getAuth(), user.email, user.password)
}


 //========actualizar usuario=============//

 updateUser(displayName: string){
  return updateProfile(getAuth().currentUser, {displayName})
 }

 //=====enviar email para recuperacion====//

 sendRecoveryEmail(email: string){
  return sendPasswordResetEmail(getAuth(), email)
 }

 //============Base de datos!!!===========////

//==setear dorcumento===//
 setDocument(path: string, data: any){
  return setDoc(doc(getFirestore(), path), data)
 }

//========obtener datos de usuario (doc)======////
 async getDocument(path: string) {
  return (await getDoc(doc(getFirestore(), path))).data();

 }

}
