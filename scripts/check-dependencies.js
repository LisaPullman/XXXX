#!/usr/bin/env node

/**
 * 依赖版本检查脚本
 * 确保所有依赖版本与技术栈规范一致
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 技术栈规范版本
const TECH_STACK_VERSIONS = {
  // 前端技术栈
  frontend: {
    react: '^18.3.1',
    typescript: '~5.8.3',
    tailwindcss: '^3.4.14',
    zustand: '^4.5.5',
    'react-router-dom': '^6.26.1',
    vite: '^7.0.3',
    antd: '^5.21.6'
  },
  // 后端技术栈
  backend: {
    express: '^4.19.2',
    typescript: '^5.8.3',
    mongoose: '^8.7.3',
    redis: '^4.7.0',
    pg: '^8.13.1',
    'ali-oss': '^6.21.0'
  },
  // 开发工具
  devTools: {
    'node': '>=18.20.0',
    'npm': '>=8.0.0',
    'pnpm': '>=9.0.0'
  },
  // Docker镜像版本
  docker: {
    'redis': '7.2-alpine',
    'mongo': '7.0',
    'postgres': '16-alpine',
    'nginx': 'alpine'
  }
};

function checkPackageJson(filePath, type) {
  console.log(`\n📋 检查 ${filePath}...`);
  
  if (!fs.existsSync(filePath)) {
    console.log(`❌ 文件不存在: ${filePath}`);
    return false;
  }

  const packageJson = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const expectedVersions = TECH_STACK_VERSIONS[type];
  let hasIssues = false;

  // 检查dependencies
  if (packageJson.dependencies) {
    console.log('\n🔍 检查 dependencies:');
    for (const [pkg, expectedVersion] of Object.entries(expectedVersions)) {
      const currentVersion = packageJson.dependencies[pkg];
      if (currentVersion) {
        if (currentVersion === expectedVersion) {
          console.log(`  ✅ ${pkg}: ${currentVersion}`);
        } else {
          console.log(`  ⚠️  ${pkg}: ${currentVersion} (期望: ${expectedVersion})`);
          hasIssues = true;
        }
      } else {
        console.log(`  ❌ ${pkg}: 未安装 (期望: ${expectedVersion})`);
        hasIssues = true;
      }
    }
  }

  // 检查devDependencies
  if (packageJson.devDependencies) {
    console.log('\n🔍 检查 devDependencies:');
    for (const [pkg, expectedVersion] of Object.entries(expectedVersions)) {
      const currentVersion = packageJson.devDependencies[pkg];
      if (currentVersion) {
        if (currentVersion === expectedVersion) {
          console.log(`  ✅ ${pkg}: ${currentVersion}`);
        } else {
          console.log(`  ⚠️  ${pkg}: ${currentVersion} (期望: ${expectedVersion})`);
          hasIssues = true;
        }
      }
    }
  }

  // 检查engines
  if (packageJson.engines) {
    console.log('\n🔍 检查 engines:');
    const expectedEngines = TECH_STACK_VERSIONS.devTools;
    for (const [engine, expectedVersion] of Object.entries(expectedEngines)) {
      const currentVersion = packageJson.engines[engine];
      if (currentVersion) {
        if (currentVersion === expectedVersion) {
          console.log(`  ✅ ${engine}: ${currentVersion}`);
        } else {
          console.log(`  ⚠️  ${engine}: ${currentVersion} (期望: ${expectedVersion})`);
          hasIssues = true;
        }
      } else {
        console.log(`  ❌ ${engine}: 未配置 (期望: ${expectedVersion})`);
        hasIssues = true;
      }
    }
  }

  return !hasIssues;
}

function checkDockerCompose() {
  console.log('\n📋 检查 docker-compose.yml...');
  
  const dockerComposePath = path.join(__dirname, '../docker-compose.yml');
  if (!fs.existsSync(dockerComposePath)) {
    console.log('❌ docker-compose.yml 不存在');
    return false;
  }

  const dockerComposeContent = fs.readFileSync(dockerComposePath, 'utf8');
  const expectedVersions = TECH_STACK_VERSIONS.docker;
  let hasIssues = false;

  console.log('\n🔍 检查 Docker 镜像版本:');
  for (const [service, expectedVersion] of Object.entries(expectedVersions)) {
    const regex = new RegExp(`image:\\s*${service}:([\\w.-]+)`, 'g');
    const matches = [...dockerComposeContent.matchAll(regex)];
    
    if (matches.length > 0) {
      matches.forEach(match => {
        const currentVersion = match[1];
        if (currentVersion === expectedVersion) {
          console.log(`  ✅ ${service}: ${currentVersion}`);
        } else {
          console.log(`  ⚠️  ${service}: ${currentVersion} (期望: ${expectedVersion})`);
          hasIssues = true;
        }
      });
    } else {
      console.log(`  ℹ️  ${service}: 未使用或已注释`);
    }
  }

  return !hasIssues;
}

function generateReport() {
  console.log('\n' + '='.repeat(60));
  console.log('🔍 内在宇宙项目 - 依赖版本检查报告');
  console.log('='.repeat(60));

  const results = {
    frontend: checkPackageJson(path.join(__dirname, '../package.json'), 'frontend'),
    backend: checkPackageJson(path.join(__dirname, '../server/package.json'), 'backend'),
    docker: checkDockerCompose()
  };

  console.log('\n' + '='.repeat(60));
  console.log('📊 检查结果汇总:');
  console.log('='.repeat(60));

  const allPassed = Object.values(results).every(result => result);

  if (allPassed) {
    console.log('🎉 所有依赖版本检查通过！');
    console.log('✅ 前端依赖版本正确');
    console.log('✅ 后端依赖版本正确');
    console.log('✅ Docker配置版本正确');
  } else {
    console.log('⚠️  发现版本不一致问题:');
    if (!results.frontend) console.log('❌ 前端依赖版本需要更新');
    if (!results.backend) console.log('❌ 后端依赖版本需要更新');
    if (!results.docker) console.log('❌ Docker配置版本需要更新');
    
    console.log('\n💡 建议操作:');
    console.log('1. 运行 npm install 或 pnpm install 更新依赖');
    console.log('2. 检查并更新 package.json 中的版本号');
    console.log('3. 更新 docker-compose.yml 中的镜像版本');
    console.log('4. 重新运行此检查脚本确认修复');
  }

  console.log('\n' + '='.repeat(60));
  console.log('📋 技术栈规范:');
  console.log('='.repeat(60));
  console.log('• React: 18.3.1');
  console.log('• TypeScript: 5.8.3 (严格模式)');
  console.log('• Tailwind CSS: 3.4.14');
  console.log('• Zustand: 4.5.5');
  console.log('• React Router: 6.26.1');
  console.log('• Vite: 7.0.3');
  console.log('• Express: 4.19.x');
  console.log('• MongoDB: 7.0.x');
  console.log('• Redis: 7.2.x');
  console.log('• PostgreSQL: 16.x');
  console.log('• Node.js: 18.20.x LTS');
  console.log('• pnpm: 9.x');

  return allPassed;
}

// 运行检查
if (import.meta.url === `file://${process.argv[1]}`) {
  const success = generateReport();
  process.exit(success ? 0 : 1);
}

export { generateReport, TECH_STACK_VERSIONS };
