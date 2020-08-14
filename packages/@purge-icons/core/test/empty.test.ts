import test from 'ava'
import { PurgeIcons } from '../src'

test('zero config', async(t) => {
  t.snapshot(await PurgeIcons())
})

test('format:json', async(t) => {
  t.snapshot(await PurgeIcons({ format: 'json' }))
})

test('format:cjs', async(t) => {
  t.snapshot(await PurgeIcons({ format: 'cjs' }))
})

test('format:mjs', async(t) => {
  t.snapshot(await PurgeIcons({ format: 'mjs' }))
})

test('format:ts', async(t) => {
  t.snapshot(await PurgeIcons({ format: 'ts' }))
})
