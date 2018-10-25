import React, { Component } from 'react';
import { connect } from 'react-redux';

import { animateOverlay } from '../actions/index';

class Contacts extends Component {
  componentDidMount() {
    this.props.animateOverlay('out');
  }

  render() {
    return(
      <div>Contacts</div>
    );
  }
}

const mapDispatchToProps = { animateOverlay };

export default connect(null, mapDispatchToProps)(Contacts);