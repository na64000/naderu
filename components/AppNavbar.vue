<script setup lang="ts">
const isMenuOpen = ref(false);
</script>

<template>
  <nav class="bg-violet-950 shadow-md sticky top-0 z-50">
    <div class="container mx-auto px-4 py-4 flex justify-between items-center">
      <!-- Logo -->
      <NuxtLink to="/" class="flex items-center">
        <img src="/logo.svg" alt="Naderu" class="hidden md:block h-10" />
        <!-- Logo Mobile 
        <img
          src="/logo-mobile.svg"
          alt="Naderu"
          class="md:hidden h-10 w-10 object-contain"
        />-->
      </NuxtLink>

      <!-- Hamburger Button (Mobile) -->
      <button
        @click="isMenuOpen = !isMenuOpen"
        class="md:hidden text-violet-200 focus:outline-none hover:text-white"
      >
        <svg
          class="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            v-if="!isMenuOpen"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          ></path>
          <path
            v-else
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          ></path>
        </svg>
      </button>

      <!-- Menu -->
      <div
        class="hidden md:flex space-x-6 items-center text-violet-200 font-bold"
      >
        <NuxtLink to="/" class="hover:text-white transition">Beranda</NuxtLink>
        <NuxtLink to="/katalog" class="hover:text-white transition"
          >Semua Produk</NuxtLink
        >

        <!-- Dropdown Fandom -->
        <div class="relative group">
          <button
            class="flex items-center hover:text-white transition focus:outline-none"
          >
            Fandom
            <svg
              class="w-4 h-4 ml-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
          </button>
          <!-- Dropdown Content -->
          <div
            class="absolute left-0 mt-2 w-48 bg-zinc-900 border border-zinc-700 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-left"
          >
            <a
              href="#"
              class="block px-4 py-2 hover:bg-zinc-800 text-violet-200"
              >Genshin Impact</a
            >
            <a
              href="#"
              class="block px-4 py-2 hover:bg-zinc-800 text-violet-200"
              >Hololive</a
            >
            <a
              href="#"
              class="block px-4 py-2 hover:bg-zinc-800 text-violet-200"
              >Valorant</a
            >
            <a
              href="#"
              class="block px-4 py-2 hover:bg-zinc-800 text-violet-200"
              >Honkai Star Rail</a
            >
          </div>
        </div>

        <NuxtLink
          to="/admin"
          class="text-violet-400 hover:text-violet-200 text-sm"
          >Admin (Demo)</NuxtLink
        >
      </div>
    </div>

    <!-- Mobile Menu -->
    <div
      v-if="isMenuOpen"
      class="md:hidden bg-violet-900 border-t border-violet-800"
    >
      <div class="px-4 py-4 space-y-3">
        <NuxtLink
          to="/"
          class="block text-violet-200 hover:text-white font-medium"
          >Beranda</NuxtLink
        >
        <NuxtLink
          to="/katalog"
          class="block text-violet-200 hover:text-white font-medium"
          >Semua Produk</NuxtLink
        >

        <div
          class="text-violet-200 font-medium pt-2 border-t border-violet-800"
        >
          Fandom
        </div>
        <div class="pl-4 space-y-2">
          <a href="#" class="block text-sm text-violet-300 hover:text-white"
            >Genshin Impact</a
          >
          <a href="#" class="block text-sm text-violet-300 hover:text-white"
            >Hololive</a
          >
          <a href="#" class="block text-sm text-violet-300 hover:text-white"
            >Valorant</a
          >
        </div>
        <NuxtLink
          to="/admin"
          class="block pt-2 text-violet-400 text-sm hover:text-violet-200"
          >Admin (Demo)</NuxtLink
        >
      </div>
    </div>
  </nav>
</template>
