import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {
  redirectUnauthorizedTo,
  redirectLoggedInTo,
  canActivate,
} from '@angular/fire/auth-guard';
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['']);
const redirectLoggedInToHome = () => redirectLoggedInTo(['dashboard']);

const routes: Routes = [
  {
    path: 'courses',
    loadChildren: () => import('./pages/courses/courses.module').then(m => m.CoursesPageModule),
    ...canActivate(redirectUnauthorizedToLogin)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule),
    ...canActivate(redirectLoggedInToHome)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then(m => m.RegisterPageModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./pages/dasboard/dasboard.module').then(m => m.DasboardPageModule),
    ...canActivate(redirectUnauthorizedToLogin)
  },
  {
    path: 'tests',
    loadChildren: () => import('./pages/tests/tests.module').then(m => m.TestsPageModule),
    ...canActivate(redirectUnauthorizedToLogin)
  },
  {
    path: 'payment',
    loadChildren: () => import('./pages/payment/payment.module').then(m => m.PaymentPageModule),
    ...canActivate(redirectUnauthorizedToLogin)
  },
  {
    path: 'account',
    loadChildren: () => import('./pages/account/account.module').then(m => m.AccountPageModule),
    ...canActivate(redirectUnauthorizedToLogin)
  },
  {
    path: 'orders',
    loadChildren: () => import('./pages/orders/orders.module').then(m => m.OrdersPageModule),
    ...canActivate(redirectUnauthorizedToLogin)
  },
  {
    path: 'purchased-courses',
    loadChildren: () => import('./pages/purchased-courses/purchased-courses.module').then(m => m.PurchasedCoursesPageModule),
    ...canActivate(redirectUnauthorizedToLogin)
  },
  {
    path: 'purchased-tests',
    loadChildren: () => import('./pages/purchased-tests/purchased-tests.module').then(m => m.PurchasedTestsPageModule),
    ...canActivate(redirectUnauthorizedToLogin)
  },
  {
    path: 'test',
    loadChildren: () => import('./pages/test/test.module').then(m => m.TestPageModule),
    ...canActivate(redirectUnauthorizedToLogin)
  },
  {
    path: 'progress',
    loadChildren: () => import('./pages/progress/progress.module').then(m => m.ProgressPageModule),
    ...canActivate(redirectUnauthorizedToLogin)
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
  {
    path: 'summay-of-concepts',
    loadChildren: () => import('./pages/summay-of-concepts/summay-of-concepts.module').then( m => m.SummayOfConceptsPageModule)
  },
  {
    path: 'question-papers',
    loadChildren: () => import('./pages/question-papers/question-papers.module').then( m => m.QuestionPapersPageModule)
  },
  {
    path: 'schedule',
    loadChildren: () => import('./pages/schedule/schedule.module').then( m => m.SchedulePageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
