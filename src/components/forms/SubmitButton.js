import React from 'react';
import {useFormikContext} from 'formik';

import Button from '../Button';

function SubmitButton({title, ...otherProps}) {
  const {handleSubmit, isValid} = useFormikContext();

  return (
    <Button
      title={title}
      onPress={handleSubmit}
      disable={!isValid}
      {...otherProps}
    />
  );
}

export default SubmitButton;
