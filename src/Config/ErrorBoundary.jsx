import { Component } from 'react';
import proptypes from 'prop-types';
import ErrorPage from '../Common/ErrorPage/ErrorPage.component';

export class ErrorBoundary extends Component {
  state = { hasError: false };

  componentDidCatch(error) {
    // report the error to your favorite Error Tracking tool (ex: Sentry, Bugsnag)
    console.error(error);
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    console.error("ERROR: ", error)
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <ErrorPage />;
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: proptypes.node,
}