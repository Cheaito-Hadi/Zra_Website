using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Zra_Website.Server.Data;
using Zra_Website.Server.Models;

namespace Zra_Website.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly AppDbContext _context;

        public LoginController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] User loginRequest)
        {
            if (loginRequest == null || string.IsNullOrEmpty(loginRequest.Password))
                return BadRequest("Invalid login request.");

            var user = await _context.Users
                .FirstOrDefaultAsync(u => u.UserId == loginRequest.UserId && u.Password == loginRequest.Password);

            if (user == null)
                return Unauthorized("Invalid credentials.");

            // user.Active = "Active";
            // _context.Users.Update(user);
            // await _context.SaveChangesAsync();

            return Ok(new
            {
                Message = "Login successful",
                UserId = user.UserId,
                FullName = $"{user.FName} {user.LName}",
                Status = user.Active
            });
        }
    }
}
