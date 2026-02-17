// 🚨 关键点 1：必须从 cloudflare:workers 导入 DurableObject 基类
import { DurableObject } from "cloudflare:workers";

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

// 🚨 关键点 2：类定义必须加上 `extends DurableObject`
export class MailboxDO extends DurableObject {
  constructor(ctx, env) {
    // 必须调用 super
    super(ctx, env);
  }

  // 这里的函数现在支持 RPC 远程调用了
  async getFolders() {
    return []; 
  }

  async saveSettings(settings) {
    return { success: true };
  }

  async getSettings() {
    return {};
  }

  async fetch(request) {
    return new Response("MailboxDO is ready with RPC support");
  }
}
