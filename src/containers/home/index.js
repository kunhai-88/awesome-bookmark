import React from "react";
import Card from 'antd/lib/card';
import { compose, setDisplayName, withHandlers } from "recompose";
import { map, prop } from 'lodash/fp';
import data from '../../config.json';
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
  {map((column)=><Card
    hoverable
    title={prop('title')(column)}
    className={styles.Card}
    
  >
     {map((item)=>(
       <a className={styles.Link} href={prop('link')(item)}>{prop('title')(item)}</a>
     ))(prop('children')(column))}
  </Card>)(data)}

  </div>
));
