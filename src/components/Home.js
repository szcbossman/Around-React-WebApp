import React from 'react'
import { Spin } from 'antd';
import { Tabs, Button } from 'antd';
import { GEO_OPTIONS } from '../constants';

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
    this.setState({ loadingGeoLocation: false, error: '' });
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