import { useState } from 'react';
import FeedbackOptions from '../FeedbackOptions';
import Statistics from '../Statistics';
import Section from '../Section';
import Notification from '../Notification';
import styles from './App.module.css';

const App = () => {
  const [feedback, setFeedback] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  const onLeaveFeedback = value => {
    setFeedback(prevState => ({ ...prevState, [value]: prevState[value] + 1 }));
  };

  const countTotalFeedback = () => {
    return Object.values(feedback).reduce((total, value) => {
      return (total += value);
    }, 0);
  };

  const countPositiveFeedbackPercentage = () => {
    return countTotalFeedback() > 0
      ? Math.round((feedback.good / countTotalFeedback()) * 100)
      : '0';
  };

  const options = Object.keys(feedback);
  const total = countTotalFeedback();
  const positivePercentage = countPositiveFeedbackPercentage();
  const { good, neutral, bad } = feedback;
  return (
    <>
      <div className={styles.wrapper}>
        <Section title="Please leave your">
          <FeedbackOptions
            onLeaveFeedback={onLeaveFeedback}
            options={options}
          />
        </Section>
      </div>
      <Section>
        {total ? (
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={total}
            positivePercentage={positivePercentage}
          />
        ) : (
          <Notification message="No feedback given..." />
        )}
      </Section>
    </>
  );
};

export default App;
