(() => {
  if (!window.TRACE_LOGGER) {
    window.TRACE_LOGGER = {
      trace_id: '',
      path: '',
      annotations: [],
      binary_annotations: [],
      client_span_id: '',
    }
  }
  const a = { key: 'init', timestamp: Date.now() }
  window.TRACE_LOGGER.annotations.push(a)
})()
