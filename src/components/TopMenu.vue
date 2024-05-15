<template>

	<header class="headerContainer">
		<div class="headerDivContainer">
			<div class="innerContainer">
				<div class="leftGroup"> 
                        <a href="" class="logoContainer"><img src="../assets//emblem-oly.svg" class="logoImg"></a>
                        <a class="topButton" href="">Home Page</a>
						<a class="topButton" href="">Torch Relay</a>
						<a class="topButton" href="">Athletes Map</a>
						<a class="topButton" href="">Paris Hospitality</a>
				</div>
			</div>
		</div>
	</header>

</template>
  
<script>
  export default {
    name: 'TopMenu',
    data() {
      return {
        activeIndex: '1'
      }
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
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

    .headerDivContainer {
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        height: 100%;
        justify-content: space-between;
        width: 100%;
        padding: 2.4rem;
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
        color:black;
        -webkit-font-smoothing: antialiased;
        -webkit-tap-highlight-color: transparent;
        text-decoration: none;
        font-size: 2rem;
        line-height: 2.4rem;
        align-items: center;
        background-color: rgb(255, 255, 255);
        border: none;
        border-radius: 5.8rem;
        box-sizing: border-box;
        cursor: pointer;
        display: flex;
        font-weight: 700;
        height: 6rem;
        justify-content: center;
        padding: 0 1.6rem;
        text-transform: uppercase;
        white-space: nowrap;
        z-index: 1;
        margin: 20px;
    }

    .logoContainer {
        font-family: "Olympic Sans", Arial, Helvetica, sans-serif;
        -webkit-font-smoothing: antialiased;
        -webkit-tap-highlight-color: transparent;
        font-size: 2rem;
        line-height: 2.8rem;
        color: currentColor;
        text-decoration: none;
        z-index: 1;
    }

    .logoImg {
        -webkit-font-smoothing: antialiased;
        -webkit-tap-highlight-color: transparent;
        font-size: 2rem;
        line-height: 2.8rem;
        color: currentColor;
        pointer-events: none;
        position: relative;
        width: auto;
        height: 12rem;
    }


    
</style>
  