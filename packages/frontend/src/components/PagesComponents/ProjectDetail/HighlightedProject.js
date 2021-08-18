import styles from './HighlightedProject.module.css';

export default function HighlightedProject({
  title,
  description,
  participants,
  totalDuration,
}) {
  return (
    <div className={styles.highlighted}>
      <h1>{title}</h1>
      <p className={`${styles.description} description`}>{description}</p>
      <div className="flex-box">
        <p>Time spent: {totalDuration} </p>
        <p className={styles.participants}>{participants}</p>
      </div>
    </div>
  );
}
