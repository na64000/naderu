<script setup lang="ts">
const { products, addProduct, removeProduct, updateProduct } = useProducts();

const form = ref({
  id: 0,
  name: "",
  price: 0,
  fandom: "",
  image: "https://via.placeholder.com/300",
  category: "Mousepad",
  preOrderEstimate: "7 Hari",
  branch: "",
  generation: "",
  description: "",
  variants: {
    "5mm_90x40": true,
    "3mm_90x40": true,
    "3mm_90x30": true,
    "3mm_80x40": true,
    "3mm_80x30": true,
    "3mm_70x30": true,
    "3mm_60x30": true,
  } as Record<string, boolean>,
});

const categoryOptions = [
  "Mousepad",
  "T-Shirt",
  "Hoodie",
  "Jaket",
  "Phone Case",
  "Figure",
  "Kolpri",
];
const clothingSizes = ["S", "M", "L", "XL", "XXL", "3XL", "4XL", "5XL"];

const fandomOptions = [
  "Genshin Impact",
  "Hololive",
  "Valorant",
  "Honkai Star Rail",
  "Blue Archive",
  "Arknights",
  "Fate/Grand Order",
  "League of Legends",
  "Overwatch 2",
  "Apex Legends",
  "Dota 2",
  "Counter Strike 2",
];

const hololiveData = [
  {
    name: "Hololive JP",
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
    generations: ["Myth", "Hope", "Council", "Promise", "Advent", "Justice"],
  },
  {
    name: "Hololive ID",
    generations: ["Gen 1", "Gen 2", "Gen 3"],
  },
  {
    name: "DEV_IS",
    generations: ["ReGLOSS", "FLOW GLOW"],
  },
];

const isEditing = ref(false);

const resetForm = () => {
  form.value = {
    id: 0,
    name: "",
    price: 0,
    fandom: "",
    image: "https://via.placeholder.com/300",
    description: "",
    category: "Mousepad",
    preOrderEstimate: "7 Hari",
    branch: "",
    generation: "",
    variants: {
      "5mm_90x40": true,
      "3mm_90x40": true,
      "3mm_90x30": true,
      "3mm_80x40": true,
      "3mm_80x30": true,
      "3mm_70x30": true,
      "3mm_60x30": true,
    },
  };
  isEditing.value = false;
};

const handleSubmit = () => {
  if (isEditing.value) {
    updateProduct({ ...form.value });
  } else {
    addProduct({ ...form.value });
  }
  resetForm();
};

const handleImageUpload = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files[0]) {
    const reader = new FileReader();
    reader.onload = (e) => {
      form.value.image = e.target?.result as string;
    };
    reader.readAsDataURL(input.files[0]);
  }
};

const handleEdit = (product: any) => {
  // Pastikan variants ada (untuk backward compatibility data lama)
  const defaultVariants = {
    "5mm_90x40": true,
    "3mm_90x40": true,
    "3mm_90x30": true,
    "3mm_80x40": true,
    "3mm_80x30": true,
    "3mm_70x30": true,
    "3mm_60x30": true,
  };
  form.value = {
    ...product,
    variants: product.variants || defaultVariants,
    category: product.category || "Mousepad",
    preOrderEstimate: product.preOrderEstimate || "7 Hari",
    branch: product.branch || "",
    generation: product.generation || "",
  };
  isEditing.value = true;
};

const availableGenerations = computed(() => {
  const branch = hololiveData.find((b) => b.name === form.value.branch);
  return branch ? branch.generations : [];
});
</script>

