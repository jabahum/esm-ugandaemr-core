import { Button } from '@carbon/react';
import { MessageQueue } from '@carbon/react/icons';
import { navigate } from '@openmrs/esm-framework';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { spaBasePath } from '../constants';
import styles from './metrics-header.scss';

const MetricsHeader = () => {
  const { t } = useTranslation();
  const metricsTitle = t('clinicMetrics', 'Clinic metrics');
  const queueScreenText = t('queueScreen', 'Queue screen');

  const navigateToQueueScreen = () => {
    navigate({ to: `${spaBasePath}/service-queues/screen` });
  };

  return (
    <div className={styles.metricsContainer}>
      <span className={styles.metricsTitle}>{metricsTitle}</span>
      <div className={styles.actionBtn}>
        <Button
          onClick={navigateToQueueScreen}
          kind="tertiary"
          renderIcon={(props) => <MessageQueue size={32} {...props} />}
          iconDescription={queueScreenText}
        >
          {queueScreenText}
        </Button>
      </div>
    </div>
  );
};

export default MetricsHeader;
