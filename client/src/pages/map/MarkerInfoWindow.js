import PropTypes from 'prop-types';
import isEmpty from 'lodash.isempty'; 
import "../../style.css"; ///example
import GoogleMap from './GoogleMap';
import DetailShow from "./DetailShow";


import LOS_ANGELES_CENTER from './la_center';
import React, { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { geocode, RequestType,setDefaults } from "react-geocode";
// const address = "1600 Amphitheatre Parkway, Mountain View, CA";

const MarkerInfoWindow = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
  const [places,setPlaces] = useState([]);
  const { userInfo } = userLogin;
  const onChildClickCallback = (key) => {
    setPlaces((places) => {
      const index = places.findIndex((e) => e.id === key);
      places[index].show = !places[index].show; 
      return places;
    });
    const index = places.findIndex((e) => e.id === key);
    var showOfficeDetail = document.getElementById("showOfficeDetail");
    showOfficeDetail.innerHTML = places[index].formatted_address;
    if(places[index].show)
    {
      console.log(places[index]);
      
        //<DetailShow  />
      
      //alert(places[index].formatted_address)
      
    }
  };
 
  
  useEffect(() => {
    if (userInfo) {
      // const address = "14 coriander Avenue E14 2AA London";
      // // Initialize the Geocoder
      // setDefaults({
      //   key: "AIzaSyAnZ0uqxFaPcMqQECrAQMznDtMDbpcKrZA", // Your API key here.
      //   language: "en", // Default language for responses.
      //   region: "es", // Default region for responses.
      // });
      // geocode(RequestType.ADDRESS, address)
      // .then((response) => {
      //   console.log(response)
      //   })
      // .catch((error) => {
      //   console.error(error);
      // });
      fetch('places.json')
      .then((response) => response.json())
      .then((data) => {
        data.results.forEach((result) => {
          result.show = false; // eslint-disable-line no-param-reassign
        });
        setPlaces(data.results);
      });
       
    } else {
      navigate("/login");
      console.log("-here")
    }
  }, [dispatch, navigate, userInfo]);
  return (
    <div >
      {!isEmpty(places) && (
        <GoogleMap
          defaultZoom={15}
          // backgroundColor={"grey"}
          defaultCenter={LOS_ANGELES_CENTER}
          bootstrapURLKeys={{ key: 'AIzaSyAnZ0uqxFaPcMqQECrAQMznDtMDbpcKrZA'}}
          onChildClick={onChildClickCallback}
        >
          {places.map((place) => (
            <Marker
                key={place.id}
                lat={place.geometry.location.lat}
                lng={place.geometry.location.lng}
                show={place.show}
                place={place}
            />
            ))}
        </GoogleMap>
        
      )}
       <DetailShow  place={true}/>
    </div>
  );
  
}
 // InfoWindow component

// Marker component
const Marker = ({ show, place }) => {
  const markerStyle = {
    border: '3px solid blue',
    borderRadius: '50%',
    height: 30,
    width: 30,
    backgroundColor: show ? 'RGB(255,0,255)' : 'RGB(255,0,20)',
    cursor: 'pointer',
    zIndex: 10,
  };
  return (
    <>
      <div style={markerStyle} />
      {show ? <DetailShow  /> :''}
    </>
  );
};


Marker.propTypes = {
  show: PropTypes.bool.isRequired,
  place: PropTypes.shape({
    name: PropTypes.string,
    formatted_address: PropTypes.string,
    rating: PropTypes.number,
    types: PropTypes.arrayOf(PropTypes.string),
    price_level: PropTypes.number,
    opening_hours: PropTypes.shape({
      open_now: PropTypes.bool,
    }),
  }).isRequired,
};


export default MarkerInfoWindow;
