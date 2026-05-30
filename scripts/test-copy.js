import { cp, rm, mkdir } from 'node:fs/promises'
import { spawn } from 'node:child_process'
import os from 'node:os'
import path from 'node:path'
import process from 'node:process'

const projectRoot = process.cwd()
const tempDir = path.join(os.tmpdir(), 'portfolio-hub-copy')
const ignoreDirs = ['node_modules', '.git']

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
  console.log(`Preparing project copy in ${tempDir}`)
  await rm(tempDir, { recursive: true, force: true })
  await mkdir(tempDir, { recursive: true })

  await cp(projectRoot, tempDir, {
    recursive: true,
    filter: (source) => {
      const relative = path.relative(projectRoot, source)
      if (!relative) return true
      return !ignoreDirs.some((dir) => relative.startsWith(dir + path.sep) || relative === dir)
    },
  })

  console.log('Installing dependencies in copy...')
  await runCommand('npm', ['install'], { cwd: tempDir })

  console.log('Running tests in the copied project...')
  await runCommand('npx', ['vitest', 'run', '--no-isolate', '--pool=threads', '--maxWorkers=1', '--reporter=verbose'], { cwd: tempDir })

  console.log('Tests completed successfully in the copied project.')
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
