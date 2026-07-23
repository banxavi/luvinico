'use client';

import { NextStudio } from 'next-sanity/studio';

import config from './studioConfig';

export default function AdminStudio() {
  return <NextStudio config={config} />;
}
