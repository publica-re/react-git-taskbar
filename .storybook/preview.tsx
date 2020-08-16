import React from 'react';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  expanded: true,
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Git from 'react-git-provider';

export const decorators = [
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
      loader={(message) => <span>Git is loading... {message[0]}</span>}
    >
      <Story />
    </Git.Provider>
  ),
];
