"use client";

import { useEffect, useRef } from "react";

export type NearbyRestaurant = {
  placeId: string;
  name: string;
  address?: string;
  rating?: number;
  distanceMiles: number;
  location: { lat: number; lng: number };
};

type Props = {
  radiusMiles: number;
  locationQuery: string;
  selectedPlaceId: string | null;
  onResults: (results: NearbyRestaurant[]) => void;
  onSelect: (r: NearbyRestaurant | null) => void;
};

const milesToMeters = (m: number) => m * 1609.344;

export default function MapComponent({
  radiusMiles,
  locationQuery,
  selectedPlaceId,
  onResults,
  onSelect,
}: Props) {
  const divRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<any>(null);
  const centerRef = useRef<{ lat: number; lng: number } | null>(null);
  const infoRef = useRef<any>(null);
  const indexRef = useRef<Map<string, NearbyRestaurant>>(new Map());

  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    if (!key || !divRef.current) return;

    const initMap = () => {
      const g = (window as any).google;
      if (!g?.maps || mapRef.current) return;

      const fallback = { lat: 37.7749, lng: -122.4194 };

      mapRef.current = new g.maps.Map(divRef.current, {
        center: fallback,
        zoom: 12,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
      });

      infoRef.current = new g.maps.InfoWindow();

      mapRef.current.addListener("click", () => {
        infoRef.current?.close();
        onSelect(null);
      });

      recenterToUser();
      setTimeout(() => g.maps.event.trigger(mapRef.current, "resize"), 150);
    };

    if ((window as any).google?.maps) {
      initMap();
    } else {
      const existing = document.getElementById("google-maps-js") as HTMLScriptElement | null;
      if (existing) existing.addEventListener("load", initMap);
      else {
        const script = document.createElement("script");
        script.id = "google-maps-js";
        script.src = `https://maps.googleapis.com/maps/api/js?key=${key}&libraries=places,geometry`;
        script.async = true;
        script.onload = initMap;
        document.head.appendChild(script);
      }
    }
  }, [onSelect]);

  useEffect(() => {
    if (!centerRef.current) return;
    fetchNearby(centerRef.current, radiusMiles);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [radiusMiles]);

  useEffect(() => {
    const g = (window as any).google;
    if (!g?.maps || !mapRef.current) return;

    const q = locationQuery.trim();
    if (!q) return;

    const t = setTimeout(() => {
      const geocoder = new g.maps.Geocoder();
      geocoder.geocode({ address: q }, (res: any, status: any) => {
        if (status !== "OK" || !res?.[0]) return;

        const loc = res[0].geometry.location;
        const c = { lat: loc.lat(), lng: loc.lng() };

        centerRef.current = c;
        mapRef.current.panTo(c);
        mapRef.current.setZoom(13);
        infoRef.current?.close();

        fetchNearby(c, radiusMiles);
      });
    }, 500);

    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locationQuery]);

  useEffect(() => {
    const g = (window as any).google;
    if (!g?.maps || !mapRef.current) return;
    if (!selectedPlaceId) return;

    const r = indexRef.current.get(selectedPlaceId);
    if (!r) return;

    mapRef.current.panTo(r.location);
    mapRef.current.setZoom(16);

    infoRef.current?.setPosition(r.location);
    infoRef.current?.setContent(
      `<div style="font-size:14px;line-height:1.3">
        <div style="font-weight:600">${r.name}</div>
        <div style="opacity:.8">${r.address ?? ""}</div>
        <div style="margin-top:6px">Rating: ${r.rating ?? "—"}</div>
      </div>`
    );
    infoRef.current?.open({ map: mapRef.current });
  }, [selectedPlaceId]);

  const recenterToUser = () => {
    const g = (window as any).google;
    if (!mapRef.current || !g?.maps) return;

    navigator.geolocation?.getCurrentPosition(
      (pos) => {
        const c = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        centerRef.current = c;
        mapRef.current.panTo(c);
        mapRef.current.setZoom(14);
        infoRef.current?.close();
        fetchNearby(c, radiusMiles);
      },
      () => {
        // if user denies
      }
    );
  };

  const fetchNearby = (center: { lat: number; lng: number }, miles: number) => {
    const g = (window as any).google;
    if (!g?.maps?.places || !g?.maps?.geometry || !mapRef.current) return;

    const service = new g.maps.places.PlacesService(mapRef.current);
    const centerLL = new g.maps.LatLng(center.lat, center.lng);

    service.nearbySearch(
      { location: center, radius: milesToMeters(miles), type: "restaurant" },
      (results: any[], status: any) => {
        if (status !== g.maps.places.PlacesServiceStatus.OK || !Array.isArray(results)) {
          indexRef.current.clear();
          onResults([]);
          return;
        }

        const out: NearbyRestaurant[] = [];

        for (const p of results) {
          if (!p?.place_id || !p?.geometry?.location) continue;

          const loc = p.geometry.location;
          const pos = { lat: loc.lat(), lng: loc.lng() };

          const distMeters = g.maps.geometry.spherical.computeDistanceBetween(centerLL, loc);
          const distMiles = distMeters / 1609.344;

          out.push({
            placeId: p.place_id,
            name: p.name ?? "Unknown",
            address: p.vicinity ?? undefined,
            rating: typeof p.rating === "number" ? p.rating : undefined,
            distanceMiles: distMiles,
            location: pos,
          });
        }

        out.sort((a, b) => a.distanceMiles - b.distanceMiles);

        indexRef.current.clear();
        for (const r of out) indexRef.current.set(r.placeId, r);

        onResults(out);
      }
    );
  };

  return (
    <div className="relative w-full h-full">
      <div ref={divRef} className="w-full h-full" />
      <button
        type="button"
        onClick={recenterToUser}
        className="absolute bottom-4 right-4 bg-white border border-gray-200 shadow-lg rounded-lg px-3 py-2 text-sm hover:bg-gray-50"
      >
        Recenter
      </button>
    </div>
  );
}