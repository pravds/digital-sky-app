import React from 'react';
import { connect } from 'react-redux'

import UserProfile from '../components/UserProfile';

class UserProfilePage extends React.Component {

    render() {
        return <UserProfile/>
    }
}

function mapStateToProps(state) {
    return {};
}

export default connect(
  mapStateToProps
)(UserProfilePage)