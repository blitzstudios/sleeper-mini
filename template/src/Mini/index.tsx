import React from 'react';
import {Types} from '@sleeperhq/mini-core';
import Videos from './videos';
type OwnProps = {
  context: Types.Context;
};

const Mini = (props: OwnProps) => {
  const {context} = props;

  return <Videos context={context} />;
};

export default Mini;
