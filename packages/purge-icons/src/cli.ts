import yargs from 'yargs'
import { PurgeIcons } from '@purge-icons/core'

// eslint-disable-next-line no-unused-expressions
yargs
  .scriptName('purge-icons')
  .usage('$0 [args]')
  .command(
    '*',
    'List dependencies versions usage across packages',
    (args) => {
      return args
        .option('content', {
          alias: 'c',
          type: 'string',
          array: true,
        })
    },
    async(args) => {
      console.log(await PurgeIcons(args))
    },
  )
  .showHelpOnFail(false)
  .help()
  .argv
