<script setup lang="ts">
import suiBg from "~/assets/hololive/sui-bg.png";

useHead({
  link: [
    { rel: "preconnect", href: "https://fonts.googleapis.com" },
    { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Manrope:wght@200..800&display=swap",
    },
  ],
});
</script>

<template>
  <div
    class="min-h-screen bg-[url('')] bg-gradient-to-b from-violet-100 to-violet-500 font-sans relative"
    style="font-family: 'Manrope', sans-serif"
  >
    <!-- Background Image Fixed -->
    <img
      :src="suiBg"
      alt=""
      class="fixed bottom-0 right-0 z-0 opacity-80 pointer-events-none max-h-[40vh] md:max-h-[60vh] w-auto"
    />

    <div class="relative z-10 flex flex-col min-h-screen">
      <AppNavbar />
      <main class="flex-grow container mx-auto max-w-6xl px-4 py-8">
        <slot />
      </main>
      <AppFooter />
    </div>
  </div>
</template>
