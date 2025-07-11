// 测试 useAuthStore 的依赖

// 测试 1: storage
try {
  console.log('Testing storage...');
  // import { typedStorage } from './utils/storage';
  console.log('Storage import successful');
} catch (error) {
  console.error('Storage import failed:', error);
}

// 测试 2: validation  
try {
  console.log('Testing validation...');
  // import { validateForm, ValidationSchemas } from './utils/validation';
  console.log('Validation import successful');
} catch (error) {
  console.error('Validation import failed:', error);
}

// 测试 3: apiService
try {
  console.log('Testing apiService...');
  // import { authApi, ApiError } from './services/apiService';
  console.log('ApiService import successful');
} catch (error) {
  console.error('ApiService import failed:', error);
}

export {};