<template>
  <div class="bg-zinc-900 p-6 rounded-xl shadow-md border border-zinc-700">
    <h2 class="text-xl font-bold mb-4 text-violet-100">Manajemen Produk</h2>

    <!-- Form -->
    <form
      @submit.prevent="handleSubmit"
      class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8"
    >
      <input
        v-model="form.name"
        placeholder="Nama Produk"
        class="border border-zinc-700 bg-zinc-800 text-violet-100 p-2 rounded focus:outline-none focus:border-violet-500"
        required
      />
      <input
        v-model.number="form.price"
        type="number"
        placeholder="Harga (IDR)"
        class="border border-zinc-700 bg-zinc-800 text-violet-100 p-2 rounded focus:outline-none focus:border-violet-500"
        required
      />
      <select
        v-model="form.category"
        class="border border-zinc-700 bg-zinc-800 text-violet-100 p-2 rounded focus:outline-none focus:border-violet-500"
        required
      >
        <option v-for="cat in categoryOptions" :key="cat" :value="cat">
          {{ cat }}
        </option>
      </select>

      <input
        v-model="form.preOrderEstimate"
        placeholder="Estimasi Pre-order (ex: 7 Hari)"
        class="border border-zinc-700 bg-zinc-800 text-violet-100 p-2 rounded focus:outline-none focus:border-violet-500"
        required
      />

      <select
        v-model="form.fandom"
        class="border border-zinc-700 bg-zinc-800 text-violet-100 p-2 rounded focus:outline-none focus:border-violet-500"
        required
      >
        <option value="" disabled>Pilih Fandom</option>
        <option v-for="fandom in fandomOptions" :key="fandom" :value="fandom">
          {{ fandom }}
        </option>
      </select>

      <template v-if="form.fandom === 'Hololive'">
        <select
          v-model="form.branch"
          class="border border-zinc-700 bg-zinc-800 text-violet-100 p-2 rounded focus:outline-none focus:border-violet-500"
        >
          <option value="" disabled>Pilih Branch</option>
          <option
            v-for="branch in hololiveData"
            :key="branch.name"
            :value="branch.name"
          >
            {{ branch.name }}
          </option>
        </select>
        <select
          v-model="form.generation"
          class="border border-zinc-700 bg-zinc-800 text-violet-100 p-2 rounded focus:outline-none focus:border-violet-500"
        >
          <option value="" disabled>Pilih Generation</option>
          <option v-for="gen in availableGenerations" :key="gen" :value="gen">
            {{ gen }}
          </option>
        </select>
      </template>
      <input
        v-model="form.description"
        placeholder="Deskripsi Singkat"
        class="border border-zinc-700 bg-zinc-800 text-violet-100 p-2 rounded focus:outline-none focus:border-violet-500"
      />

      <!-- Image Upload -->
      <div class="md:col-span-2">
        <label class="block text-violet-200 text-sm mb-1">Foto Produk</label>
        <div class="flex gap-2">
          <input
            v-model="form.image"
            placeholder="URL Gambar"
            class="flex-grow border border-zinc-700 bg-zinc-800 text-violet-100 p-2 rounded focus:outline-none focus:border-violet-500"
          />
          <label
            class="cursor-pointer bg-violet-700 text-white px-4 py-2 rounded hover:bg-violet-600 transition flex items-center"
          >
            <span>Upload</span>
            <input
              type="file"
              @change="handleImageUpload"
              class="hidden"
              accept="image/*"
            />
          </label>
        </div>
      </div>

      <!-- Stock Management -->
      <div
        class="md:col-span-2 bg-zinc-800 p-4 rounded-lg border border-zinc-700"
      >
        <h3 class="text-violet-200 font-bold mb-3">Ketersediaan Stok</h3>

        <div v-if="form.category === 'Mousepad'" class="mb-4">
          <h4 class="text-violet-300 text-sm mb-2">Premium 5mm</h4>
          <label class="flex items-center space-x-2 text-violet-100">
            <input
              type="checkbox"
              v-model="form.variants['5mm_90x40']"
              class="rounded border-zinc-600 bg-zinc-700 text-violet-600 focus:ring-violet-500"
            />
            <span>90x40 cm</span>
          </label>

          <h4 class="text-violet-300 text-sm mb-2">Reguler 3mm</h4>
          <div class="grid grid-cols-2 md:grid-cols-3 gap-2">
            <label
              v-for="size in [
                '90x40',
                '90x30',
                '80x40',
                '80x30',
                '70x30',
                '60x30',
              ]"
              :key="size"
              class="flex items-center space-x-2 text-violet-100"
            >
              <input
                type="checkbox"
                v-model="form.variants[`3mm_${size}`]"
                class="rounded border-zinc-600 bg-zinc-700 text-violet-600 focus:ring-violet-500"
              />
              <span>{{ size }} cm</span>
            </label>
          </div>
        </div>

        <div v-else-if="['T-Shirt', 'Hoodie', 'Jaket'].includes(form.category)">
          <h4 class="text-violet-300 text-sm mb-2">Ukuran Pakaian</h4>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-2">
            <label
              v-for="size in clothingSizes"
              :key="size"
              class="flex items-center space-x-2 text-violet-100"
            >
              <input
                type="checkbox"
                v-model="form.variants[size]"
                class="rounded border-zinc-600 bg-zinc-700 text-violet-600 focus:ring-violet-500"
              />
              <span>{{ size }}</span>
            </label>
          </div>
        </div>

        <div v-else>
          <h4 class="text-violet-300 text-sm mb-2">Status Stok</h4>
          <label class="flex items-center space-x-2 text-violet-100">
            <input
              type="checkbox"
              v-model="form.variants['default']"
              class="rounded border-zinc-600 bg-zinc-700 text-violet-600 focus:ring-violet-500"
            />
            <span>Stok Tersedia</span>
          </label>
        </div>
      </div>

      <div class="md:col-span-2 flex gap-2">
        <button
          type="submit"
          class="bg-violet-700 text-white px-4 py-2 rounded hover:bg-violet-600 transition w-full"
        >
          {{ isEditing ? "Update Produk" : "Tambah Produk" }}
        </button>
        <button
          v-if="isEditing"
          @click="resetForm"
          type="button"
          class="bg-zinc-700 text-white px-4 py-2 rounded hover:bg-zinc-600 transition"
        >
          Batal
        </button>
      </div>
    </form>

    <!-- List Table Sederhana -->
    <div class="overflow-x-auto">
      <table class="w-full text-sm text-left text-violet-300">
        <thead class="text-xs text-violet-200 uppercase bg-zinc-800">
          <tr>
            <th class="px-4 py-3">Nama</th>
            <th class="px-4 py-3">Harga</th>
            <th class="px-4 py-3">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in products"
            :key="item.id"
            class="border-b border-zinc-800 hover:bg-zinc-800"
          >
            <td class="px-4 py-3 font-medium text-violet-100">
              {{ item.name }}
            </td>
            <td class="px-4 py-3">{{ formatIDR(item.price) }}</td>
            <td class="px-4 py-3 flex gap-2">
              <button
                @click="handleEdit(item)"
                class="text-violet-400 hover:underline"
              >
                Edit
              </button>
              <button
                @click="removeProduct(item.id)"
                class="text-red-400 hover:underline"
              >
                Hapus
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
