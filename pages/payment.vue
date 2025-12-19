<script setup lang="ts">
const { order } = useOrder();
const router = useRouter();

if (!order.value.product) router.push("/");

const finishPayment = () => {
  alert("Terima kasih! Silahkan lakukan pembayaran.");
};

const openWhatsapp = () => window.open("https://wa.me/6281234567890", "_blank");
const openEmail = () => window.open("mailto:naderu@example.com", "_blank");
</script>

<template>
  <div class="max-w-3xl mx-auto">
    <h1 class="text-2xl font-bold text-violet-700 mb-6 text-center">
      Pembayaran
    </h1>

    <!-- Transfer Bank View -->
    <div v-if="order.paymentMethod === 'transfer'" class="space-y-6">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div
          class="bg-white p-6 rounded-xl border border-violet-200 shadow-lg flex flex-col items-center text-center"
        >
          <div class="text-violet-400 font-bold text-xl mb-2">BCA</div>
          <div class="text-zinc-600 text-2xl font-mono mb-1">7820-4948-01</div>
          <div class="text-zinc-400 text-sm">a.n Rayhan Noer Abdillah</div>
        </div>
        <div
          class="bg-white p-6 rounded-xl border border-violet-200 shadow-lg flex flex-col items-center text-center"
        >
          <div class="text-blue-400 font-bold text-xl mb-2">Blu by BCA</div>
          <div class="text-zinc-600 text-2xl font-mono mb-1">
            0901-3450-4600
          </div>
          <div class="text-zinc-400 text-sm">a.n Rayhan Noer Abdillah</div>
        </div>
      </div>

      <div
        class="bg-white p-6 rounded-xl border border-violet-200 text-center shadow-lg"
      >
        <p class="text-zinc-600 mb-4">
          Kirimkan bukti pembayaran dengan format nama, no telp, dan screenshot
          bukti transfer untuk naderu verifikasi pembayarannya dan mulai
          memproses orderannya.
        </p>
        <div class="flex flex-col md:flex-row gap-4 justify-center">
          <button
            @click="openWhatsapp"
            class="px-6 py-3 bg-green-600 hover:bg-green-500 text-white rounded-lg font-bold transition flex items-center justify-center gap-2"
          >
            <span>WhatsApp Naderu</span>
          </button>
          <button
            @click="openEmail"
            class="px-6 py-3 bg-zinc-700 hover:bg-zinc-600 text-white rounded-lg font-bold transition flex items-center justify-center gap-2"
          >
            <span>Email Naderu</span>
          </button>
        </div>
      </div>
    </div>

    <!-- QRIS View -->
    <div
      v-else-if="order.paymentMethod === 'qris'"
      class="bg-white p-8 rounded-xl border border-violet-200 text-center max-w-xl mx-auto"
    >
      <div class="mb-6">
        <svg
          class="w-16 h-16 text-violet-500 mx-auto mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 4v1m6 11h2m-6 0h-2v4h2v-4zM6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          ></path>
        </svg>
        <h3 class="text-xl font-bold text-zinc-600 mb-2">Pembayaran QRIS</h3>
        <p class="text-violet-200">
          Kamu akan melakukan pembayaran QRIS, akan tersedia form baru untuk
          mengisi nama, no telp, email. Jika kamu sudah siap melakukan
          pembayaran, silahkan klik tombol dibawah untuk melanjutkan pembayaran.
        </p>
      </div>
      <button
        @click="finishPayment"
        class="w-full py-3 bg-violet-600 hover:bg-violet-500 text-zinc-600 font-bold rounded-lg transition"
      >
        Selesaikan Pembayaran
      </button>
    </div>
  </div>
</template>
