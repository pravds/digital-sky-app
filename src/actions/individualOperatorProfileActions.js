import { userService } from '../services/userService';

export const IOPERATOR_PROFILE_FORM_LOADED = 'IOPERATOR_PROFILE__FORM_LOADED'
export const SAVE_IOPERATOR_PROFILE_REQUEST = 'SAVE_IOPERATOR_PROFILE_REQUEST'
export const SAVE_IOPERATOR_PROFILE_SUCCESS = 'SAVE_IOPERATOR_PROFILE_SUCCESS'
export const SAVE_IOPERATOR_PROFILE_FAILURE = 'SAVE_IOPERATOR_PROFILE_FAILURE'
export const LOAD_IOPERATOR_PROFILE_SUCCESS = 'LOAD_IOPERATOR_PROFILE_SUCCESS'
export const LOAD_IOPERATOR_PROFILE_FAILURE = 'LOAD_IOPERATOR_PROFILE_FAILURE'

export const createIndividualOperatorProfileAction = (individualOperatorProfile) => {

    return dispatch => {
        dispatch(request());
        userService.createIndividualOperatorProfile(individualOperatorProfile)
                    .then(
                        data => {
                            dispatch(success(individualOperatorProfile));
                        },
                        errors => {
                            dispatch(failure(errors));
                        }
                    );

    };

    function request()  { return { type: SAVE_IOPERATOR_PROFILE_REQUEST } }
    function success(individualOperatorProfile) { return { type: SAVE_IOPERATOR_PROFILE_SUCCESS, individualOperatorProfile } }
    function failure(errors) { return { type: SAVE_IOPERATOR_PROFILE_FAILURE, errors } }
}

export const updateIndividualOperatorProfileAction = (individualOperatorProfileId, individualOperatorProfile) => {

    return dispatch => {
        dispatch(request());
        userService.updateIndividualOperatorProfile(individualOperatorProfileId, individualOperatorProfile)
                    .then(
                        data => {
                            dispatch(success(individualOperatorProfile));
                        },
                        errors => {
                            dispatch(failure(errors));
                        }
                    );

    };

    function request()  { return { type: SAVE_IOPERATOR_PROFILE_REQUEST } }
    function success(individualOperatorProfile) { return { type: SAVE_IOPERATOR_PROFILE_SUCCESS, individualOperatorProfile } }
    function failure(errors) { return { type: SAVE_IOPERATOR_PROFILE_FAILURE, errors } }
}

export const loadIndividualOperatorProfile = (individualOperatorProfileProfileId) => {
    return dispatch => {
        userService.loadIndividualOperatorProfile(individualOperatorProfileProfileId)
                    .then(
                        individualOperatorProfile => {
                            dispatch(success(individualOperatorProfile));
                        },
                        errors => {
                            dispatch(failure(errors));
                        }
                    );

    };
    function success(individualOperatorProfile) { return { type: LOAD_IOPERATOR_PROFILE_SUCCESS, individualOperatorProfile } }
    function failure(errors) { return { type: LOAD_IOPERATOR_PROFILE_FAILURE, errors } }
}

export const individualOperatorProfileFormLoaded = () => {
    return { type: IOPERATOR_PROFILE_FORM_LOADED}
}


