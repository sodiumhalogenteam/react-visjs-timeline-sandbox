import React, { Component } from "react";
import PropTypes from "prop-types";
import Timeline from "react-visjs-timeline";

class SHTimeline extends Component {
  // http://visjs.org/docs/timeline/#Configuration_Options
  state = {
    query: "inet:dns:a | limit 100",
    options: {
      width: "100%",
      height: "100vh",
      stack: false,
      showMajorLabels: true,
      showCurrentTime: true,
      // zoomMax: 315360000000000 / 10000,
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
      // {
      //   id: 1,
      //   content: "Group A"
      // },
      // {
      //   id: 2,
      //   content: "Group B"
      // }
    ]
    // customTimes: {
    //   one: new Date(),
    //   two: "Tue May 10 2016 16:17:44 GMT+1000 (AEST)"
    // }
  };

  componentDidMount() {
    this.loadData();
  }

  params = obj => {
    return Object.entries(obj)
      .map(pair => pair.map(encodeURIComponent).join("="))
      .join("&");
  };

  loadData() {
    const query = this.params({ q: this.state.query, graph: 1 });
    fetch(`https://demo.resonance.vertex.link:4443/api/v1/eval?${query}`)
      .then(response => response.json())
      .then(data => {
        const itemsArray = [];
        data.result.forEach((node, index) => {
          let label = node[1].repr;

          if (label == null) {
            label = node[0][1];
          }

          // hack for comp nodes for now...
          if (Array.isArray(label)) {
            label = node[0][0];
          }

          if (node[1].props[".seen"] !== undefined) {
            itemsArray.push({
              id: node[1].iden,
              start: new Date(node[1].props[".seen"][0]),
              end: new Date(node[1].props[".seen"][1]), // end is optional
              content: label
            });
          }
        });
        console.log(itemsArray);
        this.setState(previousState => ({
          items: [...previousState.items, ...itemsArray]
        }));
      })
      .catch(err => console.error(this.state.query, err.toString()));
  }

  render() {
    return (
      <div>
        <Timeline
          options={this.state.options}
          items={this.state.items}
          // groups={this.state.groups}
          // customTimes={this.state.customTimes}
        />
      </div>
    );
  }
}

Timeline.propTypes = {};

export default SHTimeline;
