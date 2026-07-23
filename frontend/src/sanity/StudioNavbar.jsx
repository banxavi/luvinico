'use client';

import { useEffect } from 'react';
import { useCurrentUser } from 'sanity';

import { studioRoleDataset } from './studioAccess';

export default function StudioNavbar(props) {
  const user = useCurrentUser();

  useEffect(() => {
    document.documentElement.dataset.luvinicoStudioRole = studioRoleDataset(user);
    return () => {
      delete document.documentElement.dataset.luvinicoStudioRole;
    };
  }, [user]);

  return props.renderDefault(props);
}
