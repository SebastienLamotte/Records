import { Fragment, useState } from 'react';

import TimeRecord from './TimeRecord';

import styles from './TimeRecordsList.module.css';

export default function TimeRecordsList({ timeRecords, projectId }) {
  const [isSortingAsc, setIsSortingAsc] = useState(false);

  const changeSortingHandler = () => setIsSortingAsc((sorted) => !sorted);

  let sortedTimeRecords = [...timeRecords];

  if (!isSortingAsc) sortedTimeRecords.reverse();

  return (
    <Fragment>
      <div className="sorting">
        <button onClick={changeSortingHandler}>
          Sort by {isSortingAsc ? 'newest first' : 'oldest first'}
        </button>
      </div>
      <ul className={styles['time-records-list']}>
        {sortedTimeRecords.map((record) => (
          <TimeRecord
            key={`timeRecord_${record.title}`}
            record={record}
            projectId={projectId}
          />
        ))}
      </ul>
    </Fragment>
  );
}
