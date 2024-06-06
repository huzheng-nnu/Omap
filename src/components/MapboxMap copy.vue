<template>
  <div id="map"></div>
</template>

<script>
import mapboxgl from 'mapbox-gl';

export default {
  name: 'MapboxMap',
  props: {
    geojsonData: {
      type: Object,
      required: true
    }
  },
  mounted() {
    mapboxgl.accessToken = 'pk.eyJ1Ijoia2V5MzY4IiwiYSI6ImNsdzhseDZ4NzI1czkycXB5aDlwNGJiNGEifQ.54-pZmkWIrbPdfupg45lvg';

    var map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/key368/cltzdlcvz00fk01mj807p3ltq', // 根据你的需要选择地图样式
      center: [2.3522, 48.8566], // 设置地图中心点的经纬度为法国的中心点
      zoom: 5, // 设置地图的缩放级别
    });

    // 设置地图范围为法国
    const bounds = [
      [ -5.138, 41.333 ], // Southwest coordinates
      [ 9.663, 51.124 ]  // Northeast coordinates
    ];
    map.fitBounds(bounds);

    // 添加地图控件（例如导航控件）
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

      var popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false,
      });

      map.on('mousemove', 'custom-geojson-layer', (e) => {
        map.getCanvas().style.cursor = 'pointer';

        const latLongData = [e.lngLat.lng, e.lngLat.lat];

        if (e.features.length > 0) {
          const feature = e.features[0];
          console.log(feature); // 调试输出feature对象
          popup
            .setLngLat(latLongData)
            .setHTML(
              `<div class="hover-popup">
                <div style="font-size:14px; color:#333">
                  <div style="font-weight:bold">${feature.properties['项目名']}</div>
                  <div style="margin-top:5px"><span style="color:#999;">项目介绍：</span><span>${feature.properties['项目介绍']}</span></div>
                  <div style="margin-top:5px"><span style="color:#999">比赛时间：</span><span>${feature.properties['比赛时间']}</span></div>
                </div>
              </div>`
            )
            .addTo(map);
        } else {
          popup.remove();
        }
      });

      map.on('mouseleave', 'custom-geojson-layer', () => {
        map.getCanvas().style.cursor = '';
        popup.remove();
      });
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

.mapboxgl-ctrl-attrib-button{
  display: none;
}

.mapboxgl-ctrl-attrib-inner{
  display: none;
}
</style>
