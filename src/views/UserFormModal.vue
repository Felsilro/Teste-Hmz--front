<template>
  <div class="modal-backdrop" @click.self="$emit('close')">
    <div class="modal">
      <h2 style="margin-bottom:12px;">Editar Usuário</h2>
      <div class="grid">
        <div><label class="muted">Primeiro Nome</label><input class="input" v-model="form.firstName"></div>
        <div><label class="muted">Sobrenome</label><input class="input" v-model="form.lastName"></div>
        <div><label class="muted">Email</label><input class="input" v-model="form.email"></div>
        <div><label class="muted">Imagem</label><input class="input" v-model="form.image"></div>
      </div>
      <div class="actions" style="margin-top:14px;justify-content:flex-end;">
        <button class="button ghost" @click="$emit('close')">Cancelar</button>
        <button class="button" @click="save">Salvar</button>
      </div>
      <p v-if="message" class="muted" style="margin-top:6px;">{{ message }}</p>
    </div>
  </div>
</template>
<script setup>
import { reactive, ref, watch } from 'vue'
import { getUser, updateUser } from '@/api/dummy'
const props = defineProps({ id:Number })
const emit = defineEmits(['close','saved'])
const form = reactive({ firstName:'', lastName:'', email:'', image:'' })
const message = ref('')
watch(()=>props.id, async (val)=>{
  if(!val) return
  const { data } = await getUser(val)
  Object.assign(form, data)
})
async function save(){
  await updateUser(props.id, form)
  message.value='Atualizado'
  emit('saved',{...form})
}
</script>
