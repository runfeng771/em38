import { db } from '@/lib/db'

export async function initializeDatabase() {
  try {
    console.log('正在初始化数据库...')
    
    // 检查是否已经有账号
    const existingAccounts = await db.emailAccount.findMany()
    
    if (existingAccounts.length === 0) {
      console.log('没有找到现有账号，正在创建默认账号...')
      
      // 创建默认账号
      const defaultAccounts = [
        {
          email: 'Steven@HH.email.cn',
          password: 'KftcWviBjFcgnwfJ',
          imapServer: 'imap.email.cn',
          imapPort: 993,
          smtpServer: 'smtp.email.cn',
          smtpPort: 465,
          isActive: true
        },
        {
          email: '18@HH.email.cn',
          password: 'yuHKfnKvCqmw6HNN',
          imapServer: 'imap.email.cn',
          imapPort: 993,
          smtpServer: 'smtp.email.cn',
          smtpPort: 465,
          isActive: true
        },
        {
          email: '168@HH.email.cn',
          password: 'KWf2YAGsPE5xWP3G',
          imapServer: 'imap.email.cn',
          imapPort: 993,
          smtpServer: 'smtp.email.cn',
          smtpPort: 465,
          isActive: true
        },
        {
          email: '1688@HH.email.cn',
          password: '4kIYwAgzCsaGQBMT',
          imapServer: 'imap.email.cn',
          imapPort: 993,
          smtpServer: 'smtp.email.cn',
          smtpPort: 465,
          isActive: true
        },
        {
          email: 'BOSS@HH.email.cn',
          password: 'EwGEZHiEjuqsdQj9',
          imapServer: 'imap.email.cn',
          imapPort: 993,
          smtpServer: 'smtp.email.cn',
          smtpPort: 465,
          isActive: true
        },
        {
          email: 'support@HH.email.cn',
          password: '76sbGb3kcryNP7jh',
          imapServer: 'imap.email.cn',
          imapPort: 993,
          smtpServer: 'smtp.email.cn',
          smtpPort: 465,
          isActive: true
        },
        {
          email: '99@HH.email.cn',
          password: 'tX7Vv2AsFZ2dBFV6',
          imapServer: 'imap.email.cn',
          imapPort: 993,
          smtpServer: 'smtp.email.cn',
          smtpPort: 465,
          isActive: true
        },
        {
          email: '520@HH.email.cn',
          password: 'ZSKpi62wtHKAqq2c',
          imapServer: 'imap.email.cn',
          imapPort: 993,
          smtpServer: 'smtp.email.cn',
          smtpPort: 465,
          isActive: true
        }
      ]

      const createdAccounts = await Promise.all(
        defaultAccounts.map(account => 
          db.emailAccount.create({
            data: account
          })
        )
      )

      console.log(`成功创建 ${createdAccounts.length} 个默认邮件账号`)
      
      // 为每个账号创建一些示例邮件
      const sampleEmails = [
        {
          subject: '欢迎使用邮件管理系统',
          from: 'system@example.com',
          body: '欢迎使用我们的邮件管理系统！这是一个功能强大的多邮箱管理工具。',
          folder: 'inbox',
          isRead: false,
          isStarred: true
        },
        {
          subject: '会议通知',
          from: 'meeting@company.com',
          body: '请参加明天下午2点的产品会议。',
          folder: 'inbox',
          isRead: true,
          isStarred: false
        },
        {
          subject: '周报提醒',
          from: 'hr@company.com',
          body: '请记得在本周五之前提交您的周报。',
          folder: 'inbox',
          isRead: false,
          isStarred: false
        }
      ]

      await Promise.all(
        createdAccounts.map(account =>
          Promise.all(
            sampleEmails.map(email =>
              db.email.create({
                data: {
                  ...email,
                  to: account.email,
                  receivedAt: new Date(),
                  accountId: account.id
                }
              })
            )
          )
        )
      )

      console.log('默认账号和示例邮件创建成功')
    } else {
      console.log(`数据库中已存在 ${existingAccounts.length} 个账号，跳过初始化`)
    }
    
    console.log('数据库初始化完成')
  } catch (error) {
    console.error('数据库初始化失败:', error)
    throw error
  }
}