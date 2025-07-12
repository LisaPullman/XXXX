// Service Worker for 内在宇宙 PWA
const CACHE_NAME = 'inner-cosmos-v1.0.0';
const STATIC_CACHE = 'inner-cosmos-static-v1.0.0';
const DYNAMIC_CACHE = 'inner-cosmos-dynamic-v1.0.0';

// 需要预缓存的静态资源
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/favicon.ico',
  // CSS 和 JS 文件会在构建时自动添加
];

// 动态缓存的路径模式
const DYNAMIC_CACHE_PATTERNS = [
  /^https:\/\/fonts\.googleapis\.com/,
  /^https:\/\/fonts\.gstatic\.com/,
  /\.(?:png|jpg|jpeg|svg|gif|webp)$/,
  /\.(?:js|css)$/
];

// 网络优先的路径
const NETWORK_FIRST_PATTERNS = [
  /\/api\//,
  /\.json$/
];

// 安装事件
self.addEventListener('install', (event) => {
  console.log('Service Worker 安装中...');
  
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('预缓存静态资源');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        console.log('Service Worker 安装成功');
        return self.skipWaiting();
      })
  );
});

// 激活事件
self.addEventListener('activate', (event) => {
  console.log('Service Worker 激活中...');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE && 
                cacheName !== DYNAMIC_CACHE && 
                cacheName !== CACHE_NAME) {
              console.log('删除旧缓存:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('Service Worker 激活成功');
        return self.clients.claim();
      })
  );
});

// 获取事件 - 实现不同的缓存策略
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // 忽略 Chrome 扩展请求
  if (url.protocol === 'chrome-extension:') {
    return;
  }

  // 忽略非 GET 请求
  if (request.method !== 'GET') {
    return;
  }

  // HTML 页面 - 网络优先，失败时使用缓存
  if (request.headers.get('accept')?.includes('text/html')) {
    event.respondWith(
      networkFirstWithFallback(request)
    );
    return;
  }

  // API 请求 - 网络优先
  if (NETWORK_FIRST_PATTERNS.some(pattern => pattern.test(request.url))) {
    event.respondWith(
      networkFirst(request)
    );
    return;
  }

  // 静态资源 - 缓存优先
  if (DYNAMIC_CACHE_PATTERNS.some(pattern => pattern.test(request.url))) {
    event.respondWith(
      cacheFirst(request)
    );
    return;
  }

  // 默认策略 - 网络优先
  event.respondWith(
    networkFirst(request)
  );
});

// 缓存优先策略
async function cacheFirst(request) {
  try {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }

    const networkResponse = await fetch(request);
    
    // 缓存成功的响应
    if (networkResponse.status === 200) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.log('缓存优先策略失败:', error);
    
    // 返回离线页面或默认响应
    if (request.headers.get('accept')?.includes('text/html')) {
      return caches.match('/');
    }
    
    throw error;
  }
}

// 网络优先策略
async function networkFirst(request) {
  try {
    const networkResponse = await fetch(request);
    
    // 缓存成功的响应
    if (networkResponse.status === 200) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.log('网络请求失败，尝试缓存:', error);
    
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    throw error;
  }
}

// 网络优先带后备策略（适用于 HTML 页面）
async function networkFirstWithFallback(request) {
  try {
    const networkResponse = await fetch(request);
    
    // 缓存成功的响应
    if (networkResponse.status === 200) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.log('网络请求失败，使用缓存或离线页面:', error);
    
    // 尝试从缓存获取
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // 返回主页作为后备
    const fallbackResponse = await caches.match('/');
    if (fallbackResponse) {
      return fallbackResponse;
    }
    
    // 返回基本的离线页面
    return new Response(
      `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <title>内在宇宙 - 离线模式</title>
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
              display: flex;
              justify-content: center;
              align-items: center;
              min-height: 100vh;
              margin: 0;
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: white;
              text-align: center;
            }
            .container {
              padding: 2rem;
              border-radius: 1rem;
              background: rgba(255, 255, 255, 0.1);
              backdrop-filter: blur(10px);
            }
            h1 { margin-bottom: 1rem; }
            p { margin-bottom: 1.5rem; opacity: 0.9; }
            button {
              background: rgba(255, 255, 255, 0.2);
              border: 1px solid rgba(255, 255, 255, 0.3);
              color: white;
              padding: 0.75rem 1.5rem;
              border-radius: 0.5rem;
              cursor: pointer;
              font-size: 1rem;
            }
            button:hover {
              background: rgba(255, 255, 255, 0.3);
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>🌟 内在宇宙</h1>
            <p>你当前处于离线模式<br>请检查网络连接后重试</p>
            <button onclick="window.location.reload()">重新加载</button>
          </div>
        </body>
      </html>
      `,
      {
        headers: {
          'Content-Type': 'text/html; charset=utf-8'
        }
      }
    );
  }
}

// 消息事件处理
self.addEventListener('message', (event) => {
  const { type, payload } = event.data;

  switch (type) {
    case 'SKIP_WAITING':
      self.skipWaiting();
      break;
      
    case 'GET_VERSION':
      event.ports[0].postMessage({
        type: 'VERSION',
        payload: { version: CACHE_NAME }
      });
      break;
      
    case 'CACHE_TEST_RESULT':
      // 缓存测试结果到本地存储
      cacheTestResult(payload);
      break;
      
    default:
      console.log('未知消息类型:', type);
  }
});

// 缓存测试结果
async function cacheTestResult(resultData) {
  try {
    const cache = await caches.open(DYNAMIC_CACHE);
    const response = new Response(JSON.stringify(resultData), {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    await cache.put(
      new Request(`/cache/test-result-${Date.now()}`),
      response
    );
    
    console.log('测试结果已缓存');
  } catch (error) {
    console.error('缓存测试结果失败:', error);
  }
}

// 后台同步（如果支持）
if ('sync' in self.registration) {
  self.addEventListener('sync', (event) => {
    if (event.tag === 'background-sync') {
      event.waitUntil(
        // 执行后台同步任务
        syncTestResults()
      );
    }
  });
}

// 同步测试结果到服务器
async function syncTestResults() {
  try {
    // 这里可以实现将离线缓存的测试结果同步到服务器
    console.log('执行后台同步...');
  } catch (error) {
    console.error('后台同步失败:', error);
  }
}

// 推送通知（如果需要）
self.addEventListener('push', (event) => {
  if (!event.data) return;

  const data = event.data.json();
  const options = {
    body: data.body,
    icon: '/favicon.ico',
    badge: '/favicon.ico',
    vibrate: [100, 50, 100],
    data: {
      url: data.url || '/'
    }
  };

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

// 通知点击处理
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  const url = event.notification.data?.url || '/';
  
  event.waitUntil(
    clients.matchAll({ type: 'window' })
      .then((clientList) => {
        // 查找已打开的窗口
        for (const client of clientList) {
          if (client.url === url && 'focus' in client) {
            return client.focus();
          }
        }
        
        // 打开新窗口
        if (clients.openWindow) {
          return clients.openWindow(url);
        }
      })
  );
});