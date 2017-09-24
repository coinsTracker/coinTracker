import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'


const UserProfile = (props) => {
    const {userName, email} = props

    return(
    <div className="content">
        <div className="row">
            <div className="col-lg-4 col-md-5">
                <div className="card card-user">
                    <div className="image"><img src="/assets/img/background.jpg" /></div>
                    <div className="content">
                        <div className="author">
                            <img src="/assets/img/faces/face-3.jpg" className="avatar border-white"/>
                            <h4 className="title">{userName}</h4>
                            <small>{email}</small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}
const mapState = (state) => {
    return {
      isLoggedIn: !!state.user.id,
      userName: state.user.name,
      email: state.user.email
    }
  }
export default withRouter(connect(mapState)(UserProfile))
UserProfile.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
    userName: PropTypes.string,
    email: PropTypes.string
  }
