"use client";
import { Loader } from "@googlemaps/js-api-loader";
import React, { useEffect, useRef, useState } from "react";
import { GetAllBranchesResponse } from "../../../models/branch/responses/GetAllBranchesResponse";
import BranchService from "../../../services/branchService";

type BranchMapProps = {};

const BranchMap: React.FC<BranchMapProps> = () => {
  const mapRef = useRef<HTMLDivElement>(null);

  const [branches, setBranches] = useState<GetAllBranchesResponse[]>([]);

  const fetchBranch = async () => {
    try {
      await BranchService.getAll().then((response: any) => {
        console.log(response);
        setBranches(response.data.data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBranch();
  }, []);

  useEffect(() => {
    const initMap = async () => {
      if (branches.length === 0) return;
      const loader = new Loader({
        apiKey: process.env.REACT_APP_MAPS_API_KEY as string,
        version: "weekly",
      });

      const { Map } = await loader.importLibrary("maps");

      const MapOptions: google.maps.MapOptions = {
        center: { lat: branches[12]?.latitude, lng: branches[12]?.longitude },
        zoom: 5,
        mapId: "my-project-140107-412608",
      };

      const map = new Map(mapRef.current as HTMLDivElement, MapOptions);

      branches.forEach((markerInfo) => {
        const marker = new google.maps.Marker({
          position: { lat: markerInfo.latitude, lng: markerInfo.longitude },
          map,
        });

        const infowindow = new google.maps.InfoWindow({
          content: `${markerInfo.city} ${markerInfo.address}`,
        });

        marker.addListener("click", () => {
          infowindow.open(map, marker);
        });
      });
    };
    initMap();
  }, [branches]);

  return (
    <div
      className="border   rounded border-3 p-md-5"
      style={{ height: "350px" }}
      ref={mapRef}
    ></div>
  );
};

export default BranchMap;
