<template>
  <header :class="headerClass">
    <div class="headerDivContainer">
      <div class="innerContainer">
        <div class="leftGroup">
          <router-link to="/" class="logoContainer">
            <!-- <img src="../assets/emblem-oly.svg" class="logoImg"> -->
            <img src="../assets/logo_color.svg" class="logoImg">
          </router-link>
          <router-link class="topButton" to="/">主页</router-link>
          <router-link class="topButton" to="/torch-relay">火炬传递</router-link>
          <router-link class="topButton" to="/event-guide">比赛导览</router-link>
          <router-link class="topButton" to="/athlete-page">奥运预选赛</router-link>
          <router-link class="topButton" to="/olympic-archive">奥运档案馆</router-link>
        </div>
      </div>
    </div> 
  </header>
</template>

<script>
export default {
  name: 'TopMenu',
  computed: {
    headerClass() {
      return this.$route.path === '/' ? 'headerContainer' : 'headerContainer withBackground';
    }
  }
}
</script>

<style scoped>
.headerContainer {
  background-size: cover;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  padding: 0;
  z-index: 13;
  background-color: transparent;
  position: absolute;
  width: 100%;
}

.withBackground {
  background-image: url("../assets/background_topmenu.svg");
}

.headerDivContainer {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
  width: 100%;
  padding: 1.2rem;
}

.innerContainer {
  color: rgb(0, 0, 0);
  font-family: "Olympic Sans", Arial, Helvetica, sans-serif;
  -webkit-font-smoothing: antialiased;
  -webkit-tap-highlight-color: transparent;
  font-size: 2rem;
  line-height: 2.8rem;
  align-items: flex-start;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.leftGroup {
  display: flex;
  gap: 0.8rem;
  justify-content: left;
  width: calc(33.3333%);
  margin-left: 15px;
}

.topButton {
  color: black;
  -webkit-font-smoothing: antialiased;
  -webkit-tap-highlight-color: transparent;
  text-decoration: none;
  font-size: 1.2rem;
  line-height: 1.2rem;
  align-items: center;
  background-color: rgb(255, 255, 255);
  border: none;
  border-radius: 5.8rem;
  box-sizing: border-box;
  cursor: pointer;
  display: flex;
  font-weight: 700;
  height: 3rem;
  justify-content: center;
  padding: 0 1.6rem;
  text-transform: uppercase;
  white-space: nowrap;
  z-index: 1;
  /* margin: 20px; */
  margin-top:5px;
}

.logoContainer {
  font-family: "Olympic Sans", Arial, Helvetica, sans-serif;
  -webkit-font-smoothing: antialiased;
  -webkit-tap-highlight-color: transparent;
  /* font-size: 2rem;
  line-height: 2.8rem; */
  color: currentColor;
  text-decoration: none;
  z-index: 1;
}

.logoImg {
  margin-top: 5px;
  -webkit-font-smoothing: antialiased;
  -webkit-tap-highlight-color: transparent;
  font-size: 2rem;
  line-height: 2.8rem;
  color: currentColor;
  pointer-events: none;
  position: relative;
  width: auto;
  height: 3rem;
}
</style>
