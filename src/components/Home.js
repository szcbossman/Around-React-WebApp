import React from 'react'
import { Tabs, Button } from 'antd';
import { GEO_OPTIONS } from '../constants';

const TabPane = Tabs.TabPane;
const operations = <Button>Extra Action</Button>;

export class Home extends React.Component {
  state = {
    loadingGeoLocation : false,
  }

  componentDidMount() {
    this.setState({ loadingGeoLocation: true });
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
      /* geolocation IS NOT available */
    }
  }

  onSuccessLoadGeoLocation = (position) => {
    this.setState({ loadingGeoLocation: false });
  }
  onFailedLoadGeoLocation = () => {
    this.setState({ loadingGeoLocation: false });
  }

  getGalleryPanelContent = () => {
    return this.state.loadingGeoLocation ? <span>loading geoLocation...</span> : null;
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