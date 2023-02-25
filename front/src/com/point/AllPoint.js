import { MapContainer, TileLayer, useMap, useMapEvent, Marker, Popup } from 'react-leaflet'
import React, { useEffect, useState } from 'react';
import { useMyFetch } from '../../util/useMyFetch';



function MarkPoint(props) {
    const shape = props.point.shape;
    const coord = JSON.parse(shape).coordinates;
    const latlon = [coord[1], coord[0]];
    const name = props.point.name;

    const handleMarkerClick = ev => props.handleClick(props.point.id);
    return (
        <Marker position={latlon} eventHandlers={{
            click: handleMarkerClick
        }}>
            <Popup keepInView={true} maxWidth={200}>
                {name}
            </Popup>
        </Marker>
    );
}

function PointMap(props) {
    const pointList = props.pointList;
    const clickPoint = props.clickPoint;
    return (
        <MapContainer
            center={[51.505, -0.09]}
            zoom={13}
            style={{ height: '300px', width: '300px' }}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {pointList.map(p => <MarkPoint point={p} key={p.id} handleClick={clickPoint} />)}
        </MapContainer>
    );
}

function PointDiv(props) {
    const point = props.point;
    return (
        <div>
            <p>
                ID: {point.id}
            </p>
            {props.focused?'Focused':''}
            <p>
                Name: {point.name}
            </p>
            <p>
                Desc:{point.desc}
            </p>
        </div>
    );
}

function AllPoint() {
    const [pointList, setPointList] = useState([]);
    const [focus, setFocus] = useState(null);

    const [get, cancel] = useMyFetch();
    useEffect(() => {
        async function foo() {
            try {
                const res = await get('/api/point/all/');
                setPointList(await res.json());
            } catch (err) {
            }
        }
        foo();
        return function () {
            cancel();
        };
    }, []);
    return (
        <>
            Number of Points: {pointList.length}
            <div>
                {pointList.map(p => <PointDiv point={p} focused={focus === p.id} key={p.id} />)}
            </div>
            <PointMap pointList={pointList} clickPoint={setFocus} />
        </>
    );
}


export { AllPoint };
