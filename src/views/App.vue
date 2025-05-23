<script setup>
import { ref } from 'vue'
import { VueFlow, useVueFlow } from '@vue-flow/core'
import { initialEdges, initialNodes } from '../InitialElements.js'
import SpecialNode from '../components/SpecialNode.vue'
import ActionNode from '../components/ActionNode.vue'
import help1 from '../components/icons/help1.png'
import help2 from '../components/icons/help2.png'
import help3 from '../components/icons/help3.png'
import { XMarkIcon } from "@heroicons/vue/24/outline";

const { onInit} = useVueFlow()

const nodes = ref(initialNodes) // All patterns from InitialElements
const edges = ref(initialEdges)
const showMenu = ref(false);
const showCalc = ref(false);
const showList = ref(false);
const showHelp = ref(false)
const search = ref('')
const helpPage = ref(0)

var finishedColor='';
var currentNode = ref(null);
var digMaturity = 0;
var digMatStage = ref(null);
var digValues = [];

var nextStageText = "";

onInit((vueFlowInstance) => { // Initialise VueFlow
  // instance is the same as the return of `useVueFlow`
  vueFlowInstance.fitView()
})

function onNodeClick({ event, node }) { // When node is clicked
  if (node.type == "special" && !showMenu.value) {  // For pattern nodes && closes single pattern view
    console.log('Node clicked: ', node.data.label, event);
    currentNode = node; // Sets current pattern
    if (node.data.complete){ // Sets colour of the window based on pattern completion
      finishedColor = 'green';
    }
    else finishedColor = 'red';
    showMenu.value = true;  // Single pattern view opens
  }
  else if (node.type == "action"){
    if (node.id == 30){ // 'calculate digital maturity' node
      calculateDigitalMaturity(); // DM value calculation based on patterns
      if (digMaturity < 28) { // Lower than 28 pts -> infancy
        digMatStage.value = "Infancy";
        nextStageText = "28 or more points reqired for Establishment"
      }
      else if (digMaturity < 78 && digMaturity > 27) {  // Lower than 78 pts -> establishment
        digMatStage.value = "Establishment";
        nextStageText = "78 or more points reqired for Optimisation"
      }
      else if (digMaturity > 78) { // Higher than 78 pts -> optimisation
        digMatStage.value = "Optimisation";
        nextStageText = "You have reached the final stage of digital maturity; Well done!"
      }
      console.log(digMatStage.value);
      showMenu.value = false; // Closes single pattern view
      showCalc.value = true;  // Opens digital maturity view
    }
    else if (node.id == 31){  // Shows list of patterns
      showMenu.value = false;
      showList.value = true;
    }
    else if (node.id == 32){  // Shows help page
      showMenu.value = false;
      helpPage.value = 0;     // Sets help to the first page
      showHelp.value = true;
    }
  }
  else {  // Default: closes single pattern view
    showMenu.value = false;
  }
}

