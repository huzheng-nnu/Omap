<template>
  <div>
    <div id="map"></div>
    <button class="customButton" @click="startAnimation">播放传递路线</button>
  </div>
</template>

<script>
import mapboxgl from 'mapbox-gl';
import CHINAMAP from '@/assets/火炬传递路线.geojson';
import fire_route from "@/fire.geojson";
//import torch_relay from "@/torch_relay.geojson";
import new_torch from "@/new_torch.geojson";

export default {
  name: 'RouteMap',
  data() {
    return {
      geojsonData: CHINAMAP,
      map: null, // 保存地图实例
    };
  },
  mounted() {
    mapboxgl.accessToken = 'pk.eyJ1Ijoia2V5MzY4IiwiYSI6ImNsdzhseDZ4NzI1czkycXB5aDlwNGJiNGEifQ.54-pZmkWIrbPdfupg45lvg';

    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/key368/cltzdlcvz00fk01mj807p3ltq',
      center: [2.3522, 48.8566],
      zoom: 5,
    });

    const bounds = [
      [-5.138, 41.333],
      [9.663, 51.124]
    ];
    this.map.fitBounds(bounds);

    this.map.addControl(new mapboxgl.NavigationControl());

    this.map.on('load', () => {
      this.initializeMap();
    });
  },
  methods: {
    initializeMap() {
      this.map.addSource('custom-geojson', {
        type: 'geojson',
        data: this.geojsonData
      });

      this.map.addLayer({
        id: 'custom-geojson-layer',
        type: 'line',
        source: 'custom-geojson',
        layout: {
          'line-join': 'round',
          'line-cap': 'round'
        },
        paint: {
          'line-color': [
            'case',
            ['==', ['get', '项目名'], '马拉松游泳'], '#FF0000',
            ['==', ['get', '项目名'], '其他项目'], '#00FF00',
            '#000000'
          ],
          'line-width': 4
        }
      });

      this.map.addSource('fire-geojson', {
        type: 'geojson',
        data: fire_route
      });

      this.map.addLayer({
        id: 'fire-geojson-layer',
        type: 'circle',
        source: 'fire-geojson',
        paint: {
          'circle-radius': 5,
          'circle-color': '#FF0000',
          'circle-opacity': 0.5
        }
      });

      this.map.addLayer({
        id: 'fire-geojson-label-layer',
        type: 'symbol',
        source: 'fire-geojson',
        layout: {
          'text-field': ['get', 'stage_name'],
          'text-size': 16,
          'text-anchor': 'top',
          'text-allow-overlap': false
        },
        paint: {
          'text-color': '#000'
        }
      });

      this.map.addSource('line', {
        type: 'geojson',
        data: {
          type: 'Feature',
          geometry: {
            type: 'LineString',
            coordinates: []
          }
        }
      });

      this.map.addLayer({
        id: 'torch-layer',
        type: 'line',
        source: 'line',
        layout: {
          'line-join': 'round',
          'line-cap': 'round'
        },
        paint: {
          'line-color': [
            'match',
            ['get', 'id'],
            1, 'blue',
            6, 'blue',
            8, 'blue',
            'grey'
          ],
          'line-width': 4
        }
      });
    },
    interpolateCoords(start, end, steps) {
      var stepFactor = 1 / (steps - 1);
      var interpolatedArray = [];

      for (var i = 0; i < steps; i++) {
        var interpolatedCoord = [
          start[0] + (end[0] - start[0]) * (i * stepFactor),
          start[1] + (end[1] - start[1]) * (i * stepFactor)
        ];
        interpolatedArray.push(interpolatedCoord);
      }

      return interpolatedArray;
    },
    animateLine(coordinates, index, totalLines, flag) {
      var interpolatedCoordinates = [];
      var segmentIndex = 0;

      if (!coordinates || coordinates.length === 0) {
        console.error('Coordinates are empty or not properly loaded.');
        return;
      }

      var speed = 10;
      if (flag === 1) { speed = 40; }

      for (var i = 0; i < coordinates.length - 1; i++) {
        var segment = this.interpolateCoords(coordinates[i], coordinates[i + 1], speed);
        interpolatedCoordinates = interpolatedCoordinates.concat(segment);
      }

      const animate = () => {
        if (segmentIndex < interpolatedCoordinates.length) {
          this.map.getSource('line').setData({
            type: 'Feature',
            properties: { id: 'line' + index },
            geometry: {
              type: 'LineString',
              coordinates: interpolatedCoordinates.slice(0, segmentIndex + 1)
            }
          });

          var currentPoint = interpolatedCoordinates[segmentIndex];
          if (flag == 1) {
            this.flyToCamera(currentPoint, flag);
          } else {
            this.map.easeTo({ zoom: 5 });
          }

          segmentIndex++;
          setTimeout(animate, 25);
        } else {
          if (index < totalLines - 1) {
            this.animateLine(new_torch.features[index + 1].geometry.coordinates, index + 1, totalLines, new_torch.features[index + 1].properties.flag);
          }
        }
      };

      animate();
    },
    flyToCamera(point, flag) {
      var zoomLine = 5;
      if (flag === 1) { zoomLine = 3; }
      this.map.easeTo({
        center: point,
        zoom: zoomLine,
        duration: 25
      });
    },
    startAnimation() {
      this.animateLine(new_torch.features[0].geometry.coordinates, 0, new_torch.features.length, new_torch.features[0].properties.flag);
    }
  }
};
</script>

<style>
#map {
  width: 100%;
  height: 100vh;
  position: relative;
}

.customButton {
  position: absolute;
  top: 50%;
  right: 10px; /* 调整按钮距离右边的距离 */
  transform: translateY(-50%);
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  z-index: 1;
}
</style>
