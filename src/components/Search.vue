<template>

  <div class="search-box" @click.stop="showTabs = true">
  <div class="hide-icon"  @click.stop="showTabs = false; showDetailInfo = false">&#10006;</div>
    <div class="search-input">
      <input type="text" v-model="searchText" placeholder="输入搜索文本" />
      <button @click="search">搜索</button>
    </div>

    <div class="result-container" v-show="showTabs && !showDetailInfo">
      <div class="tab-bar">
        <span class="tab" :class="{ active: activeTab === '阶段' }" @click="setActiveTab('阶段')" style="color: black;">阶段</span>
        <span class="tab" :class="{ active: activeTab === '火炬手' }" @click="setActiveTab('火炬手')" style="color : black;">火炬手</span>
      </div>
      <ul v-if="searchResults.length > 0">
        <template v-if="activeTab === '阶段'">
        <li v-for="result in searchResults" :key="result.properties.id">
            <div @click="showDetail(result)" class="container" >
              <div class="content">
                  <img :src="require(`../assets/火炬传递/${result.properties.image}`)" class="img">
                  <div class="text">
                      <div class="stage" style="color: black;">第{{ result.properties.stage }}阶段</div>
                      <div class="stage-name" style="color: black;">{{ result.properties.stage_name }}</div>
                  </div>
              </div>
          </div>
        </li>
        </template>
        <template v-else-if="activeTab === '火炬手'">
          <li v-for="result in searchResults" :key="result.id">
            <div @click="showDetail(result)" class="container" >
              <div class="content">
                <img :src="require(`../assets/火炬手/${result.照片}`)" class="img1">
                  <div class="text">
                      <div class="stagehjs" style="color: black;">第{{ result.阶段 }}阶段 {{ result.阶段名 }}</div>
                      <div class="stage-name" style="color: black;">{{ result.火炬手姓名 }}</div>
                  </div>
              </div>
          </div>
        </li>
        </template>
      </ul>
      <p v-else class="no-results">暂无内容</p>

    
    </div>
  </div>
  <!-- 详细信息界面 -->
  <div class="detail-info" v-if="showDetailInfo">
    <!-- 位于右上角的关闭图标 -->
    <div class="bake-icon" @click.stop="showDetailInfo = false">&#10006;</div>
    <template v-if="activeTab === '阶段'">
    <!-- 阶段详情 -->
    <p class="detail-stage" style="color:black;">第{{ detailedResult.properties.stage }}阶段</p>
    <p class="Detailstage_name" style="color:black;">{{ detailedResult.properties.stage_name }}</p>
    <img :src="require(`../assets/火炬传递/${detailedResult.properties.image}`)" class="Detailimg">
    <!-- 其他详情 -->
    <p class="detail-label" style="color:black;">时间</p>
    <p class="detail-content" style="color:black;">{{ detailedResult.properties.time }}</p>
    <p class="detail-label" style="color:black;">途径</p>
    <p class="detail-content" style="color:black;">{{ detailedResult.properties.via }}</p>
    <p class="detail-label" style="color:black;">介绍</p>
    <p class="detail-content" style="color:black;">{{ detailedResult.properties.introduction }}</p>
  </template>
  <template v-else-if="activeTab === '火炬手'">
    <!-- 阶段详情 -->
    <p class="detail-stage" style="color:black;">第{{ detailedResult.阶段 }}阶段 {{ detailedResult.阶段名 }}</p>
    <p class="Detailhjs_name" style="color:black;">{{ detailedResult.火炬手姓名 }}</p>
    <img :src="require(`../assets/火炬手/${detailedResult.照片}`)"  class="Detailimg1">
    <!-- 其他详情 -->
    <p class="detail-label" style="color:black;">国籍</p>
    <p class="detail-content" style="color:black;">{{ detailedResult.国籍 }}</p>
    <p class="detail-label" style="color:black;">年龄</p>
    <p class="detail-content" style="color:black;">{{ detailedResult.年龄 }}</p>
    <p class="detail-label" style="color:black;">介绍</p>
    <p class="detail-content" style="color:black;">{{ detailedResult.简介 }}</p>
  </template>
  </div>



  <div class="imgContainer" v-show="!showTabs">
  <div class="contentDiv">
    <img src="../assets/touch_logo.svg" class="logoImg">
    
    <h2 class="titleText" lang="en">火炬传递</h2>
    <div class="contentText">
      <section class="contentSection">
        <p style="text-indent: 2em;">
          象征着团结与和平的奥运火炬将在三个月的时间内，穿越法国的各个角落，传递奥林匹克精神。这次火炬传递不仅是一项体育盛事，更是一次文化交流和庆祝活动，将把奥运的激情与梦想带给每一个人。在火炬传递的过程中，公众将有机会近距离感受奥运精神，参与到这场全球瞩目的盛会中来。巴黎2024年奥运会火炬传递，将为奥运庆典拉开帷幕，点燃全世界的热情与希望。
        </p>
      </section>
    </div>
  </div>
