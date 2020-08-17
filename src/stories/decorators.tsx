import React from 'react';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Git from '@publica.re/react-git-provider';

export const decorators = ([
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (Story: React.ComponentClass): React.ReactElement => (
    <Git.Provider
      url='https://git.publica.re/playground/playground.git'
      corsProxy='http://git.publica.re/proxy'
      auth={{
        type: 'set',
        value: {
          username: 'playground',
          password: 'playground',
        },
      }}
      basepath='/'
      loader={(message): React.ReactElement => (
        <span>Git is loading... {message[0]}</span>
      )}
    >
      <Story />
    </Git.Provider>
  ),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
] as unknown) as any;
