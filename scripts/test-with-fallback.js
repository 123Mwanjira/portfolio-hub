import { spawn } from 'node:child_process'
import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const cwd = process.cwd()

function runCommand(command, args, options = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      stdio: 'inherit',
      shell: true,
      ...options,
    })

    child.on('exit', (code) => {
      if (code === 0) {
        resolve()
      } else {
        reject(new Error(`${command} ${args.join(' ')} exited with code ${code}`))
      }
    })

    child.on('error', reject)
  })
}

async function main() {
  if (cwd.includes(' ')) {
    console.warn('Warning: your project path contains spaces.')
    console.warn('Running tests from a clean temporary copy to avoid Vitest worker startup issues.')
    await runCommand('node', [path.join(__dirname, 'test-copy.js')])
    return
  }

  await runCommand('npx', ['vitest', 'run', '--no-isolate', '--pool=threads', '--maxWorkers=1', '--reporter=verbose'])
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})