function calculateDigitalMaturity(){  // calculate digital maturity value besed on completed patterns
  digValues = [0,0,0,0,0,0,0];  // 7 fields for 7 aspects
  // check for unique fields
  if (nodes.value[0].data.complete || nodes.value[1].data.complete) { // Implementation 1
    if (nodes.value[0].data.complete && nodes.value[1].data.complete)
      digValues[0]+=2; 
    else digValues[0]+=1; 
  }
  if (nodes.value[2].data.complete) digValues[1]+=2; // Data 1
  if (nodes.value[6].data.complete) digValues[2]+=2; // Security 1
  if (nodes.value[4].data.complete || nodes.value[8].data.complete) { // Management 1
    if (nodes.value[4].data.complete && nodes.value[8].data.complete)
      digValues[3]+=2; 
    else digValues[3]+=1; 
  }
  if (nodes.value[9].data.complete) digValues[4]+=2; // Remote 1
  if (nodes.value[5].data.complete) digValues[5]+=2; // Automation 1
  if (nodes.value[14].data.complete) digValues[6]+=2; // Customer 1

  if (nodes.value[3].data.complete || nodes.value[7].data.complete) { // Implementation 2
    if (nodes.value[3].data.complete && nodes.value[7].data.complete)
      digValues[0]+=2; 
    else digValues[0]+=1; 
  }
  if (nodes.value[10].data.complete) digValues[1]+=2; // Data 2
  if (nodes.value[13].data.complete) digValues[2]+=2; // Security 2
  if (nodes.value[15].data.complete || nodes.value[11].data.complete) { // Management 2
    if (nodes.value[15].data.complete && nodes.value[11].data.complete)
      digValues[3]+=2; 
    else digValues[3]+=1; 
  }
  if (nodes.value[16].data.complete) digValues[4]+=2; // Remote 2
  if (nodes.value[12].data.complete) digValues[5]+=2; // Automation 2
  if (nodes.value[20].data.complete) digValues[6]+=2; // Customer 2

  if (nodes.value[25].data.complete || nodes.value[28].data.complete) { // Implementation 3
    if (nodes.value[25].data.complete && nodes.value[28].data.complete)
      digValues[0]+=2; 
    else digValues[0]+=1; 
  }
  if (nodes.value[17].data.complete) digValues[1]+=2; // Data 3
  if (nodes.value[19].data.complete) digValues[2]+=2; // Security 3
  if (nodes.value[27].data.complete || nodes.value[21].data.complete) { // Management 3
    if (nodes.value[27].data.complete && nodes.value[21].data.complete)
      digValues[3]+=2; 
    else digValues[3]+=1; 
  }
  if (nodes.value[24].data.complete || nodes.value[22].data.complete) {  // Remote 3
    if (nodes.value[24].data.complete && nodes.value[22].data.complete)
      digValues[4]+=2; 
    else digValues[4]+=1; 
  }
  if (nodes.value[23].data.complete || nodes.value[18].data.complete) { // Automation 3
    if (nodes.value[23].data.complete && nodes.value[18].data.complete)
      digValues[5]+=2; 
    else digValues[5]+=1; 
  }
  if (nodes.value[26].data.complete) digValues[6]+=2; // Customer 3

  // values for individual patterns
  var pts = 0;
  for (let i = 0; i<29; i++){ // checking stage of pattern
    if ([0,1,2,6,4,8,9,5,14].includes(i)) pts = 1; // infancy
    else if ([3,7,10,13,15,11,16,12,20].includes(i)) pts = 2; // establishment
    else if ([25,28,17,19,27,21,24,22,23,18,26].includes(i)) pts = 3; // optimisation

      // checking aspect of pattern
    if ([0,1,3,7,25,28].includes(i) && nodes.value[i].data.complete) digValues[0]+=pts;
    if ([2,10,17].includes(i) && nodes.value[i].data.complete) digValues[1]+=pts;
    if ([6,13,19].includes(i) && nodes.value[i].data.complete) digValues[2]+=pts;
    if ([4,8,15,11,27,21].includes(i) && nodes.value[i].data.complete) digValues[3]+=pts;
    if ([9,16,24,22].includes(i) && nodes.value[i].data.complete) digValues[4]+=pts;
    if ([5,12,23,18].includes(i) && nodes.value[i].data.complete) digValues[5]+=pts;
    if ([14,20,26].includes(i) && nodes.value[i].data.complete) digValues[6]+=pts;
    
  }

  digMaturity = digValues[0] + digValues[1] + digValues[2] + digValues[3] + digValues[4] + digValues[5] + digValues[6]

  console.log("Points:", digMaturity);
}

function finish(){  // Mark node as finished
  console.log("(Un)Finishing node: " , nodes.value[currentNode.id - 1].data.label)
  nodes.value[currentNode.id - 1].data.complete = !nodes.value[currentNode.id - 1].data.complete
  showMenu.value = false; // Close single pattern screen
}

