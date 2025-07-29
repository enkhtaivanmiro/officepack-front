import { Amplify } from 'aws-amplify';

export function configureAmplify() {
  Amplify.configure({
    Auth: {
      Cognito: {
        userPoolId: process.env.NEXT_PUBLIC_USER_POOL_ID || '',
        userPoolClientId: process.env.NEXT_PUBLIC_USER_POOL_CLIENT_ID || '',
        loginWith: {
          oauth: {
            domain: process.env.NEXT_PUBLIC_OAUTH_DOMAIN || '',
            scopes: ['email', 'openid'],
            responseType: 'code',
            redirectSignIn: [`${process.env.NEXT_PUBLIC_OAUTH_REDIRECT}/auth`],
            redirectSignOut: [`${process.env.NEXT_PUBLIC_OAUTH_REDIRECT}`],
          },
        },
      },
    },
  });
}
