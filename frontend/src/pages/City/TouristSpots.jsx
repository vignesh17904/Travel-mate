import React, { useEffect, useState } from 'react'
import { useLocation, useOutletContext, useParams } from "react-router-dom";
function TouristSpots() {
  const { placeid } = useOutletContext();

  return (
    <div>
      hello {placeid}
    </div>
  )
}

export default TouristSpots