<template>
  <div class="background"></div>

  <div class="front">
    <TopMenu />

    <div class="midContainer">
      <div class="sectionContainer">
        <div class="sectionContainer2">
          <!-- left -->
          <div class="leftDiv"> 
            <Search/>
            
          </div>

          <!-- right -->
          <div class="rightDiv">
            <TorchMap/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TopMenu from '@/components/TopMenu.vue';
import TorchMap from '@/components/TorchMap.vue';
import Search from '@/components/Search.vue';
export default {
  name: 'TorchRelay',
  components: {
    TopMenu,
    TorchMap,
    Search
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
  width: 90%;
  height: 60%;
  margin-top: 8.7%;
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

.rightDiv {
  width: 70%;
  min-width: 70%;
}



</style>
