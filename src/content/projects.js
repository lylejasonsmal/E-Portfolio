export const projects = [
  {
    id: 'room-dashboard',
    name: 'Room Dashboard',
    titleFont: 'handwritten',
    summary: 'A live view of one room, read by an ESP32 sensor and pushed through a self-hosted Spring Boot API to a Vue dashboard. Temperature, humidity and the "feels like" heat index update the moment a reading lands.',
    stack: ['ESP32', 'Spring Boot', 'Java', 'Vue 3', 'Chart.js', 'Server-sent events'],
    liveUrl: 'https://lylejasonsmal.github.io/RoomDashboard/',
    repoUrl: 'https://github.com/lylejasonsmal/RoomDashboard'
  },
  {
    id: 'mugprintz',
    name: 'Mugprintz',
    titleFont: 'heading',
    summary: 'The website for Mugprintz, a printing studio in Wynberg, Cape Town. It shows off custom mugs, banners, calendars, ID photos and photo prints, and walks customers through ordering over WhatsApp.',
    stack: ['Vue 3', 'Vite', 'Vue Router', 'Pinia', 'Google Maps', 'GitHub Pages'],
    liveUrl: 'https://lylejasonsmal.github.io/Mugprintz-VueJs/',
    repoUrl: 'https://github.com/lylejasonsmal/Mugprintz-VueJs'
  }
]
