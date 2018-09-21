import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getCurrentPage, getTutorials } from '../actions/index';

class Portfolio extends Component {
  componentDidMount() {
    console.log('-componentDidMount-');
    this.props.getTutorials();
    this.props.getCurrentPage(this.props.location.pathname);
  }

  showList(list) {
    return list.map(item => {
      return(
        <li key={item.id}>{item.attributes.title}</li>
      );
    })
  }

  render() {
    const pageContent = this.props.content;
    if(this.props.isFetching) { return <div><h2>Fetching..</h2></div> }

    return(
      <div>
        <h1>Portfolio</h1>
        <ul>
          {this.showList(pageContent)}
        </ul>
      </div>
    );
  }
}

Portfolio.serverFetch = getTutorials;

function mapStateToProps(state) {
  return state.pageContent;
}

const mapDispatchToProps = { getCurrentPage, getTutorials };

export default connect(mapStateToProps, mapDispatchToProps)(Portfolio);
