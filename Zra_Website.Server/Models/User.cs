namespace Zra_Website.Server.Models
{
    public class User
    {
        public string UserId { get; set; }
        public string FName { get; set; } = string.Empty;
        public string LName { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public bool Active { get; set; } = true;
    }
}
