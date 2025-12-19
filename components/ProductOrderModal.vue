<script setup lang="ts">
const { order } = useOrder();
const router = useRouter();

const props = defineProps<{
  isOpen: boolean;
  product: any;
}>();

const emit = defineEmits(["close"]);

const thicknessOptions = ["Premium 5mm", "Reguler 3mm"];
const sizeOptions = ["90x40", "90x30", "80x40", "80x30", "70x30", "60x30"];
const clothingSizes = ["S", "M", "L", "XL", "XXL", "3XL", "4XL", "5XL"];

const selectedThickness = ref("Reguler 3mm");
const selectedSize = ref("90x40");
const selectedClothingSize = ref("L");
const quantity = ref(1);

// Reset selection when modal opens
watch(
  () => props.isOpen,
  (newVal) => {
    if (newVal) {
      // Reset options
      selectedThickness.value = "Reguler 3mm";
      selectedSize.value = "90x40";
      quantity.value = 1;
    }
  }
);

const availableSizes = computed(() => {
  if (selectedThickness.value === "Premium 5mm") {
    return ["90x40"];
  }
  return sizeOptions;
});

// Ensure selected size is valid when thickness changes
watch(selectedThickness, (newVal) => {
  if (newVal === "Premium 5mm") {
    selectedSize.value = "90x40";
  }
});

const isOutOfStock = computed(() => {
  if (!props.product.variants) return false;

  let key = "";
  const category = props.product.category || "Mousepad";

  if (category === "Mousepad") {
    key = `${selectedThickness.value.includes("5mm") ? "5mm" : "3mm"}_${
      selectedSize.value
    }`;
  } else if (["T-Shirt", "Hoodie", "Jaket"].includes(category)) {
    key = selectedClothingSize.value;
  } else {
    key = "default";
  }

  return !props.product.variants[key];
});

const proceedToCheckout = () => {
  order.value.product = props.product;
  order.value.quantity = quantity.value;

  if (props.product.category === "Mousepad" || !props.product.category) {
    order.value.variant = selectedThickness.value;
    order.value.size = selectedSize.value;
  } else if (["T-Shirt", "Hoodie", "Jaket"].includes(props.product.category)) {
    order.value.size = selectedClothingSize.value;
    order.value.variant = "";
  }

  emit("close");
  router.push("/checkout");
};
</script>

<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-80 backdrop-blur-sm"
  >
    <div
      class="bg-zinc-900 rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto border border-zinc-700 flex flex-col shadow-2xl"
    >
      <!-- Header -->
      <div
        class="p-4 border-b border-zinc-800 flex justify-between items-center"
      >
        <h3 class="text-xl font-bold text-violet-100">Detail Pesanan</h3>
        <button @click="$emit('close')" class="text-zinc-400 hover:text-white">
          <svg
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
      </div>

      <div class="p-6 space-y-6">
        <!-- Size Guide Image -->
        <div v-if="product.category === 'Mousepad' || !product.category">
          <p class="text-sm text-violet-300 mb-2">Panduan Ukuran (1:1)</p>
          <div
            class="aspect-square bg-zinc-800 rounded-lg overflow-hidden border border-zinc-700 flex items-center justify-center relative"
          >
            <img
              src="https://via.placeholder.com/500?text=Panduan+Ukuran+1:1"
              alt="Size Guide"
              class="w-full h-full object-cover"
            />
          </div>
        </div>

        <!-- Pre-order Estimate -->
        <div class="bg-violet-900/30 p-3 rounded-lg border border-violet-800">
          <p class="text-violet-200 text-sm font-medium">
            Estimasi Pre-order:
            <span class="text-white">{{
              product.preOrderEstimate || "7 Hari"
            }}</span>
          </p>
        </div>

        <!-- Options: Mousepad -->
        <div v-if="product.category === 'Mousepad' || !product.category">
          <label class="block text-sm font-medium text-violet-200 mb-2"
            >Pilih Ketebalan</label
          >
          <div class="flex gap-3">
            <button
              v-for="opt in thicknessOptions"
              :key="opt"
              @click="selectedThickness = opt"
              :class="[
                'px-4 py-2 rounded-lg text-sm font-medium border transition',
                selectedThickness === opt
                  ? 'bg-violet-700 border-violet-500 text-white'
                  : 'bg-zinc-800 border-zinc-700 text-zinc-300 hover:bg-zinc-700',
              ]"
            >
              {{ opt }}
            </button>
          </div>

          <label class="block text-sm font-medium text-violet-200 mb-2"
            >Pilih Ukuran (cm)</label
          >
          <div class="grid grid-cols-3 gap-2">
            <button
              v-for="size in sizeOptions"
              :key="size"
              @click="selectedSize = size"
              :disabled="!availableSizes.includes(size)"
              :class="[
                'px-2 py-2 rounded-lg text-sm font-medium border transition',
                selectedSize === size
                  ? 'bg-violet-700 border-violet-500 text-white'
                  : availableSizes.includes(size)
                  ? 'bg-zinc-800 border-zinc-700 text-zinc-300 hover:bg-zinc-700'
                  : 'bg-zinc-900 border-zinc-800 text-zinc-600 cursor-not-allowed opacity-50',
              ]"
            >
              {{ size }}
            </button>
          </div>
        </div>

        <!-- Options: Clothing -->
        <div
          v-else-if="['T-Shirt', 'Hoodie', 'Jaket'].includes(product.category)"
        >
          <label class="block text-sm font-medium text-violet-200 mb-2"
            >Pilih Ukuran</label
          >
          <div class="flex flex-wrap gap-2">
            <button
              v-for="size in clothingSizes"
              :key="size"
              @click="selectedClothingSize = size"
              :class="[
                'w-12 h-12 flex items-center justify-center rounded-lg text-sm font-medium border transition',
                selectedClothingSize === size
                  ? 'bg-violet-700 border-violet-500 text-white'
                  : 'bg-zinc-800 border-zinc-700 text-zinc-300 hover:bg-zinc-700',
              ]"
            >
              {{ size }}
            </button>
          </div>
        </div>

        <!-- Quantity -->
        <div class="border-t border-zinc-800 pt-6 space-y-4">
          <div>
            <label class="block text-xs text-violet-300 mb-1"
              >Jumlah Pembelian</label
            >
            <input
              type="number"
              v-model="quantity"
              min="1"
              class="w-24 bg-zinc-800 border border-zinc-700 rounded p-2 text-white focus:border-violet-500 outline-none"
            />
          </div>
        </div>

        <!-- Stock Warning -->
        <div
          v-if="isOutOfStock"
          class="p-3 bg-red-900/30 border border-red-800 rounded-lg text-red-200 text-sm"
        >
          Maaf, varian ini sedang tidak tersedia (Out of Stock).
        </div>
      </div>

      <!-- Footer -->
      <div class="p-4 border-t border-zinc-800 flex flex-col gap-3">
        <button
          @click="proceedToCheckout"
          :disabled="isOutOfStock"
          class="w-full py-3 bg-violet-600 hover:bg-violet-500 disabled:bg-zinc-700 disabled:cursor-not-allowed text-white font-bold rounded-lg transition"
        >
          {{ isOutOfStock ? "Stok Habis" : "Lanjut ke Checkout" }}
        </button>
      </div>
    </div>
  </div>
</template>
