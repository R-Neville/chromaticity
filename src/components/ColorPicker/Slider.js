import React from "react";
import universalStyles from "../../universal-styles";

const NUMBER_OF_STEPS = 255; // Max RGB value
const THUMB_WIDTH = 10;

class Slider extends React.Component {
  constructor(props) {
    super(props);

    this._id = this.props.id;
    this._colorName = this.props.colorName;
    this.state = {
      value: this.props.value,
      mounted: false
    };

    this._initStyles = {
      ...universalStyles,
      position: "relative",
      width: "100%",
      height: "30px",
      border: "1px solid #000",
      borderRadius: "3px",
      marginRight: '5px',
      background: `linear-gradient(to right, black, ${this.props.bg})`,
    };
  }

  get stepSize() {
    return this.usableWidth / NUMBER_OF_STEPS;
  }

  get usableWidth() {
    return this.width - THUMB_WIDTH;
  }

  get width() {
    const slider = document.getElementById(this._id);
    if (slider) return slider.clientWidth;
    return 0;
  }

  componentDidMount() {
    const slider = document.getElementById(this._id);
    const thumb = slider.querySelector('.thumb');
    this._resizeObserver = new ResizeObserver(() => {
      thumb.style.left = this.state.value * this.stepSize + 'px'
    });
    this._resizeObserver.observe(slider);
    this.setState({ mounted: true });
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      value: nextProps.value
    };
  }

  render() {
    return (
      <div id={this._id} style={this._initStyles}>
        <div
          className="thumb"
          style={{
            ...universalStyles,
            position: "absolute",
            width: "10px",
            height: "100%",
            left: this.state.mounted ? this.state.value * this.stepSize + 'px' : '0px',
            border: "1px solid #FFF",
            borderRadius: "3px",
            backgroundColor: "#000",
          }}
          onMouseDown={this._onThumbMouseDown.bind(this)}
          onTouchStart={this._onThumbTouchStart.bind(this)}
        ></div>
      </div>
    );
  }

  _onThumbMouseDown(event) {
    const thumb = event.target;
    let startX = event.pageX;
    const onMouseMove = (e) => {
      const deltaX = e.pageX - startX;
      let closestStep;
      if (thumb.offsetLeft + deltaX < 0) {
        closestStep = -thumb.offsetLeft;
      } else if (thumb.offsetLeft + deltaX > this.usableWidth) {
        closestStep = this.usableWidth - thumb.offsetLeft;
      } else {
        closestStep = deltaX - (deltaX % this.stepSize);
      }
      const newOffset = thumb.offsetLeft + closestStep;
      thumb.style.left = newOffset + "px";
      const newValue = Math.round(newOffset / this.stepSize);
      this.setState({ value: newValue });
      this._notifyUpdates(newValue);
      startX += closestStep;
    };
    const onMouseUp = () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  }

  _onThumbTouchStart(event) {
    const thumb = event.target;
    let startX = event.targetTouches[0].pageX;
    const onTouchMove = (e) => {
      const deltaX = e.targetTouches[0].pageX - startX;
      let closestStep;
      if (thumb.offsetLeft + deltaX < 0) {
        closestStep = -thumb.offsetLeft;
      } else if (thumb.offsetLeft + deltaX > this.usableWidth) {
        closestStep = this.usableWidth - thumb.offsetLeft;
      } else {
        closestStep = deltaX - (deltaX % this.stepSize);
      }
      const newOffset = thumb.offsetLeft + closestStep;
      thumb.style.left = newOffset + "px";
      const newValue = Math.round(newOffset / this.stepSize);
      this.setState({ value: newValue });
      this._notifyUpdates(newValue);
      startX += closestStep;
    };
    const onTouchEnd = () => {
      document.removeEventListener("touchmove", onTouchMove);
      document.removeEventListener("touchend", onTouchEnd);
    };

    document.addEventListener("touchmove", onTouchMove);
    document.addEventListener("touchend", onTouchEnd);
  }

  _notifyUpdates(value) {
    const slider = document.getElementById(this._id);
    const customEvent = new CustomEvent("color-slider-changed", {
      bubbles: true,
      detail: {
        colorName: this._colorName,
        newValue: value,
      },
    });
    slider.dispatchEvent(customEvent);
  }
}

export default Slider;
