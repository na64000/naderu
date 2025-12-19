<template>
  <div class="max-w-3xl mx-auto">
    <h1 class="text-2xl font-bold text-violet-700 mb-6">Checkout</h1>

    <!-- Product Summary -->
    <div
      class="bg-white shadow-lg p-6 rounded-xl border bg-violet-200 mb-6 flex gap-4"
    >
      <img
        :src="order.product?.image"
        class="w-24 h-24 object-cover rounded-lg"
      />
      <div>
        <h3 class="text-zinc-700 font-bold">{{ order.product?.name }}</h3>
        <p class="text-zinc-700 text-sm">
          {{ order.variant }} {{ order.size ? `- ${order.size}` : "" }}
        </p>
        <p class="text-zinc-700 text-sm">Qty: {{ order.quantity }}</p>
        <p class="text-zinc-700 font-bold mt-2">
          {{ formatIDR(order.product?.price * order.quantity) }}
        </p>
      </div>
    </div>

    <!-- Forms -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      <!-- Buyer Data -->
      <div
        class="bg-white shadow-lg p-6 rounded-xl border bg-violet-200 space-y-4"
      >
        <h3 class="text-lg font-bold text-zinc-700">Data Diri</h3>
        <div>
          <label class="block text-xs text-zinc-700 mb-1">Nama Lengkap</label>
          <input
            v-model="order.buyer.name"
            class="w-full bg-white rounded-lg shadow-lg border bg-violet-200 rounded p-2 text-zinc-700 focus:border-violet-500 outline-none"
            placeholder="Nama Anda"
          />
        </div>
        <div>
          <label class="block text-xs text-zinc-700 mb-1">Email</label>
          <input
            v-model="order.buyer.email"
            type="email"
            class="w-full bg-white rounded-lg shadow-lg border bg-violet-200 rounded p-2 text-zinc-700 focus:border-violet-500 outline-none"
            placeholder="email@contoh.com"
          />
        </div>
        <div>
          <label class="block text-xs text-zinc-700 mb-1">Nomor WhatsApp</label>
          <input
            v-model="order.buyer.whatsapp"
            class="w-full bg-white rounded-lg shadow-lg border bg-violet-200 rounded p-2 text-zinc-700 focus:border-violet-500 outline-none"
            placeholder="0812..."
          />
        </div>
      </div>

      <!-- Shipping Data -->
      <div
        class="bg-white shadow-lg p-6 rounded-xl border bg-violet-200 space-y-4"
      >
        <h3 class="text-lg font-bold text-zinc-700">Alamat Pengiriman</h3>
        <div>
          <label class="block text-xs text-zinc-700 mb-1">Provinsi</label>
          <select
            v-model="order.buyer.province"
            class="w-full bg-white rounded-lg shadow-lg border bg-violet-200 rounded p-2 text-zinc-700 focus:border-violet-500 outline-none"
          >
            <option value="" disabled>Pilih Provinsi</option>
            <option v-for="p in provinces" :key="p" :value="p">{{ p }}</option>
          </select>
        </div>
        <div class="grid grid-cols-2 gap-2">
          <div>
            <label class="block text-xs text-zinc-700 mb-1">Kota/Kab</label>
            <select
              v-model="order.buyer.city"
              :disabled="!order.buyer.province"
              class="w-full bg-white rounded-lg shadow-lg border bg-violet-200 rounded p-2 text-zinc-700 focus:border-violet-500 outline-none disabled:opacity-50"
            >
              <option value="" disabled>Pilih Kota</option>
              <option v-for="c in cities" :key="c" :value="c">{{ c }}</option>
            </select>
          </div>
          <div>
            <label class="block text-xs text-zinc-700 mb-1">Kecamatan</label>
            <select
              v-model="order.buyer.district"
              :disabled="!order.buyer.city"
              class="w-full bg-white rounded-lg shadow-lg border bg-violet-200 rounded p-2 text-zinc-700 focus:border-violet-500 outline-none disabled:opacity-50"
            >
              <option value="" disabled>Pilih Kecamatan</option>
              <option v-for="d in districts" :key="d" :value="d">
                {{ d }}
              </option>
            </select>
          </div>
        </div>
        <div>
          <label class="block text-xs text-zinc-700 mb-1">Kode Pos</label>
          <input
            v-model="order.buyer.postalCode"
            class="w-full bg-white rounded-lg shadow-lg border bg-violet-200 rounded p-2 text-zinc-700 focus:border-violet-500 outline-none"
            placeholder="12345"
          />
        </div>
        <div>
          <label class="block text-xs text-zinc-700 mb-1">Alamat Lengkap</label>
          <textarea
            v-model="order.buyer.address"
            rows="2"
            class="w-full bg-white rounded-lg shadow-lg border bg-violet-200 rounded p-2 text-zinc-700 focus:border-violet-500 outline-none"
            placeholder="Nama Jalan, No. Rumah"
          ></textarea>
        </div>
      </div>
    </div>

    <!-- Expedition -->
    <div class="bg-white shadow-lg p-6 rounded-xl border bg-violet-200 mb-6">
      <h3 class="text-lg font-bold text-zinc-700 mb-4">Ekspedisi Pengiriman</h3>
      <select
        v-model="order.expedition"
        class="w-full bg-white rounded-lg shadow-lg border bg-violet-200 rounded p-2 text-zinc-700 focus:border-violet-500 outline-none"
      >
        <option value="" disabled>Pilih Ekspedisi</option>
        <option v-for="exp in expeditions" :key="exp" :value="exp">
          {{ exp }}
        </option>
      </select>
    </div>

    <!-- Payment Method -->
    <div class="bg-white shadow-lg p-6 rounded-xl border bg-violet-200 mb-6">
      <h3 class="text-lg font-bold text-zinc-700 mb-4">Metode Pembayaran</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <label
          class="flex items-center p-4 border bg-white rounded-lg cursor-pointer hover:bg-violet-200 rounded-lg shadow-lg transition"
          :class="
            order.paymentMethod === 'transfer'
              ? 'bg-white rounded-lg shadow-lg  border-violet-500'
              : ''
          "
        >
          <input
            type="radio"
            v-model="order.paymentMethod"
            value="transfer"
            class="mr-3 text-violet-600 focus:ring-violet-500"
          />
          <span class="text-zinc-700 font-medium"
            >Transfer Bank (BCA / Blu)</span
          >
        </label>
        <label
          class="flex items-center p-4 border bg-white rounded-lg cursor-pointer hover:bg-violet-200 rounded-lg shadow-lg transition"
          :class="
            order.paymentMethod === 'qris'
              ? 'bg-white rounded-lg shadow-lg  border-violet-500'
              : ''
          "
        >
          <input
            type="radio"
            v-model="order.paymentMethod"
            value="qris"
            class="mr-3 text-violet-600 focus:ring-violet-500"
          />
          <span class="text-zinc-700 font-medium">QRIS</span>
        </label>
      </div>
    </div>

    <button
      @click="handlePayment"
      class="w-full bg-violet-600 text-white py-3 rounded-xl font-bold hover:bg-violet-500 transition shadow-lg shadow-violet-900/20"
    >
      Lanjut ke Pembayaran
    </button>
  </div>
