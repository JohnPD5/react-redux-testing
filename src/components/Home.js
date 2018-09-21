import React, { Component } from 'react';
import fetch from "isomorphic-fetch";
import { connect } from 'react-redux';

import { getRecipes, getCurrentPage } from '../actions/index';

class Home extends Component {
  componentDidMount() {
    console.log('-componentDidMount-');
    this.props.getRecipes();
    this.props.getCurrentPage(this.props.location.pathname);
  }

  mergeData(main, extras) {
    let mergedData = [];

    main.forEach(item => {
      let firstRelationID = item.relationships.image.data.id;
      let included = null;

      extras.forEach(image => {
        if(image.id == firstRelationID) {
          let secondRelationID = image.relationships.imageFile.data.id;

          return extras.forEach(file => {
            if(file.id == secondRelationID) {
              included = file.attributes.url;
            }
          })
        }
      })

      return mergedData.push({
        mainContent: item,
        imageUrl: included
      });
    });

    return mergedData;
  }

  showContent(contents) {
    return contents.map(content => {
      return(
        <li key={content.mainContent.id}>
          <h3>{content.mainContent.attributes.title}</h3>
          <img src={`http://dev.contenta.test` + content.imageUrl} />
        </li>
      );
    })
  }

  render() {
    if(this.props.isFetching || this.props.includedContent == null) { return  <div><h2>Fetching..</h2></div> }
    const contentsInfo = this.mergeData(this.props.content, this.props.includedContent);

    return(
      <div>
        <h1>Home</h1>
        <ul>
         {this.showContent(contentsInfo)}
        </ul>
      </div>
    );
  }
}

Home.serverFetch = getRecipes;

function mapStateToProps(state) {
  console.log('-mapStateToProps-', state);
  return state.pageContent;
}

const mapDispatchToProps = { getRecipes, getCurrentPage };

export default connect(mapStateToProps, mapDispatchToProps)(Home);
