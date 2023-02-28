import { MapContainer, TileLayer, useMap, useMapEvent, Marker, Popup } from 'react-leaflet'
import { Circle } from 'react-leaflet/Circle'
import React, { useEffect, useState } from 'react';

// 2^zoom = R / radius
// =>
// zoom =  log2 R/radius

function getZoom(radius) {
    const R = 40 * 1000 * 1000;
    const zoom = Math.log2(R / radius / 10);
    return zoom;
}

function ListenClick(props) {
    const cb = props.cb;
    const map = useMapEvent(
        'click', ev => {
            cb([ev.latlng.lat, ev.latlng.lng]);
        }
    );
    return null;
}
function ChangeView({ center, zoom }) {
    const map = useMap();
    if (!zoom) {
        map.setView(center, map.zoom);
    } else {
        map.setView(center, zoom);
    }
    return null;
}

function ShowCircle(props) {
    const latlon = props.latlon;
    const setLatlon = props.setLatlon;
    const radius = props.radius;
    const goodCoord = latlon[0] !== '' && latlon[1] !== '';
    const center = goodCoord ? latlon : [51.505, -0.09];
    const zoom = radius ? getZoom(radius) : 13;
    const goodCircle = goodCoord && (radius > 1);

    return (
        <MapContainer
            center={center}
            zoom={zoom}
            style={{ height: '300px', width: '300px' }}
        >
            <ChangeView center={center} zoom={zoom} />
            <ListenClick cb={setLatlon} />

            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {goodCircle ? <Circle center={center} radius={radius} /> : ''}
            <Marker position={latlon} >
                <Popup keepInView={false} maxWidth={200}>
                    Center
                </Popup>
            </Marker>

        </MapContainer>
    );
}


export { ShowCircle };
