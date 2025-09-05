<template>
  <div class="layout">
    <aside class="left-panel" v-if="isAuthed">
      <div class="brand">SUPPLY CHAIN</div>
      <router-link to="/users" class="menu-link">Usuários</router-link>
      <button class="logout" @click="logout">Sair</button>
    </aside>
    <main class="content"><router-view/></main>
  </div>
</template>
<script setup>
import { computed } from 'vue'
const isAuthed = computed(()=>!!localStorage.getItem('token'))
function logout(){ localStorage.removeItem('token'); window.location.href='/login' }
</script>
