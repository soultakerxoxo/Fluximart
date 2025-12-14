(() => {
  let c = 0
  document.addEventListener('securitypolicyviolation', async (e) => {
    if (c >= 100) return
    c += 1
    try {
      await fetch('/vendor/csp-report', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          'csp-report': {
            'blocked-uri': e.blockedURI,
            'column-number': e.columnNumber,
            disposition: e.disposition,
            'document-uri': e.documentURI,
            'effective-directive': e.effectiveDirective,
            'line-number': e.lineNumber,
            'original-policy': e.originalPolicy,
            referrer: e.referrer,
            sample: e.sample,
            'source-file': e.sourceFile,
            'status-code': e.statusCode,
            'violated-directive': e.violatedDirective,
            'is-metatag': true,
          },
        }),
      })
    } catch {}
  })
})()
