import { combineReducers } from 'redux';

import { authentication } from './authenticationReducer';
import { registration } from './registrationReducer';
import { resetPasswordLink } from './resetPasswordLinkReducer';
import { resetPassword } from './resetPasswordReducer';
import { pilotProfile } from './pilotProfileReducer';
import { individualOperatorProfile } from './individualOperatorProfileReducer';

const rootReducer = combineReducers({
  authentication,
  registration,
  resetPasswordLink,
  resetPassword,
  pilotProfile,
  individualOperatorProfile
});

export default rootReducer;