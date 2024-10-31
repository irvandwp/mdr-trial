import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../../shared/model/employee.model';
import { generateRandomEmployee } from '../../../../core/helpers/employee-random.utils';
import { SessionService } from '../../../../core/services/session.service';
import { DEFAULT_PAGE_SIZE, EMPLOYEE_STORAGE_KEY } from '../../../../shared/global.const';

@Component({
  selector: 'app-user-list-page',
  templateUrl: './user-list-page.component.html',
  styleUrls: ['./user-list-page.component.scss']
})
export class UserListPageComponent implements OnInit {
  employees: Employee[] = [];
  filteredEmployees: Employee[] = [];
  pageSize: number = DEFAULT_PAGE_SIZE;
  currentPage: number = 1;
  totalEmployees: number = 0;
  usernameFilter: string = '';
  firstNameFilter: string = '';
  sortField: keyof Employee = 'username';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sessionStorage: SessionService
  ) {}

  ngOnInit(): void {
    this.employees = this.sessionStorage.getLocalStorage(EMPLOYEE_STORAGE_KEY);
    this.filteredEmployees = this.employees;
    this.totalEmployees = this.employees.length;
    this.paramsChecking();
  }

  paramsChecking() {
    this.route.queryParams.subscribe(params => {
      this.usernameFilter = params['username'] || '';
      this.firstNameFilter = params['firstName'] || '';
      this.sortField = params['sortField'] as keyof Employee || 'username';
      this.currentPage = +params['page'] || 1;
      this.pageSize = +params['size'] || 10;

      this.applyFilters();
    });
  }

  onFilterChange(filter: { username: string; firstName: string; sortField: string }) {
    this.usernameFilter = filter.username;
    this.firstNameFilter = filter.firstName;
    this.sortField = filter.sortField as keyof Employee;
    this.currentPage = 1;
    this.updateQueryParams();
    this.applyFilters();
  }

  onPageChange(pagination: {page: number, size: number}) {
    this.currentPage = pagination.page;
    this.pageSize = pagination.size;
    this.updateQueryParams();
    this.applyFilters();
  }

  applyFilters() {
    this.filteredEmployees = this.employees.filter(employee => {
      return (
        employee.username.toLowerCase().includes(this.usernameFilter.toLowerCase()) &&
        employee.firstName.toLowerCase().includes(this.firstNameFilter.toLowerCase())
      );
    });

    if (this.sortField) {
      this.filteredEmployees.sort((a, b) => {
        if (a[this.sortField] < b[this.sortField]) return -1;
        if (a[this.sortField] > b[this.sortField]) return 1;
        return 0;
      });
    }

    this.totalEmployees = this.filteredEmployees.length;
  }


  updateQueryParams() {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        username: this.usernameFilter,
        firstName: this.firstNameFilter,
        sortField: this.sortField,
        page: this.currentPage,
        size: this.pageSize
      },
      queryParamsHandling: 'merge'
    });
  }

  changePageSize(size: number) {
    this.pageSize = size;
    this.currentPage = 1;
    this.updateQueryParams();
    this.applyFilters();
  }

  navigateToAddUser() {
    this.router.navigate(['/dashboard/add-user'])
  }

  get paginatedEmployees() {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredEmployees.slice(start, start + this.pageSize);
  }
}
