<script setup lang="ts">
import type {BlogPost} from '~/types'
import { useToolState } from '~/types/supabaseService'

const { tools, toolsdata } = useToolState()
let tags = ref([])
const tagselected = ref(tags[0])
const searchInput = ref()

const {data: page} = await useAsyncData('alltools', () => queryContent('/alltools').findOne())
if (!page.value) {
  throw createError({statusCode: 404, statusMessage: 'Page not found', fatal: true})
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

const iconarr = ref(['i-heroicons-rocket-launch', 'i-heroicons-bolt', 'i-heroicons-check-badge',
  'i-heroicons-fire', 'i-heroicons-puzzle-piece', 'i-heroicons-rss', 'i-heroicons-scale',
  'i-heroicons-sparkles', 'i-heroicons-sun', 'i-heroicons-wifi',
  'i-heroicons-star', 'i-heroicons-paper-clip', 'i-heroicons-moon',])

watch(tagselected, (value) => {
  if (value) {
    tools.value = toolsdata.value.filter(ele => ele.tag.indexOf(value) !== -1)
  }else {
    tools.value = toolsdata.value
  }
})

watch(searchInput, (value) => {
  let tool = []
  if (value) {
    if (tagselected.value) {
      tool = toolsdata.value.filter(ele => ele.tag.indexOf(tagselected.value) !== -1)
      tool = tool.filter(ele => {
        let name = ele.name.toLowerCase()
        let key = value.toLowerCase()
        return name.indexOf(key) !== -1
      })
    } else {
      tool = toolsdata.value.filter(ele => {
        let name = ele.name.toLowerCase()
        let key = value.toLowerCase()
        return name.indexOf(key) !== -1
      })
    }
  } else {
    if (tagselected.value) {
      tool = toolsdata.value.filter(ele => ele.tag.indexOf(tagselected.value) !== -1)
      tool = tool.filter(ele => {
        let name = ele.name.toLowerCase()
        let key = value.toLowerCase()
        return name.indexOf(key) !== -1
      })
    } else {
      tool = toolsdata.value.filter(ele => {
        let name = ele.name.toLowerCase()
        let key = value.toLowerCase()
        return name.indexOf(key) !== -1
      })
    }
  }
  tools.value = tool
})

function getRandomElement(arr) {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}

const splitTags = (tagString) => {
  return tagString.split('|');
};

const initialize = async () => {
  tags.value = ['All Categories']
  let arr = tools.value.reduce((acc, tool) => {
    const tags = splitTags(tool.tag)
    tags.forEach(tag => {
      if (!acc.includes(tag)) {
        acc.push(tag);
      }
    })
    return acc;
  }, [])
  arr.forEach((ele) => {
    tags.value.push({
      id: ele,
      tag: ele
    })
  })
}

onMounted(() => {
  initialize()
})

</script>

<template>

  <UContainer>
    <UPageHeader
      v-bind="page"
      class="py-[50px]"
      :ui="{wrapper: 'relative border-0  py-8'}"
    />
    <UPageBody>

      <client-only>

        <UDashboardToolbar :ui="{wrapper: 'min-h-[49px] flex-shrink-0 flex items-center border-b border-gray-200 dark:border-gray-800 px-4 py-2 gap-x-4',}">
          <div style="display:flex;">
            <div style="width: 12rem">
              <USelectMenu
                v-model="tagselected"
                :options="tags"
                placeholder="All Categories"
                value-attribute="id"
                option-attribute="tag"
                searchable
                searchable-placeholder="Search Categories..."
                selected-icon="i-heroicons-check-badge"
              />
            </div>
            <div style="margin-left: 10rem;width: 48rem;">
              <UInput
                icon="i-heroicons-magnifying-glass-20-solid"
                size="xl"
                color="primary"
                :trailing="false"
                placeholder="Search..."
                v-model="searchInput"
                :ui="{rounded:'rounded-full',wrapper: '-mt-4 min-h-[49px] flex-shrink-0 flex items-center border-0 px-4 py-2 gap-x-4 pl-1'}"
              />
            </div>
          </div>
        </UDashboardToolbar>
      </client-only>

      <UBlogList>
        <div v-for="tool in tools" :key="tool.id" class="tool-card">
          <a :href="tool.url" class="tool-link">
            <div class="tool-content">
              <img :src="tool.image" alt="" class="tool-image"/>
              <div class="tool-details">
                <div class="tool-header">
                  <h2 class="tool-title">{{ tool.name }}</h2>
                  <UIcon :name="getRandomElement(iconarr)" dynamic class="Uicon"/>
                </div>
                <p class="tool-description">{{ tool.description }}</p>
                <div class="tool-footer">
                  <div class="tool-tags">
                    <span v-for="(tag, index) in splitTags(tool.tag)" :key="index" class="tool-tag">{{ tag }}</span>
                  </div>
                  <span
                    :class="{'tool-free': tool.FreeOrCharged === 'Free', 'tool-charged': tool.FreeOrCharged === 'Charged'}">{{
                      tool.FreeOrCharged
                    }}</span>
                </div>
              </div>
            </div>
          </a>
        </div>
      </UBlogList>
    </UPageBody>
  </UContainer>
</template>

<style scoped>
.tool-card {
  display: flex;
  flex-direction: column;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
  margin: 16px;
  text-decoration: none;
  color: inherit;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
  position: relative;
}

.tool-card:hover {
  transform: translateY(-5px);
}

.tool-link {
  text-decoration: none;
  color: inherit;
}

.tool-content {
  display: flex;
  flex-direction: column;
}

.tool-image {
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-bottom: 1px solid #e0e0e0;
  transition: transform 0.6s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.tool-image:hover {
  transform: scale(1.1);
}

.tool-details {
  padding: 16px;
}

.tool-title {
  font-size: 1.25em;
  font-weight: bolder;
  margin: 8px 0;
  margin-right: 8px;
  color: #000000;
  display: flex;
  align-items: center;
}

.tool-header {
  display: inline-flex;
  align-items: center;
}

.Uicon {
  font-size: 1.2em;
}

.tool-description {
  font-size: 1em;
  color: #666;
  margin-bottom: 8px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  text-overflow: ellipsis;
}

.tool-description.full {
  -webkit-line-clamp: unset;
  white-space: normal;
  overflow: visible;
}

.tool-footer {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}

.tool-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 8px;
}

.tool-tag {
  background-color: #e0f7fa;
  color: #00796b;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.8em;
}

.tool-free {
  background-color: #f7c90b;
  color: #f2f8f6;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: bold;
  position: absolute;
  bottom: 8px;
  right: 16px;
}

.tool-charged {
  background-color: #f7270b;
  color: #f2f8f6;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: bold;
  position: absolute;
  bottom: 8px;
  right: 16px;
}

@media (max-width: 600px) {
  .tool-free, .tool-charged {
    position: static;
    margin-top: 8px;
  }
}
</style>
