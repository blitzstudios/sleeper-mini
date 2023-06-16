import React from 'react';
import {Types} from '@sleeperhq/mini-core';
import Podcasts from './podcasts';
type OwnProps = {
  context: Types.Context;
};

const Mini = (props: OwnProps) => {
  const {context} = props;

  return <Podcasts context={context} />;
};

export default Mini;
