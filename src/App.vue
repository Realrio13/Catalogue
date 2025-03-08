<script setup>
import { ref } from 'vue'
import { VueFlow, useVueFlow } from '@vue-flow/core'
import { initialEdges, initialNodes } from './InitialElements.js'
import SpecialNode from './components/SpecialNode.vue'
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
  console.log('Node clicked:', node.data.label, event);
  currentNode = node.data;
  showMenu.value = true;
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
</style>


<template>
  <div style="position: relative; display: inline;"
  class="flex h-screen items-center justify-center rounded-lg p-4 md:justify-center md:p-16 dark:bg-slate-900 dark:text-white display: inline">
    <div style="width: 1300px; height: 710px;"
      class="flex flex-col divide-y divide-slate-300 overflow-hidden rounded-lg border border-slate-300 dark:divide-slate-600 dark:border-slate-600">
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
      </VueFlow>
    </div>
    <Transition name="slide-fade">
      <div
      v-if="showMenu"
      class="fixed right-0 top-0 z-50 flex h-screen w-96 flex-col items-left justify-center overflow-hidden bg-white p-6 shadow-xl dark:bg-slate-900 dark:shadow-slate-700"
      style="position: fixed; background-color: wheat; right: 0; bottom: 0; width: 30%; height: 100%; justify-content: center;"
      >
        <div
          class="absolute flex h-screen flex-col items-left justify-center gap-4 text-center"
          style="position: absolute; display: inline-block; left: 0; width: 100%; height: 100%; justify-content: center;"
        >
          <XMarkIcon
          @click="showMenu = false"
          class="absolute left-4 top-4 size-6 cursor-pointer"
          style="position: relative; display: flex; width: 50px; height: 50px; left: 1%; top: 1%;"
          />
          <div
          class="heading"
          style="position: relative; font-weight: bolder; font-size: larger;"
          >
            {{ currentNode.label }}
          </div>
          <p class="px-4 italic leading-relaxed">
            <"sem description">
          </p>
        </div>
      </div>
    </Transition>
  </div>
</template>
