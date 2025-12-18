<script setup lang="ts">
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

// Buyer Data
const buyer = reactive({
  name: "",
  whatsapp: "",
  quantity: 1,
  province: "",
  city: "",
  district: "",
  postalCode: "",
  address: "",
});

// Dummy Location Data
const provinces = ["Jawa Barat", "DKI Jakarta", "Jawa Tengah"];
const cities = computed(() => {
  if (buyer.province === "Jawa Barat") return ["Bandung", "Bekasi", "Depok"];
  if (buyer.province === "DKI Jakarta")
    return ["Jakarta Selatan", "Jakarta Pusat", "Jakarta Barat"];
  if (buyer.province === "Jawa Tengah") return ["Semarang", "Solo", "Magelang"];
  return [];
});
const districts = computed(() => {
  if (buyer.city === "Bandung") return ["Coblong", "Cicendo", "Sukajadi"];
  if (buyer.city === "Jakarta Selatan")
    return ["Tebet", "Setiabudi", "Pasar Minggu"];
  if (buyer.city === "Semarang")
    return ["Banyumanik", "Tembalang", "Candisari"];
  return ["Kecamatan A", "Kecamatan B"]; // Fallback
});

// Reset selection when modal opens
watch(
  () => props.isOpen,
  (newVal) => {
    if (newVal) {
      // Reset options
      selectedThickness.value = "Reguler 3mm";
      selectedSize.value = "90x40";
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

const constructMessage = () => {
  const category = props.product.category || "Mousepad";
  let specs = "";

  if (category === "Mousepad") {
    specs = `- Ketebalan: ${selectedThickness.value}\n- Ukuran: ${selectedSize.value} cm`;
  } else if (["T-Shirt", "Hoodie", "Jaket"].includes(category)) {
    specs = `- Ukuran: ${selectedClothingSize.value}`;
  } else {
    specs = "-";
  }

  return `Halo, saya ingin memesan ${props.product.name}.

Data Pemesan:
- Nama: ${buyer.name}
- WhatsApp: ${buyer.whatsapp}
- Alamat: ${buyer.address}, ${buyer.district}, ${buyer.city}, ${buyer.province}, ${buyer.postalCode}

Detail Pesanan:
- Jumlah: ${buyer.quantity}
Spesifikasi:
${specs}`;
};

const handleOrder = () => {
  window.open(
    `https://wa.me/6281234567890?text=${encodeURIComponent(
      constructMessage()
    )}`,
    "_blank"
  );
  emit("close");
};

const handleFacebookOrder = () => {
  window.open(
    `https://www.facebook.com/messages/t/naderustore?text=${encodeURIComponent(
      constructMessage()
    )}`,
    "_blank"
  );
  emit("close");
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

        <!-- Buyer Details Form -->
        <div class="border-t border-zinc-800 pt-6 space-y-4">
          <h4 class="text-lg font-bold text-violet-100">Data Pemesan</h4>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs text-violet-300 mb-1"
                >Nama Lengkap</label
              >
              <input
                v-model="buyer.name"
                class="w-full bg-zinc-800 border border-zinc-700 rounded p-2 text-white focus:border-violet-500 outline-none"
                placeholder="Nama Anda"
              />
            </div>
            <div>
              <label class="block text-xs text-violet-300 mb-1"
                >Nomor WhatsApp</label
              >
              <input
                v-model="buyer.whatsapp"
                class="w-full bg-zinc-800 border border-zinc-700 rounded p-2 text-white focus:border-violet-500 outline-none"
                placeholder="0812..."
              />
            </div>
          </div>

          <div>
            <label class="block text-xs text-violet-300 mb-1"
              >Jumlah Pembelian</label
            >
            <input
              type="number"
              v-model="buyer.quantity"
              min="1"
              class="w-24 bg-zinc-800 border border-zinc-700 rounded p-2 text-white focus:border-violet-500 outline-none"
            />
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs text-violet-300 mb-1">Provinsi</label>
              <select
                v-model="buyer.province"
                class="w-full bg-zinc-800 border border-zinc-700 rounded p-2 text-white focus:border-violet-500 outline-none"
              >
                <option value="" disabled>Pilih Provinsi</option>
                <option v-for="p in provinces" :key="p" :value="p">
                  {{ p }}
                </option>
              </select>
            </div>
            <div>
              <label class="block text-xs text-violet-300 mb-1"
                >Kabupaten/Kota</label
              >
              <select
                v-model="buyer.city"
                :disabled="!buyer.province"
                class="w-full bg-zinc-800 border border-zinc-700 rounded p-2 text-white focus:border-violet-500 outline-none disabled:opacity-50"
              >
                <option value="" disabled>Pilih Kota</option>
                <option v-for="c in cities" :key="c" :value="c">{{ c }}</option>
              </select>
            </div>
            <div>
              <label class="block text-xs text-violet-300 mb-1"
                >Kecamatan</label
              >
              <select
                v-model="buyer.district"
                :disabled="!buyer.city"
                class="w-full bg-zinc-800 border border-zinc-700 rounded p-2 text-white focus:border-violet-500 outline-none disabled:opacity-50"
              >
                <option value="" disabled>Pilih Kecamatan</option>
                <option v-for="d in districts" :key="d" :value="d">
                  {{ d }}
                </option>
              </select>
            </div>
            <div>
              <label class="block text-xs text-violet-300 mb-1">Kode Pos</label>
              <input
                v-model="buyer.postalCode"
                class="w-full bg-zinc-800 border border-zinc-700 rounded p-2 text-white focus:border-violet-500 outline-none"
                placeholder="12345"
              />
            </div>
          </div>

          <div>
            <label class="block text-xs text-violet-300 mb-1"
              >Alamat Lengkap</label
            >
            <textarea
              v-model="buyer.address"
              rows="3"
              class="w-full bg-zinc-800 border border-zinc-700 rounded p-2 text-white focus:border-violet-500 outline-none"
              placeholder="Nama Jalan, No. Rumah, RT/RW, Patokan"
            ></textarea>
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
          @click="handleOrder"
          :disabled="isOutOfStock"
          class="w-full py-3 bg-violet-600 hover:bg-violet-500 disabled:bg-zinc-700 disabled:cursor-not-allowed text-white font-bold rounded-lg transition"
        >
          {{ isOutOfStock ? "Stok Habis" : "Lanjut ke WhatsApp" }}
        </button>
        <button
          @click="handleFacebookOrder"
          :disabled="isOutOfStock"
          class="w-full py-3 bg-blue-600 hover:bg-blue-500 disabled:bg-zinc-700 disabled:cursor-not-allowed text-white font-bold rounded-lg transition"
        >
          {{ isOutOfStock ? "Stok Habis" : "Order via Facebook" }}
        </button>
      </div>
    </div>
  </div>
</template>
