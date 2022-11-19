<script>
</script>

<template>
  <Transition
    name="router-transition"
    mode="out-in"
  >
    <slot />
  </Transition>
</template>

<style>
.router-transition-enter-active,
.router-transition-leave-active {
  transition: opacity .15s ease;
}

.router-transition-enter-from,
.router-transition-leave-to {
  opacity: 0;
}
</style>
