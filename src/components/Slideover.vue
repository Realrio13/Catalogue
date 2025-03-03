<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { XMarkIcon } from "@heroicons/vue/24/outline";
const showMenu = ref(false);
const memberData = ref(null);
const selectedUser = ref(null);

function handleUserClick() {
    
    showMenu.value = true;
}

function closeSlideover(event) {
if (!memberData.value?.contains(event.target)) {
    showMenu.value = false;
}
}

onMounted(() => {
window.addEventListener("click", closeSlideover);
});

onUnmounted(() => {
window.removeEventListener("click", closeSlideover);
});
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
    <div
        class="flex items-center justify-center rounded-lg p-4 md:justify-center md:p-16 dark:bg-slate-900 dark:text-white"
    >
        <div ref="memberData">

        <Transition name="slide-fade">
            <div
            v-if="showMenu"
            class="fixed right-0 top-0 z-50 flex h-screen w-96 flex-col items-center justify-center overflow-hidden bg-white p-6 shadow-xl dark:bg-slate-900 dark:shadow-slate-700"
            >
            <div
                class="relative flex h-screen flex-col items-center justify-center gap-4 text-center"
            >
                <XMarkIcon
                @click="showMenu = false"
                class="absolute left-4 top-4 size-6 cursor-pointer"
                />
                <div>
                <"sem veci">
                </div>
                <p class="px-4 italic leading-relaxed">
                <"sem description">
                </p>
            </div>
            </div>
        </Transition>
        </div>
    </div>
</template>