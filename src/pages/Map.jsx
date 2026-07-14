import React, { useMemo, useState } from "react";
import "../styles/Layout.css";
import { Link, useNavigate } from "react-router-dom";
import DocumentTitle from "../hooks/DocumentTitle";
import { canAccess, getCurrentUser } from "../utils/permissions";
import { logout } from "../utils/auth";
import { useEffect } from "react";
import {
    getBuildings,
    getFloors,
    getRooms,
    getRoomDetails
} from "../services/buildingService";
import {
  ArrowLeft,
  Bell,
  Building2,
  ChevronRight,
  DoorOpen,
  Layers3,
  LogOut,
  MapPinned,
  Navigation,
  Search,
  Settings2,
  SlidersHorizontal,
  UserRound,
  ZoomIn,
  ZoomOut
} from "lucide-react";
import campusLogo from "../assets/logo-icon.png";

const buildingPositions = {
  1:{
    left:62,
    top:42
  },

  2:{
    left:35,
    top:25
  },

  3:{
    left:17,
    top:55
  },

  4:{
    left:50,
    top:61
  },

  5:{
    left:73,
    top:22
  },

  6:{
    left:30,
    top:72
  }
};

const ROLE_NAMES = {
  1: "Guest",
  2: "College Student",
  3: "Graduate Student",
  4: "Faculty",
  5: "Staff",
  6: "Admin"
};

