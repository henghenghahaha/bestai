// types/supabaseService.ts
import { createClient } from '@supabase/supabase-js'

const supabase = createClient('https://swcpbjynakkbdwosskht.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN3Y3BianluYWtrYmR3b3Nza2h0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTgyNTI3ODksImV4cCI6MjAzMzgyODc4OX0.7HXmdwbJkXLLx3dZn3H192Z-eDBXH5o8oKPoYN0lXvU')
export const useToolState = () => {
  const tools = useState('tools', () => [])
  const toolsdata = useState('toolsdata', () => [])
  let tags = useState('tags', () => [])

  const getTools = async () => {
    const { data, error } = await supabase.from('tooldata').select("*")
    if (error) {
      console.error('Error fetching tools:', error)
      return []
    }
    tools.value = data
    toolsdata.value = data
  }

  const splitTags = (tagString) => {
    return tagString.split('|');
  };

  const initialize = async () => {
    tags.value = []
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
        label: ele,
        value: ele
      })
    })
  }

  onMounted(() => {
    if (tools.value.length === 0) {
      getTools()
      initialize()
    }
  })

  return {
    tools,
    toolsdata,
    getTools,
    tags
  }
}
