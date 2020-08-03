import React, { Suspense } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { prerenderedLazy } from '@utils/prerenderedLazy';

const Landing = prerenderedLazy(() => import('@pages/Landing'));
const TeacherList = prerenderedLazy(() => import('@pages/TeacherList'));
const TeacherForm = prerenderedLazy(() => import('@pages/TeacherForm'));
const GenericNotFound = prerenderedLazy(() => import('@pages/GenericNotFound'));

const Routes: React.FC = () => {
  return (
    <Suspense fallback={<p>Carregando...</p>}>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route path="/study" component={TeacherList} />
        <Route path="/give-classes" component={TeacherForm} />

        <Route path="/404" component={GenericNotFound} />
        <Redirect to="/404" />
      </Switch>
    </Suspense>
  );
};

export default Routes;
