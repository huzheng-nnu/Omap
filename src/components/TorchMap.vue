<template>
  <div id="map"></div>
</template>

<script>
import mapboxgl from 'mapbox-gl';
import CHINAMAP from '@/assets/火炬传递路线.geojson';
import fire_route from "@/fire.geojson"; // 导入GeoJSON文件
import torch_realy from "@/torch_relay.geojson"; // 导入GeoJSON文件
import new_torch from "@/new_torch.geojson"; // 导入GeoJSON文件




export default {
  name: 'RouteMap',
  data() {
    return {
      geojsonData: CHINAMAP
    };
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
      [-5.138, 41.333], // Southwest coordinates
      [9.663, 51.124]  // Northeast coordinates
    ];
    map.fitBounds(bounds);

    // 添加地图控件（例如导航控件）
    map.addControl(new mapboxgl.NavigationControl());

    map.on('load', () => {
      // 添加线图层
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

      // 添加点图层
      map.addSource('fire-geojson', {
        type: 'geojson',
        data: fire_route
      });

      map.addLayer({
        id: 'fire-geojson-layer',
        type: 'circle',
        source: 'fire-geojson',
        paint: {
          'circle-radius': 5, // 点的半径
          'circle-color': '#FF0000' // 点的颜色
        }
      });

      //添加火炬传递路线


      map.addSource('torch-relay', {
        type: 'geojson',
        data: torch_realy
      });


      //空列表
      map.addSource('line', {
        type: 'geojson',
        data: {
            type: 'Feature',
            geometry: {
                type: 'LineString',
                coordinates: []
            }
        }
    });
      


    //新数据
     /* map.addSource('new_torch', {
          type: 'geojson',
          data: new_torch
        });

        map.addLayer({
        id: 'new-torch-relay',
        type: 'line',
        source: 'new_torch',
        layout: {
          'line-join': 'round',
          'line-cap': 'round'
        },
        paint: {
          'line-color': [
            'match',
            ['get', 'id'], // 假设每个feature都有一个'id'属性
            1, 'blue',
            6, 'blue',
            8, 'blue',
            // 对于其他id，这里设置为默认颜色，例如灰色
            'grey'
          ],
          'line-width': 2
        }
      });
*/

   

    //线
      map.addLayer({
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
            ['get', 'id'], // 假设每个feature都有一个'id'属性
            1, 'blue',
            6, 'blue',
            8, 'blue',
            // 对于其他id，这里设置为默认颜色，例如灰色
            'grey'
          ],
          'line-width':4,}
      });
      
      var popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false
      });



      //路线动画
      function interpolateCoords(start, end, steps) {
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
    }


  function animateLine(coordinates, index, totalLines,flag) {
  var interpolatedCoordinates = [];
  var segmentIndex = 0;

  // 确保 coordinates 不为空
  if (!coordinates || coordinates.length === 0) {
      console.error('Coordinates are empty or not properly loaded.');
      return;
  }

  var speed=10;
  if (flag===1){speed=40}
  // 预先计算插值坐标
  for (var i = 0; i < coordinates.length - 1; i++) {
      var segment = interpolateCoords(coordinates[i], coordinates[i + 1], speed);
      interpolatedCoordinates = interpolatedCoordinates.concat(segment);
  }

  let animate = () => {
      if (segmentIndex < interpolatedCoordinates.length) {
          // 更新地图数据源以显示当前动画部分
          map.getSource('line').setData({
              type: 'Feature',
              properties: { id: 'line' + index },
              geometry: {
                  type: 'LineString',
                  coordinates: interpolatedCoordinates.slice(0, segmentIndex + 1)


          
              }


              
          });
          
        




          // 视角跟随动画移动
          var currentPoint = interpolatedCoordinates[segmentIndex]; // 当前动画点
          if(flag==1)
          {
          flyToCamera(currentPoint,flag);}
          if(flag==0){
            map.easeTo({
            zoom: 5, // 可以根据需要调整缩放级别    
  });
          }

          segmentIndex++;

          setTimeout(animate, 25); // 调整这个值可以改变动画速度
      } else {
          // 当前线段动画完成，如果还有更多的线段，继续下一个线段的动画
          if (index < totalLines - 1) {
              animateLine(new_torch.features[index + 1].geometry.coordinates, index + 1, 
              totalLines,new_torch.features[index+1].properties.flag);
          }
      }
  };

  animate();
}

// 添加一个函数来实现视角跟随移动的效果
function flyToCamera(point,flag) {
  var zoom_line=5;
  if(flag===1){zoom_line=3}
  // 这里使用 easeTo 来平滑地移动地图视角
  map.easeTo({
      center: point, // 地图中心点跟随当前动画点
      zoom: zoom_line, // 可以根据需要调整缩放级别
      duration: 25 // 动画持续时间，与 setTimeout 的时间保持一致
  });
}

// 调用 animateLine 函数开始动画
animateLine(new_torch.features[0].geometry.coordinates, 0, new_torch.features.length,
                      new_torch.features[0].properties.flag);

      
    
      map.on('mousemove', 'custom-geojson-layer', (e) => {
        map.getCanvas().style.cursor = 'pointer';

        if (e.features.length > 0) {
          const feature = e.features[0];
          popup
            .setLngLat(e.lngLat)
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
          popup.setOffset([0, -600]);
        } else {
          popup.remove();
        }
      });

      map.on('mouseleave', 'custom-geojson-layer', () => {
        map.getCanvas().style.cursor = '';
        popup.remove();
      });

    
     // 获取所有点的数据
      const features = fire_route.features;

      // 遍历所有点并将颜色设置为蓝色 (#0000FF)
      features.forEach((feature, index) => {
        map.setPaintProperty(`fire-geojson-layer-${index}`, 'circle-color', '#0000FF');
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
