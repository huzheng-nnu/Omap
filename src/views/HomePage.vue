<template>
	<!-- import TopMenu -->
	<TopMenu />



	<div class="background"></div>

	<div class="front">

		<div class="SliderContainer">
			<!-- <span class="demonstration">Click 指示器触发</span> -->
			<el-carousel trigger="click" class="Slider" height=100% motion-blur arrow="never">
        <!-- 1 -->
				<el-carousel-item>
          <div class="imgContainer1">
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
				</el-carousel-item>

        <!-- 2 -->
        <el-carousel-item>
          <div class="imgContainer2">
              <div class="titleContainer" >
                <span class="titleText">Visualization platform for Olympics Games Paris 2024 Page2</span>
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
				</el-carousel-item>


        <el-carousel-item>
          <div class="imgContainer3">
              <!-- <div class="titleContainer">
                <span class="titleText">Visualization platform for Olympics Games Paris 2024 Page3</span>
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
              </div> -->
          </div>

          <div class="frontImg">
              <div class="titleContainer">
                <span class="titleText">Visualization platform for Olympics Games Paris 2024 Page3</span>
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
          
				</el-carousel-item>
			</el-carousel>
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
    /* background-image: url('../assets/background1.avif');
    background-size: cover; 拉伸以填充容器 */
} 

.front{
    z-index:1;
    position: absolute;
    width: 100%;
    height: 100%;
}

.frontImg{
    z-index:1;
    position: absolute;
    width: 100%;
    height: 100%;
}

