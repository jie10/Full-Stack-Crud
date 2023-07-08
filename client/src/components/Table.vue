<script setup>
import AddUserModal from "@/components/AddUserModal.vue"
import EditUserModal from "@/components/EditUserModal.vue"
import DeleteUserModal from "@/components/DeleteUserModal.vue"
import { useUserStore } from "@/stores/users"
import { onMounted } from "vue"

const userStore = useUserStore()

onMounted(() => {
  userStore.fetchUsers()
})
</script>

<template>
  <div class="border border-gray-200 bg-white px-4 py-5 sm:px-6">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="sm:flex sm:items-center">
        <div class="sm:flex-auto">
          <h1 class="text-base font-semibold leading-6 text-gray-900">Users</h1>
          <p class="mt-2 text-sm text-gray-700">A list of all the users in your account including their first
            name, last name, email, and phone</p>
        </div>
        <AddUserModal/>
      </div>
    </div>
    <div class="mt-8 flow-root overflow-hidden">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <table class="w-full text-left">
          <thead class="bg-white">
          <tr>
            <th class="relative isolate py-3.5 pr-3 text-left text-sm font-semibold text-gray-900"
                scope="col">
              First Name
              <div class="absolute inset-y-0 right-full -z-10 w-screen border-b border-b-gray-200"/>
              <div class="absolute inset-y-0 left-0 -z-10 w-screen border-b border-b-gray-200"/>
            </th>
            <th class="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
                scope="col">Last
              Name
            </th>
            <th class="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 md:table-cell"
                scope="col">Email
            </th>
            <th class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900" scope="col">Phone</th>
            <th class="relative py-3.5 pl-3" scope="col">
              <span class="sr-only">Edit</span>
            </th>
          </tr>
          </thead>

          <tbody>
          <tr v-for="user in userStore.users" :key="user._id">
            <td class="relative py-4 pr-3 text-sm font-medium text-gray-500">
              {{ user.fname }}
              <div class="absolute bottom-0 right-full h-px w-screen bg-gray-100"/>
              <div class="absolute bottom-0 left-0 h-px w-screen bg-gray-100"/>
            </td>
            <td class="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">{{ user.lname }}</td>
            <td class="hidden px-3 py-4 text-sm text-gray-500 md:table-cell">{{ user.email }}</td>
            <td class="px-3 py-4 text-sm text-gray-500">{{ user.phone }}</td>
            <td class="relative py-4 pl-3 text-right text-sm font-medium">
              <EditUserModal :user="user"/>
            </td>
            <td class="relative py-4 pl-3 text-right text-sm font-medium">
              <DeleteUserModal :userDelete="user"/>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>