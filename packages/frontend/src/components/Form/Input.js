import { Fragment } from 'react';
import { useField } from 'formik';
import ReactDatePicker from 'react-datepicker';

import Datalist from './Datalist';

import 'react-datepicker/dist/react-datepicker.css';
import styles from './Input.module.css';

export default function Input({
  label: labelValue,
  control = 'input',
  ...props
}) {
  const [field, meta] = useField(props);
  const label = <label htmlFor={props.name}>{labelValue}</label>;

  if (control === 'checkbox') {
    return (
      <Fragment>
        <input
          id={props.name}
          value={labelValue}
          type="checkbox"
          {...field}
          {...props}
        />
        {label}
      </Fragment>
    );
  }

  let input;
  let errorMsg = meta.error && meta.touched ? meta.error : '';

  switch (control) {
    case 'textArea':
      input = (
        <textarea id={props.name} rows="5" {...props} {...field}></textarea>
      );
      break;
    case 'datetime':
      input = (
        <ReactDatePicker
          id={props.name}
          wrapperClassName="actions"
          autoComplete="off"
          {...props}
          showTimeSelect
          dateFormat="dd MMM y, HH:mm:ss"
          selected={(field.value && new Date(field.value)) || null}
          onChange={(val) => {
            props.setFieldTouched(field.name, true);
            props.setFieldValue(field.name, val);
          }}
        />
      );
      break;
    case 'datalist':
      input = (
        <div className={styles.control}>
          <Datalist label={labelValue} {...props} />
        </div>
      );
      break;
    default:
      input = (
        <input id={props.name} autoComplete="true" {...props} {...field} />
      );
  }

  return (
    <div className={styles.control}>
      {label}
      {input}
      {errorMsg && <small className="has-error">{errorMsg}</small>}
    </div>
  );
}
