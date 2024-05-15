<template>
	<!-- import TopMenu -->
	<TopMenu />
	<div class="background"></div>

  <div class="front">

    <div class="midContainer">
      <div class="titleContainer">
      <span class="titleText">Visualization platform for Olympics Games Paris 2024</span>
      <a data-cy="link" class="learMoreGroup" href="https://olympics.com/en/paris-2024/olympic-torch-relay" role="button" aria-label="">
        <p class="learnText">
          <span>Learn more about this</span>
        </p>
        <span class="buttonIcon">
          <span data-cy="icon-arrow-right" class="iconArrow">
            <i class="iconArrowImg"></i>
          </span>
        </span>
      </a>
    </div>
      
    </div>

    
</div>



</template>

<script>
import TopMenu from '@/components/TopMenu.vue'

export default {
  name: 'HomePage',
  components: {
    TopMenu
  }
}
</script>

<style scoped>


.background{
    width:100%;  
    height:100%;  /**宽高100%是为了图片铺满屏幕 */
    z-index:-1;
    position: absolute;
    background-image: url('../assets/background1.avif');
    background-size: cover; /* 拉伸以填充容器 */
}

.front{
    z-index:1;
    position: absolute;
    width: 100%;
    height: 100%;
}

.midContainer{
  /* height:50%; */
  width: 100%;
  /* position: absolute; */
  margin-top: 20%;
  display: flex; /* 使用 flex 布局 */

  justify-content: flex-start; /* 子元素左对齐 */
  align-items: center; /* 垂直居中对齐 */

}


.titleContainer{
  color: rgb(0, 0, 0);
    /* font-family: "Olympic Sans", Arial, Helvetica, sans-serif;
    -webkit-font-smoothing: antialiased;
    -webkit-tap-highlight-color: transparent;
    font-size: 2rem;
    line-height: 2.8rem;
    margin-bottom: 22.5rem; */

    display: flex;
    justify-content: center; /* 子元素左对齐 */
    align-items: center; /* 子元素左对齐 */
    flex-direction: column;
    width: auto;
    /* transform: translateX(-400px); */
    transform: translateX(-15%);
  /* width: 50%; */

}

.titleText{
  -webkit-font-smoothing: antialiased;
    -webkit-tap-highlight-color: transparent;
    border: 0px;
    font-style: inherit;
    font-variant: inherit;
    font-stretch: inherit;
    font-optical-sizing: inherit;
    font-kerning: inherit;
    font-feature-settings: inherit;
    font-variation-settings: inherit;
    margin: 0px;
    padding: 0px;
    vertical-align: baseline;
    font-family: "Paris 2024", "Olympic Headline", Helvetica, sans-serif;
    font-size: 5.2rem;
    font-weight: 900;
    line-height: 5.2rem;
    text-transform: uppercase;
    letter-spacing: 0.05rem;
    color: rgb(255, 255, 255);
    display: inline-block;
    -webkit-line-clamp: 5;
    margin-top: 1.6rem;
    width: 50%;
}

.learMoreGroup{
  font-family: "Olympic Sans", Arial, Helvetica, sans-serif;
    -webkit-font-smoothing: antialiased;
    -webkit-tap-highlight-color: transparent;
    font-size: 2rem;
    line-height: 2.8rem;
    color: currentcolor;
    text-decoration: none;
    cursor: pointer;
    align-items: center;
    border-radius: 0.4rem;
    border: 0.2rem solid rgb(0, 0, 0);
    display: flex;
    padding: 0px;
    position: relative;
    width: fit-content;
    height: 4.8rem;
    margin-top: 4rem;
    border-color: rgb(0, 0, 0);
    background-color: rgb(255, 255, 255);
}

.learnText{
  -webkit-font-smoothing: antialiased;
    -webkit-tap-highlight-color: transparent;
    cursor: pointer;
    border: 0px;
    /* font-variant: inherit;
    font-stretch: inherit;
    font-optical-sizing: inherit;
    font-kerning: inherit;
    font-feature-settings: inherit;
    font-variation-settings: inherit; */
    margin: 0px;
    vertical-align: baseline;
    font-family: "Olympic Sans";
    font-size: 2rem;
    font-style: italic;
    font-weight: 700;
    line-height: 1.6rem;
    padding: 1.6rem 1.2rem;
    color: rgb(0, 0, 0);
}

.buttonIcon{
  font-family: "Olympic Sans", Arial, Helvetica, sans-serif;
    -webkit-font-smoothing: antialiased;
    -webkit-tap-highlight-color: transparent;
    font-size: 2rem;
    line-height: 2.8rem;
    color: currentcolor;
    cursor: pointer;
    align-items: center;
    border-radius: 100% 0px 0px 100%;
    display: flex;
    height: 100%;
    width: 4.1rem;
    background-color: rgb(0, 0, 0);
}

.iconArrow{
  font-family: "Olympic Sans", Arial, Helvetica, sans-serif;
    -webkit-font-smoothing: antialiased;
    -webkit-tap-highlight-color: transparent;
    font-size: 2rem;
    line-height: 2.8rem;
    color: currentcolor;
    cursor: pointer;
}

.iconArrowImg{
  font-family: "Olympic Sans", Arial, Helvetica, sans-serif;
    -webkit-font-smoothing: antialiased;
    -webkit-tap-highlight-color: transparent;
    font-size: 2rem;
    cursor: pointer;
    border: none;
    border-radius: 50%;
    box-sizing: content-box;
    display: inline-block;
    height: 26px;
    line-height: 1;
    position: relative;
    vertical-align: middle;
    width: 26px;
    background: unset;
    color: currentcolor;
    padding: 0.8rem;
}

.iconArrowImg::before {
    background-image: url(data:image/svg+xml,%3Csvg%20width%3D%2212%22%20height%3D%2210%22%20viewBox%3D%220%200%2012%2010%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M12%205L8.85315%200.5H6.52448L8.93706%203.98387L0%203.90092V6.09908L8.91608%206.01613L6.52448%209.5H8.85315L12%205Z%22%20fill%3D%22white%22%2F%3E%3C%2Fsvg%3E);
    background-position: center center;
    background-repeat: no-repeat;
    content: "";
    display: block;
    height: 2rem;
    width: 3rem;
    background-size: 80% 80%; /* 设置背景图片大小与伪元素大小一致 */
}






</style>
