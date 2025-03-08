
<template>
    <div
      class="flex items-center justify-center rounded-lg p-4 md:justify-center md:p-16 dark:bg-slate-900 dark:text-white"
    >
      <div ref="memberData">
        <div
          class="flex flex-col divide-y divide-slate-300 overflow-hidden rounded-lg border border-slate-300 dark:divide-slate-600 dark:border-slate-600"
        >
          <div
            v-for="member in teamMembers"
            :key="member.id"
            @click="handleUserClick(member)"
          >
            <div
              class="flex cursor-pointer items-center gap-4 px-6 py-3 hover:bg-orange-50 dark:hover:bg-slate-800"
            >
              <img
                :src="member.imageUrl"
                :alt="member.name"
                class="size-8 rounded-full object-cover"
              />
              <p>{{ member.name }}</p>
            </div>
          </div>
        </div>
  
        <Transition name="slide-fade">
          <div
            v-if="selectedUser && showMenu"
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
                <img
                  :src="selectedUser?.imageUrl"
                  :alt="selectedUser?.name"
                  class="size-40 rounded-full object-cover"
                />
                <h2 class="mt-4 text-2xl font-semibold">
                  {{ selectedUser?.name }}
                </h2>
              </div>
              <div class="my-1 space-y-1">
                <p>{{ selectedUser?.role }}</p>
                <p>{{ selectedUser?.email }}</p>
              </div>
              <p class="px-4 italic leading-relaxed">
                {{ selectedUser?.description }}
              </p>
            </div>
          </div>
        </Transition>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, onUnmounted } from "vue";
  import { XMarkIcon } from "@heroicons/vue/24/outline";
  const showMenu = ref(false);
  const memberData = ref(null);
  const selectedUser = ref(null);
  
  const teamMembers = ref([
    {
      name: "Sarah Green",
      imageUrl:
        "https://images.unsplash.com/photo-1530423470967-45b90dca3a4f?q=80&w=600",
      role: "Team Lead",
      description:
        "Sarah oversees the project and coordinates the team's efforts.",
      email: "sarah.green@xyz.com",
    },
    {
      name: "Michael Brown",
      imageUrl:
        "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=600",
      role: "Software Engineer",
      description:
        "Michael specializes in backend development and database management.",
      email: "michael.brown@xyz.com",
    },
    {
      name: "Lisa Adams",
      imageUrl:
        "https://images.unsplash.com/photo-1545912452-8aea7e25a3d3?q=80&w=600",
      role: "UI/UX Designer",
      description:
        "Lisa is responsible for the visual design and user experience.",
      email: "lisa.adams@xyz.com",
    },
    {
      name: "Rajesh Kumar",
      imageUrl:
        "https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?q=80&w=600",
      role: "Quality Assurance",
      description:
        "Rajesh ensures the software meets quality standards and performs testing.",
      email: "rajesh.kumar@xyz.com",
    },
    {
      name: "Emily White",
      imageUrl:
        "https://images.unsplash.com/photo-1552699611-e2c208d5d9cf?q=80&w=600",
      role: "Project Manager",
      description:
        "Emily manages timelines, resources, and client communications.",
      email: "emily.white@xyz.com",
    },
    {
      name: "Chris Taylor",
      imageUrl:
        "https://images.unsplash.com/photo-1581803118522-7b72a50f7e9f?q=80&w=600",
      role: "Data Scientist",
      description:
        "Chris specializes in data analysis and building predictive models.",
      email: "chris.taylor@xyz.com",
    },
  ]);
  
  function handleUserClick(member) {
    selectedUser.value = member;
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
      