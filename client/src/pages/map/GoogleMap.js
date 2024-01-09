import React, { useState,useEffect } from "react";
import PropTypes from 'prop-types';
import styled from 'styled-components';
import GoogleMapReact from 'google-map-react';
import "../../style.css";
const Wrapper = styled.main`
  width: 100%;
  height: 70%;
  position:fixed;
  left : 0
`;
const GoogleMap = ({ children, ...props }) => (
  <Wrapper>
      <GoogleMapReact 
        bootstrapURLKeys={{
          key: 'AIzaSyAnZ0uqxFaPcMqQECrAQMznDtMDbpcKrZA',
        }}
        {...props}
      >
        {children}
      </GoogleMapReact>
      <div id = "showOfficeDetail"></div>
  </Wrapper>
);

GoogleMap.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
};

GoogleMap.defaultProps = {
  children: null,
};

export default GoogleMap;
