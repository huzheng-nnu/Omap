<!-- src/views/OlympicArchive.vue -->
<template>
  <div class="front">
    <TopMenu />

    <div class="midContainer">

      <div class="sectionContainer" >
        <div class="sectionContainer2">
          <!-- left -->
          <div class="leftDiv">
            <div class="imgContainer">
              <div class="contentDiv">
                <!-- <img src="../assets/touch_logo.svg" class="logoImg"> -->
                <h2 class="titleText" lang="en" style="color:black;">性别平等</h2>
                <hr>
                <div class="contentText">
                  <section class="contentSection" style="color:black;">
                    <p style="text-indent: 2em;">
                      从1900年22位女性运动员首次出现在巴黎奥运会赛场，到2018年布宜诺斯艾利斯青奥会上首次实现性别比例平衡，这背后有国际奥委会为推动奥运赛场上性别平衡而付出的诸多努力。 
                    </p>

                    <p style="text-indent: 2em;"> 
                      2012年伦敦奥运会是第一届所有国家和地区奥委会代表团都至少包含一名女性运动员的奥运赛会，其中文莱、沙特阿拉伯和卡塔尔代表团首次有女性运动员加入。 然而，在所有206个国家和地区奥委会代表团中至少有一名男性运动员和一名女性运动员这一里程碑式的情况未曾出现在过往任何一届奥运会。 
                    </p>
                  </section>
                </div>
              </div>
            </div>
          </div>

          <!-- right -->
          <div class="rightDiv" style="margin-top: 12%;">
            <GenderPlot jsonFile="/Archive/gender.json" />
          </div>
        </div>


        <div class="sectionContainer2">
          <!-- left -->
          <div class="leftDiv">
            <div class="imgContainer">
              <div class="contentDiv">
                <!-- <img src="../assets/touch_logo.svg" class="logoImg"> -->
                <h2 class="titleText" lang="en" style="color:black;">缤纷赛事</h2>
                <hr>
                <div class="contentText">
                  <section class="contentSection" style="color:black;">
                    <p style="text-indent: 2em;">
                      首届1896年雅典奥运会只涉及9种运动和43项比赛，而2020年东京奥运会包括33种运动和339个奖牌赛事，使其成为迄今为止规模最大的奥运会项目，而2022年冬季奥运会包括7种运动。每种运动都由一个国际管理机构代表。 
                    </p>

                    <p style="text-indent: 2em;"> 
                      每一届奥运会，国际奥委会会根据各种因素（包括运动的普及程度、观众的兴趣、运动员的参与等）来确定哪些运动、学科和比赛项目会纳入奥运会比赛项目中。这些因素可能会随时间变化，因此每一届奥运会的比赛项目可能都会有所不同。
                    </p>
                  </section>
                </div>
              </div>
            </div>
          </div>

          <!-- right -->
          <div class="rightDiv" style="margin-top: 10%;">
            <EventPlot jsonFile="/Archive/events.json" />
          </div>
        </div>



        <div class="sectionContainer2">
          <!-- left -->
          <div class="leftDiv">
            <div class="imgContainer">
              <div class="contentDiv">
                <!-- <img src="../assets/touch_logo.svg" class="logoImg"> -->
                <h2 class="titleText" lang="en" style="color:black;">金牌总数</h2>
                <hr>
                <div class="contentText">
                  <section class="contentSection" style="color:black;">
                    <p style="text-indent: 2em;">
                      自1896年首届现代奥运会在雅典举办以来，金牌一直是运动员追求的最高荣誉。金牌不仅象征着个人和团队的卓越成就，也代表着国家在国际体育舞台上的实力与地位。在最初的奥运会中，只有少数国家和运动员能够争夺金牌，但随着时间的推移，越来越多的国家和地区加入了奥林匹克大家庭，金牌的争夺也变得更加激烈和多样化。
                    </p>

                    <p style="text-indent: 2em;"> 
                      金牌的获得数量不仅取决于运动员的个人能力和团队的协作，也与国家的体育发展政策、训练设施、科学技术支持等多方面因素密切相关。
                    </p>

                  </section>
                </div>
              </div>
            </div>
          </div>

          <!-- right -->
          <div class="rightDiv" style="margin-top: 5%;">
            <MedalMap />
          </div>
        </div>





        <div class="sectionContainer2">
          <!-- left -->
          <div class="leftDiv">
            <div class="imgContainer">
              <div class="contentDiv">
                <!-- <img src="../assets/touch_logo.svg" class="logoImg"> -->
                <h2 class="titleText" lang="en" style="color:black;">城市记忆</h2>
                <hr>
                <div class="contentText">
                  <section class="contentSection" style="color:black;">
                    <p style="text-indent: 2em;">
                      每一届奥运会的举办城市不仅是赛事的承办者，更是世界目光的焦点。这些城市在奥运会期间，不仅展示了其独特的文化和历史，还通过卓越的基础设施和组织能力，向世界传递了友谊与和平的奥林匹克精神。
                    </p>

                    <p style="text-indent: 2em;"> 
                      对于举办城市而言，奥运会不仅是一场体育盛宴，更是一次提升城市形象、促进旅游和投资的绝佳机会。通过举办奥运会，这些城市在全球范围内展示了其独特的魅力与活力，留下了无数令人难忘的精彩瞬间。每一届奥运会结束后，举办城市都将继续前行，凭借其在奥运会期间积累的宝贵经验和国际声誉，迈向更加辉煌的未来。
                    </p>

                  </section>
                </div>
              </div>
            </div>
          </div>

          <!-- right -->
          <div class="rightDiv" style="margin-top: 8%; margin-bottom: 5%;">
            <CityMap />
          </div>
        </div>



      </div>



    </div>

 





  </div>
</template>

<script>
import TopMenu from '@/components/TopMenu.vue';
import GenderPlot from '@/components/GenderPlot.vue';
import EventPlot from '@/components/EventPlot.vue';
import MedalMap from '@/components/MedalMap.vue';
import CityMap from '@/components/CityMap.vue';

export default {
  name: 'OlympicArchive',
  components: {
    TopMenu,
    GenderPlot,
    EventPlot,
    MedalMap,
    CityMap
  },
  data() {
    return {
      medalType: 'Gold'
    };
  },
  methods: {
    changeMedalType(type) {
      this.medalType = type;
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
  /* height: 70%; */
  margin-top: 10%;
  flex-direction: column;
}

.sectionContainer {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  align-items: flex-start;
  
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
  /* background: linear-gradient(0deg, #FF5757 0%, #570047 100%); */
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
  font-size: 1.2rem;
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
  height: 8rem;
}


</style>
