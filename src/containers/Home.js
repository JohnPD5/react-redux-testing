import fetch from "isomorphic-fetch";
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getCurrentPage } from '../actions/index';
import { getRecipes } from '../actions/apis';
import NavLink from '../components/NavLink';

class Home extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getCurrentPage(this.props.location.pathname);

    if(this.props.recipes == 0) {
      this.props.getRecipes();
    }
  }

  componentWillUnmount() {
    console.log('-Unmounting Home-');
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

  render() {
    if(this.props.isFetching || this.props.included == null) { return  <div><h2>Fetching..</h2></div> }

    const contentsInfo = this.mergeData(this.props.data, this.props.included);

    return(
      <div>
        <h1>Home</h1>
        <ul>
          <NavLink content={contentsInfo} />
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
