import { AmplifyAuthenticator, AmplifySignUp } from '@aws-amplify/ui-react'
import { AuthState } from '@aws-amplify/ui-components'
import React from 'react'

const ProtectedRoute = ({ component: Component, authState, ...props }) => {
  return authState.authStage === AuthState.SignedIn && authState.user ? (
    <>
      <Component {...props} authUser={authState.user} />
    </>
  ) : (
    <AmplifyAuthenticator>
      {/* don't include phone number for signup */}
      <AmplifySignUp
        slot="sign-up"
        formFields={[
          { type: 'username' },
          { type: 'email' },
          { type: 'password' },
        ]}
      />
    </AmplifyAuthenticator>
  )
}

export default ProtectedRoute
