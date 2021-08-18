import { Fragment, useRef, useState } from 'react';

import Card from '../../UI/Card';
import Input from '../../Form/Input';

import styles from './TimerInputs.module.css';

export default function TimerInputs({
  setFieldValue,
  setFieldTouched,
  values,
}) {
  const [isButtonMode, setIsButtonMode] = useState(true);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const timer = useRef();

  const clearTimer = () => {
    setTimerSeconds(0);
    clearInterval(timer.current);
    setIsTimerRunning(false);
  };

  const toggleMode = (event) => {
    event.preventDefault();
    if (isTimerRunning) {
      const isLeaving = window.confirm(
        "Are you sure to leave? You'll loose your timer"
      );
      if (!isLeaving) return;
      setFieldValue('start', null);
      clearTimer();
    }
    setIsButtonMode((prevMode) => !prevMode);
  };

  const toggleTimer = (event) => {
    event.preventDefault();
    if (isTimerRunning) {
      if (timerSeconds === 0) return;
      setFieldValue('end', new Date(
        values.start.getTime() + timerSeconds * 1000
      ));
      clearTimer();
      setIsButtonMode(false);
    } else {
      setFieldValue('start', new Date());
      timer.current = setInterval(
        () => setTimerSeconds((secs) => ++secs),
        1000
      );
      setIsTimerRunning(true);
    }
  };

  let content;

  if (isButtonMode) {
    const hours = ('' + Math.floor(timerSeconds / 3600)).padStart(2, 0);
    const minutes = ('' + Math.floor((timerSeconds % 3600) / 60)).padStart(2, 0);
    const seconds = ('' + (timerSeconds % 60)).padStart(2, 0);

    content = (
      <Card>
        <div className={styles.timerContainer}>
          <h1>
            {hours}:{minutes}:{seconds}
          </h1>
          <button
            onClick={toggleTimer}
            className={`${styles.timerBtn} ${isTimerRunning && 'btn-red'}`}
          >
            {isTimerRunning ? 'Stop' : 'Start'}
          </button>
        </div>
      </Card>
    );
  } else {
    content = (
      <Card>
        <Input
          name="start"
          label="Start"
          control="datetime"
          required={true}
          setFieldTouched={setFieldTouched}
          setFieldValue={setFieldValue}
        />
        <Input
          name="end"
          label="End"
          control="datetime"
          required={true}
          setFieldTouched={setFieldTouched}
          setFieldValue={setFieldValue}
        />
      </Card>
    );
  }

  return (
    <Fragment>
      <label>Timer</label>
      {content}
      <div className="actions">
        <button onClick={toggleMode} className="toggle">
          {isButtonMode ? 'Manual mode' : 'Timer mode'}
        </button>
      </div>
    </Fragment>
  );
}
