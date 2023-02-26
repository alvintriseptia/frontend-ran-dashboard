<template>
  <el-row :class="{ 'mt-10': isMobile && userStore.getters.isLoggedIn }">
    <el-col
      v-if="userStore.getters.isLoggedIn"
      :span="isMobile ? 24 : 3"
    >
      <Sidebar />
      <div class="text-transparent">
        1
      </div>
    </el-col>
    <el-col
      :span="isMobile || !userStore.getters.isLoggedIn ? 24 : 21"
      :class="{ 'md:px-4 my-2 overflow-x-hidden': userStore.getters.isLoggedIn }"
    >
      <h1
        v-if="userStore.getters.isLoggedIn"
        class="text-3xl font-bold mb-8 text-center md:text-left"
      >
        Dashboard Squad Operation & Availability {{ currentYear }}
      </h1>
      <div
        v-if="userStore.getters.loading"
        class="h-full"
      >
        <LoadingSpinner />
      </div>
      <router-view />
    </el-col>
  </el-row>
</template>

<script setup>
import { Sidebar, LoadingSpinner } from "@/components";
import { useWindow } from "@/composables";
import { userStore } from "@/stores";

const { isMobile } = useWindow();

// get current year
const currentYear = new Date().getFullYear();
</script>
