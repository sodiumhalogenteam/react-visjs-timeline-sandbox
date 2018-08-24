import React, { Component } from "react";
import PropTypes from "prop-types";
import Timeline from "react-visjs-timeline";

class SHTimeline extends Component {
  // http://visjs.org/docs/timeline/#Configuration_Options
  state = {
    options: {
      width: "100%",
      height: "100vh",
      stack: false,
      showMajorLabels: true,
      showCurrentTime: true,
      zoomMax: 315360000000000 / 10000,
      zoomMin: 1000000,
      type: "background",
      format: {
        minorLabels: {
          minute: "h:mma",
          hour: "ha"
        }
      }
    },
    items: [
      {
        start: new Date(2010, 7, 15),
        end: new Date(2010, 8, 2), // end is optional
        content: "Trajectory A"
        // group: 1
      },

      {
        start: new Date(2010, 7, 20),
        end: new Date(2010, 9, 13), // end is optional
        content: "Trajectory B"
        // group: 2
      }
    ],
    groups: [
      {
        id: 1,
        content: "Group A"
      },
      {
        id: 2,
        content: "Group B"
      }
    ],
    customTimes: {
      one: new Date(),
      two: "Tue May 10 2016 16:17:44 GMT+1000 (AEST)"
    }
  };

  render() {
    return (
      <div>
        <Timeline
          options={this.state.options}
          items={this.state.items}
          // groups={this.state.groups}
          customTimes={this.state.customTimes}
        />
      </div>
    );
  }
}

Timeline.propTypes = {};

export default SHTimeline;
