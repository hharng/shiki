import { describe, expect, it } from 'vitest'
import { getHighlighter } from '../src'

describe('should', () => {
  it('works', async () => {
    const shiki = await getHighlighter({
      themes: ['vitesse-light'],
      langs: ['javascript'],
    })

    expect(shiki.codeToHtml('console.log', { lang: 'javascript' }))
      .toMatchInlineSnapshot('"<pre class=\\"shiki vitesse-light\\" style=\\"background-color: #ffffff\\" tabindex=\\"0\\"><code><span class=\\"line\\"><span style=\\"color: #B07D48\\">console</span><span style=\\"color: #999999\\">.</span><span style=\\"color: #B07D48\\">log</span></span></code></pre>"')
  })

  it('dynamic load theme and lang', async () => {
    const shiki = await getHighlighter({
      themes: ['vitesse-light'],
      langs: ['javascript'],
    })

    await shiki.loadLanguage('python')
    await shiki.loadTheme('min-dark')

    expect(shiki.getLoadedLanguages())
      .toMatchInlineSnapshot(`
        [
          "javascript",
          "js",
          "python",
          "py",
        ]
      `)
    expect(shiki.getLoadedThemes())
      .toMatchInlineSnapshot(`
        [
          "vitesse-light",
          "min-dark",
        ]
      `)

    expect(shiki.codeToHtml('print 1', { lang: 'python', theme: 'min-dark' }))
      .toMatchInlineSnapshot('"<pre class=\\"shiki min-dark\\" style=\\"background-color: #1f1f1f\\" tabindex=\\"0\\"><code><span class=\\"line\\"><span style=\\"color: #B392F0\\">print </span><span style=\\"color: #F8F8F8\\">1</span></span></code></pre>"')
  })
})
