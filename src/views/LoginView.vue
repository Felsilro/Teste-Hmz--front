<template>
  <div class="card">
    <div class="login-container">
      <section>
        <div class="hero">Simplificamos<br/>juntos</div>
        <p class="muted">Supply Chain | Industrial | Systems</p>
      </section>
      <section>
        <h2 class="muted" style="text-align:center;margin-bottom:8px;">LOGIN</h2>
        <div class="grid">
          <div style="grid-column:1/-1">
            <label class="muted">Usuário (username)</label>
            <input class="input" v-model="username" placeholder="kminchelle" />
          </div>
          <div style="grid-column:1/-1">
            <label class="muted">Senha</label>
            <input class="input" v-model="password" placeholder="0lelplR" type="password" />
          </div>
        </div>
        <div class="center" style="margin-top:16px;">
          <button class="button" @click="doLogin" :disabled="loading">
            {{ loading ? 'Entrando...' : 'Logar' }}
          </button>
        </div>
        <p v-if="error" style="color:#d33;margin-top:10px;">{{ error }}</p>
        <p class="muted" style="margin-top:16px;">
          Use <code>kminchelle</code> / <code>0lelplR</code>
        </p>
      </section>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { login } from '@/api/dummy'
const username = ref('kminchelle')
const password = ref('0lelplR')
const loading = ref(false)
const error = ref('')
async function doLogin() {
  try {
    loading.value=true; error.value=''
    const { data } = await login(username.value,password.value)
    localStorage.setItem('token', data.token)
    window.location.href='/users'
  } catch(e){ error.value = e?.response?.data?.message || 'Falha no login' }
  finally{ loading.value=false }
}
</script>
