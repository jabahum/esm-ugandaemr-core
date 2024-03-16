import { EmptyStateComingSoon } from '@ohri/openmrs-esm-ohri-commons-lib';
import React from 'react';
import { useTranslation } from 'react-i18next';

const RadiologyOrder: React.FC = () => {
  const { t } = useTranslation();
  const headerTitle = t('radiology', 'Radiology');

  return <EmptyStateComingSoon headerTitle={headerTitle} displayText={headerTitle} />;
};

export default RadiologyOrder;
