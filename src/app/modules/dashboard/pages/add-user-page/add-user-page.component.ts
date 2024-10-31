import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EMPLOYEE_STORAGE_KEY, GROUP_LIST } from '../../../../shared/global.const';
import { ThousandPipe } from '../../../../core/pipe/thousand.pipe';
import { SessionService } from '../../../../core/services/session.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-user-page',
  templateUrl: './add-user-page.component.html',
  styleUrl: './add-user-page.component.scss'
})
export class AddUserPageComponent implements OnInit{
  employeeForm: FormGroup;
  groupList = GROUP_LIST;
  filteredGroups = GROUP_LIST;
  maxDate?: Date;

  constructor(
    private fb: FormBuilder,
    private thousandPipe: ThousandPipe,
    private sessionStorage: SessionService,
    private router: Router
  ) {
    this.maxDate = new Date();
    this.employeeForm = this.fb.group({
      username: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      birthDate: ['', Validators.required],
      basicSalary: ['', [Validators.required]],
      status: ['', Validators.required],
      group: ['', Validators.required],
      description: ['']
    });
  }

  ngOnInit(): void {}

  onGroupInput(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredGroups = this.groupList.filter(group => group.toLowerCase().includes(filterValue));
  }


  formatSalary(event: any) {
    const value = event.target.value.replace(/[^0-9]/g, '');

    if (!isNaN(Number(value)) && value.trim() !== '') {
      const formattedValue = this.thousandPipe.transform(value);
      event.target.value = formattedValue;
    } else {
      event.target.value = '';
    }
  }

  submit() {
    if (this.employeeForm.valid) {
      const request = this.employeeForm.value;
      const employees = this.sessionStorage.getLocalStorage(EMPLOYEE_STORAGE_KEY);
      const newData = [request, ...employees]
      this.sessionStorage.storeSession(EMPLOYEE_STORAGE_KEY, newData);
      this.router.navigate(['/dashboard']);
    }
  }

  cancel() {
    this.employeeForm.reset();
    this.router.navigate(['/dashboard']);
  }
}
