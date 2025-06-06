<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">Lista de Usuários</h1>
    <ul class="bg-white shadow-md rounded-lg">
      <li v-for="user in users" :key="user.id" class="p-4 border-b last:border-b-0">
        <p class="text-lg">{{ user.name }}</p>
        <p class="text-sm text-gray-500">{{ user.email }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'UserListView',
  data() {
    return {
      users: [
        { id: 1, name: 'João Silva', email: 'joao.silva@example.com' },
        { id: 2, name: 'Maria Oliveira', email: 'maria.oliveira@example.com' },
        { id: 3, name: 'Carlos Souza', email: 'carlos.souza@example.com' },
      ],
    };
  },
};
</script>

<style scoped>
/* Adicione estilos personalizados aqui, se necessário */
</style>
