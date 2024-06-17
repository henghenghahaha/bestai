<script setup lang="ts">
import type { NavItem } from '@nuxt/content/dist/runtime/types'

// const navigation = inject<Ref<NavItem[]>>('navigation', ref([]))
const { data: navigation } = await useAsyncData('navigation', () => fetchContentNavigation())
const { data: files } = useLazyFetch<ParsedContent[]>('/api/search.json', { default: () => [], server: false })
provide('navigation', navigation)
provide('files', files)

const links = [
  {
    label: 'Landing Page',
    to: '/'
  },{
    label: 'All Tools',
    to: '/alltools'
  },{
    label: 'Submit Your Tools',
    to: '/submittools'
  }]

const toast = useToast()

const email = ref('')
const loading = ref(false)

function onSubmit() {
  loading.value = true

  setTimeout(() => {
    toast.add({
      title: 'Subscribed!',
      description: 'You\'ve been subscribed to our newsletter.'
    })

    loading.value = false
  }, 1000)
}
</script>

<template>
  <UHeader :links="links">
    <template #logo>
      <img class='headerlogo' src="../public/horizontal-logo.png">
    </template>

    <template #right>
<!--      <template>-->
<!--        <ClientOnly>-->
<!--&lt;!&ndash;          <LazyUContentSearch :files="files" :navigation="navigation" :links="links" />&ndash;&gt;-->
<!--          <UContentSearchButton label="Search..." />-->
<!--        </ClientOnly>-->
<!--      </template>-->
<!--      <UButton-->
<!--        label="Sign in"-->
<!--        color="gray"-->
<!--        to="/login"-->
<!--      />-->
<!--      <UButton-->
<!--        label="Sign up"-->
<!--        icon="i-heroicons-arrow-right-20-solid"-->
<!--        trailing-->
<!--        color="black"-->
<!--        to="/signup"-->
<!--        class="hidden lg:flex"-->
<!--      />-->
        <UColorModeButton size="sm" />
    </template>
  </UHeader>
</template>

<style scoped>
.headerlogo{
  width: 20%;
}
</style>
