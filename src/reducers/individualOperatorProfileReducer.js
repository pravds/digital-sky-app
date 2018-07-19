import { IOPERATOR_PROFILE_FORM_LOADED } from '../actions/individualOperatorProfileActions';
import { SAVE_IOPERATOR_PROFILE_REQUEST } from '../actions/individualOperatorProfileActions';
import { SAVE_IOPERATOR_PROFILE_SUCCESS } from '../actions/individualOperatorProfileActions';
import { SAVE_IOPERATOR_PROFILE_FAILURE } from '../actions/individualOperatorProfileActions';
import { LOAD_IOPERATOR_PROFILE_SUCCESS } from '../actions/individualOperatorProfileActions';
import { LOAD_IOPERATOR_PROFILE_FAILURE } from '../actions/individualOperatorProfileActions';

const individualOperatorProfileId = localStorage.getItem('individualOperatorProfileId');

const individualOperatorProfileSaved = ( individualOperatorProfileId && individualOperatorProfileId > 0 )

const initialState = { savingIndividualOperatorProfile: false, individualOperatorProfileSaved, errors:[], profile:{ empty: 'empty' } };

export function individualOperatorProfile(state = initialState, action) {
    switch (action.type) {
        case IOPERATOR_PROFILE_FORM_LOADED:
          return { ...state, errors:[]};
        case SAVE_IOPERATOR_PROFILE_REQUEST:
          return { ...state, savingIndividualOperatorProfile: true, individualOperatorProfileSaved: false, errors:[]};
        case SAVE_IOPERATOR_PROFILE_SUCCESS:
          return { savingIndividualOperatorProfile:false, individualOperatorProfileSaved: true, errors:[], profile: action.individualOperatorProfile };
        case SAVE_IOPERATOR_PROFILE_FAILURE:
          return { ...state, savingIndividualOperatorProfile:false, individualOperatorProfileSaved: false, errors: action.errors };
        case LOAD_IOPERATOR_PROFILE_SUCCESS:
          return { ...state, profile: action.individualOperatorProfile };
        case LOAD_IOPERATOR_PROFILE_FAILURE:
          return { ...state, errors: action.errors };
        default:
          return state
    }
}
