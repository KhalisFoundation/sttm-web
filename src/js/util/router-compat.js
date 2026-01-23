import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

/**
 * React Router v6 compatibility utilities
 * Provides withRouter HOC that was removed in v6
 * Provides location, navigate (as history.push), and match props
 */
export function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    const location = useLocation();
    const navigate = useNavigate();
    const params = useParams();

    // Create a history-like object for backward compatibility
    const history = {
      push: navigate,
      replace: (to) => navigate(to, { replace: true }),
      goBack: () => navigate(-1),
      goForward: () => navigate(1),
      location,
    };

    return (
      <Component
        {...props}
        location={location}
        history={history}
        match={{ params }}
      />
    );
  }

  return ComponentWithRouterProp;
}
