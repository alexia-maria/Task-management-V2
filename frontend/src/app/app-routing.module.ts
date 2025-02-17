import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Importurile componentelor
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { PendingTasksComponent } from './components/pending-tasks/pending-tasks.component';
import { LeaderboardComponent } from './components/leaderboard/leaderboard.component';
import { RewardsComponent } from './components/rewards/rewards.component';
import { ProfileComponent } from './components/profile/profile.component';
import { BadgesComponent } from './components/badges/badges.component';
import { FamilyAdminComponent } from './components/family-admin/family-admin.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'tasks', component: TasksComponent },
  { path: 'pending-tasks', component: PendingTasksComponent },
  { path: 'leaderboard', component: LeaderboardComponent },
  { path: 'rewards', component: RewardsComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'badges', component: BadgesComponent },

  // Ruta nouă pentru Administrarea Familiilor
  // (vizibilă în side nav dacă userul este ADMIN sau PARENT)
  { path: 'family-admin', component: FamilyAdminComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
