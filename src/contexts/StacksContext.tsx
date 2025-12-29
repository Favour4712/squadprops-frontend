'use client'

import React, { type ReactNode } from 'react'
import { Connect } from '@stacks/connect-react';
import { userSession } from '@/config';

function StacksProvider({ children }: { children: ReactNode }) {
  const authOptions = {
    appDetails: {
      name: "SquadProps",
      icon: typeof window !== 'undefined' ? window.location.origin + '/icon.png' : '/icon.png',
    },
    userSession,
  };

  return (
    <Connect authOptions={authOptions}>
      {children}
    </Connect>
  )
}

export default StacksProvider
