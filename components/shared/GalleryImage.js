import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Dimensions } from 'react-native';
import { Button } from 'native-base';
import * as Animatable from 'react-native-animatable';
const WIDTH = Dimensions.get('window').width;

export default class GalleryImage extends Component {
  render() {
    const { uri, index, onPress, onLongPress } = this.props;
    return (
      <Button
        onPress={() => onPress(index)}
        onLongPress={() => onLongPress()}
        style={{
          backgroundColor: 'transparent',
          borderRadius: 0,
          height: 80,
          margin: 5,
          width: WIDTH / 4,
        }}
      >
        <Animatable.Image
          animation={'bounceIn'}
          delay={100 * index}
          duration={500}
          source={{ uri }}
          style={{
            height: 80,
            left: 0,
            position: 'absolute',
            resizeMode: 'cover',
            top: 0,
            margin: 5,
            width: WIDTH / 4,
          }}
        />
      </Button>
    );
  }
}

GalleryImage.defaultProps = {
    isUploadFile: false
}

GalleryImage.propTypes = {
  uri: PropTypes.string,
  index: PropTypes.number,
  onPress: PropTypes.func,
  onLongPress: PropTypes.func
};