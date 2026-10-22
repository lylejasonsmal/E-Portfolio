<template>
  <div ref="timelineRef" class="timeline">
    <svg class="path" aria-hidden="true" :width="size.width" :height="size.height" :viewBox="`0 0 ${size.width} ${size.height}`">
      <path class="track" :d="pathData" />
      <path class="drawn" :d="pathData" pathLength="1" :style="{ strokeDashoffset: 1 - progress }" />
    </svg>
    <ol>
      <li v-for="(role, index) in params.roles" :key="role.id" :class="['entry', index % 2 ? 'right' : 'left', { reached: reachedCount > index }]">
        <span ref="nodeRefs" class="node" aria-hidden="true"></span>
        <div class="card">
          <p class="dates"><time :datetime="role.start">{{ formatMonth(role.start) }}</time> – <time v-if="role.end" :datetime="role.end">{{ formatMonth(role.end) }}</time><span v-else>Present</span></p>
          <h3>{{ role.title }}</h3>
          <p class="company"><a :href="role.companyUrl" target="_blank" rel="noopener noreferrer">{{ role.company }}</a></p>
          <p class="summary">{{ role.summary }}</p>
        </div>
      </li>
    </ol>
  </div>
</template>
<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'

const params = defineProps({
  roles: { type: Array, required: true }
})

const timelineRef = ref(null)
const nodeRefs = ref([])
const size = ref({ width: 0, height: 0 })
const pathData = ref('')
const nodeFractions = ref([])
const progress = ref(1)
const reachedCount = ref(params.roles.length)

const monthFormat = new Intl.DateTimeFormat('en-ZA', { month: 'short', year: 'numeric', timeZone: 'UTC' })

function formatMonth(yearMonth) {
  return monthFormat.format(new Date(`${yearMonth}-01T00:00:00Z`)).replace('.', '')
}

function windingPath(points, sway) {
  let path = `M ${points[0].x} ${points[0].y}`
  for (let index = 1; index < points.length; index++) {
    const from = points[index - 1]
    const to = points[index]
    const side = index % 2 ? 1 : -1
    const reach = (to.y - from.y) * 0.4
    path += ` C ${from.x + side * sway} ${from.y + reach}, ${to.x - side * sway} ${to.y - reach}, ${to.x} ${to.y}`
  }
  return path
}

function measure() {
  const timeline = timelineRef.value
  if (!timeline) return
  const bounds = timeline.getBoundingClientRect()
  size.value = { width: bounds.width, height: bounds.height }
  const nodes = nodeRefs.value.map((node) => {
    const rect = node.getBoundingClientRect()
    return { x: rect.left + rect.width / 2 - bounds.left, y: rect.top + rect.height / 2 - bounds.top }
  })
  if (!nodes.length) return
  const lineX = nodes[0].x
  const points = [{ x: lineX, y: 0 }, ...nodes, { x: lineX, y: bounds.height }]
  const sway = lineX > bounds.width / 4 ? Math.min(bounds.width * 0.16, 120) : 14
  pathData.value = windingPath(points, sway)
  nodeFractions.value = nodes.map((node) => node.y / bounds.height)
  updateProgress()
}

let reducedMotion = false

function updateProgress() {
  const timeline = timelineRef.value
  if (!timeline || reducedMotion) return
  const bounds = timeline.getBoundingClientRect()
  const drawn = (window.innerHeight * 0.7 - bounds.top) / bounds.height
  progress.value = Math.min(1, Math.max(0, drawn))
  reachedCount.value = nodeFractions.value.filter((fraction) => fraction <= progress.value).length
}

let frame = 0
function onScroll() {
  if (frame) return
  frame = requestAnimationFrame(() => {
    frame = 0
    updateProgress()
  })
}

let resizeObserver = null

onMounted(() => {
  reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false
  measure()
  window.addEventListener('scroll', onScroll, { passive: true })
  if (window.ResizeObserver) {
    resizeObserver = new ResizeObserver(measure)
    resizeObserver.observe(timelineRef.value)
  }
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  resizeObserver?.disconnect()
  cancelAnimationFrame(frame)
})
</script>
<style scoped>
.timeline {
  position: relative;
  padding: 40px 0;
}

.path {
  position: absolute;
  inset: 0;
  overflow: visible;
  pointer-events: none;
}

.path path {
  fill: none;
  stroke-linecap: round;
}

.track {
  stroke: var(--secondary-black);
  stroke-width: 1.5;
}

.drawn {
  stroke: var(--accent);
  stroke-width: 2;
  stroke-dasharray: 1;
  transition: stroke-dashoffset 0.1s linear;
}

ol {
  position: relative;
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 120px;
}

.entry {
  position: relative;
  display: flex;
}

.entry.left {
  justify-content: flex-start;
}

.entry.right {
  justify-content: flex-end;
}

.node {
  position: absolute;
  top: 6px;
  left: 50%;
  width: 14px;
  height: 14px;
  margin-left: -7px;
  border: 2px solid var(--grey-dark);
  border-radius: 50%;
  background: var(--page-background);
  box-sizing: border-box;
  transition: background-color 0.3s ease-out, border-color 0.3s ease-out;
}

.reached .node {
  border-color: var(--accent);
  background: var(--accent);
}

.card {
  width: calc(50% - 48px);
}

.dates {
  margin: 0 0 6px;
  color: var(--grey-mid);
  font-size: 0.85rem;
}

h3 {
  margin: 0;
}

.company {
  margin: 4px 0 10px;
}

.company a {
  color: var(--accent);
  text-decoration: none;
  font-weight: 500;
}

.company a:hover {
  text-decoration: underline;
  text-underline-offset: 3px;
}

.summary {
  margin: 0;
  line-height: 1.6;
}

@media (max-width: 700px) {
  ol {
    gap: 64px;
  }

  .entry.left,
  .entry.right {
    justify-content: flex-start;
  }

  .node {
    left: 20px;
  }

  .card {
    width: auto;
    padding-left: 52px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .drawn,
  .node {
    transition: none;
  }
}
</style>
