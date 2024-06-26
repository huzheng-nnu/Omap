<template>
  <div id="map">
</div>
</template>

<script>
import mapboxgl from 'mapbox-gl';
import event_venues from '@/assets/比赛场馆.geojson'; // 导入GeoJSON文件
import event_route from "@/assets/奥运会比赛路线.geojson"; // 导入GeoJSON文件
import { EventBus1 } from '@/EventBus1.js';
import { EventBus2 } from '@/EventBus2.js';


export default {
  name: 'RouteMap',
  data() {
    return {
      map: null, // 地图实例
      hoveredFeature: null, // 当前悬停特征信息
      clickedFeature: null, // 当前点击特征信息
      fireMarkerPosition: null,// 火炬标记的位置
      specificFeatureId: -1,
      linewidthID: -1,
    };
  },
  mounted() {
    mapboxgl.accessToken = 'pk.eyJ1IjoibHdjeCIsImEiOiJjbHd3N3V6NzcwdHNwMm1yMTZocmFpcW9tIn0.02n3EfWEQ6aL9PL1RDAgLA';

    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/lwcx/clxfz1vei004001pu5ivh503z', // 根据你的需要选择地图样式
      center: [2.3522, 48.8566], // 设置地图中心点的经纬度为巴黎的中心点
      zoom: 5, // 设置地图的缩放级别
    });

    // 设置地图范围为法国
    const bounds = [
    [1.824199, 48.615573], // Southwest coordinates (巴黎的经纬度)
    [2.60992, 49.02145]   // Northeast coordinates (巴黎的经纬度)
    ];
    this.map.fitBounds(bounds);

    this.map.addControl(new mapboxgl.NavigationControl());

    this.map.on('load', () => {
      this.initializeMap();
    });

    this.map.on('mousemove', this.handleMapHover);
    this.map.on('click', 'event-venues', (e) => {
    const feature = e.features[0]; // 获取点击的特征信息
    // 在初始化地图后，为 'event-venues' 图层添加鼠标悬停效果
    this.map.on('mouseenter', 'event-venues', () => {
      this.map.getCanvas().style.cursor = 'pointer';
    });

    this.map.on('mouseleave', 'event-venues', () => {
      this.map.getCanvas().style.cursor = '';
    });
     if(feature!=null)
      {
        this.specificFeatureId=feature.properties.编号;
        console.log(this.specificFeatureId); 
        this.updatespecificFeatureId();
        this.linewidthID=-1;
        this.updateLineWidth();
        }
      else{
    this.specificFeatureId = -1;} 
 
  this.handleFeatureClick(feature); // 调用 handleFeatureClick 方法处理点击事件
});
  this.map.on('click', 'event-routes', (e) => {
      const feature = e.features[0]; // 获取点击的特征信息
      // 在初始化地图后，为 'event-routes' 图层添加鼠标悬停效果
      this.map.on('mouseenter', 'event-routes', () => {
        this.map.getCanvas().style.cursor = 'pointer';
      });

      this.map.on('mouseleave', 'event-routes', () => {
        this.map.getCanvas().style.cursor = '';
      });
      if(feature!=null)
      {
        this.linewidthID=feature.properties.type;
        console.log(this.linewidthID); 
        // 更新地图线的宽度
        this.updateLineWidth();
        this.specificFeatureId= -1;
        this.updatespecificFeatureId();
      }
      else{this.linewidthID=-1;}
 
    this.handleFeatureClick1(feature); // 调用 handleFeatureClick 方法处理点击事件
  });
  this.map.on('click', (e) => {
  // 获取点击位置下的所有图层
  const features = this.map.queryRenderedFeatures(e.point);

  // 检查是否点击了 'event-routes' 或 'event-venues' 图层以外的区域
  const clickedOutsideEventLayers = !features.some(feature => {
    const layerId = feature.layer.id;
    return layerId === 'event-routes' || layerId === 'event-venues';
  });

  if (clickedOutsideEventLayers) {
    // 执行点击 'event-routes' 或 'event-ents' 图层外部时的操作
    const feature =null;
    this.linewidthID = -1;
    this.updateLineWidth();
    this.specificFeatureId= -1;
    this.updatespecificFeatureId();
    this.handleFeatureClick(feature);
    this.handleFeatureClick1(feature);
  }
});

  },
  methods: {
    initializeMap() {

    this.map.addLayer({
      id: 'event-routes',
      type: 'line',
      source: {
        type: 'geojson',
        data: event_route,
      },
      paint: {
        'line-color': [
          'match',
          ['get', 'type'], // 根据路线的唯一标识符选择颜色字段
          1, '#FF5733',    // 路线1的颜色 - 橙色
          2, '#33FF57',    // 路线2的颜色 - 绿色
          3, '#FFD700',    // 路线3的颜色 - 金黄色
          4, '#00FFFF',    // 路线4的颜色 - 青色
          5, '#FF6347',    // 路线5的颜色 - 珊瑚红
          6, '#FFA500',    // 路线6的颜色 - 橙色
          7, '#FF1493',    // 路线7的颜色 - 深粉红
          8, '#ADFF2F',    // 路线8的颜色 - 青柠绿
          9, '#FF69B4',    // 路线9的颜色 - 热情的粉红
          10, '#32CD32',   // 路线10的颜色 - 酸橙绿
          '#808080' // 默认颜色（灰色），用于所有未匹配到的路线
            ],
        'line-width': [
      'case',
      ['==', ['get', 'type'], this.linewidthID], 6,  // 当 type 等于 this.linewidthID 时，line-width 设为 5
      3  // 其他情况下，line-width 设为 3

    ],
      },
    });
    this.map.addLayer({
      id: 'event-venues',
      type: 'symbol', // 修改为 symbol 类型
      source: {
        type: 'geojson',
        data: event_venues,
      },
      layout: {
        'icon-image':[
      'case',
      ['==', ['get', '编号'], this.specificFeatureId], 'venueslogo2','venueslogo1' ],// 默认的图标名称,
        'icon-size':[
      'case',
      ['==', ['get', '编号'], this.specificFeatureId], 0.75,0.7 ]
        // 图片的名称，需要事先添加到 Mapbox 的样式中
      },
      paint: {
        // 如果需要设置符号的额外样式，可以在这里进行配置，比如设置符号的填充颜色、边框等
      },
    });

    

    },
    updatespecificFeatureId() {
  const layerId = 'event-venues';
  // 设置 'icon-image' 属性
  this.map.setLayoutProperty(layerId, 'icon-image', [
    'case',
    ['==', ['get', '编号'], this.specificFeatureId], 'venueslogo2', 'venueslogo1'
  ]);
  this.map.setLayoutProperty(layerId, 'icon-size', [
    'case',
    ['==', ['get', '编号'], this.specificFeatureId], 0.75, 0.7
  ]);
},
          // 更新地图线宽度的方法
    updateLineWidth() {
        // 获取地图中的图层
        const layerId = 'event-routes';
        // 设置 'img' 属性
      this.map.setPaintProperty(layerId, 'line-width', [
          'case',
          ['==', ['get', 'type'], this.linewidthID], 6,  // 当 type 等于 this.linewidthID 时，line-width 设为 5
          3  // 其他情况下，line-width 设为 3
        ]);
        
      },
     

    showFeatureInfo(feature) {
      // 悬停特征时更新悬停的特征信息，但仅当没有点击的特征时才更新
      if (!this.clickedFeature) {
        this.hoveredFeature = feature;
      }
    },
    hideFeatureInfo() {
      // 离开时清除悬停的特征信息，但仅当没有点击的特征时才清除
      if (!this.clickedFeature) {
        this.hoveredFeature = null;
      }
    },
    handleFeatureClick(feature) {
      // 点击特征时更新点击的特征信息
      this.clickedFeature = feature;
      EventBus1.emit('detailed-result-updated1', feature);
      

    },
    handleFeatureClick1(feature) {
    // 点击特征时更新点击的特征信息
      this.clickedFeature = feature;
      EventBus2.emit('detailed-result-updated2', feature);
      

    },
    handleMapHover(e) {
      const features = this.map.queryRenderedFeatures(e.point, {
        layers: ['fire-geojson-layer']
      });
      if (features.length) {
        this.hoveredFeature = features[0];
      } else {
        this.hoveredFeature = null;
      }
    },
    handleMapClick(e) {
      const features = this.map.queryRenderedFeatures(e.point, {
        layers: ['fire-geojson-layer']
      });
      if (features.length) {
        this.clickedFeature = features[0];
        this.flyToPoint(features[0].geometry.coordinates);
      }
    },
    handleFeatureHover(feature) {
      // 悬停特征时更新显示的信息内容，但仅当没有点击的特征时才更新
      if (!this.clickedFeature) {
        this.showInfoContent = feature;
      }
    },
    handleFeatureLeave() {
      // 离开时清除悬停的特征信息，但仅当没有点击的特征时才清除
      if (!this.clickedFeature) {
        this.showInfoContent = null;
      }
    }
  }
};
</script>

<style>
#map {
  width: 100%;
  height: 100%;
  overflow: hidden; /* 超出部分隐藏 */
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
