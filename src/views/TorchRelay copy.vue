<template>
  <div class="background"></div>

  <div class="front">
    <TopMenu />

    <div class="midContainer">
      <div class="sectionContainer">
        <div class="sectionContainer2">
          <!-- left -->
          <div class="leftDiv">
            <TorchRelayChart :jsonFile="geoJsonUrl" />
          </div>
          <!-- right -->
          <div class="rightDiv">
            <TorchMap/>
          </div>
                <!-- 在这里添加按钮 -->
                
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TopMenu from '@/components/TopMenu.vue';
import TorchMap from '@/components/TorchMap.vue';
import TorchRelayChart from '@/components/TorchRelayChart.vue';


export default {
  name: 'TorchRelay',
  components: {
    TopMenu,
    TorchMap,
    TorchRelayChart
  },
  data() {
    return {
      // GeoJSON数据的URL，根据实际情况替换为正确的路径
      geoJsonUrl: '/fire.geojson'
    };
  },

  
};


</script>

<style scoped>
.background {
  width: 100%;
  height: 100%;
  z-index: -1;
  position: absolute;
}

.front {
  z-index: 1;
  position: flex;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
}

.midContainer {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80%;
  height: 70%;
  margin-top: 10%;
}

.sectionContainer {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.sectionContainer2 {
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: row;
}

.leftDiv {
  width: 40%;
  margin-left: 10px; 
  visibility: visible;
}

.rightDiv {
  width: 70%;
  min-width: 70%;
}

.imgContainer {
  height: 100%;
  width: 100%;
  background: linear-gradient(0deg, #FF5757 0%, #570047 100%);
}

.contentDiv {
  padding: 2.4rem;
}

.titleText {
  -webkit-font-smoothing: antialiased;
  -webkit-tap-highlight-color: transparent;
  border: 0px;
  padding: 0px;
  vertical-align: baseline;
  font-family: "Paris 2024", "Olympic Headline", Helvetica, sans-serif;
  font-size: 2.5rem;
  font-weight: 900;
  line-height: 2.5rem;
  text-transform: uppercase;
  letter-spacing: 0.05rem;
  color: rgb(255, 255, 255);
  display: inline-block;
  -webkit-line-clamp: 5;
  z-index: 1;
}

.contentText {
  display: block;
  width: 100%;
  margin-top: 0rem;
}

.contentSection {
  color: rgb(255, 255, 255);
  font-family: "Olympic Sans", Arial, Helvetica, sans-serif;
  font-size: 1.2rem;
  line-height: 1.5rem;
  --box-background: linear-gradient(0deg, #FF5757 0%, #570047 100%);
  margin: 0px auto;
  width: 100%;
  overflow-wrap: break-word;
}

.logoImg {
  position: relative;
  width: auto;
  height: 8rem;
}


.buttonContainer {
  width: 100%; /* 按钮容器宽度 */
  padding: 10px; /* 按钮周围的间距 */
}

.customButton {
  padding: 10px 20px; /* 按钮内边距 */
  font-size: 16px; /* 字体大小 */
  /* 其他样式，如颜色、边框等 */
}
</style>
