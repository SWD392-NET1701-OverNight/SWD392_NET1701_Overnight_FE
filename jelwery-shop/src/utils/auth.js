import { redirect } from 'react-router-dom';

export function getToken() {
  return localStorage.getItem('auth-token');
}

export function checkAuth() {
  if (!getToken()) {
    return redirect('/auth');
  }
  return null;
}
export function checkIsLoging() {
  return getToken() ? redirect('/') : null;
}
