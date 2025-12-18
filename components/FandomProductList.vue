<script setup lang="ts">
const props = defineProps<{
  fandomName: string;
  bgClass?: string;
  textClass?: string;
}>();

const { products } = useProducts();

// Filter produk berdasarkan fandom secara otomatis
const filteredProducts = computed(() => {
  return products.value.filter(
    (p) => p.fandom.toLowerCase() === props.fandomName.toLowerCase()
  );
});
</script>

<template>
  <div :class="['my-8 p-6 rounded-xl', bgClass || 'bg-violet-100']">
    <div class="flex items-center justify-between mb-6">
      <h2
        :class="[
          'text-2xl font-bold border-l-4 border-violet-500 pl-3',
          textClass || 'text-violet-900',
        ]"
      >
        Koleksi {{ fandomName }}
      </h2>
      <NuxtLink
        to="/katalog"
        :class="['text-sm hover:underline', textClass || 'text-violet-700']"
        >Lihat Semua</NuxtLink
      >
    </div>

    <div
      v-if="filteredProducts.length > 0"
      class="grid grid-cols-2 md:grid-cols-4 gap-6"
    >
      <ProductCard
        v-for="product in filteredProducts"
        :key="product.id"
        :product="product"
      />
    </div>
    <div
      v-else
      class="text-center py-10 rounded-lg opacity-50"
      :class="textClass || 'text-violet-900'"
    >
      Belum ada produk untuk fandom {{ fandomName }}.
    </div>
  </div>
</template>
