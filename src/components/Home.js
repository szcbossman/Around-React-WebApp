import React from 'react'
import $ from 'jquery';
import { Spin } from 'antd';
import { Tabs, Button } from 'antd';
import {API_ROOT, GEO_OPTIONS, POS_KEY, AUTH_PREFIX, TOKEN_KEY} from '../constants';

const TabPane = Tabs.TabPane;
const operations = <Button>Extra Action</Button>;

export class Home extends React.Component {
  state = {
    loadingGeoLocation : false,
    error : '',
  }

  componentDidMount() {
    this.setState({ loadingGeoLocation: true, error: '' });
    this.getGeoLocation();
  }
  componenctWillUnmount() {

  }

  getGeoLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        this.onSuccessLoadGeoLocation,
        this.onFailedLoadGeoLocation,
        GEO_OPTIONS,
      );
    } else {
      this.setState({  error: 'Your browser does NOT support geoLocation!' });
    }
  }

  onSuccessLoadGeoLocation = (position) => {
    console.log(position);
    this.setState({ loadingGeoLocation: false, error: '' });
    const {latitude, longitude} = position.coords;
    localStorage.setItem('POS_KEY', JSON.stringify({ lat: latitude, lon: longitude }));
    this.loadNearbyPosts();
  }
  onFailedLoadGeoLocation = () => {
    this.setState({ loadingGeoLocation: false, error: 'Failed to load geoLocation!' });
  }

  getGalleryPanelContent = () => {
    if (this.state.error) {
      return <div>{ this.state.error }</div>
    }
    else if (this.state.loadingGeoLocation) {
      return <Spin tip="Loading Location..."/>;
    }
    else {
      return null;
    }
  }

  loadNearbyPosts = () => {
    const {lat, lon} = JSON.parse(localStorage.getItem(POS_KEY));
    $.ajax({
      url: `${API_ROOT}/search?lat=${lat}&lon=${lon}&range=20`,
      method: 'GET',
      headers: {
        Authorization: `${AUTH_PREFIX} ${localStorage.getItem(TOKEN_KEY)}`
      },
    }).then((response) => {
      console.log(response);
    }, (error) => {
      console.log(error);
    }).catch((error) => {
      console.log(error)
    });
  }

  render() {
    return (
      <Tabs tabBarExtraContent={operations} className = "main-tabs">
        <TabPane tab="Posts" key="1">
          { this.getGalleryPanelContent() }
        </TabPane>
        <TabPane tab="Map" key="2">Content of tab 2</TabPane>
      </Tabs>
    );
  }
}