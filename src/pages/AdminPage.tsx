import {Route, Switch} from 'react-router-dom';

import {AuthRedirect} from 'context/auth';
import AdminHomePage from 'pages/admin/AdminHomePage';
import NewPostPage from 'pages/admin/NewPostPage';

export default function AdminPage(): JSX.Element {
  return (
    <AuthRedirect>
      <Switch>
        <Route path="/admin/new">
          <NewPostPage />
        </Route>
        <Route path="/admin">
          <AdminHomePage />
        </Route>
      </Switch>
    </AuthRedirect>
  );
}
