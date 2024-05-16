<template>
    <div>
      <div id="viewDiv"></div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ArcgisMap',
    mounted() {
      this.initializeMap();
    },
    methods: {
      initializeMap() {
        require([
          "esri/config",
          "esri/Map",
          "esri/views/MapView"
        ], function(esriConfig, Map, MapView) {
          esriConfig.apiKey = "AAPK83bc644dd0184868ba4a90d876648ff71oSr23yi9uigzUvbj5HfvKS0qllz4Ar2diA9SANY3vRO9RR3mgD-1wetAaLNkSxt";
  
          const map = new Map({
            basemap: "arcgis/topographic"
          });
  
          // const view = new MapView({
          new MapView({
            map: map,
            center: [-118.80500, 34.02700],
            zoom: 13,
            container: "viewDiv"
          });
        });
      }
    }
  };
  </script>
  
  <style scoped>
  #viewDiv {
    height: 100vh;
    width: 100%;
  }
  </style>
  