.titleContainer{
  filter: brightness(100%);
  color: rgb(0, 0, 0);
    /* font-family: "Olympic Sans", Arial, Helvetica, sans-serif;
    -webkit-font-smoothing: antialiased;
    -webkit-tap-highlight-color: transparent;
    font-size: 2rem;
    line-height: 2.8rem;
    margin-bottom: 22.5rem; */

    display: flex;
    position: relative;
    justify-content: center; /* 子元素左对齐 */
    align-items: center; /* 子元素左对齐 */
    flex-direction: column;
    width: auto;
    /* transform: translateX(-400px); */
    transform: translateX(-15%);
    margin-top: 20%;
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
    z-index: 1;
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

.Slider{
  width:100%;
  height:100%;
}

.SliderContainer{
  width:100%;
  height:100%;
}

.imgContainer1{
  width:100%;
  height:100%;
  background-image: url('../assets/background1.avif');
  background-size: cover; /* 拉伸以填充容器 */
  position: absolute;
  filter: brightness(90%);
  /* z-index:-1; */
}

.imgContainer2{
  width:100%;
  height:100%;
  background-image: url('../assets/background2.avif');
  background-size: cover; /* 拉伸以填充容器 */
  position: absolute;
  filter: brightness(90%);
  /* z-index:-1; */
}

.imgContainer3{
  width:100%;
  height:100%;
  background-image: url('../assets/background3.avif');
  background-size: cover; /* 拉伸以填充容器 */
  position: absolute;
  filter: brightness(80%);
  /* z-index:-1; */
}

/* .imgContainer::before {
  filter: brightness(70%);
} */



/* .SlideImg {
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index:-1;
}
 */

/* .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
     background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
     background-color: #d3dce6;
  } */

  /* /deep/ .el-carousel__indicators{
    transform: scale(8); 
    margin-bottom:2%;   
    
  } */

  /deep/ .el-carousel__button{
    --el-carousel-indicator-width: 250px;
    --el-carousel-indicator-height: 20px;
    margin-bottom:2%;
    /* margin-left:2%;
    margin-right:2%; */

    --el-color-white: #ffffff;
    --el-color-black: #000000;
    --el-color-primary-rgb: 64,158,255;
    --el-color-success-rgb: 103,194,58;
    --el-color-warning-rgb: 230,162,60;
    --el-color-danger-rgb: 245,108,108;
    --el-color-error-rgb: 245,108,108;
    --el-color-info-rgb: 144,147,153;
    --el-font-size-extra-large: 20px;
    --el-font-size-large: 18px;
    --el-font-size-medium: 16px;
    --el-font-size-base: 14px;
    --el-font-size-small: 13px;
    --el-font-size-extra-small: 12px;
    --el-font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    --el-font-weight-primary: 500;
    --el-font-line-height-primary: 24px;
    --el-index-normal: 1;
    --el-index-top: 1000;
    --el-index-popper: 2000;
    --el-border-radius-base: 4px;
    --el-border-radius-small: 2px;
    --el-border-radius-round: 20px;
    --el-border-radius-circle: 100%;
    --el-transition-duration: 0.3s;
    --el-transition-duration-fast: 0.2s;
    --el-transition-function-ease-in-out-bezier: cubic-bezier(0.645,0.045,0.355,1);
    --el-transition-function-fast-bezier: cubic-bezier(0.23,1,0.32,1);
    --el-transition-all: all var(--el-transition-duration) var(--el-transition-function-ease-in-out-bezier);
    --el-transition-fade: opacity var(--el-transition-duration) var(--el-transition-function-fast-bezier);
    --el-transition-md-fade: transform var(--el-transition-duration) var(--el-transition-function-fast-bezier),opacity var(--el-transition-duration) var(--el-transition-function-fast-bezier);
    --el-transition-fade-linear: opacity var(--el-transition-duration-fast) linear;
    --el-transition-border: border-color var(--el-transition-duration-fast) var(--el-transition-function-ease-in-out-bezier);
    --el-transition-box-shadow: box-shadow var(--el-transition-duration-fast) var(--el-transition-function-ease-in-out-bezier);
    --el-transition-color: color var(--el-transition-duration-fast) var(--el-transition-function-ease-in-out-bezier);
    --el-component-size-large: 40px;
    --el-component-size: 32px;
    --el-component-size-small: 24px;
    color-scheme: light;
    --el-color-primary: #409eff;
    --el-color-primary-light-3: #79bbff;
    --el-color-primary-light-5: #a0cfff;
    --el-color-primary-light-7: #c6e2ff;
    --el-color-primary-light-8: #d9ecff;
    --el-color-primary-light-9: #ecf5ff;
    --el-color-primary-dark-2: #337ecc;
    --el-color-success: #67c23a;
    --el-color-success-light-3: #95d475;
    --el-color-success-light-5: #b3e19d;
    --el-color-success-light-7: #d1edc4;
    --el-color-success-light-8: #e1f3d8;
    --el-color-success-light-9: #f0f9eb;
    --el-color-success-dark-2: #529b2e;
    --el-color-warning: #e6a23c;
    --el-color-warning-light-3: #eebe77;
    --el-color-warning-light-5: #f3d19e;
    --el-color-warning-light-7: #f8e3c5;
    --el-color-warning-light-8: #faecd8;
    --el-color-warning-light-9: #fdf6ec;
    --el-color-warning-dark-2: #b88230;
    --el-color-danger: #f56c6c;
    --el-color-danger-light-3: #f89898;
    --el-color-danger-light-5: #fab6b6;
    --el-color-danger-light-7: #fcd3d3;
    --el-color-danger-light-8: #fde2e2;
    --el-color-danger-light-9: #fef0f0;
    --el-color-danger-dark-2: #c45656;
    --el-color-error: #f56c6c;
    --el-color-error-light-3: #f89898;
    --el-color-error-light-5: #fab6b6;
    --el-color-error-light-7: #fcd3d3;
    --el-color-error-light-8: #fde2e2;
    --el-color-error-light-9: #fef0f0;
    --el-color-error-dark-2: #c45656;
    --el-color-info: #909399;
    --el-color-info-light-3: #b1b3b8;
    --el-color-info-light-5: #c8c9cc;
    --el-color-info-light-7: #dedfe0;
    --el-color-info-light-8: #e9e9eb;
    --el-color-info-light-9: #f4f4f5;
    --el-color-info-dark-2: #73767a;
    --el-bg-color: #ffffff;
    --el-bg-color-page: #f2f3f5;
    --el-bg-color-overlay: #ffffff;
    --el-text-color-primary: #303133;
    --el-text-color-regular: #606266;
    --el-text-color-secondary: #909399;
    --el-text-color-placeholder: #a8abb2;
    --el-text-color-disabled: #c0c4cc;
    --el-border-color: #dcdfe6;
    --el-border-color-light: #e4e7ed;
    --el-border-color-lighter: #ebeef5;
    --el-border-color-extra-light: #f2f6fc;
    --el-border-color-dark: #d4d7de;
    --el-border-color-darker: #cdd0d6;
    --el-fill-color: #f0f2f5;
    --el-fill-color-light: #f5f7fa;
    --el-fill-color-lighter: #fafafa;
    --el-fill-color-extra-light: #fafcff;
    --el-fill-color-dark: #ebedf0;
    --el-fill-color-darker: #e6e8eb;
    --el-fill-color-blank: #ffffff;
    --el-box-shadow: 0px 12px 32px 4px rgba(0,0,0,0.04),0px 8px 20px rgba(0,0,0,0.08);
    --el-box-shadow-light: 0px 0px 12px rgba(0,0,0,0.12);
    --el-box-shadow-lighter: 0px 0px 6px rgba(0,0,0,0.12);
    --el-box-shadow-dark: 0px 16px 48px 16px rgba(0,0,0,0.08),0px 12px 32px rgba(0,0,0,0.12),0px 8px 16px -8px rgba(0,0,0,0.16);
    --el-disabled-bg-color: var(--el-fill-color-light);
    --el-disabled-text-color: var(--el-text-color-placeholder);
    --el-disabled-border-color: var(--el-border-color-light);
    --el-overlay-color: rgba(0,0,0,0.8);
    --el-overlay-color-light: rgba(0,0,0,0.7);
    --el-overlay-color-lighter: rgba(0,0,0,0.5);
    --el-mask-color: rgba(255,255,255,0.9);
    --el-mask-color-extra-light: rgba(255,255,255,0.3);
    --el-border-width: 1px;
    --el-border-style: solid;
    --el-border-color-hover: var(--el-text-color-disabled);
    --el-border: var(--el-border-width) var(--el-border-style) var(--el-border-color);
    --el-svg-monochrome-grey: var(--el-border-color);
    --el-popup-modal-bg-color: var(--el-color-black);
    --el-popup-modal-opacity: 0.5;
    --el-loading-spinner-size: 42px;
    --el-loading-fullscreen-spinner-size: 50px;
    --el-menu-active-color: var(--el-color-primary);
    --el-menu-text-color: var(--el-text-color-primary);
    --el-menu-hover-text-color: var(--el-color-primary);
    --el-menu-bg-color: var(--el-fill-color-blank);
    --el-menu-hover-bg-color: var(--el-color-primary-light-9);
    --el-menu-item-height: 56px;
    --el-menu-sub-item-height: calc(var(--el-menu-item-height) - 6px);
    --el-menu-horizontal-height: 60px;
    --el-menu-horizontal-sub-item-height: 36px;
    --el-menu-item-font-size: var(--el-font-size-base);
    --el-menu-item-hover-fill: var(--el-color-primary-light-9);
    --el-menu-border-color: var(--el-border-color);
    --el-menu-base-level-padding: 20px;
    --el-menu-level-padding: 20px;
    --el-menu-icon-width: 24px;
    -webkit-font-smoothing: antialiased;
    --el-carousel-arrow-font-size: 12px;
    --el-carousel-arrow-size: 36px;
    --el-carousel-arrow-background: rgba(31,45,61,0.11);
    --el-carousel-arrow-hover-background: rgba(31,45,61,0.23);
    --el-carousel-indicator-padding-horizontal: 4px;
    --el-carousel-indicator-padding-vertical: 12px;
    --el-carousel-indicator-out-color: var(--el-border-color-hover);
    list-style: none;
    background-color: #ffffff;
    border: none;
    cursor: pointer;
    display: block;
    height: var(--el-carousel-indicator-height);
    margin: 0;
    outline: none;
    padding: 0;
    transition: var(--el-transition-duration);
    width: var(--el-carousel-indicator-width);
    opacity: 1;
  }



  /* /deep/ .el-carousel__arrow el-carousel__arrow--right{
    transform: scale(10);
  } */


</style>
