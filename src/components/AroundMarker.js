import React from 'react'
import { Marker, InfoWindow } from "react-google-maps";

export class AroundMarker extends React.Component {
  state = {
    isOpen: false,
  }

  onToggleOpen = () => {
    this.setState((prevState) => ({ isOpen: !prevState.isOpen}));
  }

  render() {
    return (
      <Marker
        position={{ lat: this.props.post.location.lat, lng: this.props.post.location.lon }}
        onMouseOver={this.onToggleOpen}
        onMouseOut={this.onToggleOpen}
      >
        {this.state.isOpen ? <InfoWindow onCloseClick={this.onToggleOpen}>
          <div>
            <img className="around-marker-image" src={this.props.post.url} alt="postImage" />
            <p>{`${this.props.post.user}: ${this.props.post.message}`}</p>
          </div>
        </InfoWindow> : null}
      </Marker>
    );
  }
}