import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  doc,
  docData,
  addDoc,
  deleteDoc,
  updateDoc,
  serverTimestamp,
  query,
  where,
  DocumentData
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Course, Test } from 'src/app/models/course.interface';
import { Student } from 'src/app/models/student.interface';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private firestore: Firestore
  ) { }

  /**
   * @description Course Data
   */
  getCourses(): Observable<Course[]> {
    const coursesRef = collection(this.firestore, 'courses');
    return collectionData(coursesRef, { idField: 'id' }) as Observable<Course[]>;
  }

  getCourseById(id): Observable<Course> {
    const courseDocRef = doc(this.firestore, `courses/${id}`);
    return docData(courseDocRef, { idField: 'id' }) as Observable<Course>;
  }

  /**
   * @description Test Data
   */
  getTests(courseId: string): Observable<Test[]> {
    const testsRef = collection(this.firestore, 'tests',);
    const testQueryRef = query(testsRef, where('course_id', '==', courseId || ''));
    return collectionData(testQueryRef, { idField: 'id' }) as Observable<Test[]>;
  }

  getTestById(id): Observable<Test> {
    const testDocRef = doc(this.firestore, `tests/${id}`);
    return docData(testDocRef, { idField: 'id' }) as Observable<Test>;
  }

  /**
   * @description Student Data
   */
  getStudentById(id): Observable<Student[]> {
    const studentDocRef = collection(this.firestore, 'students',);
    const studentQueryRef = query(studentDocRef, where('uid', '==', id || ''));
    return collectionData(studentQueryRef, { idField: 'id' }) as Observable<Student[]>;
  }

  addStudent(student: Student): DocumentData {
    const studentRef = collection(this.firestore, 'students');
    return addDoc(studentRef, { ...student, created_at: serverTimestamp() });
  }

  deleteStudent(student: Student) {
    const studentDocRef = doc(this.firestore, `students/${student.id}`);
    return deleteDoc(studentDocRef);
  }

  updateStudent(student: Student) {
    const studentDocRef = doc(this.firestore, `students/${student.id}`);
    return updateDoc(studentDocRef, { ...student, updated_at: serverTimestamp() });
  }
}