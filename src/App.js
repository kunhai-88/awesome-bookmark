import React from 'react';
import './styles/antd_.less';
import './styles/global.less';
import Layout from './containers/layout'

import Router from './routers';

import {
  compose, 
  pure, 
  withHandlers, 
  withProps, 
  withState, 
  setDisplayName,
} from 'recompose';

 
export default compose(
  pure,
  setDisplayName(__filename),
)(()=>(
  <Layout>
      <Router />
  </Layout>
));
