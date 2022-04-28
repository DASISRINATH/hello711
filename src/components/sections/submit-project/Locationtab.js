import React, { useState, useEffect, Fragment } from 'react';
import L from 'leaflet';
import { MapContainer, TileLayer, Popup, CircleMarker, useMapEvents, useMap } from "react-leaflet";
import DrawControlComponent from "./DrawControlComponent";
import axios from "axios";
function Locationtab(props){

    const [currentPos, setCurrentPos] = useState({lat: '', lng: ''})
    const [handleDrawControl, setHandleDrawControl] = useState(false);
    const [handleEditControl, setHandleEditControl] = useState(false);
    const [layoutId, setLayoutId] = useState();
    
    function MyComponent(){
        const map = useMapEvents({
            click: (e)=>{
                setCurrentPos(e.latlng);
                props.getlatlngdata(e.latlng);
            }
        });
        return null;
    }
    function ChangeView({center, zoom}){
        const map = useMap();
        map.setView(center, zoom);
        return null;
    }
    const onChange = (e) =>{
        props.getAddressdata(e.target.value)
        props.getlayoutid(layoutId);
    }

    return(
        <Fragment>
                <div style={{marginBottom: "0"}} className="col-md-12 form-group">
                    <label>Select Location on Map<i class="mandatory fa fa-asterisk" aria-hidden="true"></i></label>
                </div>
                <div className="col-md-12 form-group submit-listing-map">
                    <MapContainer style={{borderRadius: "8px",overflow: "hidden"}} zoom={10} center={props.center} className="markercluster-map map">
                    {props.changecenter && <ChangeView center={props.center} zoom={10}/>}
                    <TileLayer
                        url='https://{s}.tile.osm.org/{z}/{x}/{y}.png'
                    />
                    {(!handleDrawControl && !handleEditControl) && <MyComponent />}
                    {currentPos && <CircleMarker center={currentPos} radius={5} pathOptions={{color:'blue'}}>
                        {/*<Popup position={this.state.currentPos}>
                            Current location: <pre>{JSON.stringify(this.state.currentPos, null, 2)}</pre>
                        </Popup>*/}
                    </CircleMarker>}
                    {(handleDrawControl || handleEditControl) && 
                        <DrawControlComponent
                        drawControlOnMap={handleDrawControl} 
                        editControlOnMap={handleEditControl} 
                        setLayoutId={setLayoutId}
                        />
                    }
                    </MapContainer>
                </div>
                <div className="col-md-12 mb-20">
                <button className="btn-custom" onClick={()=>setHandleDrawControl(!handleDrawControl)}>{handleDrawControl ? "Done" : "Add Layout"}</button>
                <button className="btn-custom" style={{margin: "0 10px"}} onClick={()=>setHandleEditControl(!handleEditControl)}>{handleEditControl ? "Done" : "Edit Layout"}</button>
                <span style={{display:"inline"}} className="acr-form-notice">Drag and drop the marker to identify your <b>Latitude</b> and <b>Longitude</b> </span>
                </div>
                <div className="col-md-12 form-group">
                    <label>Address<i class="mandatory fa fa-asterisk" aria-hidden="true"></i></label>
                    <input type="text" name="address" className="form-control" placeholder="Full Address" onChange={onChange} />
                </div>
                
                {/*
                <div className="col-md-12 form-group">
                    <label>Region</label>
                    <select className="form-control" name="region">
                        <option value="Connecticut">Connecticut</option>
                        <option value="Washington DC">Washington DC</option>
                        <option value="Los Angelas">Los Angelas</option>
                        <option value="Missouri">Missouri</option>
                    </select>
                </div>
                */}
                {/* <div className="col-md-6 form-group">
                    <label>Longitude</label>
                    <input type="text" name="lng" id="lngVal" value={currentPos.lng} className="form-control" placeholder="Longitude" />
                </div>
                <div className="col-md-6 form-group">
                    <label>Latitude</label>
                    <input type="text" name="lat" id="latVal" value={currentPos.lat} className="form-control" placeholder="Latitude"  />
                </div> */}
        </Fragment> 
    )
}

export default Locationtab;