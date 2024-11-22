using Microsoft.EntityFrameworkCore;
using Zra_Website.Server.Models;
namespace Zra_Website.Server.Data;


public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<User> Users { get; set; }
    public DbSet<SalesTransHeader> SalesTransHeader { get; set; }
}
