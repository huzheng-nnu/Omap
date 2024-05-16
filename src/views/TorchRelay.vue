<template>
	<!-- import TopMenu -->
	<TopMenu />



	<div class="background"></div>

	<div class="front">
	</div>



</template>

<script>
import TopMenu from '@/components/TopMenu.vue'

export default {
  name: 'TorchRelay',
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

</style>
