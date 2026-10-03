import { HttpInterceptorFn } from '@angular/common/http';

/** Adds the JWT to every outgoing request once the user is signed in. */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const user = JSON.parse(sessionStorage.getItem('user') || 'null');
  return user?.token ? next(req.clone({ setHeaders: { Authorization: `Bearer ${user.token}` } })) : next(req);
};
