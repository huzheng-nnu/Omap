<!-- src/views/AthletePage.vue -->
<template>
  <div class="background"></div>

<div class="front">
  <TopMenu />

  <div class="midContainer">
    <div class="sectionContainer">
      <div class="tableContainer">
        <AthleteList class="male" json-file="/AthletesList/滑板-男子公园赛.json" />
        <AthleteList class="female" json-file="/AthletesList/滑板-女子公园赛.json" />
      </div>
        
    </div>
  </div>
</div>
</template>

<script>
import TopMenu from '@/components/TopMenu.vue';
import AthleteList from '@/components/AthleteList.vue';


export default {
  name: 'AthletePage',
  components: {
    TopMenu,
    AthleteList
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
}

.sectionContainer {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.tableContainer {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.male{
  margin-right: 40px;
}
.female{
  margin-left: 40px;
}

</style>