function combinedSearch (value, query, item) {  // Searchbar in list of patterns
  return typeof value === 'string' && item.key < 30 && value.toString().toLocaleUpperCase().indexOf(query.toLocaleUpperCase()) !== -1
}

function openPatternFromTable(value, item){ // Opens single pattern view from table view
  if (value.srcElement.type != "checkbox"){ // Unless checkbox is clicked
    currentNode = item.item;  // Sets clicked node as current node
    showList.value = false;
    showMenu.value = true;
  }
}

function handleFocusOut(){
  showMenu.value = false;
}

const headers = [ // Headers in pattern list view
  {title:'Name', key:'data.label', sortable: false},
  {title:'Model step', key:'data.step', sortable: false},
  {title:'Pattern aspect', key:'data.aspect', sortable: false},
  {title:'Completed', key:'data.complete', sortable: false},
]

</script>

<style scoped>
.slide-fade-enter-active { /*Single pattern view transitions*/
transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
transition: all 0.8s;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
transform: translateX(100%);
opacity: 0;
}

.testStyle {  /*Universal container style*/
position: relative;
font-weight: 900;
font-size: x-large;
}

.basicS{  /*Standard font style*/
  text-align: left; 
  font-family: Georgia, 'Times New Roman', Times, serif; 
  text-transform: none;
  padding-left: 8px;
}

.showMenuIncomplete{  /*Complete and incomplete colors for single pattern view*/
  background-color: rgb(255, 115, 115); 
}
.showMenuComplete{
  background-color: rgb(115, 255, 115); 
}

.buttonStyle1{  /*Style for all buttons*/
  left: 5%;
  color: black;
  background-color: lightblue;
}

</style>

