import React, { Component } from "react";
import PropTypes from "prop-types";
import Timeline from "react-visjs-timeline";

class SHTimeline extends Component {
  constructor() {
    super();
    this.timelineWrapperRef = React.createRef();
    this.state = {
      loaded: false,
      query: "inet:dns:a | limit 100",
      options: {
        // width: "100%",
        height: "100vh"
        // stack: true,
        // showMajorLabels: true,
        // showCurrentTime: true,
        // // zoomMax: 315360000000000 / 10000,
        // zoomMin: 1000000,
        // type: "background",
        // format: {
        //   minorLabels: {
        //     minute: "h:mma",
        //     hour: "ha"
        //   }
        // },
        // onUpdate: function(item, callback) {
        //   console.log("update", item);
        // }
      },
      items: []
    };
  }

  // componentWillMount() {
  // }

  componentDidMount() {
    this.loadData();
    console.log(this.timelineWrapperRef.current);
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
        this.setState(previousState => ({
          items: itemsArray
        }));
      })
      .then(res => {
        this.setState({ loaded: true });
        // this.timelineWrapperRef.current.$el.fit();
      })
      .catch(err => console.error(this.state.query, err.toString()));
  }

  render() {
    return (
      <div>
        {this.state.loaded ? (
          <Timeline
            ref={this.timelineWrapperRef}
            options={this.state.options}
            items={this.state.items}
            // groups={this.state.groups}
            // customTimes={this.state.customTimes}
          />
        ) : (
          <p>loading</p>
        )}
      </div>
    );
  }
}

Timeline.propTypes = {};

export default SHTimeline;
