"use client";

import { useEffect, useRef } from "react";

export default function MapComponent() {
    const divRef = useRef<HTMLDivElement | null>(null);
    const mapRef = useRef<any>(null);

    useEffect(() => {
        const key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
        if (!key || !divRef.current) return;

        const initMap = () => {
        const g = (window as any).google;
        if (!g?.maps || !divRef.current) return;
        if (mapRef.current) return;

        const defaultCenter = { lat: 0, lng: 0 };

            mapRef.current = new g.maps.Map(divRef.current, {
            center: defaultCenter,
            zoom: 5,
            mapTypeControl: false,
            streetViewControl: false,
            fullscreenControl: false,
            });

            // Try geolocation
            navigator.geolocation?.getCurrentPosition(
            (pos) => {
                const userCenter = { lat: pos.coords.latitude, lng: pos.coords.longitude };
                mapRef.current.setCenter(userCenter);
                mapRef.current.setZoom(15);
            },
            () => {
                // user denied or unavailable; stay at default
            }
            );


        // Force one redraw after layout settles
        setTimeout(() => {
            g.maps.event.trigger(mapRef.current, "resize");
        }, 150);
        };

        // Load script once
        if ((window as any).google?.maps) {
        initMap();
        } else {
        const existing = document.getElementById("google-maps-js") as HTMLScriptElement | null;
        if (existing) {
            existing.addEventListener("load", initMap);
        } else {
            const script = document.createElement("script");
            script.id = "google-maps-js";
            script.src = `https://maps.googleapis.com/maps/api/js?key=${key}`;
            script.async = true;
            script.onload = initMap;
            document.head.appendChild(script);
        }
        }

        // Redraw tiles when screen resizes
        const onResize = () => {
        const g = (window as any).google;
        if (!mapRef.current || !g?.maps) return;

        const center = mapRef.current.getCenter();
        g.maps.event.trigger(mapRef.current, "resize");
        if (center) mapRef.current.setCenter(center);
        };

        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, []);

    return <div ref={divRef} className="w-full h-full" />;
}
