/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable max-len */
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
  DocumentData,
  getDoc,
  getDocs,
  QuerySnapshot
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { FirebaseCollections } from 'src/app/constants/fb-collections';
import { Course, Order, Test } from 'src/app/models/course.interface';
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

  getScheduleByTestId(testId: string): Observable<any[]> {
    const scheduleRef = collection(this.firestore, FirebaseCollections.SCHEDULES);
    const scheduleQueryRef = query(scheduleRef, where('test_id', '==', testId || ''));
    return collectionData(scheduleQueryRef, { idField: 'id' }) as Observable<any[]>;
  }

  getQuestionPaperByTestId(testId: string): Observable<any[]> {
    const questionPapersRef = collection(this.firestore, FirebaseCollections.QUESTION_PAPERS);
    const questionPapersQueryRef = query(questionPapersRef, where('test_id', '==', testId || ''));
    return collectionData(questionPapersQueryRef, { idField: 'id' }) as Observable<any[]>;
  }

  updateTest(test: Test) {
    const testDocRef = doc(this.firestore, `tests/${test.id}`);
    return updateDoc(testDocRef, { ...test, updated_at: serverTimestamp() });
  }

  /**
   * @description Order Data
   */
  getOrdersList(): Observable<Order[]> {
    const ordersRef = collection(this.firestore, 'orders');
    const orderQueryRef = query(ordersRef, where('student_id', '==', localStorage.getItem('uid') || ''));
    return collectionData(orderQueryRef, { idField: 'id' }) as Observable<Order[]>;
  }

  getPurchasedOrders(): Observable<Order[]> {
    const ordersRef = collection(this.firestore, 'orders');
    const orderQueryRef = query(ordersRef, where('student_id', '==', localStorage.getItem('student_id') || ''), where('status', '==', true));
    return collectionData(orderQueryRef, { idField: 'id' }) as Observable<Order[]>;
  }

  getOrders(data: any): Promise<QuerySnapshot<DocumentData>> {
    const ordersRef = collection(this.firestore, 'orders');
    const orderQueryRef = query(ordersRef, where('course_id', '==', data.course_id || ''), where('student_id', '==', data.student_id || ''));
    return getDocs(orderQueryRef);
    // return collectionData(orderQueryRef, { idField: 'id' }) as Observable<Order[]>;
  }

  addOrder(order: Order): DocumentData {
    const orderRef = collection(this.firestore, 'orders');
    return addDoc(orderRef, { ...order, created_at: serverTimestamp() });
  }

  updateOrder(order: Order | any) {
    const orderDocRef = doc(this.firestore, `orders/${order.id}`);
    return updateDoc(orderDocRef, { ...order, updated_at: serverTimestamp() });
  }

  /**
   * @description Student Data
   */
  getStudentById(id): Observable<Student> {
    // const studentDocRef = collection(this.firestore, 'students',);
    // const studentQueryRef = query(studentDocRef, where('id', '==', id || ''));
    // return collectionData(studentQueryRef, { idField: 'id' }) as Observable<Student[]>;
    const studentDocRef = doc(this.firestore, `students/${id}`);
    return docData(studentDocRef, { idField: 'id' }) as Observable<Student>;
  }

  getStudent(data: any): Observable<Student[]> {
    const ordersRef = collection(this.firestore, 'students');
    const orderQueryRef = query(ordersRef, where('email', '==', data.email || ''), where('password', '==', data.password || ''));
    return collectionData(orderQueryRef, { idField: 'id' }) as Observable<Student[]>;
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
