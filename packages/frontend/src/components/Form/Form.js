import { Fragment, useState } from 'react';
import { Prompt } from 'react-router';
import { Formik, Form as FormikForm } from 'formik';

import useHttp from '../../hooks/use-http';

import styles from './Form.module.css';

export default function Form({
  title,
  httpParams,
  initialValues,
  validationSchema,
  setInputs,
  submitBtnValue,
  statusCodeAction,
  prompt = true,
}) {
  const httpRequest = useHttp();
  const [isEntering, setIsEntering] = useState(false);
  const blurHandler = (values) => {
    for (const key in values) {
      if (values[key] !== '') {
        setIsEntering(true);
        break;
      }
    }
  };
  const submitHandler = async (
    values,
    { setSubmitting, setErrors, setStatus }
  ) => {
    setSubmitting(true);
    const formattedResponse = await httpRequest({
      ...httpParams,
      body: JSON.stringify(values),
    });
    const { statusCode, error } = formattedResponse;
    setSubmitting(false);
    // eslint-disable-next-line default-case
    switch (statusCode) {
      case 200:
      case 201:
        setIsEntering(false);
        break;
      case 403:
        setStatus(error);
        break;
      case 409:
      case 422:
        setErrors(error);
        setStatus();
    }
    if (statusCode === statusCodeAction.statusCode)
      statusCodeAction.action(formattedResponse);
  };
  return (
    <Fragment>
      {prompt && (
        <Prompt
          when={isEntering}
          message="Are you sure you want to leave? All your entered data will be lost!"
        />
      )}
      {title && <h1 className={styles.title}>{title}</h1>}
      <Formik
        initialValues={initialValues}
        onSubmit={submitHandler}
        validationSchema={validationSchema}
      >
        {({
          isSubmitting,
          status,
          values,
          setFieldValue,
          setFieldTouched,
          errors,
        }) => (
          <FormikForm onBlur={blurHandler.bind(null, values)}>
            {status && <p className="has-error">{status}</p>}
            {setInputs({ setFieldValue, setFieldTouched, values, errors })}
            <div className="actions">
              {isSubmitting ? (
                <p>Sending request...</p>
              ) : (
                <button className="btn" type="submit" disabled={isSubmitting}>
                  {submitBtnValue}
                </button>
              )}
            </div>
          </FormikForm>
        )}
      </Formik>
    </Fragment>
  );
}
