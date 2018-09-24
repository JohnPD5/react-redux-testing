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
    const pageContent = this.props.content;
    if(this.props.isFetching || this.props.includedContent == null) { return <div><h2>Fetching..</h2></div> }

    const contentsInfo = this.mergeData(pageContent, this.props.includedContent, ['image', 'contentType']);
    // console.log(contentsInfo);

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

function mapStateToProps(state, ownProps) {
  console.log('--state--', state);
  console.log('--ownProps', ownProps);
  return state.pageContent;
}

const mapDispatchToProps = { getCurrentPage, getTutorials };

export default connect(mapStateToProps, mapDispatchToProps)(Portfolio);
