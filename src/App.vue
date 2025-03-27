<script setup>
import { ref } from 'vue'
import { VueFlow, useVueFlow } from '@vue-flow/core'
import { initialEdges, initialNodes } from './InitialElements.js'
import SpecialNode from './components/SpecialNode.vue'
import ActionNode from './components/ActionNode.vue'
import { XMarkIcon } from "@heroicons/vue/24/outline";

const { onInit, onNodeDragStop} = useVueFlow()

const nodes = ref(initialNodes)
const edges = ref(initialEdges)
const showMenu = ref(false);
const showCalc = ref(false);
const showList = ref(false);
const search = ref('')

const patternTable = ref([{
    Name: '',
    Completed: false,
}]);

var currentNode = ref(null);
var finishedColor = ref(null);
var digMaturity = 0;
var digMatStage = ref(null);
var digValues = [];

var nextStageText = "";

onInit((vueFlowInstance) => {
  // instance is the same as the return of `useVueFlow`
  vueFlowInstance.fitView()
})

function onNodeClick({ event, node }) {
  if (node.type == "special" && !showMenu.value) {
    console.log('Node clicked: ', node.data.label, event);
    currentNode = node;
    showMenu.value = true;
    if (node.data.complete == false){
      finishedColor = 'red';
    }
    else finishedColor = 'green';
  }
  else if (node.type == "action"){
    if (node.id == 30){
      calculateDigitalMaturity();
      if (digMaturity < 25) {
        digMatStage.value = "Infancy";
        nextStageText = "25 or more points reqired for Establishment"
      }
      else if (digMaturity < 70 && digMaturity > 24) {
        digMatStage.value = "Establishment";
        nextStageText = "70 or more points reqired for Optimisation"
      }
      else if (digMaturity > 70) {
        digMatStage.value = "Optimisation";
        nextStageText = "You have reached the final stage of digital maturity; Well done!"
      }
      console.log(digMatStage.value);
      showCalc.value = true;
    }
    else if (node.id == 31){
      showList.value = true;
      console.log(search)
    }
  }
  else {
    showMenu.value = false;
  }
}

