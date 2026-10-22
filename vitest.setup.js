import { afterEach } from 'vitest'

HTMLCanvasElement.prototype.getContext = () => null

afterEach(() => new Promise((resolve) => setTimeout(resolve, 20)))
