import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CSSTransition, TransitionGroup, Transition } from 'react-transition-group';

import { getCurrentPage } from '../actions/index';
import { getTutorials } from '../actions/apis';
import { mergeDataWithFields } from '../utils';
import Loader from '../components/Loader';
import Overlay from '../components/Overlay';

class Portfolio extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getCurrentPage(this.props.location.pathname);

    if(this.props.data == undefined) {
      this.props.getTutorials();
    }
  }

  showContent(contents) {
    return contents.map(item => {
      return(
        <li key={item.main.id}>{item.main.attributes.title}</li>
      );
    })
  }

  componentWillUnmount() {
    console.log('-Unmounting Portfolio-');
  }

  render() {
    if(this.props.isFetching || this.props.included == null ) {
      return <Loader />;
    }

    const contentsInfo = mergeDataWithFields(this.props.data, this.props.included, ['image', 'contentType']);
    
    return(
      <div ref={this.portfolio} className="portfolio__wrapper">
        <div>
          <h1>Portfolio</h1>
          <ul>
            {this.showContent(contentsInfo)}
          </ul>
        </div> 
      </div>
    );
  }
}

Portfolio.serverFetch = getTutorials;

function mapStateToProps(state, ownProps) {
  return {...state.contents.tutorials};
}

const mapDispatchToProps = { getCurrentPage, getTutorials };

export default connect(mapStateToProps, mapDispatchToProps)(Portfolio);
