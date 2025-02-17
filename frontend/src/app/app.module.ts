import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

/* Angular Material modules */
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';

import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { PendingTasksComponent } from './components/pending-tasks/pending-tasks.component';
import { CreateTaskComponent } from './components/create-task/create-task.component';
import { LeaderboardComponent } from './components/leaderboard/leaderboard.component';
import { RewardsComponent } from './components/rewards/rewards.component';
import { ProfileComponent } from './components/profile/profile.component';
import { BadgesComponent } from './components/badges/badges.component';
import { FamilyAdminComponent } from './components/family-admin/family-admin.component';

import { AuthService } from './services/auth.service';
import { TaskService } from './services/task.service';
import { RewardsService } from './services/rewards.service';
import { BadgeService } from './services/badge.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    TasksComponent,
    PendingTasksComponent,
    CreateTaskComponent,
    LeaderboardComponent,
    RewardsComponent,
    ProfileComponent,
    BadgesComponent,
    FamilyAdminComponent  // ← Adăugăm FamilyAdminComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,

    // Angular Material
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatIconModule,
    MatSelectModule,
    MatOptionModule,
    MatSidenavModule,
    MatListModule
  ],
  providers: [
    AuthService,
    TaskService,
    RewardsService,
    BadgeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
