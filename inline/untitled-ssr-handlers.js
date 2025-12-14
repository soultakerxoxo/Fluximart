(() => {
  window.__RESOURCE_DATA_BEFORE_INIT__ = []
  window.__RESOURCE_PENDING_BEFORE_INIT__ = {}
  function dataHandler(r) {
    window.__RESOURCE_DATA_BEFORE_INIT__.push(r)
  }
  function pendingHandler(name, key) {
    if (!window.__RESOURCE_PENDING_BEFORE_INIT__[name]) {
      window.__RESOURCE_PENDING_BEFORE_INIT__[name] = new Set()
    }
    window.__RESOURCE_PENDING_BEFORE_INIT__[name].add(key)
  }
  window.__RESOURCE_SSR_HANDLER__ = dataHandler
  window.__RESOURCE_PENDING_FETCH_HANDLER__ = pendingHandler
})()
