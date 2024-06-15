<template>
  <div id="map"></div>
</template>

<script>
import mapboxgl from 'mapbox-gl';

export default {
  name: 'MapBoxMap',
  props: {
    geojsonData: {
      type: Object,
      required: true
    }
  },
  mounted() {
    mapboxgl.accessToken = 'pk.eyJ1Ijoia2V5MzY4IiwiYSI6ImNsdzhseDZ4NzI1czkycXB5aDlwNGJiNGEifQ.54-pZmkWIrbPdfupg45lvg';

    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/key368/cltzdlcvz00fk01mj807p3ltq', 
      center: [2.3522, 48.8566],
      zoom: 5,
    });

    const bounds = [
      [-5.138, 41.333],
      [9.663, 51.124]
    ];
    map.fitBounds(bounds);

    map.addControl(new mapboxgl.NavigationControl());

    map.on('load', () => {
      map.addSource('custom-geojson', {
        type: 'geojson',
        data: this.geojsonData
      });

      map.addLayer({
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

      this.$emit('map-loaded', map);
    });
  }
};
</script>

<style>
#map {
  width: 100%;
  height: 100%;
}

.mapboxgl-ctrl-group {
  display: none;
}

.mapboxgl-ctrl-attrib-button {
  display: none;
}

.mapboxgl-ctrl-attrib-inner {
  display: none;
}

.hover-popup {
  position: relative;
  pointer-events: none;
  background-color: white;
}
</style>
