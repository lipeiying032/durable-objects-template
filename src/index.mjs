// 这是一个“伪装”的 Worker，专门用来骗过 email-explorer

export default {
  async fetch(request, env) {
    return new Response("Durable Object Mock Server Running");
  }
}

// 🚨 关键修改：把名字从 Counter 改成 MailboxDO
export class MailboxDO {
  constructor(state, env) {
    this.state = state;
  }

  // 1. 保留 fetch 方法，防止报错
  async fetch(request) {
    return new Response("MailboxDO is alive!");
  }

  // 2. ⭐ 核心修复：添加 getFolders 方法
  // email-explorer 的第388行就是在找这个！
  async getFolders() {
    // 返回一个空数组，假装我们已经拿到了文件夹
    return [];
  }
  
  // 3. 预判：它可能还会调用 saveSettings，我们也补上
  async saveSettings(settings) {
    return true;
  }
}
