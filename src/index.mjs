import { DurableObject } from "cloudflare:workers";

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    
    // 只有当路径包含 /api/ 或者明确发往 DO 时才处理
    if (url.pathname.includes('/api/') || url.searchParams.has('do')) {
      // 注意：这里的 env.MAILBOX_DO 对应你 toml 里的 binding name，不需要改
      const id = env.MAILBOX_DO.idFromName("global");
      const stub = env.MAILBOX_DO.get(id);
      return await stub.fetch(request);
    }
    
    // 其他请求直接返回，让 Pages 自己的静态资源去接管
    return new Response("Not Found", { status: 404 });
  }
}

/**
 * 🚨 类名已更名为 MailboxDOV2 以绕过 Cloudflare 10074 迁移错误
 */
export class MailboxDOV2 extends DurableObject {
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
      message: "MailboxDOV2 is active and RPC ready",
      path: url.pathname 
    }), {
      headers: { "Content-Type": "application/json" }
    });
  }
} 
