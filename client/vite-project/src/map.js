import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoiMjIwNDUycCIsImEiOiJjbGhtNzJ6NXIweDRxM2VzMWRlZ3EyMWs5In0.cbZze-te-AaeUShf6ZsP8w';
const map = new mapboxgl.Map({
container: 'map',
style: 'mapbox://styles/mapbox/streets-v11',
center: [1.29,103.8]
});

export default map;