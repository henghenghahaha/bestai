<script setup lang="ts">
import Joi from 'joi'
import type { FormSubmitEvent } from '#ui/types'
import { useToolState } from '~/types/supabaseService'
const { tools, toolsdata, getTools } = useToolState()

const { data: page } = await useAsyncData('submittools', () => queryContent('/submittools').findOne())
if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

useSeoMeta({
  title: page.value.title,
  ogTitle: page.value.title,
  description: page.value.description,
  ogDescription: page.value.description
})

defineOgImage({
  component: 'Saas',
  title: page.value.title,
  description: page.value.description
})

const schema = Joi.object({
  name:Joi.string().required(),
  url:Joi.string().required(),
  description:Joi.string(),
  tags:Joi.required(),
  freeorcharged: Joi.required(),
  email: Joi.string().required().email({ tlds: { allow: false } }),
})

const state = reactive({
  name:undefined,
  url:undefined,
  description:undefined,
  tags:undefined,
  freeorcharged: undefined,
  email: undefined,
})

async function onSubmit (event: FormSubmitEvent<any>) {
  // Do something with event.data
  console.log(event.data)
}

// let tags = ref([])
// const splitTags = (tagString) => {
//   return tagString.split('|');
// };
//
// const initialize = async () => {
//   tags.value = []
//   let arr = tools.value.reduce((acc, tool) => {
//     const tags = splitTags(tool.tag)
//     tags.forEach(tag => {
//       if (!acc.includes(tag)) {
//         acc.push(tag);
//       }
//     })
//     return acc;
//   }, [])
//   arr.forEach((ele) => {
//     tags.value.push({
//       label: ele,
//       value: ele
//     })
//   })
// }

const FreeOrCharged = [
  { label: 'Free', value: 'Free' },
  { label: 'Charged', value: 'Charged' },
]

onMounted(() => {
  // initialize()
  // console.log(tags,'tags')
})
</script>

<template>
  <div v-if="page">
    <UPageHero v-bind="page.hero" :ui="{description: 'mt-4 text-lg text-gray-500 dark:text-gray-400 w-100'}" />
      <UForm :schema="schema" :state="state" class="space-y-4 w-1/3 mx-auto" @submit="onSubmit">
        <UFormGroup label="Tool Name" name="name">
          <UInput v-model="state.name" />
        </UFormGroup>
        <UFormGroup label="URL" name="url">
          <UInput v-model="state.url" />
        </UFormGroup>
        <UFormGroup label="Description" name="description">
          <UInput v-model="state.description" />
        </UFormGroup>
        <UFormGroup label="Tags" name="tags">
          <USelectMenu multiple v-model="state.tags" :options="tags"  searchable/>
          <p class="font-light">"We will determine and adjust the tag of your page during the review."</p>
        </UFormGroup>
        <UFormGroup label="FreeOrCharged" name="freeorcharged">
          <USelectMenu  v-model="state.freeorcharged" :options="FreeOrCharged"/>
        </UFormGroup>
        <UFormGroup label="Your Email" name="email">
          <UInput v-model="state.email" />
        </UFormGroup>

        <UButton type="submit" block>
          Submit
        </UButton>
      </UForm>
  </div>

</template>
