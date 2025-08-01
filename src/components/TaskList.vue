<template>
  <section class="text-center">
    <h1 class="m-4 text-4xl">TODO List</h1>
    <section>
      <h1 class="text-2xl">Añadir una tarea</h1>
      <input
        @keyup.enter="(addTask(newTask), (newTask = ''))"
        ref="inputRef"
        v-model="newTask"
        class="border border-transparent shadow-md p-3 focus:outline-none m-3"
        type="text"
        placeholder="Ej: Hacer la cama"
      />
      <button
        v-if="newTask != ''"
        @click="(addTask(newTask), (newTask = ''))"
        class="border p-3 pr-4 pl-4 rounded-xl border-amber-50 shadow-md text-white bg-green-400 hover:bg-green-300 hover:cursor-pointer"
      >
        Añadir
      </button>
    </section>
    <TransitionGroup name="fade" tag="ul" class="space-y-2">
      <p v-if="tasks.length == 0">No has añadido ninguna tarea aún.</p>
      <li
        class="flex justify-between border border-transparent shadow-md text-left m-2 p-2 w-auto transition-all duration-400"
        v-for="tasks in tasks"
        :key="tasks.id"
      >
        <p :class="tasks.status ? 'line-through text-gray-400 p-1' : 'p-1'">
          <strong>
            {{ tasks.descTask }}
          </strong>
        </p>
        <div class="flex gap-2">
          <button
            v-show="!tasks.status"
            v-on:click="endTask(tasks.id)"
            class="border border-transparent rounded-xl text-white p-1 bg-red-400 hover:cursor-pointer hover:bg-red-500 ml-1 mr-1"
          >
            Terminar tarea
          </button>
          <button
            v-show="tasks.status"
            v-on:click="deleteTask(tasks.id)"
            class="border border-transparent rounded-xl text-white p-1 bg-red-400 hover:cursor-pointer hover:bg-red-500 ml-1 mr-1"
          >
            Eliminar tarea
          </button>
        </div>
      </li>
    </TransitionGroup>
  </section>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useList } from '@/composable/list'
const { tasks, addTask, inputRef, endTask, deleteTask } = useList()
const newTask = ref('')
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
