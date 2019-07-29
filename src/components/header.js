import React from "react";
import { compose, setDisplayName, withHandlers } from "recompose";
import { Link } from "react-router-dom";

import styles from "./style.less";
import logo from "../resources/shuqian.png";

export default compose(
  setDisplayName(__filename),
  withHandlers({
    onChange: ({ setKeyword }) => e => {
      setKeyword(e.target.value);
    }
  })
)(({ onChange }) => (
  <header className={styles.Header}>
    <div className={styles.InnerHeaer}>
      <Link to={`/`}>
        <img alt="" src={logo} className={styles.Logo} />
      </Link>
       
    </div>
  </header>
));
