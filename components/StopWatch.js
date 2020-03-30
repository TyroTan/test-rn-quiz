import React, { PureComponent } from "react";
import { Text, View } from "react-native";
import { getHumanReadableTime } from "../utils/js-util";

export default class StopWatch extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { currentCount: this.props.start || 0 };

    this.timer = this.timer.bind(this);
  }

  timer() {
    this.setState({
      currentCount: this.state.currentCount + 1
    });
  }

  componentDidMount() {
    this.intervalId = setInterval(this.timer, 1000);
  }


  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  render() {
    return (
      <View>
        <Text>{getHumanReadableTime(this.state.currentCount)}</Text>
      </View>
    );
  }
}
