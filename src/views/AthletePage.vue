<template>
  <div class="background"></div>

  <div class="front">
    <TopMenu />

    <div class="midContainer">
      <el-tabs v-model="activeTab" stretch>
        <el-tab-pane label="滑板公园赛" name="skateboarding" class="option"></el-tab-pane>
        <el-tab-pane label="难度攀岩" name="leadClimbing" class="option"></el-tab-pane>
        <el-tab-pane label="速度攀岩" name="speedClimbing" class="option"></el-tab-pane>
        <el-tab-pane label="霹雳舞" name="breaking" class="option"></el-tab-pane>
        <el-tab-pane label="自由式小轮车" name="bmx" class="option"></el-tab-pane>
        <el-tab-pane label="羽毛球单打" name="badmintonSolo" class="option"></el-tab-pane>
        <el-tab-pane label="羽毛球双打" name="badmintonTeam" class="option"></el-tab-pane>
        <el-tab-pane label="羽毛球混合双打" name="badmintonMix" class="option"></el-tab-pane>
      </el-tabs>

      <div class="sectionContainer">
        <div class="sectionContainer2">
          <!-- left -->
          <div class="leftDiv">
            <div class="imgContainer">
              <div class="contentDiv">
                <img :src="svgPath" class="logoImg">
                <h2 class="titleText" lang="en">{{ titleText }}</h2>
                <div class="contentText">
                  <section class="contentSection">
                    <p style="text-indent: 2em;">
                      {{ introduction }}
                    </p>

                    <div class="buttonContainer">
                      <el-button @click="viewOption = 'details'">详细信息</el-button>
                      <el-button @click="viewOption = 'map'">分布地图</el-button>
                    </div>

                  
                  </section>
                </div>
              </div>
            </div>

          </div>

          <!-- right -->
          <div class="rightDiv">
            <div v-if="viewOption === 'details'" class="tableContainer">
              <AthleteList :json-file="maleJsonFile" class="male" />
              <AthleteList :json-file="femaleJsonFile" class="female" />
            </div>

            <div v-else class="mapContainer">
              <AthleteMap
                :male-json-file="maleJsonFile"
                :female-json-file="activeTab === 'badmintonMix' ? null : femaleJsonFile" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TopMenu from '@/components/TopMenu.vue';
import AthleteList from '@/components/AthleteList.vue';
import AthleteMap from '@/components/AthleteMap.vue';

