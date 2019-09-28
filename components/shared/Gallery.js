import React, { Component } from 'react';
import { Dimensions, View } from 'react-native';
import { Toast } from 'native-base'
import PropTypes from 'prop-types';
import GalleryImage from './GalleryImage';

export default class Gallery extends Component {
  constructor(props) {
    super(props);

    this.state = {
        index: 0,
        shown: false,
      };

  }

  renderImages = () => {
    const { images, handleSelectedDisplay } = this.props;

    return images.map((image, idx) => {
        return (
            <GalleryImage
                index={idx}
                key={idx}
                onLongPress={() => {
                    handleSelectedDisplay(image);
                    Toast.show({
                        position: 'top',
                        type: 'success',
                        text: 'select profile success',
                        buttonText: 'Okay',
                        onClose: 'user'
                    })
                }}
                onPress={() => {
                    Toast.show({
                        position: 'top',
                        type: 'success',
                        text: image.text,
                        buttonText: 'Okay',
                        onClose: 'user'
                    })
                }}
                uri={image.uri}
            />
        );
    })
  }

  
  render() {
    return (
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
        }}
      >
        {this.renderImages()}
      </View>
    );
  }
}

Gallery.propTypes = {
  images: PropTypes.array,
};