import { Image } from 'react-native';

export default function ImageViewer({ placeholderImageSource }) {
  return (
    <Image style={{width:"100%", resizeMode: 'contain'}} source={placeholderImageSource}/>
  );
}