function calculateDigitalMaturity(){
  digValues = [0,0,0,0,0,0,0];
  // check for unique fields
  if (nodes.value[0].data.complete || nodes.value[1].data.complete) digValues[0]+=2; // Implementation 1
  if (nodes.value[2].data.complete) digValues[1]+=2; // Data 1
  if (nodes.value[6].data.complete) digValues[2]+=2; // Security 1
  if (nodes.value[4].data.complete || nodes.value[8].data.complete) digValues[3]+=2; // Management 1
  if (nodes.value[9].data.complete) digValues[4]+=2; // Remote 1
  if (nodes.value[5].data.complete) digValues[5]+=2; // Automation 1
  if (nodes.value[14].data.complete) digValues[6]+=2; // Customer 1

  if (nodes.value[3].data.complete || nodes.value[7].data.complete) digValues[0]+=2; // Implementation 2
  if (nodes.value[10].data.complete) digValues[1]+=2; // Data 2
  if (nodes.value[13].data.complete) digValues[2]+=2; // Security 2
  if (nodes.value[15].data.complete || nodes.value[11].data.complete) digValues[3]+=2; // Management 2
  if (nodes.value[16].data.complete) digValues[4]+=2; // Remote 2
  if (nodes.value[12].data.complete) digValues[5]+=2; // Automation 2
  if (nodes.value[20].data.complete) digValues[6]+=2; // Customer 2

  if (nodes.value[25].data.complete || nodes.value[28].data.complete) digValues[0]+=2; // Implementation 3
  if (nodes.value[17].data.complete) digValues[1]+=2; // Data 3
  if (nodes.value[19].data.complete) digValues[2]+=2; // Security 3
  if (nodes.value[27].data.complete || nodes.value[21].data.complete) digValues[3]+=2; // Management 3
  if (nodes.value[24].data.complete || nodes.value[22].data.complete) digValues[4]+=2; // Remote 3
  if (nodes.value[23].data.complete || nodes.value[18].data.complete) digValues[5]+=2; // Automation 3
  if (nodes.value[26].data.complete) digValues[6]+=2; // Customer 3

  // values for individual patterns
  var pts = 0;
  for (let i = 0; i<29; i++){
    if ([0,1,2,6,4,8,9,5,14].includes(i)) pts = 1; // infancy
    else if ([3,7,10,13,15,11,16,12,20].includes(i)) pts = 2; // establishment
    else if ([25,28,17,19,27,21,24,22,23,18,26].includes(i)) pts = 3; // optimisation

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

function finish({event, node}){
  console.log("(Un)Finishing node: " , nodes.value[currentNode.id - 1].data.label)
  nodes.value[currentNode.id - 1].data.complete = !nodes.value[currentNode.id - 1].data.complete
  showMenu.value = false;
}

function combinedSearch (value, query, item) {
  return typeof value === 'string' && item.key < 30 && value.toString().toLocaleUpperCase().indexOf(query.toLocaleUpperCase()) !== -1
}

const headers = [
  {title:'Name', key:'data.label', sortable: false},
  {title:'Model step', key:'data.step', sortable: false},
  {title:'Pattern aspect', key:'data.aspect', sortable: false},
  {title:'Completed', key:'data.complete', sortable: false},
]

</script>

<style scoped>
.slide-fade-enter-active {
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

.testStyle {
position: relative;
font-weight: 900;
font-size: x-large;
}

.basicS{
  text-align: left; 
  font-family: Georgia, 'Times New Roman', Times, serif; 
  text-transform: none;
  padding-left: 8px;
}

.showMenuIncomplete{
  background-color: rgb(255, 115, 115); 
}
.showMenuComplete{
  background-color: rgb(115, 255, 115); 
}

.buttonStyle1{
  left: 5%;
  color: black;
  background-color: lightblue;
}

</style>

<template>
  
  <v-overlay
  v-model="showList"
  style="align-items: center; justify-content: center;"
  >
    <v-sheet
    rounded="rounded"
    style="width: 700px; height: 450px; justify-content: center; overflow-y: scroll;">
      <h1
      class="basicS"
      style="text-align: center; padding-bottom: 10px;">
        List of all patterns
      </h1>
      <v-btn @click="showList = false"
      rounded="lg"
      class="buttonStyle1">
        Back
      </v-btn>
      <v-data-table 
      :items="nodes" 
      :headers="headers"
      :items-per-page=29
      :custom-filter="combinedSearch"
      :search="search"
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
  style="align-items: center; justify-content: center;">
    <v-sheet
    rounded="rounded"
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
        style="padding: 5px; width:60px"
        @click="showCalc = false">
          Back
        </v-btn>  
      </div>
    </v-sheet>
  </v-overlay>


  <div style="position: relative; display: inline;">
    <div style="width: 1500px; height: 710px;">
      <VueFlow
        :nodes="nodes"
        :edges="edges"
        :default-viewport="{ zoom: 1 }"
        :min-zoom="0.2"
        :max-zoom="4"
        @node-click="onNodeClick"
      >
        <template #node-special="specialNodeProps">
          <SpecialNode v-bind="specialNodeProps" />
        </template>
        <template #node-action="actionNodeProps">
          <ActionNode v-bind="actionNodeProps" />
        </template>
      </VueFlow>
    </div>
    <Transition name="slide-fade">
      <div
      v-if="showMenu"
      style="position: fixed; right: 0; bottom: 0; width: 30%; height: 100%; justify-content: center; overflow-y: scroll;"
      :class="{showMenuIncomplete: !currentNode.data.complete, showMenuComplete: currentNode.data.complete }">
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
          style="padding-bottom: 15px; margin-right: auto;">
            <v-btn @click="finish"
            rounded="lg"
            v-if="currentNode.data.complete">
              Mark as incomplete
            </v-btn>
            <v-btn @click="finish"
            rounded="lg"
            v-else>
              Mark as complete
            </v-btn>
          </div>
        </div>
        
      </div>
    </Transition>
  </div>
</template>
