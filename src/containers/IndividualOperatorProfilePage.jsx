import React from 'react';
import { connect } from 'react-redux'

import IndividualOperatorProfile from '../components/IndividualOperatorProfile';
import { createIndividualOperatorProfileAction, individualOperatorProfileFormLoaded, loadIndividualOperatorProfile, updateIndividualOperatorProfileAction } from '../actions/individualOperatorProfileActions';

class IndividualOperatorProfilePage extends React.Component {

    constructor(props) {
        super(props);
        this.props.dispatch(individualOperatorProfileFormLoaded());
        const individualOperatorProfileId = localStorage.getItem('individualOperatorProfileId');
        if( this.props.individualOperatorProfileSaved && this.props.profile.empty ){
            this.props.dispatch(loadIndividualOperatorProfile(individualOperatorProfileId));
        }
    }

    setupIndividualOperatorProfile(dispatch) {
        return individualOperatorProfile => dispatch(createIndividualOperatorProfileAction(individualOperatorProfile));
    }

    updateIndividualOperatorProfile(dispatch) {
        const individualOperatorProfileId = localStorage.getItem('individualOperatorProfileId');
        return individualOperatorProfile => dispatch(updateIndividualOperatorProfileAction(individualOperatorProfileId, individualOperatorProfile));
    }

    render(){
        const { savingIndividualOperatorProfile, individualOperatorProfileSaved, profile, errors } = this.props;
        return <IndividualOperatorProfile
                    profile={profile}
                    individualOperatorProfileSaved={individualOperatorProfileSaved}
                    savingIndividualOperatorProfile={savingIndividualOperatorProfile}
                    errors={errors}
                    setupIndividualOperatorProfile={this.setupIndividualOperatorProfile(this.props.dispatch)}
                    updateIndividualOperatorProfile={this.updateIndividualOperatorProfile(this.props.dispatch)}
                />

    }
}

function mapStateToProps(state) {
     const { savingIndividualOperatorProfile, individualOperatorProfileSaved, profile, errors } = state.individualOperatorProfile;
     return {
        savingIndividualOperatorProfile,
        individualOperatorProfileSaved,
        profile,
        errors
     };
}

export default connect(
  mapStateToProps
)(IndividualOperatorProfilePage)