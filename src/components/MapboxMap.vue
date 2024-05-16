<template>
  <div id="map"></div>
</template>

<script>
import mapboxgl from 'mapbox-gl';

export default {
  name: 'MapboxMap',
  mounted() {
    mapboxgl.accessToken = 'pk.eyJ1Ijoia2V5MzY4IiwiYSI6ImNsdzhseDZ4NzI1czkycXB5aDlwNGJiNGEifQ.54-pZmkWIrbPdfupg45lvg';

    // const map = new mapboxgl.Map({
    //   container: 'map',
    //   style: 'mapbox://styles/mapbox/streets-v11', // 根据你的需要选择地图样式
    //   center: [-74.5, 40], // 设置地图中心点的经纬度
    //   zoom: 9 // 设置地图的缩放级别
    // });

    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/key368/cltzdlcvz00fk01mj807p3ltq', // 根据你的需要选择地图样式
      center: [2.3522, 48.8566], // 设置地图中心点的经纬度为法国的中心点
      zoom: 5, // 设置地图的缩放级别
      showZoomControl: false, // 隐藏缩放控件
      showAttributionControl: false, // 隐藏属性控件
      showRotationControl: false, // 隐藏旋转控件
      showFullscreenControl: false // 隐藏全屏控件
    });

    // 设置地图范围为法国
    const bounds = [
      [ -5.138, 41.333 ], // Southwest coordinates
      [ 9.663, 51.124 ]  // Northeast coordinates
    ];
    map.fitBounds(bounds);



    // 添加地图控件（例如导航控件）
    map.addControl(new mapboxgl.NavigationControl());
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
