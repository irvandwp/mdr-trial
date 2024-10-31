import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from '../../shared/model/employee.model';
import { ToastService } from '../../../../core/services/toast.service';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrl: './user-table.component.scss'
})
export class UserTableComponent {

  @Input() public employees: Employee[] = [];

  constructor(
    private router: Router,
    private toastService: ToastService
  ){}

  editEmployee(employee: Employee) {
    this.toastService.showToast(`edit ${employee.username}`, 'warning');
  }

  deleteEmployee(employee: Employee) {
    this.toastService.showToast(`delete ${employee.username}`, 'error');
  }

  onRowClick(employee: Employee) {
    this.router.navigate(['dashboard/detail'], {queryParams: {username: employee.username}})
  }

}
