<script setup>
import { ref } from 'vue'
import { VueFlow, useVueFlow } from '@vue-flow/core'
import { initialEdges, initialNodes } from './InitialElements.js'
import SpecialNode from './components/SpecialNode.vue'
import ActionNode from './components/ActionNode.vue'
import { XMarkIcon } from "@heroicons/vue/24/outline";
import Slideover from './components/Slideover.vue'

const { onInit, onNodeDragStop} = useVueFlow()

const nodes = ref(initialNodes)
const edges = ref(initialEdges)
const showMenu = ref(false);

var currentNode = ref(null);
var finishedColor = ref(null);
var digMaturity = 0;

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
      if (digMaturity < 25) console.log("Infancy");
      else if (digMaturity < 70 && digMaturity > 24) console.log("Establishment");
      else if (digMaturity > 70) console.log("Optimisation");
    }
    else if (node.id == 31){
      // show listof patterns
    }
  }
  else {
    showMenu.value = false;
  }
}

function calculateDigitalMaturity(){
  digMaturity = 0;
  // check for unique fields
  if (nodes.value[0].data.complete || nodes.value[1].data.complete) digMaturity+=2; // Implementation 1
  if (nodes.value[2].data.complete) digMaturity+=2; // Data 1
  if (nodes.value[6].data.complete) digMaturity+=2; // Security 1
  if (nodes.value[4].data.complete || nodes.value[8].data.complete) digMaturity+=2; // Management 1
  if (nodes.value[9].data.complete) digMaturity+=2; // Remote 1
  if (nodes.value[5].data.complete) digMaturity+=2; // Automation 1
  if (nodes.value[14].data.complete) digMaturity+=2; // Customer 1

  if (nodes.value[3].data.complete || nodes.value[7].data.complete) digMaturity+=2; // Implementation 2
  if (nodes.value[10].data.complete) digMaturity+=2; // Data 2
  if (nodes.value[13].data.complete) digMaturity+=2; // Security 2
  if (nodes.value[15].data.complete || nodes.value[11].data.complete) digMaturity+=2; // Management 2
  if (nodes.value[16].data.complete) digMaturity+=2; // Remote 2
  if (nodes.value[12].data.complete) digMaturity+=2; // Automation 2
  if (nodes.value[20].data.complete) digMaturity+=2; // Customer 2

  if (nodes.value[25].data.complete || nodes.value[28].data.complete) digMaturity+=2; // Implementation 3
  if (nodes.value[17].data.complete) digMaturity+=2; // Data 3
  if (nodes.value[19].data.complete) digMaturity+=2; // Security 3
  if (nodes.value[27].data.complete || nodes.value[21].data.complete) digMaturity+=2; // Management 3
  if (nodes.value[24].data.complete || nodes.value[22].data.complete) digMaturity+=2; // Remote 3
  if (nodes.value[23].data.complete || nodes.value[18].data.complete) digMaturity+=2; // Automation 3
  if (nodes.value[26].data.complete) digMaturity+=2; // Customer 3

  // values for individual patterns
  for (let i = 0; i<29; i++){
    if ([0,1,2,6,4,8,9,5,14].includes(i)){
      if (nodes.value[i].data.complete) digMaturity+=1; // infancy
    }
    else if ([3,7,10,13,15,11,16,12,20].includes(i)){
      if (nodes.value[i].data.complete) digMaturity+=2; // establishment
    }
    else if ([25,28,17,19,27,21,24,22,23,18,26].includes(i)){
      if (nodes.value[i].data.complete) digMaturity+=3; // optimisation
    }
  }
  console.log(digMaturity);
}

function finish({event, node}){
  console.log("(Un)Finishing node: " , nodes.value[currentNode.id - 1].data.label)
  nodes.value[currentNode.id - 1].data.complete = !nodes.value[currentNode.id - 1].data.complete
  showMenu.value = false;
}

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

</style>

<template>
  <div style="position: relative; display: inline;">
    <div style="width: 1300px; height: 710px;">
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
            <button @click="finish"
            v-if="currentNode.data.complete">
              Mark as incomplete
            </button>
            <button @click="finish"
            v-else>
              Mark as complete
            </button>
          </div>
        </div>
        
      </div>
    </Transition>
  </div>
</template>
