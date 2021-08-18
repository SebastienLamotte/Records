import { Component, Fragment } from 'react';

import Card from '../../components/UI/Card';
import Navigation from '../../components/Layout/Navigation';

export default class ErrorBoundary extends Component {
  constructor() {
    super();
    this.state = { hasError: false };
  }

  componentDidCatch() {
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      return (
        <Fragment>
          <Navigation appCrashed={true} />
          <Card>
            <h1>Something went wrong!</h1>
          </Card>
        </Fragment>
      );
    }
    return this.props.children;
  }
}
