import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const withAutherization = (Component) => {
    const NewComponent = (props) => {
        return <Component {...props} />
    }

    const mapStateToProps = (state) => ({
        authUser: state.sessionState.authUser
    });

    return withRouter(connect(mapStateToProps)(NewComponent));
};

export default withAutherization;