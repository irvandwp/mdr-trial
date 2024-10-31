import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SessionService } from '../../../../core/services/session.service';
import { generateRandomEmployee } from '../../../../core/helpers/employee-random.utils';
import { EMPLOYEE_STORAGE_KEY, TOKEN_STORAGE_KEY } from '../../../../shared/global.const';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  public loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private sessionService: SessionService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login(): void {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      if (username === 'admin' && password === 'admin') {
        const employees = Array.from({ length: 100 }, (_, index) => generateRandomEmployee(index));
        this.sessionService.storeSession(EMPLOYEE_STORAGE_KEY, employees)
        this.sessionService.storeSession(TOKEN_STORAGE_KEY, 'randomUDID')
        this.router.navigate(["/dashboard"]);

      } else {
        alert("Invalid credentials");
      }
    }
  }
}
