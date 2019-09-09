import React from "react";
import Card from 'antd/lib/card';
import { map, prop } from 'lodash/fp';
import data from '../../config.json';
import styles from "./style.less";


export default ({  }) => (
  <div className={styles.Home}>
  {map((column)=><Card
    hoverable
    title={prop('title')(column)}
    className={styles.Card}
    
  >
     {map((item)=>(
       <a className={styles.Link} target="_blank" href={prop('link')(item)}>{prop('title')(item)}</a>
     ))(prop('children')(column))}
  </Card>)(data)}

  </div>
);
