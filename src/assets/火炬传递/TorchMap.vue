<template>
  <div>
    <div id="map"></div>

    <!-- 新增的火炬标记 -->
    <div class="fire-marker"></div>

    <button class="customButton" @click="startAnimation">播放动画</button>
    <div id="point-list">
      <h2>路线传递阶段列表</h2>
      <div class="point-list-container">
        <ul>
          <li v-for="(feature, index) in sortedFireRouteFeatures" :key="index"
              @click="handleFeatureClick(feature)"
              @mouseover="showFeatureInfo(feature)"
              @mouseleave="hideFeatureInfo"
          >
            {{ feature.properties.stage_name }}
          </li>
        </ul>
      </div>
    </div>
    <div class="hover-info">
      <div class="hover-info-content" v-if="hoveredFeature || clickedFeature">
        <h3>{{ (clickedFeature || hoveredFeature).properties.stage_name }}</h3>
        <p><strong>阶段:</strong> {{ (clickedFeature || hoveredFeature).properties.stage }}</p>
        <p><strong>时间:</strong> {{ (clickedFeature || hoveredFeature).properties.time }}</p>
        <p><strong>经由:</strong> {{ (clickedFeature || hoveredFeature).properties.via }}</p>
        <p><strong>介绍:</strong> {{ (clickedFeature || hoveredFeature).properties.introduction }}</p>
      </div>
      <div v-else class="default-info-content">
        <h3>传递阶段详细信息</h3>
        <p>请用鼠标选中左侧列表或者右侧地图中点数据。</p>
      </div>
    </div>
  </div>
</template>


<script>
import mapboxgl from 'mapbox-gl';
import fire_route from "@/fire.geojson";
import new_torch from "@/new_torch.geojson";

export default {
  name: 'RouteMap',
  data() {
    return {
      map: null, // 地图实例
      hoveredFeature: null, // 当前悬停特征信息
      clickedFeature: null, // 当前点击特征信息
      fireMarkerPosition: null// 火炬标记的位置
    };
  },
  computed: {
    sortedFireRouteFeatures() {
      // 按阶段排序特征列表
      return [...this.fireRouteFeatures].sort((a, b) => {
        return a.properties.stage - b.properties.stage;
      });
    },
    fireRouteFeatures() {
      return fire_route.features || [];
    }
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

    this.map.on('mousemove', this.handleMapHover);
    this.map.on('click', this.handleMapClick);
  },
  methods: {
    initializeMap() {
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
      //var index=0;
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
      var markerEl = document.createElement('div');
        markerEl.className = 'fire-marker';
        var movingMarker = new mapboxgl.Marker(markerEl)
            .setLngLat(interpolatedCoordinates[0])
            .addTo(this.map);

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
          movingMarker.setLngLat(currentPoint);
          //indexx++;

          
          if (flag == 1) {
            this.flyToCamera(currentPoint, flag);
          } else {
            this.map.easeTo({ zoom: 5 });
          }

          segmentIndex++;
         
          setTimeout(animate, 25);
        } else {
          if (index < totalLines - 1) {
            movingMarker.getElement().style.display = 'none';
            this.animateLine(new_torch.features[index + 1].geometry.coordinates, index + 1, totalLines, new_torch.features[index + 1].properties.flag);
          } else {
            // 动画播放结束后的处理
            setTimeout(() => {
              this.map.getSource('line').setData({
                type: 'Feature',
                geometry: {
                  type: 'LineString',
                  coordinates: []
                }
              });
              movingMarker.getElement().style.display = 'none';
            }, 2000); // 2秒后清空线轨迹
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
    },
    flyToPoint(coordinates) {
      this.map.flyTo({
        center: coordinates,
        zoom: 7
      });
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
      // 同时更新显示的信息内容为点击的特征
      this.showInfoContent = feature;
      // 点击特征时飞到对应的点
      this.flyToPoint(feature.geometry.coordinates);
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
  height: 70vh; /* 地图高度设为页面视口高度的70% */
  position: relative;
}

.customButton {
  position: absolute;
  top: 50%;
  right: 10px; /* 调整按钮距离右边的距离 */
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  z-index: 1;
  background-color: #4CAF50; /* 按钮背景色 */
  color: white; /* 按钮文字颜色 */
  border: none; /* 去除边框 */
  border-radius: 5px; /* 圆角 */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* 按钮阴影 */
  transition: background-color 0.3s ease; /* 背景色过渡效果 */
}

.customButton:hover {
  background-color: #45a049; /* 鼠标悬停背景色 */
}

#point-list {
  position: absolute;
  top: 20%; /* 从页面顶部向下偏移20% */
  left: 10px; /* 调整过滤点列表距离页面左边的距离 */
  background-color: white;
  padding: 10px;
  border-radius: 5px;
  max-height: 70vh; /* 最大高度设为页面视口高度的70% */
  overflow-y: auto; /* 添加垂直滚动条 */
  z-index: 1;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* 添加阴影 */
  border: 1px solid #ccc; /* 添加边框 */
}

.point-list-container {
  max-height: calc(70vh - 50px); /* 计算滚动列表的最大高度，留出底部空间 */
  overflow-y: auto; /* 使ul列表可以滚动 */
}

#point-list ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

#point-list li {
  cursor: pointer;
  margin-bottom: 5px;
  padding: 8px; /* 增加内边距 */
  border-radius: 3px; /* 增加圆角 */
  transition: background-color 0.3s ease; /* 添加过渡效果 */
}

#point-list li:hover {
  background-color: #f0f0f0; /* 鼠标悬停效果 */
}

#point-list h2 {
  font-size: 18px;
  margin-bottom: 10px;
  text-align: center; /* 标题居中 */
  color: #333; /* 标题颜色 */
}

.hover-info {
  position: absolute;
  top: 30%;
  left: 12%;
  width: 20%; /* 设置悬浮框宽度 */
  background-color: #fff; /* 修改背景色为白色 */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15); /* 添加更轻微的阴影 */
  padding: 15px;
  z-index: 2;
  border-radius: 5px; /* 添加圆角 */
  border: 1px solid #ccc; /* 添加边框 */
}

.hover-info h3 {
  font-size: 20px;
  margin-bottom: 10px;
  color: #333;
}

.hover-info p {
  margin-bottom: 8px;
  font-size: 16px;
  color: #666;
}

/* 火炬标记样式 */
.fire-marker {
  width: 100px;
  height: 100px;
  background-image: url('@/fire.png'); /* 根据你的火炬图标路径调整 */
  background-size: cover;
  border-radius: 50%;
  position: absolute;
  top: 0; /* 根据设计调整 */
  left: 0; /* 根据设计调整 */
  transform: translate(-50%, -50%);
  pointer-events: none; /* 确保标记不会干扰地图交互 */
  z-index: 100; /* 确保它位于地图之上 */
}



</style>