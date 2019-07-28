import React from "react";
import { Layout } from "antd";
import {
  compose,
  pure,
  withHandlers,
  withProps,
  withState,
  setDisplayName
} from "recompose";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "../../components/header";
import Footer from "../../components/footer";
import styles from "./index.less";

const { Content } = Layout;

export default compose(
  pure,
  setDisplayName(__filename)
)(({ children }) => (
  <Router>
    <Layout className={styles.Layout}>
      <Header />
      <Content className={styles.Content}>{children}</Content>
      <Footer style={{ textAlign: "center" }}>
        书签 ©2019 Created by Andy
      </Footer>
    </Layout>
  </Router>
));
