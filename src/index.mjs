export default {
  async fetch(request, env) {
    // 这里的 MAILBOX_DO 要和下面 toml 里的 binding 一致
    const id = env.MAILBOX_DO.idFromName("global");
    const stub = env.MAILBOX_DO.get(id);
    return await stub.fetch(request);
  }
}

export class MailboxDO {
  constructor(ctx, env) {
    this.ctx = ctx;
  }

  // 核心：email-explorer 启动必须调用的方法
  async getFolders() {
    return []; // 返回空文件夹列表
  }

  // 核心：设置保存方法
  async saveSettings(settings) {
    return { success: true };
  }

  async getSettings() {
    return {};
  }

  // 兜底方法
  async fetch(request) {
    return new Response("New MailboxDO is Ready");
  }
}
