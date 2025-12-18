<script setup lang="ts">
import holojplogo from "./assets/hololive/section/tab/top_logo_hololive.svg";
import holoenlogo from "./assets/hololive/section/tab/top_logo_hololive_en.svg";
import holoidlogo from "./assets/hololive/section/tab/top_logo_hololive_id.svg";
import devislogo from "./assets/hololive/section/tab/top_logo_devis.svg";

const { products } = useProducts();

const activeBranch = ref("");
const activeGen = ref("");
const visibleCount = ref(12);

const branches = [
  {
    name: "Hololive JP",
    logo: holojplogo,
    generations: [
      "Gen 0",
      "Gen 1",
      "Gen 2",
      "Gen 3",
      "Gen 4",
      "Gen 5",
      "holoX",
      "GLOW",
      "Gamers",
    ],
  },
  {
    name: "Hololive EN",
    logo: holoenlogo,
    generations: ["Myth", "Hope", "Council", "Promise", "Advent", "Justice"],
  },
  {
    name: "Hololive ID",
    logo: holoidlogo,
    generations: ["Gen 1", "Gen 2", "Gen 3"],
  },
  {
    name: "DEV_IS",
    logo: devislogo,
    generations: ["ReGLOSS", "FLOW GLOW"],
  },
];

const currentGenerations = computed(() => {
  return branches.find((b) => b.name === activeBranch.value)?.generations || [];
});

watch(activeBranch, (newVal) => {
  const branch = branches.find((b) => b.name === newVal);
  if (branch && branch.generations.length > 0) {
    activeGen.value = branch.generations[0];
  }
  // Reset visible count saat tab berubah
  visibleCount.value = 12;
});

const filteredProducts = computed(() => {
  // Filter produk Hololive
  return products.value.filter((p) => {
    const isHololive = p.fandom.toLowerCase() === "hololive";
    const matchBranch = activeBranch.value
      ? p.branch === activeBranch.value
      : true;
    const matchGen = activeGen.value ? p.generation === activeGen.value : true;

    return isHololive && matchBranch && matchGen;
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
    `https://wa.me/6281234567890?text=Halo, saya ingin request item untuk ${activeBranch.value} - ${activeGen.value}`,
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
    class="my-8 bg-violet-100 rounded-xl overflow-hidden shadow-sm border border-violet-200"
  >
    <!-- Header / Tabs -->
    <div class="bg-violet-100 p-6">
      <h2
        class="text-2xl font-bold text-white mb-6 border-l-4 border-violet-400 pl-3"
      >
        Koleksi Hololive
      </h2>

      <!-- Main Tabs (Branches) -->
      <div
        class="grid grid-cols-2 md:grid-cols-4 gap-4 border-b border-violet-300 pb-6"
      >
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
            class="w-full max-h-12 object-contain p-2"
          />
          <!--<span>{{ branch.name }}</span>-->
        </button>
      </div>

      <!-- Sub Tabs (Generations) -->
      <div class="flex flex-wrap gap-2 mt-6">
        <button
          v-for="gen in currentGenerations"
          :key="gen"
          @click="activeGen = gen"
          :class="[
            'px-4 py-1.5 text-sm rounded-full transition-colors border',
            activeGen === gen
              ? 'bg-white border-white border text-violet-800 font-medium shadow-lg transform scale-105'
              : 'bg-white text-violet-500 hover:text-violet-500 hover:bg-violet-200 hover:border-violet-500',
          ]"
        >
          {{ gen }}
        </button>
      </div>
    </div>

    <!-- Product Grid -->
    <div class="p-6 bg-violet-50">
      <div
        v-if="displayedProducts.length > 0"
        class="grid grid-cols-2 md:grid-cols-4 gap-6"
      >
        <ProductCard
          v-for="product in displayedProducts"
          :key="product.id"
          :product="product"
        />
      </div>
      <div v-else class="text-center py-12 text-violet-400">
        <p class="text-lg font-medium">
          Belum ada produk untuk {{ activeBranch }} - {{ activeGen }}
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
