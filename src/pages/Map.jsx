import React, { useMemo, useState } from "react";
import "../styles/Layout.css";
import { Link, useNavigate } from "react-router-dom";
import DocumentTitle from "../hooks/DocumentTitle";
import { canAccess, getCurrentUser } from "../utils/permissions";
import { logout } from "../utils/auth";
import {
  ArrowLeft,
  Bell,
  Building2,
  CalendarCheck,
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

const buildings = [
  {
    id: "phelan",
    name: "Phelan Hall",
    code: "PH",
    floors: 3,
    rooms: 42,
    occupancy: "Open",
    tone: "blue",
    left: 62,
    top: 42,
    width: 16,
    height: 14,
    rotate: -8
  },
  {
    id: "xavier",
    name: "Xavier Hall",
    code: "XH",
    floors: 4,
    rooms: 58,
    occupancy: "Busy",
    tone: "teal",
    left: 35,
    top: 25,
    width: 17,
    height: 13,
    rotate: 8
  },
  {
    id: "arrupe",
    name: "Arrupe Hall",
    code: "AH",
    floors: 2,
    rooms: 28,
    occupancy: "Open",
    tone: "yellow",
    left: 17,
    top: 55,
    width: 19,
    height: 15,
    rotate: -1
  },
  {
    id: "library",
    name: "University Library",
    code: "UL",
    floors: 5,
    rooms: 35,
    occupancy: "Open",
    tone: "navy",
    left: 50,
    top: 61,
    width: 16,
    height: 13,
    rotate: 8
  },
  {
    id: "bonoan",
    name: "Bonoan Building",
    code: "BB",
    floors: 4,
    rooms: 64,
    occupancy: "Limited",
    tone: "green",
    left: 73,
    top: 22,
    width: 15,
    height: 13,
    rotate: -10
  },
  {
    id: "admin",
    name: "Administration",
    code: "AD",
    floors: 3,
    rooms: 22,
    occupancy: "Open",
    tone: "coral",
    left: 30,
    top: 72,
    width: 17,
    height: 12,
    rotate: 7
  }
];

const floorData = {
  phelan: [
    { label: "Floor 1", status: "Classrooms", available: 9 },
    { label: "Floor 2", status: "Faculty rooms", available: 6 },
    { label: "Floor 3", status: "Labs", available: 4 }
  ],
  xavier: [
    { label: "Floor 1", status: "Lobby", available: 5 },
    { label: "Floor 2", status: "Lecture halls", available: 10 },
    { label: "Floor 3", status: "Studios", available: 7 },
    { label: "Floor 4", status: "Offices", available: 4 }
  ],
  arrupe: [
    { label: "Floor 1", status: "Student services", available: 7 },
    { label: "Floor 2", status: "Guidance", available: 3 }
  ],
  library: [
    { label: "Floor 1", status: "Stacks", available: 12 },
    { label: "Floor 2", status: "Reading areas", available: 14 },
    { label: "Floor 3", status: "Archives", available: 2 },
    { label: "Floor 4", status: "Media", available: 5 },
    { label: "Floor 5", status: "Research", available: 3 }
  ],
  bonoan: [
    { label: "Floor 1", status: "Chemistry", available: 3 },
    { label: "Floor 2", status: "Biology", available: 5 },
    { label: "Floor 3", status: "Physics", available: 4 },
    { label: "Floor 4", status: "Research", available: 1 }
  ],
  admin: [
    { label: "Floor 1", status: "Registrar", available: 4 },
    { label: "Floor 2", status: "Finance", available: 3 },
    { label: "Floor 3", status: "Dean offices", available: 2 }
  ]
};

const campusStats = [
  { label: "Buildings", value: "12" },
  { label: "Available rooms", value: "92" },
  { label: "Appointments", value: "18" }
];

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
  const navigate = useNavigate();

  const [activeNav, setActiveNav] = useState("Map");
  const [selectedId, setSelectedId] = useState(null);
  const [query, setQuery] = useState("");
  const [zoom, setZoom] = useState(1);
  const [activeFloor, setActiveFloor] = useState(0);

  const user = getCurrentUser();
  const isLoggedIn = user !== null;
  const isFacultyStaff = canAccess("FACULTY_STAFF");
  const buildingSelected = selectedId !== null;

  const selectedBuilding = buildings.find((building) => building.id === selectedId) ?? null;
  const floors = selectedBuilding ? floorData[selectedBuilding.id] ?? [] : [];

  const searchResults = useMemo(() => {
    const cleanQuery = query.trim().toLowerCase();
    if (!cleanQuery) return [];

    return buildings.filter((building) => {
      return (
        building.name.toLowerCase().includes(cleanQuery) ||
        building.code.toLowerCase().includes(cleanQuery)
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
    setActiveFloor(0);
  }

  function handleSearchSubmit(event) {
    event.preventDefault();
    if (searchResults[0]) {
      selectBuilding(searchResults[0].id);
      setQuery(searchResults[0].name);
    }
  }

  function handleLogout() {

    localStorage.removeItem("user");
    localStorage.removeItem("token");

    navigate("/");

    window.location.reload();
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
                      key={building.id}
                      type="button"
                      role="option"
                      onClick={() => {
                        selectBuilding(building.id);
                        setQuery(building.name);
                      }}
                    >
                      <Building2 size={15} aria-hidden="true" />
                      <span>{building.name}</span>
                      <small>{building.code}</small>
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
            {campusStats.map((stat) => (
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
                disabled={zoom <= 1.0}  // Disable when at or below default
                onClick={() => setZoom((value) => Math.max(value - 0.08, 1.0))}
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
                <h2>{selectedBuilding.name}</h2>
                <p>
                  Floors: {selectedBuilding.floors} <span>{selectedBuilding.rooms} rooms</span>
                </p>

                {/* REMOVED: <button className="wide-button" type="button"> */}
                {/*   <Layers3 size={17} aria-hidden="true" /> */}
                {/*   <span>Open floors</span> */}
                {/* </button> */}

                <div className="floor-tabs" aria-label="Floors">
                  {floors.map((floor, index) => (
                    <button
                      key={floor.label}
                      className={activeFloor === index ? "is-active" : ""}
                      type="button"
                      onClick={() => setActiveFloor(index)}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>

                {floors[activeFloor] && (
                  <div className="floor-card">
                    <span>{floors[activeFloor].label}</span>
                    <strong>{floors[activeFloor].status}</strong>
                    <small>{floors[activeFloor].available} rooms available</small>
                  </div>
                )}
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
              selectedId === building.id ? "is-selected" : ""
            }`}
            key={building.id}
            style={{
              left: `${building.left}%`,
              top: `${building.top}%`,
              width: `${building.width}%`,
              height: `${building.height}%`,
              "--rotate": `${building.rotate}deg`
            }}
            type="button"
            onClick={() => onSelectBuilding(building.id)}
            aria-label={building.name}
          >
            <span className="building-roof" />
            <span className="building-code">{building.code}</span>
            <span className="building-name">{building.name}</span>
          </button>
        ))}

        <div className="campus-legend" aria-label="Building codes">
          <span>Building Codes</span>
          <p>PH - Phelan Hall</p>
          <p>XH - Xavier Hall</p>
          <p>UL - Library</p>
          <p>BB - Bonoan Building</p>
        </div>
      </div>
    </div>
  );
}

export default Map;
