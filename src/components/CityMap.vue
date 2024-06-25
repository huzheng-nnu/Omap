<template>
  <div id="map"></div>
</template>

<script>
import mapboxgl from 'mapbox-gl';
import olympics from '@/assets/举办城市.geojson'; // 导入GeoJSON文件

export default {
  name: 'CityMap',
  data() {
    return {
      geojsonData: olympics
    };
  },
  mounted() {
    mapboxgl.accessToken = 'pk.eyJ1Ijoia2V5MzY4IiwiYSI6ImNsdzhseDZ4NzI1czkycXB5aDlwNGJiNGEifQ.54-pZmkWIrbPdfupg45lvg';

    var map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/key368/clxuflste00rq01rncwjbb2sk', // 根据你的需要选择地图样式
      center: [0, 20], // 设置地图中心点
      zoom: 1.5, // 设置地图的缩放级别
    });

    // 添加地图控件（例如导航控件）
    map.addControl(new mapboxgl.NavigationControl());

    map.on('load', () => {
      // 添加点图层
      map.addSource('olympics-geojson', {
        type: 'geojson',
        data: this.geojsonData
      });

      map.addLayer({
        id: 'olympics-geojson-layer',
        type: 'circle',
        source: 'olympics-geojson',
        paint: {
          'circle-radius': 6, // 点的半径
          'circle-color': '#FD763F' // 点的颜色
        }
      });

      map.addLayer({
        id: 'city-labels-layer',
        type: 'symbol',
        source: 'olympics-geojson',
        layout: {
          'text-field': ['get', '举办城市'],
          'text-font': ['Open Sans Bold', 'Arial Unicode MS Bold'],
          'text-size': 12,
          'text-offset': [0, 1.2],
          'text-anchor': 'top'
        },
        paint: {
          'text-color': '#333',
          'text-halo-color': '#ffffff',
          'text-halo-width': 1
        }
      });

      var popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false
      });

      map.on('mousemove', 'olympics-geojson-layer', (e) => {
        map.getCanvas().style.cursor = 'pointer';

        if (e.features.length > 0) {
          const feature = e.features[0];
          const remarks = feature.properties['备注'];
          const remarksHTML = remarks ? `<div style="margin-top:5px"><span style="color:#999">备注：</span><span>${remarks}</span></div>` : '';

          popup
            .setLngLat(e.lngLat)
            .setHTML(
              `<div class="hover-popup">
                <div style="font-size:14px; color:#333">
                  <div style="font-weight:bold">第${feature.properties['第几届']}届奥林匹克运动会</div>
                  <div style="margin-top:5px"><span style="color:#999;">时间：</span><span>${feature.properties['时间']}</span></div>
                  <div style="margin-top:5px"><span style="color:#999">举办国家：</span><span>${feature.properties['举办国家']}</span></div>
                  <div style="margin-top:5px"><span style="color:#999">举办城市：</span><span>${feature.properties['举办城市']}</span></div>
                  ${remarksHTML}
                </div>
              </div>`
            )
            .addTo(map);
          popup.setOffset([0, -600]);
        } else {
          popup.remove();
        }
      });

      map.on('mouseleave', 'olympics-geojson-layer', () => {
        map.getCanvas().style.cursor = '';
        popup.remove();
      });

      // 添加点击事件
      map.on('click', 'olympics-geojson-layer', (e) => {
        if (e.features.length > 0) {
          const feature = e.features[0];
          const coordinates = feature.geometry.coordinates;
          map.flyTo({
            center: coordinates,
            zoom: 10, // 设置点击后的缩放级别，可以根据需要调整
            speed: 2 // 设置飞行动画的速度，越大越快
          });
        }
      });
    });
  }
}
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

.mapboxgl-popup {
  max-width: 200px;
}

.mapboxgl-popup-content {
  text-align: center;
  font-family: 'Open Sans', sans-serif;
}
</style>
