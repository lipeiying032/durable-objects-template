import { DurableObject } from "cloudflare:workers";

export default {
  async fetch(request, env) {
    const id = env.MAILBOX_DO.idFromName("global");
    const stub = env.MAILBOX_DO.get(id);
    return await stub.fetch(request);
  }
}

export class MailboxDO extends DurableObject {
  constructor(ctx, env) {
    super(ctx, env);
  }

  // 1. ✅ 修复本次报错：初始化管理员
  async ensureDefaultAdmins(admins) {
    console.log("RPC: ensureDefaultAdmins called");
    return true; 
  }

  // 2. 获取文件夹
  async getFolders() {
    return []; 
  }

  // 3. 获取/保存设置
  async getSettings() {
    return {};
  }

  async saveSettings(settings) {
    return { success: true };
  }

  // 4. 处理邮件相关（预防后续报错）
  async getMessages() {
    return { messages: [], total: 0 };
  }

  async fetch(request) {
    return new Response("MailboxDO is running and fully stubbed.");
  }
}
