<script setup lang="ts">
import { useCounterStore } from '@/stores/counter.ts'
const counterStore = useCounterStore()
</script>

<template>
  <div class="flex flex-col items-center gap-20 bg-base-100 py-20">
    <div class="mockup-phone">
      <div class="camera" />
      <div class="display">
        <div class="phone-1 artboard artboard-demo">
          <p class="text-xl font-medium tracking-wide uppercase">Counter:</p>
          <p class="text-4xl font-bold uppercase">
            {{ counterStore.count }}
          </p>
          <button type="button" class="btn btn-primary" @click="counterStore.increment()">
            increment
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
