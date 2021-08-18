import { Fragment } from 'react';

import Navigation from './Navigation';

export default function Layout({ children }) {
  return (
    <Fragment>
      <Navigation />
      <main>{children}</main>
    </Fragment>
  );
}
