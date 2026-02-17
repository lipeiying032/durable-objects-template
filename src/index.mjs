/**
 * 这是一个“伪装”的 Durable Object Worker
 * 专门用于解决 Pages 无法直接创建 DO 的“鸡生蛋”问题
 */

export default {
  async fetch(request, env) {
    // 这里的 COUNTER 必须和你的 wrangler.toml 里的 binding name 一致
    try {
      const id = env.COUNTER.idFromName("global-instance");
      const obj = env.COUNTER.get(id);
      return await obj.fetch(request);
    } catch (e) {
      return new Response("Worker Error: " + e.message, { status: 500 });
    }
  }
}

/**
 * 核心类：MailboxDO
 */
export class MailboxDO {
  constructor(ctx, env) {
    // ctx.storage 是 SQLite 模式下的关键
    this.ctx = ctx;
    this.env = env;
  }

  // 处理来自主项目的 fetch 请求
  async fetch(request) {
    return new Response("MailboxDO (Mock) is active and responding!");
  }

  // 1. 获取文件夹列表（email-explorer 第 388 行必调）
  async getFolders() {
    console.log("Mock: getFolders called");
    // 返回空数组即可让主项目继续运行
    return [];
  }

  // 2. 保存设置（主项目初始化时可能会调）
  async saveSettings(settings) {
    console.log("Mock: saveSettings called");
    return { success: true };
  }

  // 3. 获取设置
  async getSettings() {
    console.log("Mock: getSettings called");
    return {};
  }

  // 4. 处理邮件索引（预防性补全）
  async getMessages() {
    return { messages: [], total: 0 };
  }
}
