import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TweenMax, CSSPlugin, TimelineMax } from 'gsap';

import { getCurrentPage, animateOverlay } from '../actions/index';
import { getTutorials } from '../actions/apis';
import { mergeDataWithFields } from '../utils';

class Portfolio extends Component {
  constructor(props) {
    super(props);

    // Variables for GSAP
    this.ul = null;
    this.title = null;
    this.tween = new TimelineMax({delay: 3.1});
  }

  componentDidMount() {
    this.props.getCurrentPage(this.props.location.pathname);

    if(this.props.data == undefined) {
      this.props.getTutorials();
    } else {
      this.props.animateOverlay('out');
    }
  }

  componentDidUpdate() {
    if(this.title && this.ul) {
      this.tween.to(this.title, 1, {opacity: 1})
                .to(this.ul, .5, {x: '0%'});
    }
  }

  showContent(contents) {
    return contents.map(item => {
      return(
        <li key={item.main.id}>
          {item.main.attributes.title}
        </li>
      );
    });
  }

  render() {
    if(this.props.isFetching || this.props.included == null ) { return null; }
    const contentsInfo = mergeDataWithFields(this.props.data, this.props.included, ['image', 'contentType']);

    return(
      <div ref={this.portfolio} className="portfolio__wrapper">
        <div>
          <h1 ref={h1 => this.title = h1} className="title__portfolio">Portfolio</h1>
          <ul ref={ul => this.ul = ul} className="portfolio_list">
            {this.showContent(contentsInfo)}
          </ul>
        </div> 
      </div>
    );
  }
}

// I execute this function to fetch data from the server.
Portfolio.serverFetch = getTutorials;

const mapStateToProps = (state, ownProps) => {
  return {...state.contents.tutorials};
}

const mapDispatchToProps = { getCurrentPage, getTutorials, animateOverlay };

export default connect(mapStateToProps, mapDispatchToProps)(Portfolio);
