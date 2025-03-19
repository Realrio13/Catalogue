<script setup>
import { ref } from 'vue'
import { VueFlow, useVueFlow } from '@vue-flow/core'
import { initialEdges, initialNodes } from './InitialElements.js'
import SpecialNode from './components/SpecialNode.vue'
import ActionNode from './components/ActionNode.vue'
import { XMarkIcon } from "@heroicons/vue/24/outline";
import Slideover from './components/Slideover.vue'

/**
 * `useVueFlow` provides:
 * 1. a set of methods to interact with the VueFlow instance (like `fitView`, `setViewport`, `addEdges`, etc)
 * 2. a set of event-hooks to listen to VueFlow events (like `onInit`, `onNodeDragStop`, `onConnect`, etc)
 * 3. the internal state of the VueFlow instance (like `nodes`, `edges`, `viewport`, etc)
 */
const { onInit, onNodeDragStop} = useVueFlow()

const nodes = ref(initialNodes)
const edges = ref(initialEdges)
const showMenu = ref(false);

var currentNode = ref(null);
var finishedColor = ref(null);
/**
 * This is a Vue Flow event-hook which can be listened to from anywhere you call the composable, instead of only on the main component
 * Any event that is available as `@event-name` on the VueFlow component is also available as `onEventName` on the composable and vice versa
 *
 * onInit is called when the VueFlow viewport is initialized
 */
onInit((vueFlowInstance) => {
  // instance is the same as the return of `useVueFlow`
  vueFlowInstance.fitView()
})

function onNodeClick({ event, node }) {
  if (node.type == "special") {
    console.log('Node clicked: ', node.data.label, event);
    currentNode = node;
    showMenu.value = true;
    if (node.data.complete == false){
      finishedColor = 'red';
    }
    else finishedColor = 'green';
  }
  else if (node.type == "Action"){
    // actions for calculate digital maturity and list view
  }
}

function finish({event, node}){
  console.log("(Un)Finishing node: " , nodes.value[currentNode.id - 1].data.label)
  nodes.value[currentNode.id - 1].data.complete = !nodes.value[currentNode.id - 1].data.complete
  showMenu.value = false;
}

//style="position: relative; font-weight: bolder; font-size: larger; color: finishedColor ;"
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
