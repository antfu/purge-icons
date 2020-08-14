import test from 'ava'
import { PurgeIcons } from '../src'

const content = [
  'test/fixture/*.html',
]

test('zero config', async(t) => {
  t.snapshot(await PurgeIcons({
    content,
  }))
})

test('format:json', async(t) => {
  t.snapshot(await PurgeIcons({
    content,
    format: 'json',
  }))
})

test('format:cjs', async(t) => {
  t.snapshot(await PurgeIcons({
    content,
    format: 'cjs',
  }))
})

test('format:mjs', async(t) => {
  t.snapshot(await PurgeIcons({
    content,
    format: 'mjs',
  }))
})

test('format:ts', async(t) => {
  t.snapshot(await PurgeIcons({
    content,
    format: 'ts',
  }))
})