<template>
  <!--All 3 overlays, then the main screen and single pattern view-->
  <v-overlay
  v-model="showHelp"
  style="align-items: center; justify-content: center;"
  > <!--Help View-->
    <v-sheet
    v-if="helpPage==0"
    rounded="rounded"
    border="solid lg"
    style="width: 700px; height: 490px; justify-content: center; overflow-y: scroll;"> <!--Page 1-->
      <div
      style="position: relative; display: inline-block; left: 0; width: 100%; justify-content: center; padding-bottom: 8px;">
        <XMarkIcon
        @click="showHelp = false"
        style="position: relative; display: inline; width: 50px; height: 50px; left: 1%; top: 1%;"
        />
        <h1
        style="position: relative; display: inline; align-self: center; left: 38%;"
        class="testStyle">
          Help
        </h1>
      </div
      style="position: relative; padding: 8px;">
        <p 
        style="padding-left: 12px; padding-right: 10px; padding-bottom: 8px;">
          This application serves as a tool for estimating your digital maturity level. By fulfilling the various organizational models described in this application, you are advancing through digital transformation. The more organizational patterns your organization applies or uses, the more digitally mature it is.
        </p>
        <p 
        style="padding-left: 12px; padding-right: 10px; padding-bottom: 8px;">
          Each colored button is itself an organizational pattern. The simplest 'Infancy' level patterns are marked in green. The intermediate patterns at the 'Establishment' level are yellow, and the most challenging patterns at the 'Optimization' stage are red. We suggest that you start from the top of the model at the 'Taskmaster' pattern and gradually work your way down along the marked lines.
        </p>
        <p 
        style="padding-left: 12px; padding-right: 10px; padding-bottom: 8px;">
          The patterns are further divided according to the aspect of digital maturity. An aspect represents a certain closed area within the digital transformation. According to these aspects, the patterns have different border colors. For example, the borders of the patterns of the Remote work aspect are marked in dark blue, and the patterns of the Security aspect have a black border.
        </p>
      <div
      style="position: relative; display: inline-block; left: 0; width: 100%; justify-content: center;">
        <v-btn @click="helpPage = helpPage+1"
        rounded="lg"
        style="bottom: 0%; position: relative; display: inline; left: 85%;"
        class="buttonStyle1">
          Next
        </v-btn>
      </div>
    </v-sheet>

    <v-sheet
    v-if="helpPage==1"
    rounded="rounded"
    border="solid lg"
    style="width: 700px; height: 520px; justify-content: center; overflow-y: scroll;"> <!--Page 2-->
      <div
      style="position: relative; display: inline-block; left: 0; width: 100%; justify-content: center; padding-bottom: 8px;">
        <XMarkIcon
        @click="showHelp = false"
        style="position: relative; display: inline; width: 50px; height: 50px; left: 1%; top: 1%;"
        />
        <h1
        style="position: relative; display: inline; align-self: center; left: 38%;"
        class="testStyle">
          Help
        </h1>
      </div
      style="position: relative; padding: 8px;">
        <p 
        style="padding-left: 12px; padding-right: 10px; padding-bottom: 8px;">
          If your organization has already used one of the patterns or otherwise solved the problem described in the pattern, you can mark the pattern as completed. You can do so by pressing the button at the bottom of the organizational pattern. All completed patterns will later count towards your digital maturity score.
        </p>
        <v-img
        :width="600"
        :src="help1"
        style="align-self: center; padding-bottom: 20px; justify-self: center;">

        </v-img>
      <div
      style="position: relative; display: inline-block; left: 0; width: 100%; justify-content: center;"
      >
        <v-btn @click="helpPage = helpPage-1"
        rounded="lg"
        style="bottom: 0%; position: relative; display: inline;"
        class="buttonStyle1">
          Back
        </v-btn>
        <v-btn @click="helpPage = helpPage+1"
        rounded="lg"
        style="bottom: 0%; position: relative; display: inline; left: 70%;"
        class="buttonStyle1">
          Next
        </v-btn>
      </div>
    </v-sheet>

    <v-sheet
    v-if="helpPage==2"
    rounded="rounded"
    border="solid lg"
    style="width: 700px; height: 460px; justify-content: center; overflow-y: scroll;"> <!--Page 3-->
      <div
      style="position: relative; display: inline-block; left: 0; width: 100%; justify-content: center; padding-bottom: 8px;">
        <XMarkIcon
        @click="showHelp = false"
        style="position: relative; display: inline; width: 50px; height: 50px; left: 1%; top: 1%;"
        />
        <h1
        style="position: relative; display: inline; align-self: center; left: 38%;"
        class="testStyle">
          Help
        </h1>
      </div
      style="position: relative; padding: 8px;">
        <p 
        style="padding-left: 12px; padding-right: 10px; padding-bottom: 8px;">
          If you want to see our organizational patterns in a clearer list, you can press the 'Show list of patterns' button. Here you can search for patterns by name, relevant aspect or stage of digital maturity. If you are already more familiar with our organizational patterns, you can also mark several of them faster in this list.
        </p>
        <v-img
        :width="600"
        :src="help2"
        style="align-self: center; padding-bottom: 20px; justify-self: center;">
        </v-img>
      <div
      style="position: relative; display: inline-block; left: 0; width: 100%; justify-content: center;"
      >
        <v-btn @click="helpPage = helpPage-1"
        rounded="lg"
        style="bottom: 0%; position: relative; display: inline;"
        class="buttonStyle1">
          Back
        </v-btn>
        <v-btn @click="helpPage = helpPage+1"
        rounded="lg"
        style="bottom: 0%; position: relative; display: inline; left: 70%;"
        class="buttonStyle1">
          Next
        </v-btn>
      </div>
    </v-sheet>

    <v-sheet
    v-if="helpPage==3"
    rounded="rounded"
    border="solid lg"
    style="width: 700px; height: 540px; justify-content: center; overflow-y: scroll;"> <!--Page 4-->
      <div
      style="position: relative; display: inline-block; left: 0; width: 100%; justify-content: center; padding-bottom: 8px;">
        <XMarkIcon
        @click="showHelp = false"
        style="position: relative; display: inline; width: 50px; height: 50px; left: 1%; top: 1%;"
        />
        <h1
        style="position: relative; display: inline; align-self: center; left: 38%;"
        class="testStyle">
          Help
        </h1>
      </div
      style="position: relative; padding: 8px;">
        <p 
        style="padding-left: 12px; padding-right: 10px; padding-bottom: 8px;">
        Once you have marked all the completed patterns, click on the 'Calculate digital maturity' button. Subsequently, the application calculates the number of points obtained and your level of digital maturity based on our digital maturity model. The application will take into account only the completed patterns. You can also see how many points you have earned in each aspect of digital maturity.
        </p>
        <v-img
        :width="600"
        :src="help3"
        style="align-self: center; padding-bottom: 20px; justify-self: center;">
        </v-img>
        <p 
        style="padding-left: 12px; padding-right: 10px; padding-bottom: 8px;">
        You can always go back and read or complete more patterns. We suggest that you prioritize patterns in aspects that are a priority for your organization.
        </p>
      <div
      style="position: relative; display: inline-block; left: 0; width: 100%; justify-content: center;"
      >
        <v-btn @click="helpPage = helpPage-1"
        rounded="lg"
        style="bottom: 0%; position: relative; display: inline;"
        class="buttonStyle1">
          Back
        </v-btn>
      </div>
    </v-sheet>

  </v-overlay>

  <v-overlay
  v-model="showList"
  style="align-items: center; justify-content: center;"
  > <!--List of patterns view-->
    <v-sheet
    rounded="rounded"
    border="solid lg"
    style="width: 700px; height: 450px; justify-content: center; overflow-y: scroll;">
      <div
      style="position: relative; display: inline-block; left: 0; width: 100%; justify-content: center; padding-bottom: 8px;">
        <XMarkIcon
        @click="showList = false"
        style="position: relative; display: inline; width: 50px; height: 50px; left: 1%; top: 1%;"
        />
        <h1
        class="basicS"
        style="text-align: center; padding-bottom: 10px;">
          List of all patterns
        </h1>
      </div>
      <v-data-table 
      :items="nodes" 
      :headers="headers"
      :items-per-page=29
      :custom-filter="combinedSearch"
      :search="search"
      @click:row="openPatternFromTable"
      hide-default-footer>
        <template v-slot:top>
          <v-text-field
            v-model="search"
            class="pa-2"
            label="Search"
          ></v-text-field>
        </template>
        <template v-slot:item.data.complete="{ item }">
          <v-checkbox
            v-model="item.data.complete"
            :ripple="false"
          ></v-checkbox>
        </template>
      </v-data-table>
      <v-btn @click="showList = false"
      rounded="lg"
      class="buttonStyle1">
        Back
      </v-btn>
      <div style="padding-bottom: 15px;"></div>
    </v-sheet>
  </v-overlay>
  
  <v-overlay
  v-model="showCalc"
  style="align-items: center; justify-content: center;"> <!--Calculate digital maturity view-->
    <v-sheet
    rounded="rounded"
    border="solid lg"
    style="width: 700px; height: 450px; justify-content: center;">
      <h3
      class="basicS"
      style="text-align: center; padding-top: 8px;">
        Your digital maturity stage is...
      </h3>
      <h1
      class="basicS"
      style="text-align: center; padding-bottom: 10px;">
        {{digMatStage}}
      </h1>
      <p
      style="padding-left: 30px; padding-bottom: 8px;">
        {{digValues[0]}} points from Implementation aspect
      </p>
      <p
      style="padding-left: 30px; padding-bottom: 8px;">
        {{digValues[1]}} points from Data aspect
      </p>
      <p
      style="padding-left: 30px; padding-bottom: 8px;">
        {{digValues[2]}} points from Security aspect
      </p>
      <p
      style="padding-left: 30px; padding-bottom: 8px;">
        {{digValues[3]}} points from Management aspect
      </p>
      <p
      style="padding-left: 30px; padding-bottom: 8px;">
        {{digValues[4]}} points from Remote work aspect
      </p>
      <p
      style="padding-left: 30px; padding-bottom: 8px;">
        {{digValues[5]}} points from Automation aspect
      </p>
      <p
      style="padding-left: 30px; padding-bottom: 15px;">
        {{digValues[6]}} points from Customer interaction aspect
      </p>
      <h3
      style="padding-left: 50px; padding-bottom: 8px; font-weight: bold;">
        Total points: {{ digMaturity }}
      </h3>
      <p
      style="padding-left: 55px; padding-bottom: 12px;">
        {{ nextStageText }}
      </p>
      <div
      style="padding-left: 25px;">
        <v-btn
        rounded="lg"
        style="width:60px"
        class="buttonStyle1"
        @click="showCalc = false">
          Back
        </v-btn>  
      </div>
    </v-sheet>
  </v-overlay>


  <div style="position: relative; display: inline;"> <!--Main screen-->
    <VueFlow
      :nodes="nodes"
      :edges="edges"
      :default-viewport="{ zoom: 1 }"
      :min-zoom="0.2"
      :max-zoom="4"
      @node-click="onNodeClick"
      style="width: 100%; height: 900px;"
    > <!--Vue flow init (can't fit the whole screen, height has to be set static)-->
      <template #node-special="specialNodeProps">
        <SpecialNode v-bind="specialNodeProps" /> <!--Binds patterns to SpecialNode class-->
      </template>
      <template #node-action="actionNodeProps">
        <ActionNode v-bind="actionNodeProps" />   <!--Binds buttons to ActionNode class-->
      </template>
    </VueFlow>

    <Transition name="slide-fade"> <!--Single pattern view-->
      <div
      v-if="showMenu"
      style="position: fixed; right: 0; bottom: 0; width: 30%; height: 100%; justify-content: center; overflow-y: scroll;"
      :class="{showMenuIncomplete: !currentNode.data.complete, showMenuComplete: currentNode.data.complete }"
      @focusout="handleFocusOut"
      tabindex="0">
        <div
          style="position: absolute; display: inline-block; left: 0; width: 100%; height: 100%; justify-content: center;">
          <XMarkIcon
          @click="showMenu = false"
          style="position: relative; display: flex; width: 50px; height: 50px; left: 1%; top: 1%;"
          />
          <div
          class="testStyle"
          >
            {{ currentNode.data.label }}
          </div>

          <div
          v-if="currentNode.data.complete">
            Completed!
          </div>
          <div
          v-else>
            Scroll down to complete.
          </div>

          <!--Contents of the pattern, formated like Coplien's patterns-->
          <p
          class="basicS">
            {{ currentNode.data.description1 }}
          </p>
          <div
          style="font-weight: bold;">
            ***
          </div>
          <div
          class="basicS"
          style="font-weight: bold;">
            {{ currentNode.data.description2 }}
          </div>
          <p
          class="basicS">
            {{ currentNode.data.description3 }}
          </p>
          <div
          class="basicS"
          style="font-weight: bold; padding-left: 15px;">
            Therefore:
          </div>
          <br>
          <div
          class="basicS"
          style="font-weight: bold;">
            {{ currentNode.data.description4 }}
          </div>
          <p
          class="basicS">
            {{ currentNode.data.description5 }}
          </p>
          <div
          style="font-weight: bold;">
            ***
          </div>
          <p
          class="basicS">
            {{ currentNode.data.description6 }}
          </p>
          <div
          style="padding-bottom: 15px; margin-right: auto; padding-top: 10px;">
            <v-btn @click="finish"
            rounded="lg"
            class="buttonStyle1"
            style="left: 0%;"
            v-if="currentNode.data.complete">
              Mark as incomplete
            </v-btn>
            <v-btn @click="finish"
            rounded="lg"
            class="buttonStyle1"
            style="left: 0%;"
            v-else>
              Mark as complete
            </v-btn>
          </div>
        </div>
        
      </div>
    </Transition>
  </div>
</template>
