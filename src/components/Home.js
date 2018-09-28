import fetch from "isomorphic-fetch";
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { getCurrentPage } from '../actions/index';
import { getRecipes } from '../actions/apis';

class Home extends Component {
  componentDidMount() {
    this.props.getCurrentPage(this.props.location.pathname);

    if(this.props.data.length == 0) {
      this.props.getRecipes();
    }
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
          <Link key={content.mainContent.id} to={`/recipe/${content.mainContent.id}`}>
            {content.mainContent.attributes.title}
          </Link>
          <img src={`http://dev.contenta.test` + content.imageUrl} />
        </li>
      );
    })
  }

  render() {
    if(this.props.isFetching || this.props.included == null) { return  <div><h2>Fetching..</h2></div> }
    console.log(this.props);  

    const contentsInfo = this.mergeData(this.props.data, this.props.included);

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

function mapStateToProps(state, ownProps) {
  return {...state.contents.recipes};
}

const mapDispatchToProps = { getRecipes, getCurrentPage };

export default connect(mapStateToProps, mapDispatchToProps)(Home);