export default {
  name: 'AthletePage',
  components: {
    TopMenu,
    AthleteList,
    AthleteMap
  },
  data() {
    return {
      activeTab: 'skateboarding',
      viewOption: 'details', // 默认选项
      maleJsonFile: '/AthletesList/滑板公园赛-男子.json',
      femaleJsonFile: '/AthletesList/滑板公园赛-女子.json',
      svgPath: '/icons/滑板.svg',
      titleText: '- 滑板公园赛 -',
      introduction: `
        滑板开始于二十世纪50年代。当时的冲浪爱好者们想要在大海平静的时候做点什么，于是产生了“陆地冲浪”这个概念。二十世纪80年代，滑板成为地下另类文化的一部分，反映了当时自由、叛逆和寻求刺激的价值观。
      `
    };
  },
  watch: {
    activeTab(newTab) {
      switch (newTab) {
        case 'skateboarding':
          this.maleJsonFile = '/AthletesList/滑板公园赛-男子.json';
          this.femaleJsonFile = '/AthletesList/滑板公园赛-女子.json';
          this.svgPath = '/icons/滑板.svg';
          this.titleText = '- 滑板公园赛 -';
          this.introduction = `
            滑板开始于二十世纪50年代。当时的冲浪爱好者们想要在大海平静的时候做点什么，于是产生了“陆地冲浪”这个概念。二十世纪80年代，滑板成为地下另类文化的一部分，反映了当时自由、叛逆和寻求刺激的价值观。
          `;
          break;
        case 'leadClimbing':
          this.maleJsonFile = '/AthletesList/难度攀岩-男子.json';
          this.femaleJsonFile = '/AthletesList/难度攀岩-女子.json';
          this.svgPath = '/icons/攀岩.svg';
          this.titleText = '- 难度攀岩 -';
          this.introduction = `
            运动攀岩属于现代运动项目，是一个年轻、男女皆可从事的运动项目。全世界共有超过2500万攀岩运动员，遍布150个国家和地区，其中39%都在18岁以下。攀岩可以在室外进行，也可以在城市的市内攀岩馆进行。
          `;
          break;
        case 'speedClimbing':
          this.maleJsonFile = '/AthletesList/速度攀岩-男子.json';
          this.femaleJsonFile = '/AthletesList/速度攀岩-女子.json';
          this.svgPath = '/icons/攀岩.svg';
          this.titleText = '- 速度攀岩 -';
          this.introduction = `
            运动攀岩属于现代运动项目，是一个年轻、男女皆可从事的运动项目。全世界共有超过2500万攀岩运动员，遍布150个国家和地区，其中39%都在18岁以下。攀岩可以在室外进行，也可以在城市的市内攀岩馆进行。
          `;
          break;
        case 'breaking':
          this.maleJsonFile = '/AthletesList/霹雳舞-男子.json';
          this.femaleJsonFile = '/AthletesList/霹雳舞-女子.json';
          this.svgPath = '/icons/霹雳舞.svg';
          this.titleText = '- 霹雳舞 -';
          this.introduction='霹雳舞是一种都市风格的舞蹈，起源于20世纪70年代的纽约。霹雳舞植根于嘻哈文化，最早在纽约布朗克斯区热闹的街区派对上出现。杂耍般的动作、风格特异的脚步以及不可或缺的DJ和主持人，是霹雳舞的主要特点。';
          break;
        case 'bmx':
          this.maleJsonFile = '/AthletesList/自由式小轮车-男子.json';
          this.femaleJsonFile = '/AthletesList/自由式小轮车-女子.json';
          this.svgPath = '/icons/小轮车.svg';
          this.titleText = '- 自由式小轮车 -';
          this.introduction = '20世纪70年代，生活在加利福尼亚的儿童和青少年们受到小轮车越野赛赛车手骑行动作的启发，凭借天马行空的想象力，创造了自由式小轮车这项运动。在随后的几十年里，该运动越来越受欢迎，并被纳入极限运动赛事。';
          break;
        case 'badmintonSolo':
          this.maleJsonFile = '/AthletesList/羽毛球单打-男子.json';
          this.femaleJsonFile = '/AthletesList/羽毛球单打-女子.json';
          this.svgPath = '/icons/羽毛球.svg';
          this.titleText = '- 羽毛球单打 -';
          this.introduction = '羽毛球是一项球拍运动，具有悠久的发展历史，它是从更古老的毽子板球演变而来的，最初流行于欧洲，尤其在上流社会中。今天，羽毛球是一项全球性运动，适用于所有年龄段，不论什么样的身体素质都能参加。';
          break;
        case 'badmintonTeam':
          this.maleJsonFile = '/AthletesList/羽毛球双打-男子.json';
          this.femaleJsonFile = '/AthletesList/羽毛球双打-女子.json';
          this.svgPath = '/icons/羽毛球.svg';
          this.titleText = '- 羽毛球双打 -';
          this.introduction = '羽毛球是一项球拍运动，具有悠久的发展历史，它是从更古老的毽子板球演变而来的，最初流行于欧洲，尤其在上流社会中。今天，羽毛球是一项全球性运动，适用于所有年龄段，不论什么样的身体素质都能参加。';

          break;
        case 'badmintonMix':
          this.maleJsonFile = '/AthletesList/羽毛球混合双打.json';
          this.femaleJsonFile = '/AthletesList/empty.json'; // For badminton mix, only use maleJsonFile
          this.svgPath = '/icons/羽毛球.svg';
          this.titleText = '- 羽毛球混合双打 -';
          this.introduction = '羽毛球是一项球拍运动，具有悠久的发展历史，它是从更古老的毽子板球演变而来的，最初流行于欧洲，尤其在上流社会中。今天，羽毛球是一项全球性运动，适用于所有年龄段，不论什么样的身体素质都能参加。';

          break;
      }
    }
  }
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
  flex-direction: column;
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
  width: 30%;
  visibility: visible;
}

/* .rightDiv {
  width: 70%;
  min-width: 70%;
  border-top: 5px solid #FF5757;
  border-right: 5px solid #FF5757;
  border-bottom: 5px solid #FF5757;
  border-left: 5px solid #FF5757;
  
} */

/* .rightDivOut{
  width: 70%;
  min-width: 70%;
  display: flex;
  align-items: center;
  justify-content: center;

} */

.rightDiv {
  width: 70%;
  min-width: 70%;
  border: 10px solid; /* Initial border setup */
  border-image: linear-gradient(0deg, #FF5757 0%, #570047 100%) 1; /* Gradient border */
  border-radius: 15px; /* Optional: rounded corners */
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
  font-size: 2rem;
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
  font-size: 1rem;
  line-height: 2rem;
  --box-background: linear-gradient(0deg, #FF5757 0%, #570047 100%);
  margin: 0px auto;
  width: 100%;
  overflow-wrap: break-word;
  text-align: left; /* 默认就是左对齐，可以不写 */
}

.logoImg {
  position: relative;
  width: auto;
  height: 12rem;
}

.tableContainer {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.mapContainer {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  /* margin-top: 2%; */
}

.buttonContainer {
  margin-top: 20px;
  display: flex;
  justify-content: center; /* 水平居中对齐 */
  /* flex-direction: column; */
  align-items: center;
}

.el-button {
  margin-bottom: 10px;
}

.male {
  margin-right: 40px;
}

.female {
  margin-left: 40px;

}

::v-deep .el-tabs .el-tabs__item {
  font-size: 20px;
  font-weight: bold;
  color:grey;
}

::v-deep .el-tabs__item.is-active {
    color: black;
    /* background-color: orange; */
}

::v-deep .el-tabs__item:hover {
  color: black;
  /* background-color: orange ; */
}

::v-deep .el-tabs__active-bar {
  background-color: black;
  height:5px;
}
</style>