function Map() {
  DocumentTitle("Campus Map");

  const [activeNav, setActiveNav] = useState("Map");
  const [selectedId, setSelectedId] = useState(null);
  const [query, setQuery] = useState("");
  const [zoom, setZoom] = useState(1);
  const [activeFloor, setActiveFloor] = useState(0);

  const user = getCurrentUser();
  const isLoggedIn = user !== null;
  const isFacultyStaff = canAccess("FACULTY_STAFF");
  const buildingSelected = selectedId !== null;

  const [buildings, setBuildings] = useState([]);
  const [floors, setFloors] = useState([]);
  const [rooms, setRooms] = useState([]);
  const selectedBuilding = buildings.find(
    (building)=>building.building_id === selectedId
  ) ?? null;
  
  const [loadingBuildings,setLoadingBuildings]=useState(true);
  const [roomCount, setRoomCount] = useState(0);
  const [selectedRoomId, setSelectedRoomId] = useState(null);
  const [roomDetails, setRoomDetails] = useState(null);
  


useEffect(() => {

    getBuildings()
      .then((res) => {

        setBuildings(
          res.data.map((building)=>({

            ...building,

            code:
		building.building_name
		.replace("University ","")
		.split(" ")
		.map(word=>word[0])
		.join("")
		.substring(0,2)
		.toUpperCase(),
              
              

            tone:"blue",

            left: buildingPositions[building.building_id]?.left ?? 20,
            top: buildingPositions[building.building_id]?.top ?? 20,

            width:15,
            height:12,
            rotate:0

          }))
        );

      })
      .catch((err)=>{
          console.log(err);
      })
      .finally(()=>{
          setLoadingBuildings(false);
      });

}, []);

useEffect(() => {

	if(!selectedId){
	    return;
	}


	async function loadFloors(){

	try{

	const res = await getFloors(selectedId);

	setFloors(res.data);

	}catch(error){

	console.log(error);

	}

	}


	loadFloors();


},[selectedId]);
	
useEffect(()=>{

    if(!floors[activeFloor]){
        setRooms([]);
        return;
    }


    const floorId = floors[activeFloor].floor_id;


    getRooms(floorId)
    .then((res)=>{

        setRooms(res.data);

    })
    .catch((error)=>{

        console.log(error);

    });


},[floors, activeFloor]);

useEffect(()=>{

    async function fetchRoomCount(){

        let totalRooms = 0;

        try{

            for(const building of buildings){

                const floorsResponse = await getFloors(
                    building.building_id
                );

                for(const floor of floorsResponse.data){

                    const roomsResponse = await getRooms(
                        floor.floor_id
                    );

                    totalRooms += roomsResponse.data.length;

                }
            }

            setRoomCount(totalRooms);

        }catch(error){
            console.log(error);
        }

    }


    if(buildings.length > 0){
        fetchRoomCount();
    }


},[buildings]);



useEffect(()=>{

    if(!selectedRoomId){
        return;
    }


    getRoomDetails(selectedRoomId)
    .then((res)=>{

        setRoomDetails(res.data);

    })
    .catch((error)=>{
        console.log(error);
    });


},[selectedRoomId]);

  const searchResults = useMemo(() => {
    const cleanQuery = query.trim().toLowerCase();
    if (!cleanQuery) return [];

    return buildings.filter((building)=>{
    return(
        building.building_name
        .toLowerCase()
        .includes(cleanQuery)
	);
    });
  }, [query]);

  // Nav items assembled based on login state + role
  const navItems = useMemo(() => {

	    const items = [
	      {
		label:"Map",
		icon:MapPinned,
		path:"/map"
	      }
	    ];


	    // Only show rooms after selecting building
	    if(buildingSelected){
		items.push({
		    label:"Rooms",
		    icon:DoorOpen,
		    path:"/map"
		});
	    }


	    // Logged users
	    if(isLoggedIn){

		items.push({
		    label:"Account",
		    icon:UserRound,
		    path:"/profile"
		});


		// Faculty, Staff, Admin
		if(isFacultyStaff){

		    items.push({
		        label:"Manage",
		        icon:Settings2,
		        path:"/manage-appointment"
		    });

		}

	    }


	    return items;

	},[
	    buildingSelected,
	    isLoggedIn,
	    isFacultyStaff
  ]);

function selectBuilding(buildingId) {
      setSelectedId(buildingId);
      setFloors([]);
      setRooms([]);
      setRoomDetails(null);
      setActiveFloor(0);

}

  function handleSearchSubmit(event) {

	  event.preventDefault();

	  if(searchResults[0]){

	    selectBuilding(
	      searchResults[0].building_id
	    );

	    setQuery(
	      searchResults[0].building_name
	    );

	  }
  }

  return (
    <main className="app-shell">
      <aside className="sidebar" aria-label="Main navigation">
        <a className="brand" href="#top" aria-label="Wilson home">
          <img src={campusLogo} alt="" aria-hidden="true" />
          <span>WILSON</span>
        </a>

        <nav className="nav-list">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.label}
                to={item.path}
                className={`nav-item ${activeNav === item.label ? "is-active" : ""}`}
                onClick={() => setActiveNav(item.label)}
              >
                <Icon size={18} aria-hidden="true" />
                <span>{item.label}</span>
              </Link>
            );
          })}

          {isLoggedIn ? (
            <button
		type="button"
		className="nav-item nav-item-button"
		onClick={logout}
		>
		    <LogOut size={18}/>
		    <span>Log Out</span>
		</button>
          ) : (
            <Link to="/" className="nav-item" onClick={() => setActiveNav("Go back")}>
              <ArrowLeft size={18} aria-hidden="true" />
              <span>Go back</span>
            </Link>
          )}
        </nav>

        <div className="user-strip">
          <span>{isLoggedIn ? ROLE_NAMES[user.role_id] ?? "Account" : "Not logged in"}</span>
        </div>
      </aside>

      <section className="workspace" id="top">
        <header className="topbar">
          <form className="search-area" onSubmit={handleSearchSubmit}>
            <div className="search-box">
              <Search size={17} aria-hidden="true" />
              <input
                aria-label="Search building or room"
                type="search"
                placeholder="Search building or room..."
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />

              {searchResults.length > 0 && (
                <div className="search-results" role="listbox" aria-label="Search results">
                  {searchResults.map((building) => (
                    <button
                      key={building.building_id}
                      type="button"
                      role="option"
                      onClick={()=>{
		      selectBuilding(building.building_id);
			    setQuery(building.building_name);
			}}
                    >
                      <Building2 size={15} aria-hidden="true" />
                      <span>{building.building_name}</span>
                      <small>
			{
			building.building_name
			.substring(0,2)
			.toUpperCase()
			}
			</small>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button className="primary-button" type="submit">
              <Search size={15} aria-hidden="true" />
              <span>Search</span>
            </button>
          </form>

          <div className="top-actions" aria-label="Quick actions">
            <button className="icon-button" type="button" aria-label="Filters">
              <SlidersHorizontal size={18} aria-hidden="true" />
            </button>
            <button className="icon-button has-dot" type="button" aria-label="Notifications">
              <Bell size={18} aria-hidden="true" />
            </button>
          </div>
        </header>

        <div className="title-row">
          <div>
            <p className="eyebrow">Campus Navigator</p>
            <h1>Campus Map</h1>
            <p className="title-helper">
              Select a building to open floors. Zoom controls stay fixed near the map.
            </p>
          </div>
          <div className="stat-row" aria-label="Campus summary">
            {[
		{
		    label:"Buildings",
		    value:buildings.length
		  },
		  {
		    label:"Rooms",
		    value:roomCount
		  }
		].map((stat)=>(
              <div className="stat-pill" key={stat.label}>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="content-grid">
          <section className="map-section" aria-label="Interactive campus area">
            <CampusCanvas
              buildings={buildings}
              selectedId={selectedId}
              onSelectBuilding={selectBuilding}
              zoom={zoom}
            />

            <div className="map-controls" aria-label="Map zoom controls">
              <button
                className="icon-button"
                type="button"
                aria-label="Zoom in"
                onClick={() => setZoom((value) => Math.min(value + 0.08, 1.24))}
              >
                <ZoomIn size={18} aria-hidden="true" />
              </button>
              <button
                className="icon-button"
                type="button"
                aria-label="Zoom out"
                onClick={() => setZoom((value) => Math.max(value - 0.08, 0.86))}
              >
                <ZoomOut size={18} aria-hidden="true" />
              </button>
            </div>
          </section>

          <aside className="building-panel" aria-label="Building preview">
            <div className="panel-header">
              <span>Building Preview</span>
              <Building2 size={18} aria-hidden="true" />
            </div>

            {selectedBuilding ? (
              <>
                <h2>{selectedBuilding.building_name}</h2>
                <p>
		Selected building
		</p>

                <button className="wide-button" type="button">
                  <Layers3 size={17} aria-hidden="true" />
                  <span>Open floors</span>
                </button>

                <div className="floor-tabs" aria-label="Floors">
                  {floors.map((floor,index)=>(
		<button
			key={floor.floor_id}
			className={activeFloor===index ? "is-active":""}
			onClick={()=>{

			    setActiveFloor(index);
			    setRooms([]);
			    setSelectedRoom(null);

			}}
			>
			{floor.floor_number}
			</button>
		))}
                </div>

                {floors[activeFloor] && (
                  <div className="floor-card">
                    <span>
			{floors[activeFloor].floor_name}
			</span>

			<strong>
			Floor {floors[activeFloor].floor_number}
			</strong>
                    <small>
			Select this floor to view rooms
		    </small>
                  </div>
                )}
                
                <div className="room-list">
                
		{
		selectedRoom && (

		<div className="room-details">

		<h3>
		Room Details
		</h3>


		<h2>
		{roomDetails.room_name}
		</h2>


		<p>
		<strong>
		Code:
		</strong>
		{roomDetails.room_code}
		</p>


		<p>
		<strong>
		Type:
		</strong>
		{roomDetails.room_type}
		</p>


		<p>
		<strong>
		Status:
		</strong>
		{roomDetails.room_status}
		</p>


		<p>
		<strong>
		Office Hours:
		</strong>

		{
		roomDetails.office_hours ??
		"No schedule available"
		}

		</p>


		</div>

		)
		}

		<h3>
		    Rooms
		</h3>


		{
		rooms.length > 0 ? (

		rooms.map((room)=>(

		<button
		key={room.room_id}
		className="room-item"
		type="button"
		onClick={() => setSelectedRoomId(room.room_id)}
		>

		<div>
		<strong>
		{room.room_name}
		</strong>

		<span>
		{room.room_code}
		</span>
		</div>

		<small>
		{room.room_type}
		</small>

		</button>

		))

		)

		:

		(

		<p>
		No rooms available
		</p>

		)

		}

		</div>

                <div className="route-card">
                  <Navigation size={18} aria-hidden="true" />
                  <div>
                    <span>Next step</span>
                    <strong>Courtyard route</strong>
                  </div>
                  <ChevronRight size={18} aria-hidden="true" />
                </div>
              </>
            ) : (
              <p className="title-helper">Click a building on the map to see its details.</p>
            )}
          </aside>
        </div>
      </section>
    </main>
  );
}

function CampusCanvas({ buildings: campusBuildings, selectedId, onSelectBuilding, zoom }) {
  return (
    <div className="campus-frame">
      <div className="campus-surface" style={{ "--zoom": zoom }}>
        <div className="campus-title">
          <span>Ateneo de Naga</span>
          <strong>University</strong>
        </div>

        <div className="campus-road road-main" />
        <div className="campus-road road-cross" />
        <div className="campus-road road-short" />
        <div className="campus-lake" />

        {Array.from({ length: 26 }).map((_, index) => (
          <span
            className="tree"
            key={index}
            style={{
              "--x": `${8 + ((index * 17) % 82)}%`,
              "--y": `${12 + ((index * 23) % 75)}%`,
              "--s": `${0.72 + (index % 4) * 0.1}`
            }}
            aria-hidden="true"
          />
        ))}

        {campusBuildings.map((building) => (
          <button
            className={`campus-building tone-${building.tone} ${
              selectedId === building.building_id ? "is-selected" : ""
            }`}
            key={building.building_id}
            style={{
              left: `${building.left}%`,
              top: `${building.top}%`,
              width: `${building.width}%`,
              height: `${building.height}%`,
              "--rotate": `${building.rotate}deg`
            }}
            type="button"
            onClick={() => onSelectBuilding(building.building_id)}
            aria-label={building.building_name}
          >
            <span className="building-roof" />
            <span className="building-code">{building.code}</span>
            <span className="building-name">
		{building.building_name}
	    </span>
          </button>
        ))}

        <div className="campus-legend" aria-label="Building codes">
          <span>Building Codes</span>
          <p>PH - Phelan Hall</p>
          <p>XH - Xavier Hall</p>
          <p>UL - Library</p>
          <p>SC - Science Center</p>
        </div>
      </div>
    </div>
  );
}

export default Map;
