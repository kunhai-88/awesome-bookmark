import React from "react";
import Card from 'antd/lib/card';
import data from '../../config.json';
import { compose, setDisplayName, withHandlers } from "recompose";
import styles from "./style.less";

console.log(data);

export default compose(
  setDisplayName(__filename),
  withHandlers({
    onChange: ({ setKeyword }) => e => {
      setKeyword(e.target.value);
    },
  })
)(({  }) => (
  <div className={styles.Home}>
  <Card
    hoverable
    title="Card title"
    style={{ width: 240 }}
  >
     
  </Card>,

  </div>
));
