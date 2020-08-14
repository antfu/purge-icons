import fs from 'fs-extra'

(async() => {
  for (const f of ['README.md', 'LICENSE'])
    await fs.copyFile(`../../${f}`, `./${f}`)
})()
