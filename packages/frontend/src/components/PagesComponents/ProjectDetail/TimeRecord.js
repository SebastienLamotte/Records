import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

import useHttp from '../../../hooks/use-http';
import { removeTimeRecord } from '../../../store/project-actions';

import Card from '../../UI/Card';

import styles from './TimeRecord.module.css';

export default function TimeRecord({ record, projectId }) {
  const dispatch = useDispatch();
  const httpRequest = useHttp();
  const username = useSelector((state) => state.auth.username);

  const deleteRecordHandler = () =>
    window.confirm('Are you sure you want to delete this record?') &&
    dispatch(removeTimeRecord(httpRequest, projectId, record._id));

  const isAuthor = username === record.author.username;

  return (
    <Card>
      <li
        className={`${styles['time-record']} ${
          isAuthor && styles['is-author']
        }`}
      >
        {isAuthor && (
          <button
            className="btn btn-small btn-red"
            onClick={deleteRecordHandler}
          >
            X
          </button>
        )}
        <h1>{record.title}</h1>
        <div className="flex-box">
          <p className="description">{record.description}</p>
          <p>{moment.utc(+record.duration).format('HH:mm:ss')}</p>
        </div>
        <div className="flex-box">
          <small className={isAuthor ? styles['is-author-small'] : ''}>
            {record.author.username}
          </small>
          <small>{moment(record.start).format('ll')}</small>
        </div>
      </li>
    </Card>
  );
}
