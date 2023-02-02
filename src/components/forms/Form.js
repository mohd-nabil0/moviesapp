import React from 'react';
import {Formik} from 'formik';

function AppForm({initialValues, onSubmit, validationSchema, children}) {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
      validateOnMount={true}>
      {() => <>{children}</>}
    </Formik>
  );
}

export default AppForm;
