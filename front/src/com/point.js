import { MapContainer, TileLayer, useMap, useMapEvent, Marker, Popup } from 'react-leaflet'
import React, { useEffect, useState } from 'react';


function ListenClick(props) {
    const cb = props.cb;
    const map = useMapEvent(
        'click', ev => {
            cb([ev.latlng.lat, ev.latlng.lng]);
        }
    );
    return null;
}

function ChangeView({ center }) {
    const map = useMap();
    console.log(map.zoom);
    map.setView(center, map.zoom);
    return null;
}

function PageMap(props) {
    //const [latlon, setLatlon] = useState(null);
    const latlon = props.latlon;
    const setLatlon = props.setLatlon;

    const goodCoord = latlon[0] !== '' && latlon[1] !== '';
    //console.log(latlon);
    const center = goodCoord ? latlon : [51.505, -0.09];
    //const zoom = 13;
    return (
        <MapContainer
            center={[51.505, -0.09]}
            zoom={13} scrollWheelZoom={false}
            style={{ height: '300px', width: '300px' }}
        >
            <ChangeView center={center} />
            <ListenClick cb={setLatlon} />
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {
                goodCoord ?
                    <Marker position={latlon}>
                        <Popup keepInView={true} maxWidth={200}>
                            A pretty CSS3 popup.  Easily customizable.  Easily customizable.  Easily customizable.  Easily customizable.  Easily customizable.
                        </Popup>
                    </Marker>
                    : null
            }
        </MapContainer>
    );
}

function Point() {
    const [latlon, setLatlon] = useState(['', '']);
    function setLat(ev) {
        console.log(latlon);
        setLatlon(old => [ev.target.value, old[1]]);
    }
    function setLon(ev) {
        console.log(latlon);
        setLatlon(old => [old[0], ev.target.value]);
    }
    return (
        <>
            <label>
                Lon
                <input type='number' value={latlon[1]} onChange={setLon} />
            </label>
            <label>
                Lat
                <input type='number' value={latlon[0]} onChange={setLat} />
            </label>
            <br />
            <PageMap latlon={latlon} setLatlon={setLatlon} />
        </>
    );
}

export { Point };
