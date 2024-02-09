"use client";
import React, { useEffect, useRef } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import { Link } from "react-router-dom";

interface Branch {
  latitude: number;
  id: number;
  city: string;
  longitude: number;
}

type Props = { branches: Branch[] };

const BranchMap = ({ branches }: Props) => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initMap = async () => {
      const loader = new Loader({
        apiKey: process.env.REACT_APP_MAPS_API_KEY as string,
        version: "weekly",
      });

      await loader.load().then((google) => {
        const map = new google.maps.Map(mapRef.current!, {
          center: { lat: branches[0]?.latitude, lng: branches[0]?.longitude },
          zoom: 5,
        });

        branches.forEach((branch) => {
          const marker = new google.maps.Marker({
            position: { lat: branch.latitude, lng: branch.longitude },
            map,
            title: branch.city,
          });

          const infowindow = new google.maps.InfoWindow({
            content: `<h6>${branch.city}</h6>`,
          });

          marker.addListener("click", () => {
            infowindow.open(map, marker);
          });
        });
      });
    };

    if (branches.length > 0) {
      initMap();
    }
  }, [branches]);

  return <div style={{ height: "500px" }} ref={mapRef}></div>;
};

export default BranchMap;
