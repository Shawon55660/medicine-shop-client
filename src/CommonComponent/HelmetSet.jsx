import React from 'react';
import { Helmet } from 'react-helmet-async';

const HelmetSet = ({sub1,sub2}) => {
    return (
       <Helmet >
        <title> {sub1} || {sub2}</title>
       </Helmet>
    );
};

export default HelmetSet;