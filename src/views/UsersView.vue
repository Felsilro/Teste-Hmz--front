<template>
  <div class="card">
    <div class="toolbar">
      <h1>Usuários</h1>
      <button class="button" @click="reload">Recarregar</button>
    </div>
    <table class="table">
      <thead><tr><th></th><th>Nome</th><th>Email</th><th>Avatar</th><th>Ações</th></tr></thead>
      <tbody>
        <tr v-for="u in users" :key="u.id">
          <td>👤</td>
          <td>{{ u.firstName }} {{ u.lastName }}</td>
          <td>{{ u.email }}</td>
          <td><img :src="u.image" style="width:36px;height:36px;border-radius:50%"></td>
          <td class="actions">
            <button class="button ghost" @click="openEdit(u.id)">Editar</button>
            <button class="button danger" @click="remove(u.id)">Excluir</button>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="pagination">
      <span class="muted">Linhas por página:</span>
      <select v-model.number="perPage" @change="reload"><option :value="5">5</option><option :value="10">10</option></select>
      <span class="muted">{{ pageInfo }}</span>
      <button @click="prev" :disabled="page===1">◀</button>
      <button @click="next" :disabled="page>=totalPages">▶</button>
    </div>
  </div>
  <UserFormModal v-if="editingId" :id="editingId" @close="editingId=0" @saved="onSaved"/>
</template>
<script setup>
import { ref, computed, onMounted } from 'vue'
import { listUsers, deleteUser } from '@/api/dummy'
import UserFormModal from './UserFormModal.vue'
const users=ref([])
const page=ref(1)
const perPage=ref(5)
const total=ref(0)
const editingId=ref(0)
const totalPages = computed(()=>Math.ceil(total.value/perPage.value))
const pageInfo = computed(()=>`${(page.value-1)*perPage.value+1}-${Math.min(page.value*perPage.value,total.value)} de ${total.value}`)
async function reload(){
  const { data } = await listUsers(page.value, perPage.value)
  users.value=data.users; total.value=data.total
}
function prev(){ if(page.value>1){ page.value--; reload() } }
function next(){ if(page.value<totalPages.value){ page.value++; reload() } }
function openEdit(id){ editingId.value=id }
async function remove(id){ if(!confirm('Excluir?')) return; await deleteUser(id); users.value=users.value.filter(u=>u.id!==id); total.value=Math.max(0,total.value-1) }
function onSaved(){ editingId.value=0; reload() }
onMounted(reload)
</script>
