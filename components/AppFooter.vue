<script setup lang="ts">
const links = [{
  label: 'Resources',
  children: [{
    label: 'Preferred Tools',
    to:'/'
  }, {
    label: 'New Arrivals',
    to:'/'
  }, {
    label: 'Search Categories',
    to:'/alltools'
  }, {
    label: 'Search Tools',
    to:'/alltools'
  }]
}, {
  label: 'Features',
  children: [{
    label: 'Submit Your Tools',
    to:'/submittools'
  },{
    label: 'Frequently asked questions',
    to:'/faq'
  }]
}]

const toast = useToast()
const email = ref('')
const loading = ref(false)

async function onSubmit() {
  loading.value = true
  try {
    // 调用后端 API 发送邮件
    const response = await fetch('/server/api/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: email.value })
    })
    if (!response.ok) {
      throw new Error('Failed to subscribe')
    }
    toast.add({
      title: 'Subscribed!',
      description: 'You\'ve been subscribed to our newsletter.'
    })
  } catch (error) {
    toast.add({
      title: 'Error',
      description: 'There was an error subscribing to the newsletter.'
    })
  } finally {
    loading.value = false
  }
}

</script>

<template>
  <UFooter>
    <template #top>
      <UFooterColumns :links="links">
        <template #right>
          <form @submit.prevent="onSubmit">
            <UFormGroup
              label="Subscribe to our newsletter"
              :ui="{ container: 'mt-3' }"
            >
              <UInput
                v-model="email"
                type="email"
                placeholder="Enter your email"
                :ui="{ icon: { trailing: { pointer: '' } } }"
                required
                size="xl"
                autocomplete="off"
                class="max-w-sm"
                input-class="rounded-full"
              >
                <template #trailing>
                  <UButton
                    type="submit"
                    size="xs"
                    color="primary"
                    :label="loading ? 'Subscribing' : 'Subscribe'"
                    :loading="loading"
                  />
                </template>
              </UInput>
            </UFormGroup>
          </form>
        </template>
      </UFooterColumns>
    </template>

    <template #center>
      <p class="text-gray-500 dark:text-gray-400 text-sm">
        © Copyright
      </p>
      <p class="text-gray-500 dark:text-gray-400 text-sm font-bold ml-1 mr-1">
        Bestai.one
      </p>
      <p class="text-gray-500 dark:text-gray-400 text-sm ">
        {{ new Date().getFullYear() }}. All rights reserved.
      </p>
    </template>

    <template #right>
      <UColorModeButton size="sm" />

<!--      <UButton-->
<!--        to="https://github.com/nuxt-ui-pro/saas"-->
<!--        target="_blank"-->
<!--        icon="i-simple-icons-github"-->
<!--        aria-label="GitHub"-->
<!--        color="gray"-->
<!--        variant="ghost"-->
<!--      />-->
    </template>
  </UFooter>
</template>
