import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from "react-router-dom";

function TouristSpots() {
  const {state} = useLocation()
  const {placeid} = state || {};
  console.log("placeid:",placeid)
  return (
    <div>
      hello {placeid}
    </div>
  )
}

export default TouristSpots
