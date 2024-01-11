import { age, useLayoutType, useVisit } from '@openmrs/esm-framework';
import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Tag, Tooltip } from '@carbon/react';
import { styles } from './patient-chart-link.scss';
import { getGender, getTagType } from '../helpers/functions';
import { EditQueueEntry } from '../queue-entry/edit-queue-entry.component';
import { useVisitQueueEntry } from '../queue-entry/queue.resource';

interface PatientInfoProps {
  patient: fhir.Patient;
}

const PatientInfo: React.FC<PatientInfoProps> = ({ patient }) => {
  const { t } = useTranslation();
  const isTablet = useLayoutType() === 'tablet';

  const name = `${patient?.name?.[0].given?.join(' ')} ${patient?.name?.[0].family}`;
  const patientUuid = `${patient?.id}`;
  const { currentVisit } = useVisit(patientUuid);
  const patientNameIsTooLong = !isTablet && name.trim().length > 25;
  const { queueEntry } = useVisitQueueEntry(patientUuid, currentVisit?.uuid);

  const visitType = queueEntry?.visitType ?? '';
  const priority = queueEntry?.priority ?? '';

  const getServiceString = useCallback(() => {
    switch (queueEntry?.status?.toLowerCase()) {
      case 'waiting':
        return `Waiting for ${queueEntry.service}`;
      case 'in service':
        return `Attending ${queueEntry.service}`;
      case 'finished service':
        return `Finished ${queueEntry.service}`;
      default:
        return '';
    }
  }, [queueEntry]);

  return (
    <>
      {patientNameIsTooLong ? (
        <Tooltip
          align="bottom-left"
          width={100}
          label={
            <>
              <p className={styles.tooltipPatientName}>{name}</p>
              <p className={styles.tooltipPatientInfo}>{`${parseInt(age(patient?.birthDate))}, ${getGender(
                patient?.gender,
                t,
              )}`}</p>
            </>
          }
        >
          <button className={styles.longPatientNameBtn} type="button">
            {name.slice(0, 25) + '...'}
          </button>
        </Tooltip>
      ) : (
        <span className={styles.patientName}>{name} </span>
      )}
      <span className={styles.patientInfo}>
        {parseInt(age(patient.birthDate))}, {getGender(patient.gender, t)}
      </span>
      {queueEntry && (
        <>
          <div className={styles.navDivider} />
          <span className={styles.patientInfo}>{getServiceString()}</span>
          <div className={styles.navDivider} />
          <span className={styles.patientInfo}>{visitType}</span>
          <Tag
            className={priority === 'Priority' ? styles.priorityTag : styles.tag}
            type={getTagType(priority?.toLocaleLowerCase('en'))}
          >
            {priority}
          </Tag>
          <EditQueueEntry queueEntry={queueEntry} />
        </>
      )}
    </>
  );
};

export default PatientInfo;
