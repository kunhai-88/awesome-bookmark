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
)(({ onSearch, keyword, onChange, goHome }) => (
  <footer className={styles.Footer}>
  书签 ©2019 Created by Andy
  </footer>
));
