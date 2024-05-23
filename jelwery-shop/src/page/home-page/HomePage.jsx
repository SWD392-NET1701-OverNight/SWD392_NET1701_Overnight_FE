import React from 'react';
import { redirect } from 'react-router-dom';
import { getToken } from '../../utils/auth';

function HomePage() {
  return <div>HomePage</div>;
}
export function loader() {
  if (getToken()) return redirect('/auth');
  return null;
}
export default HomePage;
