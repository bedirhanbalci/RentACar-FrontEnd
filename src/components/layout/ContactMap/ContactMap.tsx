"use client";
import { Loader } from "@googlemaps/js-api-loader";
import React, { useEffect } from "react";
import { GetByIdBranchResponse } from "../../../models/branch/responses/GetByIdBranchResponse";

type Props = {
  branch: GetByIdBranchResponse;
};

const ContactMap = ({ branch }: Props) => {
  const mapRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initMap = async () => {
      const loader = new Loader({
        apiKey: process.env.REACT_APP_MAPS_API_KEY as string,
        version: "weekly",
      });

      const { Map } = await loader.importLibrary("maps");

      // Tek bir marker için konum ve içerik
      const markerInfo = {
        location: { lat: 40.9833, lng: 29.1167 },
        content: "<h6>Istanbul</h6>",
      };
      // Harita seçenekleri
      const MapOptions: google.maps.MapOptions = {
        center: markerInfo.location,
        zoom: 12,
        mapId: "my-project-140107-412608",
      };

      // Haritayı kurma
      const map = new Map(mapRef.current as HTMLDivElement, MapOptions);

      // İşaretçiyi haritaya ekleme
      const marker = new google.maps.Marker({
        position: markerInfo.location,
        map,
      });

      // İşaretçi için bilgi penceresi oluşturma
      const infowindow = new google.maps.InfoWindow({
        content: markerInfo.content,
      });

      // İşaretçiye tıklanınca bilgi penceresini gösterme
      marker.addListener("click", () => {
        infowindow.open(map, marker);
      });
    };

    initMap();
  }, [branch]);

  return (
    <div
      className="border rounded border-3"
      style={{ height: "520px", width: "100%" }}
      ref={mapRef}
    ></div>
  );
};
export default ContactMap;
