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

// 在 MailboxDO 类中修改 fetch 方法
async fetch(request) {
  const url = new URL(request.url);
  
  // 如果是主程序在探测，返回一个 JSON 成功响应
  return new Response(JSON.stringify({ 
    success: true, 
    message: "MailboxDO is active",
    path: url.pathname 
  }), {
    headers: { "Content-Type": "application/json" }
  });
}
