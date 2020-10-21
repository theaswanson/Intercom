using Intercom.Models;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Intercom.Hubs
{
    public class ChatHub : Hub
    {
        public async Task SendMessage(ChatMessage message)
        {
            message.TimeSent = DateTime.UtcNow;
            await Clients.All.SendAsync("ReceiveMessage", message);
        }
    }
}
