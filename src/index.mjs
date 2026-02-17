export default {
  async fetch(request, env) {
    try {
      const id = env.MAILBOX_DO.idFromName("global");
      const stub = env.MAILBOX_DO.get(id);
      return await stub.fetch(request);
    } catch (e) {
      return new Response("Bridge Error: " + e.message, { status: 500 });
    }
  }
}

export class MailboxDO {
  constructor(ctx, env) {
    this.ctx = ctx;
  }

  // 🚨 关键微调：这些方法需要被外部直接调用
  async getFolders() {
    console.log("RPC: getFolders called");
    return []; 
  }

  async saveSettings(settings) {
    console.log("RPC: saveSettings called");
    return { success: true };
  }

  async getSettings() {
    return {};
  }

  // 必须保留 fetch，因为这是 DO 的基础接口
  async fetch(request) {
    return new Response("New MailboxDO is Ready");
  }
}
