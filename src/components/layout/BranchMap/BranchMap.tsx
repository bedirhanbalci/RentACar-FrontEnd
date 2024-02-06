"use client";
import { Loader } from "@googlemaps/js-api-loader";
import React, { useEffect } from "react";

export function BranchMap() {
  const mapRef = React.useRef<HTMLDivElement>(null);
  useEffect(() => {
    const initMap = async () => {
      const loader = new Loader({
        apiKey: process.env.REACT_APP_MAPS_API_KEY as string,
        version: "weekly",
      });

      const { Map } = await loader.importLibrary("maps");

      const markerArray = [
        {
          location: { lat: 40.9833, lng: 29.1167 },
          content: `<h6>İstanbul/Ataşehir</h6>`,
        },
        {
          location: { lat: 40.021062, lng: 32.831015 },
          content: `<h6>Ankara/Keçiören</h6>`,
        },
        {
          location: { lat: 40.8241, lng: 29.37211 },
          content: `<h6>Kocaeli/Çayırova</h6>`,
        },
        {
          location: { lat: 38.32614, lng: 26.30574 },
          content: `<h6>İzmir/Çeşme</h6>`,
        },
        {
          location: { lat: 37.04331, lng: 35.28741 },
          content: `<h6>Adana/Çukurova</h6>`,
        },
        {
          location: { lat: 36.861027, lng: 30.637844 },
          content: `<h6>Antalya/Konyaaltı</h6>`,
        },
        {
          location: { lat: 40.21375, lng: 28.98464 },
          content: `<h6>Bursa/Nilüfer</h6>`,
        },
        {
          location: { lat: 36.20655, lng: 36.15722 },
          content: `<h6>Hatay/Antakya</h6>`,
        },
        {
          location: { lat: 41.002697, lng: 39.716763 },
          content: `<h6>Trabzon/Of</h6>`,
        },
        {
          location: { lat: 41.46082, lng: 35.84435 },
          content: `<h6>Samsun/Bafra</h6>`,
        },
        {
          location: { lat: 41.46082, lng: 37.27246 },
          content: `<h6>Ordu/Ünye</h6>`,
        },
        {
          location: { lat: 38.05761, lng: 32.54088 },
          content: `<h6>Konya/Selçuklu</h6>`,
        },
        {
          location: { lat: 39.14583, lng: 34.16389 },
          content: `<h6>Kırşehir/Merkez</h6>`,
        },
        {
          location: { lat: 39.76699, lng: 30.54113 },
          content: `<h6>Eskişehir/Odunpazarı</h6>`,
        },
        {
          location: { lat: 37.3569102, lng: 39.1543677 },
          content: `<h6>Şanlıurfa/Karaköprü</h6>`,
        },
      ];
      // map options
      const MapOptions: google.maps.MapOptions = {
        center: markerArray[12].location,
        zoom: 6,
        mapId: "my-project-140107-412608",
      };
      // setup the map
      const map = new Map(mapRef.current as HTMLDivElement, MapOptions);

      //put up a marker

      markerArray.forEach((markerInfo) => {
        const marker = new google.maps.Marker({
          position: markerInfo.location,
          map,
        });
        // put up a infowindow for markers
        const infowindow = new google.maps.InfoWindow({
          content: markerInfo.content,
        });
        // show infowindows
        marker.addListener("click", () => {
          infowindow.open(map, marker);
        });
      });
    };
    initMap();
  }, []);

  return (
    <div>
      <div style={{ height: "300px" }} ref={mapRef}></div>
    </div>
  );
}
