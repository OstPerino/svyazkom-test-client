<template>
  <nav class="navbar">
    <ul class="list">
      <li class="item">
        <router-link class="router-link" to="/">
          Главная
        </router-link>
      </li>
      <li class="item">
        <router-link class="router-link" to="/residents">
          Дачники
        </router-link>
      </li>
      <li class="item">
        <router-link class="router-link" to="/bills">
          Показания
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
.list {
  display: flex;
  list-style-type: none;
}

.router-link {
  color: var(--primary-white);
  text-decoration: none;
}

.item {
  margin-right: 2rem;

  &:last-child {
    margin-right: 0;
  }
}
</style>
