import React, { useState, useEffect, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap, LayersControl } from 'react-leaflet';
import L from 'leaflet';
import { Building2, Navigation } from 'lucide-react';
import 'leaflet/dist/leaflet.css';

// --- Configuration & Constants ---
const MAPTILER_KEY = process.env.MAPTILER_API_KEY || '';
const KERICHO: [number, number] = [-0.3689, 35.2863];
const NAIROBI: [number, number] = [-1.2864, 36.8172];

// Helper to validate coordinates
const isValidCoord = (pos: any): pos is [number, number] => {
  return Array.isArray(pos) && pos.length === 2 && 
         typeof pos[0] === 'number' && !isNaN(pos[0]) && 
         typeof pos[1] === 'number' && !isNaN(pos[1]);
};

// --- Sub-Components ---

// Automatically adjusts view to fit the route
const MapBoundsController = ({ points }: { points: [number, number][] }) => {
  const map = useMap();
  useEffect(() => {
    if (typeof window !== 'undefined' && L && points.length >= 2 && isValidCoord(points[0]) && isValidCoord(points[1])) {
      const bounds = L.latLngBounds(points);
      map.fitBounds(bounds, { padding: [50, 50], animate: true });
    }
  }, [points, map]);
  return null;
};

export const AgriMap = ({ batches }: { batches: any[] }) => {
  const [isClient, setIsClient] = useState(false);
  const [showHubs, setShowHubs] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // 3. Memoized Icons
  const icons = useMemo(() => {
    if (typeof window === 'undefined' || !L) return null;

    const DefaultIcon = L.icon({
      iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41]
    });
    L.Marker.prototype.options.icon = DefaultIcon;

    return {
      truck: L.divIcon({
        className: 'custom-div-icon',
        html: `<div class="p-2 bg-emerald-500 rounded-lg shadow-lg border-2 border-white animate-bounce">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5"><path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/><circle cx="7" cy="18" r="2"/><path d="M15 18H9"/><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-2.235-2.794a1 1 0 0 0-.78-.332H15V18z"/><circle cx="17" cy="18" r="2"/></svg>
              </div>`,
        iconSize: [32, 32],
        iconAnchor: [16, 16]
      })
    };
  }, [isClient]);

  if (!isClient) return <div className="h-full w-full bg-slate-950" />;

  return (
    <div className="h-full w-full rounded-3xl overflow-hidden relative border border-white/10 shadow-2xl">
      <MapContainer 
        center={KERICHO} 
        zoom={7} 
        style={{ height: '100%', width: '100%' }}
        zoomControl={false}
      >
        <TileLayer
          url="https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
          subdomains={['mt0','mt1','mt2','mt3']}
          attribution='&copy; <a href="https://maps.google.com/">Google Maps</a>'
        />
        
        {/* Render markers for each batch */}
        {batches.map(batch => {
          if (!batch.originCoords) return null;
          return (
            <Marker key={batch.id} position={batch.originCoords} icon={icons?.truck}>
              <Popup>
                <div className="p-2">
                  <h4 className="font-bold text-sm">{batch.title || batch.id}</h4>
                  {batch.status && <p className="text-xs">Status: {batch.status}</p>}
                  {batch.eta && <p className="text-xs">ETA: {batch.eta}</p>}
                  {batch.seller && <p className="text-xs">Seller: {batch.seller}</p>}
                  {batch.price && <p className="text-xs">Price: {batch.price}</p>}
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>

      {/* UI Overlay */}
      <div className="absolute bottom-6 left-6 z-[1000] flex flex-col gap-2">
        <button 
          onClick={() => setShowHubs(!showHubs)}
          className={`p-4 rounded-xl flex items-center gap-2 transition-all ${
            showHubs ? "bg-emerald-500 text-white" : "bg-white/90 backdrop-blur text-slate-800"
          }`}
        >
          <Building2 size={20} />
          <span className="text-xs font-bold uppercase tracking-wider">Toggle Hubs</span>
        </button>
      </div>
    </div>
  );
};