</div>

</template>

<script>
import geojson from '@/assets/火炬传递路线 copy.geojson';
import geojson1 from '@/assets/火炬手.json';
import { EventBus } from '@/EventBus.js';
export default {
  name: 'SearchBox',


  data() {
    return {
      searchText: '',
      searchResults: [],
      geojsonData: geojson,
      geojsonData1: geojson1,
      activeTab: '阶段', // 默认激活的标签
      searchClicked: false, // 用于跟踪是否已点击搜索按钮的标志
      showTabs: false ,// 控制标签的显示与隐藏
      detailedResult: null,
      showDetailInfo: false,
    };
  },
  created() {
    EventBus.on('detailed-result-updated', (feature) => {
      for(let i=0;i<this.geojsonData.features.length;i++)
      {
          if(feature[0].properties.stage == this.geojsonData.features[i].properties.stage)
          {
            this.detailedResult =this.geojsonData.features[i];
          }
            
      }
      this.activeTab = '阶段';
      this.showDetailInfo = true;
      this.showTabs = true;
      this.search();
    });
  },

  methods: {
    search() {
      if (this.activeTab == '阶段') {
    this.searchResults = this.geojsonData.features.filter(feature => {
        const { stage_name, stage } = feature.properties;
        if (stage && stage_name) {
          return stage.toString().includes(this.searchText.toLowerCase()) || stage_name.toLowerCase().includes(this.searchText.toLowerCase());
      } else {
          // 处理对象未定义或属性不存在的情况
          return false; // 或者根据实际情况返回其他值
}
    });
} else if (this.activeTab == '火炬手'){
  this.searchResults = this.geojsonData1.filter(item => {
        const { 阶段, 阶段名, 火炬手姓名 } = item;
        return (
            阶段.toString().includes(this.searchText.toLowerCase()) ||
            阶段名.toLowerCase().includes(this.searchText.toLowerCase()) ||
            火炬手姓名.toLowerCase().includes(this.searchText.toLowerCase())
        );
    });  
}
  else {
    // 处理当 geojsonData1 为空或未定义的情况，可以进行一些默认操作或给出错误提示
    this.searchResults = [];}
    
  if (this.activeTab !== '火炬手') {
    this.searchResults.sort((a, b) => a.properties.stage - b.properties.stage);
  }

      this.searchClicked = true; // 设置为 true，表示搜索已点击
    },

    setActiveTab(tab) {
      this.activeTab = tab;
      this.search(); // 标签切换时重新运行搜索
    },
    getResolvedImagePath(relativePath) {
      try {
        // 使用require动态处理图片路径
        // 这通常需要在Webpack中配置相应的loader（如file-loader或url-loader）
        return relativePath;
      }
      catch (error) {
        // 处理图片未找到或其他错误的情况
        console.error('Image not found:', error);
        return '/path/to/fallback-image.png'; // 提供一个回退图片路径
      }
    },
    showDetail(result) {
      // 点击 container 时展示详细信息
      this.detailedResult = result;
      this.showDetailInfo = true;
    },
    hideDetailPanel() {
      this.showDetailInfo = false; // 关闭详细信息界面
      this.selectedResult = null; // 清空选中的结果
    },
  
  },
};
</script>

<style scoped>
.result-container {
  height: 655px; /* 设置容器高度 */
  border: 1px solid #ccc; /* 边框样式 */
  overflow: auto; /* 超出部分显示滚动条 */
  padding: 10px; /* 内边距 */
}
.search-box {
  position: relative;
  padding: 10px;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  border-radius: 0px;
}

