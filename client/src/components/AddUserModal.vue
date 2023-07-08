<script setup>
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/vue"
import { ExclamationCircleIcon } from "@heroicons/vue/20/solid"
import { ref } from "vue"
import { useUserStore } from "@/stores/users"

const isOpen = ref(false)

function closeModal() {
  isOpen.value = false
}

function openModal() {
  isOpen.value = true
}

const userStore = useUserStore()

async function submitData() {
  if (!userStore.errFname && !userStore.errLname && !userStore.errEmail && !userStore.errPhone) {
    closeModal()
  }
  await userStore.createUser()
}
</script>
<template>
  <button
      class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      type="button"
      @click="openModal">
    Add User
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
                  class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900">
                  Add User
                </DialogTitle>
                <div class="mt-2">
                  <form data-testid="user-form" @submit.prevent="submitData">
                    <div class="grid grid-cols-2 gap-2">
                      <!--                      Fist Name-->
                      <div>
                        <label class="block text-sm font-medium leading-6 text-gray-900" for="fname">First Name</label>
                        <div class="relative mt-2 rounded-md shadow-sm">
                          <input id="fname" v-model="userStore.fname"
                                 :class="{'border-red-500': userStore.errFname, 'text-red-900': userStore.errFname, 'ring-red-300': userStore.errFname, 'placeholder:text-red-300': userStore.errFname, 'focus:ring-red-500': userStore.errFname}"
                                 aria-describedby="fname-error"
                                 aria-invalid="true"
                                 class="block w-full rounded-md border-0 py-1.5 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                 name="fname" placeholder="ex. will"
                                 type="text"/>
                          <div v-if="userStore.errFname"
                               class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                            <ExclamationCircleIcon aria-hidden="true" class="h-5 w-5 text-red-500"/>
                          </div>
                        </div>
                        <p id="fname-error" class="mt-2 text-sm text-red-600">{{ userStore.errFname }}</p>
                      </div>
                      <!--                      Last Name-->
                      <div>
                        <label class="block text-sm font-medium leading-6 text-gray-900" for="lname">Last Name</label>
                        <div class="relative mt-2 rounded-md shadow-sm">
                          <input id="lname" v-model="userStore.lname"
                                 :class="{'border-red-500': userStore.errLname, 'text-red-900': userStore.errLname, 'ring-red-300': userStore.errLname, 'placeholder:text-red-300': userStore.errLname, 'focus:ring-red-500': userStore.errLname}"
                                 aria-describedby="lname-error"
                                 aria-invalid="true"
                                 class="block w-full rounded-md border-0 py-1.5 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                 name="lname" placeholder="ex. smith"
                                 type="text"/>
                          <div v-if="userStore.errLname"
                               class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                            <ExclamationCircleIcon aria-hidden="true" class="h-5 w-5 text-red-500"/>
                          </div>
                        </div>
                        <p id="lname-error" class="mt-2 text-sm text-red-600">{{ userStore.errLname }}</p>
                      </div>

                      <!--                      Email-->
                      <div>
                        <label class="block text-sm font-medium leading-6 text-gray-900" for="email">Email</label>
                        <div class="relative mt-2 rounded-md shadow-sm">
                          <input id="email" v-model="userStore.email"
                                 :class="{'border-red-500': userStore.errEmail, 'text-red-900': userStore.errEmail, 'ring-red-300': userStore.errEmail, 'placeholder:text-red-300': userStore.errEmail, 'focus:ring-red-500': userStore.errEmail}"
                                 aria-describedby="email-error"
                                 aria-invalid="true"
                                 class="block w-full rounded-md border-0 py-1.5 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                 name="email" placeholder="your@example.com"
                                 type="email"/>
                          <div v-if="userStore.errEmail"
                               class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                            <ExclamationCircleIcon aria-hidden="true" class="h-5 w-5 text-red-500"/>
                          </div>
                        </div>
                        <p id="email-error" class="mt-2 text-sm text-red-600">{{ userStore.errEmail }}</p>
                      </div>

                      <!--                      Phone-->
                      <div>
                        <label class="block text-sm font-medium leading-6 text-gray-900" for="phone">Phone</label>
                        <div class="relative mt-2 rounded-md shadow-sm">
                          <input id="phone" v-model="userStore.phone"
                                 :class="{'border-red-500': userStore.errPhone, 'text-red-900': userStore.errPhone, 'ring-red-300': userStore.errPhone, 'placeholder:text-red-300': userStore.errPhone, 'focus:ring-red-500': userStore.errPhone}"
                                 aria-describedby="phone-error"
                                 aria-invalid="true"
                                 class="block w-full rounded-md border-0 py-1.5 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                 name="phone"
                                 placeholder="09x xxxx xxxx"
                                 type="number"/>
                          <div v-if="userStore.errPhone"
                               class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                            <ExclamationCircleIcon aria-hidden="true" class="h-5 w-5 text-red-500"/>
                          </div>
                        </div>
                        <p id="email-error" class="mt-2 text-sm text-red-600">{{ userStore.errPhone }}</p>
                      </div>
                    </div>

                    <!--                    Buttons-->
                    <div class="flex justify-center mt-4 gap-2">
                      <button
                          class="inline-flex justify-center rounded-md w-full border border-transparent bg-sky-300 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                          type="submit">
                        Submit
                      </button>
                      <button
                          class="inline-flex justify-center rounded-md w-full border border-transparent bg-red-400 px-4 py-2 text-sm font-medium text-white hover:bg-red-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                          type="button"
                          @click="closeModal">
                        Close
                      </button>
                    </div>
                  </form>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </Teleport>
</template>