</template>

<script lang="ts" setup>
const { order } = useOrder();
const router = useRouter();

// Redirect if no product selected
if (!order.value.product) {
  router.push("/");
}

// Dummy Location Data
const provinces = ["Jawa Barat", "DKI Jakarta", "Jawa Tengah"];
const cities = computed(() => {
  if (order.value.buyer.province === "Jawa Barat")
    return ["Bandung", "Bekasi", "Depok"];
  if (order.value.buyer.province === "DKI Jakarta")
    return ["Jakarta Selatan", "Jakarta Pusat", "Jakarta Barat"];
  if (order.value.buyer.province === "Jawa Tengah")
    return ["Semarang", "Solo", "Magelang"];
  return [];
});
const districts = computed(() => {
  if (order.value.buyer.city === "Bandung")
    return ["Coblong", "Cicendo", "Sukajadi"];
  if (order.value.buyer.city === "Jakarta Selatan")
    return ["Tebet", "Setiabudi", "Pasar Minggu"];
  if (order.value.buyer.city === "Semarang")
    return ["Banyumanik", "Tembalang", "Candisari"];
  return ["Kecamatan A", "Kecamatan B"]; // Fallback
});

const expeditions = ["JNE", "J&T", "SiCepat"];

const handlePayment = () => {
  if (
    !order.value.buyer.name ||
    !order.value.buyer.whatsapp ||
    !order.value.buyer.email ||
    !order.value.buyer.address ||
    !order.value.expedition ||
    !order.value.paymentMethod
  ) {
    alert("Mohon lengkapi data diri, alamat, ekspedisi, dan metode pembayaran");
    return;
  }
  router.push("/payment");
};
</script>

<style scoped></style>
