import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { doc, docData, Firestore, setDoc } from '@angular/fire/firestore';
import {
  getDownloadURL,
  ref,
  Storage,
  uploadBytes
} from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(
    private auth: Auth,
    private firestore: Firestore,
    private storage: Storage
  ) { }

  getUserProfile() {
    const student = this.auth.currentUser;
    console.log(student);
    const studentDocRef = doc(this.firestore, `students/${student.uid}`);
    return docData(studentDocRef, { idField: 'id' });
  }

  async pushFileToStorage(data: any) {
    const user = this.auth.currentUser;
    const path = `uploads/payments/${data.name}`;
    const storageRef = ref(this.storage, path);
    try {
      await uploadBytes(storageRef, data.file);
      const fileURL = await getDownloadURL(storageRef);
      return { file_url: fileURL };
    } catch (e) {
      return { error: e };
    }
  }

}