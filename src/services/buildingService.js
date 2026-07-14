import API from "../api/api";


export function getBuildings(){
    return API.get("/buildings");
}


export function getFloors(buildingId){
    return API.get(`/floors/${buildingId}`);
}


export function getRooms(floorId){
    return API.get(`/rooms/${floorId}`);
}


export function getRoomDetails(roomId){
    return API.get(`/rooms/details/${roomId}`);
}
