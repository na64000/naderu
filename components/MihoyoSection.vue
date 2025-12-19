<script setup lang="ts">
import gilogo from "./assets/mihoyo/section/tab/gilogo.webp";
import hsrlogo from "./assets/mihoyo/section/tab/hsrlogo.webp";
import zzzlogo from "./assets/mihoyo/section/tab/zzzlogo.webp";
import enfield from "./assets/mihoyo/section/tab/enfield.webp";
import arknightslogo from "./assets/mihoyo/section/tab/ak.webp";

const { products } = useProducts();

const activeBranch = ref("");
const visibleCount = ref(12);

const branches = [
  {
    name: "Genshin Impact",
    logo: gilogo,
  },
  {
    name: "Honkai Star Rail",
    logo: hsrlogo,
  },
  {
    name: "Zenless Zone Zero",
    logo: zzzlogo,
  },
  {
    name: "Enfield",
    logo: enfield,
  },
  {
    name: "Arknights",
    logo: arknightslogo,
  },
];

watch(activeBranch, (newVal) => {
  visibleCount.value = 12;
});

const filteredProducts = computed(() => {
  const mihoyoFandoms = [
    "Genshin Impact",
    "Honkai Star Rail",
    "Zenless Zone Zero",
  ];
  return products.value.filter((p) => {
    if (activeBranch.value) {
      return p.fandom === activeBranch.value;
    }
    return mihoyoFandoms.includes(p.fandom);
  });
});

const displayedProducts = computed(() => {
  return filteredProducts.value.slice(0, visibleCount.value);
});

const hasMore = computed(() => {
  return visibleCount.value < filteredProducts.value.length;
});

const loadMore = () => {
  visibleCount.value += 12;
};

const handleRequest = () =>
  window.open(
    `https://wa.me/6281234567890?text=Halo, saya ingin request item untuk ${
      activeBranch.value || "Hoyoverse"
    }`,
    "_blank"
  );
const handleCustom = () =>
  window.open(
    `https://wa.me/6281234567890?text=Halo, saya ingin custom order mousepad`,
    "_blank"
  );
</script>

<template>
  <div
    class="my-8 bg-violet-100 rounded-xl overflow-hidden shadow-sm border border-violet-200 shadow-lg"
  >
    <!-- Header / Tabs -->
    <div class="bg-violet-100 p-6">
      <h2
        class="text-2xl font-bold text-violet-700 mb-6 border-l-4 border-violet-400 pl-3"
      >
        Koleksi Game Favorit
      </h2>

      <!-- Main Tabs (Branches) -->
      <div class="grid grid-cols-3 md:grid-cols-6 gap-4">
        <button
          v-for="branch in branches"
          :key="branch.name"
          @click="activeBranch = branch.name"
          :class="[
            'flex items-center gap-3 px-4 py-2 rounded-lg transition-all border',
            activeBranch === branch.name
              ? 'bg-white border-violet-100 text-violet-900 text-xs shadow-lg transform scale-105'
              : 'bg-white text-violet-300 hover:bg-violet-200 hover:text-white hover:border-violet-500',
          ]"
        >
          <img
            :src="branch.logo"
            :alt="branch.name"
            class="w-full max-h-24 object-contain p-1 rounded-lg"
          />
          <!--<span>{{ branch.name }}</span>-->
        </button>
      </div>
    </div>

    <!-- Product Grid -->
    <div class="p-2 md:p-6 bg-violet-50">
      <div
        v-if="displayedProducts.length > 0"
        class="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-6"
      >
        <ProductCard
          v-for="product in displayedProducts"
          :key="product.id"
          :product="product"
        />
      </div>
      <div v-else class="text-center py-12 text-violet-400">
        <p class="text-md md:text-lg font-medium">
          Belum ada produk untuk {{ activeBranch }}
        </p>
        <div class="flex justify-center gap-4 mt-6">
          <button
            @click="handleRequest"
            class="px-4 py-2 border border-violet-400 text-violet-600 rounded-lg hover:bg-violet-200 transition font-medium"
          >
            Request ?
          </button>
          <button
            @click="handleCustom"
            class="px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-500 transition font-medium shadow-lg shadow-violet-200"
          >
            Custom Order ?
          </button>
        </div>
      </div>

      <!-- Load More Button -->
      <div v-if="hasMore" class="mt-8 text-center">
        <button
          @click="loadMore"
          class="px-6 py-2 bg-white border border-violet-300 text-violet-700 font-medium rounded-full hover:bg-violet-100 transition shadow-sm"
        >
          Muat Lebih Banyak
        </button>
      </div>
    </div>
  </div>
</template>
