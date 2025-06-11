import React, { useEffect, useState } from 'react'
import { useLocation, useOutletContext, useParams } from "react-router-dom";
function TouristSpots() {
  // const {state} = useLocation()
  // const {placeid} = state || {};
  const { placeid } = useOutletContext();
  console.log("placeid:",placeid)

  return (
    <div>
      hello {placeid}
    </div>
  )
}

export default TouristSpots