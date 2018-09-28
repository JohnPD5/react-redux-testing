import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getCurrentPage } from '../actions/index';
import { getTutorials } from '../actions/apis';

class Portfolio extends Component {
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

  // Merge the data and the included data from JSON API
  mergeData(data, extras, fields=[]) {
    let mergedData = [];

    data.forEach(item => {
      let included = {};
      if(item.relationships == undefined) { return null; }

      fields.forEach(field => {
        let firstRelationID = item.relationships[field].data.id;

        extras.forEach(extra => {
          if(extra.id == firstRelationID) {
            if(extra.relationships !== undefined) {
              for(let prop in extra.relationships) {
                let secondRelationID = extra.relationships[prop].data.id;
                
                return extras.forEach(file => {
                  if(file.id == secondRelationID) {
                    included[field] = file.attributes;
                  }
                });
              }
            } else {
              return included[field] = extra.attributes;
            }
          }
        })
      })

      return mergedData.push({
        main: item,
        extra: included
      });
    });

    return mergedData;
  }

  render() {
    if(this.props.isFetching || this.props.included == null) { return <div><h2>Fetching..</h2></div> }

    const contentsInfo = this.mergeData(this.props.data, this.props.included, ['image', 'contentType']);

    return(
      <div>
        <h1>Portfolio</h1>
        <ul>
          {this.showContent(contentsInfo)}
        </ul>
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
