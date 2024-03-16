import { Button } from '@carbon/react';
import { Add } from '@carbon/react/icons';
import { showModal } from '@openmrs/esm-framework';
import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

const UpdateFacilityCodeButton = ({ facilityCodeDetails, setFacilityCodeDetails }) => {
  const { t } = useTranslation();
  const launchRetrieveFacilityCodeModal = useCallback(() => {
    const dispose = showModal('retrieve-facility-code-modal', {
      closeModal: () => dispose(),
      facilityCodeDetails,
      setFacilityCodeDetails,
    });
  }, [facilityCodeDetails, setFacilityCodeDetails]);

  return (
    <Button
      kind="ghost"
      size="sm"
      onClick={launchRetrieveFacilityCodeModal}
      iconDescription={t('updateFacilityCodeButton', 'Update Facility Code Button')}
      renderIcon={(props) => <Add size={16} {...props} />}
    >
      {facilityCodeDetails.value === null ? 'Update Facility Code' : 'Edit Facility Code'}
    </Button>
  );
};

export default UpdateFacilityCodeButton;
