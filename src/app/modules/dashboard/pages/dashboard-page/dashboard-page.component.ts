import { Component } from '@angular/core';
import { SessionService } from '../../../../core/services/session.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.scss'
})
export class DashboardPageComponent {

  constructor(
    private sessionService: SessionService,
  ){}

  public logout() {
    this.sessionService.clearLocalStorage();
    window.location.reload()
  }
}
