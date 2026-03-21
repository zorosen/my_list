/* ════════════════════════════════════════════════════
   DATABASE  (IndexedDB)
════════════════════════════════════════════════════ */
const IDB = (() => {
  const DB = 'AnimeArchiveV4', VER = 1;
  const ANIME = 'anime';
  let _db = null;

  function open() {
    return new Promise((res, rej) => {
      if (_db) return res(_db);
      const req = indexedDB.open(DB, VER);
      req.onupgradeneeded = e => {
        const d = e.target.result;
        if (!d.objectStoreNames.contains(ANIME)) {
          const s = d.createObjectStore(ANIME, { keyPath: 'id', autoIncrement: true });
          s.createIndex('title', 'title', { unique: true });
        }
      };
      req.onsuccess = e => { _db = e.target.result; res(_db); };
      req.onerror = () => rej(req.error);
    });
  }

  function store(name, mode = 'readonly') {
    return _db.transaction(name, mode).objectStore(name);
  }

  const all  = () => p(store(ANIME).getAll());
  const get  = id => p(store(ANIME).get(id));
  const put  = v  => p(store(ANIME, 'readwrite').put(v));
  const del  = id => p(store(ANIME, 'readwrite').delete(id));

  function p(req) {
    return new Promise((res, rej) => {
      req.onsuccess = e => res(e.target.result);
      req.onerror = () => rej(req.error);
    });
  }

  return { open, all, get, put, del };
})();

/* ════════════════════════════════════════════════════
   LOCAL FOLDER IMAGE ENGINE
════════════════════════════════════════════════════ */
const IMG = (() => {
  function getPath(title) {
    // Sanitize title to match common file naming (remove characters like : / \ ? % * | " < >)
    const sanitized = title.replace(/[:\/\\?%*|"<>]/g, '');
    return `Anime_Library/${sanitized}.jpg`;
  }

  // Simplified version to just return the path
  function getLocal(title) {
    return Promise.resolve(getPath(title));
  }

  // These are now empty stubs to prevent errors if called elsewhere
  function enqueue() {}
  function syncAllImages() {}
  function updateSyncStats() {}
  function revokeAll() {}
  function exportDatabase() {}
  function importDatabase() {}
  function downloadAllImagesZip() {}

  return { getPath, getLocal, enqueue, syncAllImages, updateSyncStats, revokeAll, exportDatabase, importDatabase, downloadAllImagesZip };
})();
