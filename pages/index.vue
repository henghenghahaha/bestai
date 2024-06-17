<script setup lang="ts">
const { data: page } = await useAsyncData('index', () => queryContent('/').findOne())
if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

useSeoMeta({
  titleTemplate: '',
  title: page.value.title,
  ogTitle: page.value.title,
  description: page.value.description,
  ogDescription: page.value.description
})

// supabase
import {createClient} from '@supabase/supabase-js'
const supabase = createClient('https://swcpbjynakkbdwosskht.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN3Y3BianluYWtrYmR3b3Nza2h0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTgyNTI3ODksImV4cCI6MjAzMzgyODc4OX0.7HXmdwbJkXLLx3dZn3H192Z-eDBXH5o8oKPoYN0lXvU')
const toolsdate = ref([])
const toolsprefered = ref([])

async function gettoolsdate() {
  const {data} = await supabase.from('tooldata').select("*").order('launchdate',{ ascending: false }).limit(6)
  toolsdate.value = data
}

async function gettoolsprefer() {
  const {data} = await supabase.from('tooldata').select("*").order('prefervalue',{ ascending: false }).limit(6)
  toolsprefered.value = data
}

onMounted(() => {
  gettoolsdate()
  gettoolsprefer()
})

const splitTags = (tagString) => {
  return tagString.split('|');
};

function getRandomElement(arr) {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}

const iconarr = ref(['i-heroicons-rocket-launch','i-heroicons-bolt','i-heroicons-check-badge',
  'i-heroicons-fire','i-heroicons-puzzle-piece','i-heroicons-rss','i-heroicons-scale',
  'i-heroicons-sparkles','i-heroicons-sun','i-heroicons-wifi',
  'i-heroicons-star','i-heroicons-paper-clip','i-heroicons-moon',])
</script>

<template>
  <div v-if="page">
    <ULandingHero #description
      :title="page.hero.title"
    >
      <span v-html="page.hero.description" />
      <div class="absolute inset-0 landing-grid z-[-1] [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]" />

  </ULandingHero>

    <ULandingSection
      :title="page.PreferredTools.title"
      :description="page.PreferredTools.description"
    >
      <UBlogList>
        <div v-for="tool in toolsdate" :key="tool.id" class="tool-card">
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
                  <span :class="{'tool-free': tool.FreeOrCharged === 'Free', 'tool-charged': tool.FreeOrCharged === 'Charged'}">{{ tool.FreeOrCharged }}</span>
                </div>
              </div>
            </div>
          </a>
        </div>
      </UBlogList>
    </ULandingSection>

    <ULandingSection
      :title="page.NewArrivals.title"
      :description="page.NewArrivals.description"
    >
      <UBlogList>
        <div v-for="tool in toolsprefered" :key="tool.id" class="tool-card">
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
                  <span :class="{'tool-free': tool.FreeOrCharged === 'Free', 'tool-charged': tool.FreeOrCharged === 'Charged'}">{{ tool.FreeOrCharged }}</span>
                </div>
              </div>
            </div>
          </a>
        </div>
      </UBlogList>
    </ULandingSection>
  </div>

</template>

<style scoped>
.landing-grid {
  background-size: 100px 100px;
  background-image:
    linear-gradient(to right, rgb(var(--color-gray-200)) 1px, transparent 1px),
    linear-gradient(to bottom, rgb(var(--color-gray-200)) 1px, transparent 1px);
}
.dark {
  .landing-grid {
    background-image:
      linear-gradient(to right, rgb(var(--color-gray-800)) 1px, transparent 1px),
      linear-gradient(to bottom, rgb(var(--color-gray-800)) 1px, transparent 1px);
  }
}

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
  position: relative; /* 确保子元素相对于父容器定位 */
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
  transform: scale(1.1); /* 鼠标悬停时放大 */
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
  bottom: 8px; /* 距离底边 8px */
  right: 16px; /* 距离左边 16px */
}

@media (max-width: 600px) {
  .tool-free, .tool-charged {
    position: static; /* 在小屏幕上取消绝对定位 */
    margin-top: 8px; /* 添加一些顶部间距 */
  }
}
</style>
