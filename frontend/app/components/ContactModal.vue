<script setup lang="ts">
const { isOpen, closeModal } = useContactModal();

const loading = ref(false);
const submitted = ref(false);
const errorMessage = ref("");

const form = ref({
  name: "",
  email: "",
  service: "AI Services",
  message: "",
});

onMounted(() => {
  const handleKeydown = (e: KeyboardEvent) => {
    if (e.key === "Escape" && isOpen.value) {
      closeModal();
    }
  };
  window.addEventListener("keydown", handleKeydown);
  onUnmounted(() => window.removeEventListener("keydown", handleKeydown));
});

const handleSubmit = async () => {
  loading.value = true;
  errorMessage.value = "";

  try {
    const response = await $fetch<{ success: boolean }>("/api/contact", {
      method: "POST",
      body: {
        name: form.value.name,
        email: form.value.email,
        service: form.value.service,
        message: form.value.message,
      },
    });

    if (response.success) {
      submitted.value = true;
      form.value = {
        name: "",
        email: "",
        service: "Noxvera AI Services",
        message: "",
      };
    }
  } catch (error: any) {
    errorMessage.value =
      error.data?.statusMessage || "An unexpected error occurred.";
  } finally {
    loading.value = false;
  }
};

const handleResetAndClose = () => {
  submitted.value = false;
  errorMessage.value = "";
  form.value = {
    name: "",
    email: "",
    service: "Web Development",
    message: "",
  };
  closeModal();
};
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isOpen"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      >
        <div
          class="fixed inset-0 bg-black/75 backdrop-blur-md transition-opacity"
          @click="closeModal"
        />

        <Transition
          enter-active-class="transition duration-300 ease-out"
          enter-from-class="opacity-0 scale-95 translate-y-4"
          enter-to-class="opacity-100 scale-100 translate-y-0"
          leave-active-class="transition duration-200 ease-in"
          leave-from-class="opacity-100 scale-100 translate-y-0"
          leave-to-class="opacity-0 scale-95 translate-y-4"
        >
          <div
            v-if="isOpen"
            class="relative w-full max-w-lg bg-[#0d1322]/90 border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl z-10 overflow-hidden text-white backdrop-blur-2xl"
          >
            <div
              class="absolute -top-24 -right-24 w-48 h-48 bg-primary/25 rounded-full blur-3xl pointer-events-none"
            />

            <button
              @click="closeModal"
              class="absolute top-5 right-5 text-gray-400 hover:text-white p-2 rounded-xl hover:bg-white/5 transition"
              aria-label="Close modal"
            >
              <svg
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <div class="mb-6">
              <span
                class="inline-block px-3 py-1 rounded-full text-[11px] font-mono font-semibold bg-primary/15 text-primary border border-primary/30 mb-3"
              >
                COMMUNICATION WITH US
              </span>
              <h3 class="text-2xl font-bold tracking-tight text-white">
                Start a Project with NEXORA
              </h3>
              <p class="text-xs text-gray-400 mt-1 leading-relaxed">
                Fill out the details below to schedule an architecture audit or
                get a custom proposal.
              </p>
            </div>

            <form
              v-if="!submitted"
              @submit.prevent="handleSubmit"
              class="space-y-4"
            >
              <div>
                <label class="block text-xs font-medium text-gray-300 mb-1.5">
                  Full Name
                </label>
                <input
                  v-model="form.name"
                  type="text"
                  required
                  placeholder="e.g. Alex Mercer"
                  class="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition"
                />
              </div>

              <div>
                <label class="block text-xs font-medium text-gray-300 mb-1.5">
                  Work Email
                </label>
                <input
                  v-model="form.email"
                  type="email"
                  required
                  placeholder="alex@company.com"
                  class="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition"
                />
              </div>

              <div>
                <label class="block text-xs font-medium text-gray-300 mb-1.5">
                  Project Scope / Requirements
                </label>
                <textarea
                  v-model="form.message"
                  rows="3"
                  required
                  placeholder="Briefly describe your targets, systems, or timeline..."
                  class="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition resize-none"
                />
              </div>

              <!-- نمایش پیام خطا -->
              <p
                v-if="errorMessage"
                class="text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl p-3"
              >
                {{ errorMessage }}
              </p>

              <div class="pt-2 flex items-center justify-end gap-3">
                <UiButton
                  type="button"
                  variant="secondary"
                  @click="closeModal"
                  class="!py-2 !px-4 !text-xs"
                >
                  Cancel
                </UiButton>
                <UiButton
                  type="submit"
                  variant="primary"
                  :disabled="loading"
                  class="!py-2 !px-5 !text-xs"
                >
                  <span v-if="!loading">Send Request →</span>
                  <span v-else class="flex items-center gap-2">
                    <svg
                      class="animate-spin h-3.5 w-3.5 text-white"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <circle
                        class="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        stroke-width="4"
                      />
                      <path
                        class="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      />
                    </svg>
                    Processing...
                  </span>
                </UiButton>
              </div>
            </form>

            <div v-else class="text-center py-6 space-y-4">
              <div
                class="w-12 h-12 rounded-full bg-primary/20 text-primary border border-primary/40 flex items-center justify-center mx-auto text-xl font-bold"
              >
                ✓
              </div>
              <h4 class="text-lg font-bold text-white">Request Dispatched</h4>
              <p class="text-xs text-gray-400 max-w-sm mx-auto leading-relaxed">
                Thank you! Our architecture engineering team will analyze your
                requirements and reach out within 24 hours.
              </p>
              <UiButton
                variant="primary"
                class="mt-2 !text-xs"
                @click="handleResetAndClose"
              >
                Close Window
              </UiButton>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>
