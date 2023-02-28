import { MapContainer, TileLayer, useMap, useMapEvent, Marker, Popup } from 'react-leaflet'
import React, { useEffect, useState } from 'react';
import { useMyFetch } from '../../util/useMyFetch';

function getPointLatlon(point) {
    const shape = point.shape;
    const coord = JSON.parse(shape).coordinates;
    const latlon = [coord[1], coord[0]];
    return latlon;
}



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
            <Popup keepInView={false} maxWidth={200}>
                {name}
            </Popup>

        </Marker>
    );
}

function ChangeView({ center, zoom }) {
    const map = useMap();
    useEffect(() => {
        if (zoom === undefined) {
            map.setView(center);
        } else {
            map.setView(center, zoom);
        }
    }, [center, zoom])
    return <></>;
}

function PointMap(props) {
    const pointList = props.pointList;
    const clickPoint = props.clickPoint;
    const center = props.center;
    const focus = props.focus;
    return (
        <MapContainer
            center={center}
            zoom={13}
            style={{ height: '300px', width: '300px' }}
        >
            <ChangeView center={center} />
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {pointList.map(p => <MarkPoint point={p} key={p.id} isFocus={String(p.id) === String(focus)}
                handleClick={clickPoint} />)}
        </MapContainer>
    );
}

function PointDiv(props) {
    const point = props.point;
    function buttonCb(ev) {
        if (props.focused) {
            return;
        }
        props.setFocus(point.id);
    }
    return (
        <div>
            <p>ID: {point.id}</p>
            <button type="button" onClick={buttonCb}>{props.focused ? '###Focused###' : 'Select'}</button>
            <p>Name: {point.name}</p>
            <p>Desc:{point.desc}</p>
        </div>
    );
}

function AllPoint(props) {
    const [pointList, setPointList] = useState([]);
    //const [focus, setFocus] = useState(null);
    const focus = props.focus;
    const setFocus = props.setFocus || (() => { });
    //const [center, setCenter] = useState([51.505, -0.09]);
    const center = focus ? getPointLatlon(pointList.find(t => t.id === focus)) : [51.505, -0.09];

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
    const selectPoint = function (pid) {
        setFocus(pid);
        // const p = pointList.find(t => t.id === pid);
        // const latlon = getPointLatlon(p);
        // setCenter(latlon);
    }
    return (
        <>
            Number of Points: {pointList.length}
            <div>
                {pointList.map(p => <PointDiv
                    point={p} focused={String(focus) === String(p.id)}
                    key={p.id}
                    setFocus={selectPoint} />)}
            </div>
            <PointMap center={center} pointList={pointList} focus={focus} clickPoint={selectPoint} />
        </>
    );
}


export { AllPoint };
