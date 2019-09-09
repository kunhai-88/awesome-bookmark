import React from "react";
import { Link } from "react-router-dom";

import styles from "./style.less";
import logo from "../resources/shuqian.png";

export default () => (
  <header className={styles.Header}>
    <div className={styles.InnerHeaer}>
      <Link to={`/`}>
        <img alt="" src={logo} className={styles.Logo} />
      </Link>
    </div>
  </header>
);
