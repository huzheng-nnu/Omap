<template>
	<div class="background"></div>

	<div class="front">
		<TopMenu />

		<div class="midContainer">
			<div class="sectionContainer">
				<div class="header">
					<h2 class="title">奥运预选赛</h2>
					<br>
					<el-tabs v-model="activeTab">
						<el-tab-pane label="滑板公园赛" name="skateboarding" class="option"></el-tab-pane>
						<el-tab-pane label="难度攀岩" name="leadClimbing" class="option"></el-tab-pane>
						<el-tab-pane label="速度攀岩" name="speedClimbing" class="option"></el-tab-pane>
						<el-tab-pane label="霹雳舞" name="breaking" class="option"></el-tab-pane>
						<el-tab-pane label="自由式小轮车" name="bmx" class="option"></el-tab-pane>
						<el-tab-pane label="羽毛球单打" name="badmintonSolo" class="option"></el-tab-pane>
						<el-tab-pane label="羽毛球双打" name="badmintonTeam" class="option"></el-tab-pane>
						<el-tab-pane label="羽毛球混合双打" name="badmintonMix" class="option"></el-tab-pane>
					</el-tabs>
				</div>

				<div class="detailsContainer">
					<div class="tableContainer">
						<!-- Check activeTab to decide how many AthleteList components to render -->
						<!-- <template v-if="activeTab === 'badmintonMix'">
              <AthleteList :json-file="maleJsonFile" class="singleList" />
              <AthleteList :json-file="maleJsonFile" class="singleList" />
            </template> -->
						<AthleteList :json-file="maleJsonFile" class="male" />
						<AthleteList :json-file="femaleJsonFile" class="female" />
						<div class="mapContainer">
							<!-- Pass only one JSON file for badmintonMix, otherwise pass two -->
							<AthleteMap
										:male-json-file="maleJsonFile"
										:female-json-file="activeTab === 'badmintonMix' ? null : femaleJsonFile" />
						</div>
					</div>
				</div>

        <!-- <el-tabs v-model="activeTab">
						<el-tab-pane label="滑板公园赛" name="skateboarding" class="option"></el-tab-pane>
						<el-tab-pane label="难度攀岩" name="leadClimbing" class="option"></el-tab-pane>
						<el-tab-pane label="速度攀岩" name="speedClimbing" class="option"></el-tab-pane>
						<el-tab-pane label="霹雳舞" name="breaking" class="option"></el-tab-pane>
						<el-tab-pane label="自由式小轮车" name="bmx" class="option"></el-tab-pane>
						<el-tab-pane label="羽毛球单打" name="badmintonSolo" class="option"></el-tab-pane>
						<el-tab-pane label="羽毛球双打" name="badmintonTeam" class="option"></el-tab-pane>
						<el-tab-pane label="羽毛球混合双打" name="badmintonMix" class="option"></el-tab-pane>
					</el-tabs> -->

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
      maleJsonFile: '/AthletesList/滑板公园赛-男子.json',
      femaleJsonFile: '/AthletesList/滑板公园赛-女子.json'
    };
  },
  watch: {
    activeTab(newTab) {
      switch (newTab) {
        case 'skateboarding':
          this.maleJsonFile = '/AthletesList/滑板公园赛-男子.json';
          this.femaleJsonFile = '/AthletesList/滑板公园赛-女子.json';
          break;
        case 'leadClimbing':
          this.maleJsonFile = '/AthletesList/难度攀岩-男子.json';
          this.femaleJsonFile = '/AthletesList/难度攀岩-女子.json';
          break;
        case 'speedClimbing':
          this.maleJsonFile = '/AthletesList/速度攀岩-男子.json';
          this.femaleJsonFile = '/AthletesList/速度攀岩-女子.json';
          break;
        case 'breaking':
          this.maleJsonFile = '/AthletesList/霹雳舞-男子.json';
          this.femaleJsonFile = '/AthletesList/霹雳舞-女子.json';
          break;
        case 'bmx':
          this.maleJsonFile = '/AthletesList/自由式小轮车-男子.json';
          this.femaleJsonFile = '/AthletesList/自由式小轮车-女子.json';
          break;
        case 'badmintonSolo':
          this.maleJsonFile = '/AthletesList/羽毛球单打-男子.json';
          this.femaleJsonFile = '/AthletesList/羽毛球单打-女子.json';
          break;
        case 'badmintonTeam':
          this.maleJsonFile = '/AthletesList/羽毛球双打-男子.json';
          this.femaleJsonFile = '/AthletesList/羽毛球双打-女子.json';
          break;
        case 'badmintonMix':
          this.maleJsonFile = '/AthletesList/羽毛球混合双打.json';
          this.femaleJsonFile = '/AthletesList/empty.json'; // For badminton mix, only use maleJsonFile
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
  position: absolute;
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
  position: relative;
  
}

.sectionContainer {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  
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
  height: 800px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.detailsContainer {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.male {
  margin-right: 20px;
}

.female {
  margin-left: 20px;
  margin-right: 80px;
}

.singleList {
  /* margin-right: 80px; */
  margin-left: 20%;
}

.header {
  width: 80%;
  text-align: center;
  margin-top: 5%;
}

.title {
  color: black;
}

::v-deep .el-tabs .el-tabs__item {
  font-size: 20px;
}
</style>
