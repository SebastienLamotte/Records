import { useState } from 'react';

import styles from './Datalist.module.css';

export default function Datalist({ onChange, ...props }) {
  const [datalist, setDatalist] = useState([]);

  return (
    <div className={styles.datalist}>
      <input
        type="text"
        id={props.name}
        autoComplete="off"
        list="datalist"
        {...props}
        onChange={onChange.bind(null, setDatalist)}
      />
      <datalist id="datalist">
        {datalist.map((item, key) => (
          <option key={key} value={item} />
        ))}
      </datalist>
    </div>
  );
}
