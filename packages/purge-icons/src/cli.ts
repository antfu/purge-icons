import path from 'path'
import yargs from 'yargs'
import type { OutputFormat } from '@purge-icons/core'
import { PurgeIcons } from '@purge-icons/core'
import fs from 'fs-extra'

// eslint-disable-next-line no-unused-expressions
yargs
  .scriptName('purge-icons')
  .usage('$0 [args]')
  .command(
    '*',
    'List dependencies versions usage across packages',
    (args) => {
      return args
        .option('output', {
          alias: 'o',
          type: 'string',
          describe: 'path for output file, will output to stdout when this option is not provied',
        })
        .option('content', {
          alias: 'c',
          type: 'string',
          array: true,
          required: true,
          describe: 'glob for matching source files, sepereted by comma',
        })
        .option('included', {
          alias: 'i',
          type: 'string',
          array: true,
          describe: 'whitelist for icons to be included',
        })
        .option('format', {
          alias: 'f',
          type: 'string',
          describe: 'output file format',
          choices: [
            'js',
            'mjs',
            'cjs',
            'ts',
            'json',
          ],
        })
    },
    async(args) => {
      const format = args.format || path.parse(args.output || '')?.ext?.slice(1)?.toLowerCase() || 'mjs'

      const code = await PurgeIcons({
        content: args.content.flatMap(i => i.split(',')).map(i => i.trim()).filter(Boolean),
        format: format as OutputFormat,
        included: args.included,
      })

      if (args.output) {
        const filepath = path.resolve(args.output)
        await fs.ensureDir(path.dirname(filepath))
        await fs.writeFile(filepath, code, 'utf-8')
      }
      else {
        console.log(code)
      }
    },
  )
  .showHelpOnFail(false)
  .help()
  .argv
