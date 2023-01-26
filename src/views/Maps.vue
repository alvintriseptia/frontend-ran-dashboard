<script>
import * as THREE from "three";
import { latLngToVector3, ThreeJSOverlayView } from "@googlemaps/three";
import { Loader } from "@googlemaps/js-api-loader";

export default {
	setup() {
		const center = { lat: -7.044723, lng: 110.461959 };
		const mapOptions = {
			center,
			zoom: 16,
			heading: 45,
			tilt: 70,
			mapId: "6d96f37592d1bd91",
			disableDefaultUI: true,
		};

		const markers = [
			{
				position: { lat: -7.044723, lng: 110.461959 },
				title: "Marker 1",
				height: 100,
				color: "red",
			},
			{
				position: { lat: -7.034323, lng: 110.461959 },
				title: "Marker 2",
				height: 200,
				color: 0x007500,
			},
			{
				position: { lat: -7.038323, lng: 110.465439 },
				title: "Marker 3",
				height: 300,
				color: 0x007500,
			},
		];

		new Loader(mapOptions).load().then(() => {
			// instantiate the map
			const map = new google.maps.Map(
				document.getElementById("map"),
				mapOptions
			);

			// instantiate a ThreeJS Scene
			const scene = new THREE.Scene();

			markers.forEach((marker) => {
				const geometry = new THREE.BoxGeometry(50, marker.height, 50);
				const material = new THREE.MeshBasicMaterial({ color: marker.color });
				const cube = new THREE.Mesh(geometry, material);
				cube.position.copy(latLngToVector3(marker.position));
				scene.add(cube);

				// add content to the marker
				const mapsMarker = new google.maps.Marker({
					position: marker.position,
					map,
					title: marker.title,
					opacity: 0,
				});

				var infoWindow = new google.maps.InfoWindow({
					disableAutoPan: true,
				});

				mapsMarker.addListener("click", () => {
					infoWindow.close();
					infoWindow.setContent(mapsMarker.title);
					infoWindow.open({ map, anchor: mapsMarker, shouldFocus: false });
				});
			});

			// instantiate the ThreeJS Overlay with the scene and map
			const overlay = new ThreeJSOverlayView({
				scene,
				map,
				THREE,
			});
		});
	},
	data() {
		return {};
	},
};
</script>

<template>
	<div id="map" class="w-screen h-screen"></div>
</template>
