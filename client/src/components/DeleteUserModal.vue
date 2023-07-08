<script setup>
import { ref } from "vue"
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/vue"
import { useUserStore } from "@/stores/users"

const userStore = useUserStore()
const isOpen = ref(false)

const props = defineProps({
  userDelete: {
    type: Object,
    required: true,
  },
})


function closeModal() {
  isOpen.value = false
}

function openModal() {
  isOpen.value = true
}

async function deleteUser() {
  await userStore.deleteUser(props.userDelete._id)
  closeModal()
}

</script>

<template>
  <button
      class="rounded-md bg-red-400 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      type="button"
      @click="openModal"
  >
    <svg fill="none" height="24" stroke="#000000" stroke-linecap="round" stroke-linejoin="round"
         stroke-width="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
      <polyline points="3 6 5 6 21 6"></polyline>
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
      <line x1="10" x2="10" y1="11" y2="17"></line>
      <line x1="14" x2="14" y1="11" y2="17"></line>
    </svg>
  </button>

  <Teleport to="body">
    <TransitionRoot :show="isOpen" appear as="template">
      <Dialog as="div" class="relative z-10" @close="closeModal">
        <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0" enter-to="opacity-100"
                         leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
          <div class="fixed inset-0 bg-black bg-opacity-25"/>
        </TransitionChild>

        <div class="fixed inset-0 overflow-y-auto">
          <div class="flex min-h-full items-center justify-center p-4 text-center">
            <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0 scale-95"
                             enter-to="opacity-100 scale-100" leave="duration-200 ease-in"
                             leave-from="opacity-100 scale-100"
                             leave-to="opacity-0 scale-95">
              <DialogPanel
                  class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
              >
                <DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900">
                  Delete User?
                </DialogTitle>
                <div class="mt-2">

                  <div class="flex justify-center items-center gap-2">
                    <div class="rounded-full bg-red-400 p-2">
                      <svg fill="none" height="24" stroke="#000000" stroke-linecap="round" stroke-linejoin="round"
                           stroke-width="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                        <line x1="12" x2="12" y1="9" y2="13"></line>
                        <line x1="12" x2="12.01" y1="17" y2="17"></line>
                      </svg>
                    </div>
                    <div>
                      <h1 class="font-bold text-gray-900">Are you sure you want to delete this user
                        "{{ props.userDelete.fname }}"? </h1>
                    </div>
                  </div>

                  <div class="flex justify-center mt-4 gap-2">
                    <button
                        class="inline-flex justify-center rounded-md w-full border border-transparent bg-sky-300 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        type="button"
                        @click="deleteUser"
                    >
                      Yes
                    </button>
                    <button
                        class="inline-flex justify-center rounded-md w-full border border-transparent bg-red-400 px-4 py-2 text-sm font-medium text-white hover:bg-red-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        type="button"
                        @click="closeModal"
                    >
                      No
                    </button>
                  </div>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </Teleport>
</template>
