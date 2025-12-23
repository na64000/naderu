<script setup lang="ts">
import gilogo from "./assets/mihoyo/section/tab/gilogo.webp";
import hsrlogo from "./assets/mihoyo/section/tab/hsrlogo.webp";
import zzzlogo from "./assets/mihoyo/section/tab/zzzlogo.webp";
import enfield from "./assets/mihoyo/section/tab/enfield.webp";
import arknightslogo from "./assets/mihoyo/section/tab/ak.webp";
import holologo from "./assets/hololive/holologo.jpeg";

const { products } = useProducts();

const fandoms = [
  { name: "Hololive", logo: holologo },
  { name: "Genshin Impact", logo: gilogo },
  {
    name: "Honkai Star Rail",
    logo: hsrlogo,
  },
  {
    name: "Zenless Zone Zero",
    logo: zzzlogo,
  },
  { name: "Arknights", logo: arknightslogo },
  { name: "Arknights Enfield", logo: enfield },
];
</script>

<template>
  <div>
    <!-- Announcement Marquee -->
    <div
      class="bg-violet-300 border-l-4 border-violet-600 text-violet-900 py-2 px-4 mb-8 overflow-hidden flex items-center rounded-r-lg shadow-sm"
    >
      <span
        class="font-bold bg-violet-600 text-white px-2 py-1 text-xs rounded mr-4 shrink-0 uppercase tracking-wider"
        >Pengumuman Penting</span
      >
      <div class="whitespace-nowrap w-full overflow-hidden relative">
        <div class="animate-marquee inline-block">
          Selamat datang di Naderu Store! Dapatkan diskon spesial grand opening
          untuk semua item. Pre-order batch 5 dibuka sampai tanggal 25. Stok
          terbatas!
        </div>
      </div>
    </div>
    <!-- hide 
    <div class="mb-12">
      <div
        class="flex overflow-x-auto md:grid md:grid-cols-6 gap-4 pb-4 md:pb-0 px-2 scrollbar-hide"
      >
        <div
          v-for="fandom in fandoms"
          :key="fandom.name"
          class="flex-shrink-0 w-24 md:w-auto flex flex-col items-center group cursor-pointer"
        >
          <div
            class="w-full min-h-24 bg-white rounded-lg group-hover:border-violet-500 transition flex items-center justify-center overflow-hidden mb-2 shadow-lg"
          >
            <img
              :src="fandom.logo"
              :alt="fandom.name"
              class="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition"
            />
          </div>
          <span
            class="text-xs text-center text-zinc-500 group-hover:text-violet-700 truncate w-full font-medium"
            >{{ fandom.name }}</span
          >
        </div>
      </div>
    </div> -->

    <!-- CTA Section -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-12">
      <!-- Custom Order -->
      <div
        class="bg-violet-100 shadow-lg backdrop-blur-sm p-6 rounded-xl border border-violet-600/50 hover:border-violet-500 transition group"
      >
        <h3
          class="text-2xl font-bold text-violet-700 mb-2 group-hover:text-violet-500"
        >
          Custom Order?
        </h3>
        <p class="text-zinc-800 mb-6 text-sm">
          Punya desain waifu atau husbando sendiri? Wujudkan mousepad impianmu
          dengan kualitas print premium dan berbagai pilihan ukuran.
        </p>
        <button
          class="px-5 py-2.5 bg-violet-600 hover:bg-violet-500 text-white font-semibold rounded-lg transition shadow-lg shadow-violet-900/20"
        >
          Konsultasi Desain
        </button>
      </div>

      <!-- Overseas Order -->
      <div
        class="bg-violet-100 shadow-lg backdrop-blur-sm p-6 rounded-xl border border-violet-600/50 hover:border-violet-500 transition group"
      >
        <h3
          class="text-2xl font-bold text-violet-700 mb-2 group-hover:text-violet-500"
        >
          Overseas Order?
        </h3>
        <p class="text-zinc-800 mb-6 text-sm">
          Living outside Indonesia? Don't worry! We ship worldwide. Get your
          favorite fandom mousepads delivered straight to your doorstep.
        </p>
        <button
          class="px-5 py-2.5 bg-violet-600 hover:bg-violet-500 text-white font-semibold rounded-lg transition shadow-lg shadow-violet-900/20"
        >
          International Shipping
        </button>
      </div>

      <!-- Reseller -->
      <div
        class="bg-violet-100 shadow-lg backdrop-blur-sm p-6 rounded-xl border border-violet-600/50 hover:border-violet-500 transition group"
      >
        <h3
          class="text-2xl font-bold text-violet-700 mb-2 group-hover:text-violet-500"
        >
          Ingin menjadi reseller?
        </h3>
        <p class="text-zinc-800 mb-6 text-sm">
          Dengan komisi 10% per-item jadikan ini kesempatan untuk nambah
          penghasilan sampingan.
        </p>
        <button
          class="px-5 py-2.5 bg-violet-600 hover:bg-violet-500 text-white font-semibold rounded-lg transition shadow-lg shadow-violet-900/20"
        >
          International Shipping
        </button>
      </div>
    </div>

    <!-- Section Hololive -->
    <HololiveSection />

    <!-- Section Mihoyo -->
    <MihoyoSection />

    <!-- List Semua Produk (Grid 3 Kolom) -->
    <div class="mt-12 bg-violet-100 p-2 md:p-6 rounded-xl shadow-lg">
      <h2
        class="text-2xl font-bold text-violet-700 mb-6 mt-6 md:mt-4 pb-2 border-b border-violet-300"
      >
        Semua Produk
      </h2>

      <div class="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-6">
        <ProductCard
          v-for="product in products"
          :key="product.id"
          :product="product"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.animate-marquee {
  animation: marquee 20s linear infinite;
}
@keyframes marquee {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(-100%);
  }
}
</style>
