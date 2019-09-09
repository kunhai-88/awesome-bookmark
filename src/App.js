import React from 'react';
import './styles/antd_.less';
import './styles/global.less';
import Layout from './containers/layout'

import Router from './routers';

 
export default ()=>(
  <Layout>
      <Router />
  </Layout>
);
