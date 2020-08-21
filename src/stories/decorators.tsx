import React from 'react';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Git from '@publica.re/react-git-provider';

const repo = 'https://git.publica.re/root/playground.git';

export const decorators = ([
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (Story: React.ComponentClass): React.ReactElement => (
    <Git.Provider
      url={repo}
      corsProxy={false}
      auth={{
        type: 'set',
        value: {
          username: 'playground',
          password: 'playground',
        },
      }}
      basepath={`/${btoa(repo)}`}
      loader={(message): React.ReactElement => (
        <span>Git is loading... {message[0]}</span>
      )}
    >
      <Story />
    </Git.Provider>
  ),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
] as unknown) as any;
