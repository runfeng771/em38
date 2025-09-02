import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// 获取数据库 URL，如果没有环境变量则使用默认路径
const getDatabaseUrl = () => {
  if (process.env.DATABASE_URL) {
    return process.env.DATABASE_URL
  }
  
  // 生产环境（包括Render）使用 /tmp 目录，因为它是可写的
  if (process.env.NODE_ENV === 'production') {
    return 'file:/tmp/custom.db'
  }
  
  // 开发环境默认路径
  return 'file:./db/custom.db'
}

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ['query'],
    datasources: {
      db: {
        url: getDatabaseUrl()
      }
    }
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db