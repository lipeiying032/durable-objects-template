import { DurableObject } from "cloudflare:workers";

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    
    // 打印进入 Worker 的日志
    console.log(JSON.stringify({
      level: "INFO",
      event: "Request Received",
      path: url.pathname,
      method: request.method
    }));

    const id = env.MAILBOX_DO.idFromName("global");
    const stub = env.MAILBOX_DO.get(id);
    return await stub.fetch(request);
  }
};

export class MailboxDO extends DurableObject {
  constructor(ctx, env) {
    super(ctx, env);
  }

  // 辅助函数：统一打印 JSON 日志
  log(action, data = {}) {
    console.log(JSON.stringify({
      level: "DEBUG",
      component: "MailboxDO",
      action: action,
      timestamp: new Date().toISOString(),
      ...data
    }));
  }

  async ensureDefaultAdmins(admins) {
    this.log("ensureDefaultAdmins", { admins });
    return true; 
  }

  async getFolders() {
    this.log("getFolders");
    return []; 
  }

  async getSettings() {
    this.log("getSettings");
    return {};
  }

  async saveSettings(settings) {
    this.log("saveSettings", { settings });
    return { success: true };
  }

  async getMessages() {
    this.log("getMessages");
    return { messages: [], total: 0 };
  }

  async fetch(request) {
    const url = new URL(request.url);
    this.log("HTTP_Fetch", { path: url.pathname });

    return new Response(JSON.stringify({ 
      success: true, 
      message: "MailboxDO Initialized",
      logs_enabled: true 
    }), {
      headers: { "Content-Type": "application/json" }
    });
  }
}
