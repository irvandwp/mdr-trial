import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SessionService } from '../services/session.service';


export const AuthGuard: CanActivateFn = (route, state) => {
  const sessionService = inject(SessionService);
  const router = inject(Router);

  const token = sessionService.getTokenSession();

  if (!token) {
    router.navigate(['/auth']);
    return false;
  } else {
    return true;
  }
};
