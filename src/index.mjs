import { DurableObject } from "cloudflare:workers";

export default {
  async fetch(request, env) {
    // 这里的 MAILBOX_DO 必须和你的 wrangler.toml 里的 binding name 一致
    const id = env.MAILBOX_DO.idFromName("global");
    const stub = env.MAILBOX_DO.get(id);
    return await stub.fetch(request);
  }
};

export class MailboxDO extends DurableObject {
  constructor(ctx, env) {
    super(ctx, env);
  }

  // 1. 响应 RPC 调用：初始化管理员
  async ensureDefaultAdmins(admins) {
    console.log("RPC: ensureDefaultAdmins called");
    return true; 
  }

  // 2. 响应 RPC 调用：获取文件夹
  async getFolders() {
    return []; 
  }

  // 3. 响应 RPC 调用：获取/保存设置
  async getSettings() {
    return {};
  }

  async saveSettings(settings) {
    return { success: true };
  }

  // 4. 响应 RPC 调用：处理邮件相关
  async getMessages() {
    return { messages: [], total: 0 };
  }

  // 5. 响应 HTTP 请求 (fetch 接口)
  async fetch(request) {
    const url = new URL(request.url);
    
    return new Response(JSON.stringify({ 
      success: true, 
      message: "MailboxDO is active and RPC ready",
      path: url.pathname 
    }), {
      headers: { "Content-Type": "application/json" }
    });
  }
} // <--- 这里的这个大括号必须加上，用来闭合 MailboxDO 类
