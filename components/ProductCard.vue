<script setup lang="ts">
defineProps<{
  product: {
    id: number;
    name: string;
    price: number;
    image: string;
    fandom: string;
    category?: string;
    preOrderEstimate?: string;
    description: string;
    variants?: Record<string, boolean>;
  };
}>();

const isModalOpen = ref(false);

const tanyaItem = (name: string) => {
  // Simulasi link WA
  window.open(
    `https://wa.me/6281234567890?text=Halo, saya mau tanya tentang ${name}`,
    "_blank"
  );
};

const orderItem = () => {
  isModalOpen.value = true;
};
</script>

<template>
  <div
    class="bg-violet-100 rounded-xl shadow-sm hover:shadow-md transition overflow-hidden border border-violet-700 flex flex-col"
  >
    <div class="aspect-square bg-violet-100 relative">
      <img
        :src="product.image"
        :alt="product.name"
        class="w-full h-full object-cover"
      />
      <span
        class="absolute top-2 right-2 bg-violet-500 text-white text-xs px-2 py-1 rounded-full"
      >
        {{ product.fandom }}
      </span>
    </div>
    <div class="p-4 flex flex-col flex-grow">
      <h3 class="font-bold text-sm md:text-md text-violet-900 mb-1">
        {{ product.name }}
      </h3>
      <p class="text-violet-400 font-bold text-lg mb-2">
        {{ formatIDR(product.price) }}
      </p>
      <p class="text-violet-300 text-sm mb-4 flex-grow line-clamp-2">
        {{ product.description }}
      </p>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-2 mt-auto">
        <button
          @click="tanyaItem(product.name)"
          class="px-3 py-2 border border-violet-500 text-violet-800 hover:text-violet-900 rounded-lg text-sm font-medium hover:bg-violet-200 transition"
        >
          Tanya Item
        </button>
        <button
          @click="orderItem"
          class="px-3 py-2 bg-violet-700 text-white rounded-lg text-sm font-medium hover:bg-violet-600 transition"
        >
          Order Item
        </button>
      </div>
    </div>

    <ProductOrderModal
      :is-open="isModalOpen"
      :product="product"
      @close="isModalOpen = false"
    />
  </div>
</template>
