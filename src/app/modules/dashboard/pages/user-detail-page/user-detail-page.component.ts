import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Employee } from '../../shared/model/employee.model';
import moment from 'moment';
import { SessionService } from '../../../../core/services/session.service';
import { EMPLOYEE_STORAGE_KEY } from '../../../../shared/global.const';

@Component({
  selector: 'app-user-detail-page',
  templateUrl: './user-detail-page.component.html',
  styleUrl: './user-detail-page.component.scss'
})
export class UserDetailPageComponent implements OnInit{

  public employee?: Employee | null;
  constructor (
    private route: ActivatedRoute,
    private sessionService: SessionService
  ){}

  employeeDetails = [
    { key: 'username', label: 'Username' },
    { key: 'firstName', label: 'First Name' },
    { key: 'lastName', label: 'Last Name' },
    { key: 'email', label: 'Email' },
    { key: 'description', label: 'Description' },
    { key: 'group', label: 'Group' },
    { key: 'status', label: 'Status' },
    { key: 'birthDate', label: 'Birth Date' },
    { key: 'basicSalary', label: 'Basic Salary' }
  ];

  ngOnInit(): void {
    const username = this.route.snapshot.queryParams['username'];
    const employeeData = this.sessionService.getLocalStorage(EMPLOYEE_STORAGE_KEY);

    if (employeeData) {
      const employees: Employee[] = typeof employeeData === 'string'
        ? JSON.parse(employeeData).map((emp: any) => ({
            ...emp,
            birthDate: new Date(emp.birthDate)
          }))
        : employeeData.map((emp: any) => ({
            ...emp,
            birthDate: new Date(emp.birthDate)
          }));

      this.employee = employees.find(emp => emp.username === username) || null;
    }
  }

  formatDate(date: Date): string {
    return moment(date).format('DD-MMM-YYYY');
  }

  formatCurrency(amount: number): string {
    return `Rp ${amount.toLocaleString('id-ID')}`;
  }

  formatValue(key: string): string | number | Date{
    if (!this.employee) return '';

    const value = this.employee[key as keyof Employee];

    switch (key) {
      case 'birthDate':
        return this.formatDate(value as Date);
      case 'basicSalary':
        return this.formatCurrency(value as number);
      default:
        return value;
    }
  }

  confirmButtonOnClick(): void {
    window.history.back();
  }

}
