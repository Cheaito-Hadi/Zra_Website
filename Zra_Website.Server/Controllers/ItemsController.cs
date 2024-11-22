using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Zra_Website.Server.Data;
using Zra_Website.Server.Models;

namespace Zra_Website.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ItemsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ItemsController(AppDbContext context)
        {
            _context = context;
        }
        [HttpGet("AllItems")]
        public async Task<IActionResult> GetAllItems()
        {
            var items = await _context.ItemMaster
                .ToListAsync();
            return Ok(items);
        }
    }
}