.search-input {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.search-input input {
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px 0 0 5px;
}

.search-input button {
  padding: 10px 15px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 0 5px 5px 0;
  cursor: pointer;
}

.tab-bar {
  display: flex;
  margin-bottom: 10px;
}

.tab {
  position: relative;
  cursor: pointer;
  padding: 10px 15px;
  margin-right: 10px;
}

.tab.active:after {
  content: '';
  position: absolute;
  bottom: -3px;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: #3498db;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #fff;
  margin-bottom: 5px;
}

.no-results {
  text-align: center;
  color: #999;
}
.hide-icon {
  position: absolute;
  top: 0px; /* 距离顶部距离 */
  left: 0.4px; /* 距离左侧距离 */
  cursor: pointer;
  font-size: 12px;
  color: #0a0a0a;


}
.hide-icon:hover {
  color: #fc0404; /* 鼠标悬停时的颜色 */
}

button {
  background-color: #f0f0f0; /* 设置按钮的紫色背景 */
  color: white;
  border: none;
  padding: 0px 0px;
  margin-left: 1px; /* 按钮与输入框之间的间距 */
  border-radius: 0px;
  cursor: pointer;
}

button:hover {
  background-color: #4daedf; /* 鼠标悬停时的紫色 */
}

.imgContainer {
  z-index: -1;
  width: 100%;
  background: linear-gradient(0deg, #FF5757 0%, #570047 100%);
}

.contentDiv {
  height: 600px;
  padding: 2.4rem;
  z-index: -1;
  display: flex; /* 启用 Flexbox 布局 */
  flex-direction: column; /* 设置子元素按列排列 */
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
  text-align: left;
}
.logoImg {
  position: relative;
  width: auto;
  height: 8rem;
}

.container {
    display: flex;
    align-items: flex-start; /* 图片和文本顶部对齐 */
    justify-content: flex-start; /* 左对齐 */
    cursor: pointer; /* 鼠标指针样式 */
    transition: background-color 0.3s; /* 过渡效果 */
}
.container.active {
  background-color: #c6c2c2; /* 点击后的背景色 */
}
.content {
    display: flex;
    align-items: flex-start; /* 图片和文本顶部对齐 */
    gap: 20px; /* 图片和文本之间的间隔 */
    
}



.img {
    width: 120px; /* 图片宽度，根据需要调整 */
    height: auto; /* 让图片保持比例 */
}
.img1 {
    width: 80px; /* 图片宽度，根据需要调整 */
    height: auto; /* 让图片保持比例 */
}
.text {
    display: flex;
    flex-direction: column;
    align-items: flex-start; /* 文本左对齐 */
}

.stage {
    font-weight: bold;
}
.stagehjs {
    font-weight: bold;
    font-size: 0.9em;
}
.stage-name {
    margin-top: 10px; /* 阶段名和阶段之间的间隔 */
}

.detail-info {
  height: 655px; /* 设置容器高度 */
  border: 1px solid #ccc; /* 边框样式 */
  overflow: auto; /* 超出部分显示滚动条 */
  padding: 10px; /* 内边距 */
  text-align: left;
  position: relative;
}

.bake-icon {
  position: absolute;
  top: 5px;
  right: 5px;
  cursor: pointer; /* 鼠标悬停时显示手型光标 */
  font-size: 30px; /* 图标大小 */
  z-index: 1; /* 确保在其他内容上层显示 */
}

.Detailstage_name {
  font-size: 2em; /* 阶段名字体大小 */
  font-weight: bold; /* 粗体 */
  color: #333; /* 颜色 */
  margin-bottom: 10px; /* 间距 */
  text-align: left;
}
.Detailhjs_name {
  font-size: 1.5em; /* 阶段名字体大小 */
  font-weight: bold; /* 粗体 */
  color: #333; /* 颜色 */
  margin-bottom: 20px; /* 间距 */
  text-align: left;
  margin-top: 15px;
}
.Detailimg {
    width: 100%; /* 图片宽度，根据需要调整 */
    height: auto; /* 让图片保持比例 */
}
.Detailimg1 {
    width: 80%; /* 图片宽度，根据需要调整 */
    height: auto; /* 让图片保持比例 */
}
.detail-label {
  font-weight: bold;
  font-size: 1.1em;
  line-height: 0.8;
  margin-top: 10px;
  margin-bottom: 10px;
}

.detail-content {
  text-align: left;
  text-indent: 2em; /* 首行缩进两个字符 */
  line-height: 1.7; /* 设置行间距为1.5倍 */
  margin-top: 0px;
  margin-bottom: 10px;
}
.detail-stage {
  margin-top: 5px;
  margin-bottom: 2px;
  font-size: 0.8em;
  line-height: 0.8;
  background-color: rgb(206, 203, 203); /* 添加黑色背景 */
  display: inline-block; /* 让背景仅包含文本内容的宽度 */
  padding: 8px 10px; /* 调整背景内边距 */
  text-align: left;
  border-radius: 3px;
}
p {
  margin-top: 0;
  margin-bottom: 0;
}
</style>