<template>
  <div class="background"></div>

  <div class="front">
    <TopMenu />

    <div class="midContainer">
      <div class="sectionContainer">
        <div class="sectionContainer2">
          <!-- left -->
          <div class="leftDiv">
            <div class="imgContainer">
              <div class="contentDiv">
                <img src="../assets/touch_logo.svg" class="logoImg">
                <h2 class="titleText" lang="en">Olympic Torch Relay Stages</h2>
                <div class="contentText">
                  <section class="contentSection">
                    <p>
                      A symbol of unity and peace, the Olympic torch spreads the spirit of the Games as it travels around the country, marking the start of celebrations. For the Paris 2024 Olympic Games, the Olympic Torch Relay will take place over a three-month period.
                    </p>
                  </section>
                </div>
              </div>
            </div>
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

export default {
  name: 'TorchRelay',
  components: {
    TopMenu,
    TorchMap
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
</style>
