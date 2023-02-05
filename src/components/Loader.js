import {ActivityIndicator} from 'react-native';

const Loader = (props, ...otherProps) => {
  return (
    <ActivityIndicator
      size={'large'}
      {...otherProps}
      testID=" activity-indicator"
    />
  );
};

export default Loader;
