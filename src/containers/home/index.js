import React from "react";
import { compose, setDisplayName, withHandlers } from "recompose";
import styles from "./style.less";

export default compose(
  setDisplayName(__filename),
  withHandlers({
    onChange: ({ setKeyword }) => e => {
      setKeyword(e.target.value);
    },
  })
)(({  }) => (
  <div className={styles.Footer}>
  首页
  </div>
));
