<template>
  <div id="map"></div>
</template>

<script>
import mapboxgl from 'mapbox-gl';
import CHINAMAP from '@/assets/火炬传递路线.geojson';

export default {
  name: 'RouteMap',
  data() {
    return {
      geojsonData: CHINAMAP
    };
  },
  mounted() {
    mapboxgl.accessToken = 'pk.eyJ1Ijoia2V5MzY4IiwiYSI6ImNsdzhseDZ4NzI1czkycXB5aDlwNGJiNGEifQ.54-pZmkWIrbPdfupg45lvg';

    const map = new mapboxgl.Map({
      container: 'map',
      // style: 'mapbox://styles/key368/cltzdlcvz00fk01mj807p3ltq',
      style:'mapbox://styles/lwcx/clxfz1vei004001pu5ivh503z',
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
        type: 'circle',
        source: 'custom-geojson',
        paint: {
          'circle-radius': 6,
          'circle-color': '#FF0000'
        }
      });

      this.setupPopup(map);
    });
  },
  methods: {
    setupPopup(map) {
      const popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false
      });

      map.on('mousemove', 'custom-geojson-layer', (e) => {
        if (e.features.length > 0) {
          const feature = e.features[0];
          map.getCanvas().style.cursor = 'pointer';
          popup
            .setLngLat(e.lngLat)
            .setHTML(
              `<div class="hover-popup">
                <div style="font-size:14px; color:#333">
                  <div style="font-weight:bold">${feature.properties['stage_name']}</div>
                  <div style="margin-top:5px"><span style="color:#999;">介绍：</span><span>${feature.properties['introduction']}</span></div>
                  <div style="margin-top:5px"><span style="color:#999">时间：</span><span>${feature.properties['time']}</span></div>
                  <div style="margin-top:5px"><span style="color:#999">途经：</span><span>${feature.properties['via']}</span></div>
                </div>
              </div>`
            )
            .addTo(map);
          popup.setOffset([0, -600]); // Adjust offset as needed
        } else {
          map.getCanvas().style.cursor = '';
          popup.remove();
        }
      });

      map.on('mouseleave', 'custom-geojson-layer', () => {
        map.getCanvas().style.cursor = '';
        popup.remove();
      });
    }
  }
};
</script>

<style >
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
