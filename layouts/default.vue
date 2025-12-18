<template>
  <div
    class="flex flex-col min-h-screen bg-gradient-to-b from-violet-900 to-violet-950 font-sans"
  >
    <AppNavbar />
    <main class="flex-grow container mx-auto px-4 py-8">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>
