using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Zra_Website.Server.Data;
using Zra_Website.Server.Models;

[Route("api/[controller]")]
[ApiController]
public class DashboardController : ControllerBase
{
    private readonly AppDbContext _context;

    public DashboardController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet("ProcessedInvoices")]
    public async Task<IActionResult> GetProcessedInvoices()
    {
        var processedInvoices = await _context.SalesTransHeader
            .Where(invoice => invoice.resultMsg == "It is succeeded")
            .Select(invoice => new
            {
                InvoiceId = invoice.orgInvcNo,
                CustomerName = invoice.custNm,
                Amount = invoice.cashDcAmt,
                TransactionDate = invoice.salesDt
            })
            .ToListAsync();

        return Ok(processedInvoices);
    }

    [HttpGet("FailedInvoices")]
    public async Task<IActionResult> GetFailedInvoices()
    {
        var failedInvoices = await _context.SalesTransHeader
            .Where(invoice => invoice.resultMsg != "It is succeeded" || invoice.resultMsg !=null)
            .Select(invoice => new
            {
                InvoiceId = invoice.orgInvcNo,
                CustomerName = invoice.custNm,
                Amount = invoice.cashDcAmt,
                TransactionDate = invoice.salesDt
            })
            .ToListAsync();

        return Ok(failedInvoices);
    }

    [HttpGet("pendingInvoices")]
    public async Task<IActionResult> GetPendingInvoices()
    {
        var pendingInvoices = await _context.SalesTransHeader
            .Where(invoice => invoice.resultMsg == null)
            .Select(invoice => new
            {
                CustomerName = invoice.custNm,
                Amount = invoice.cashDcAmt,
                TransactionDate = invoice.salesDt
            })
            .ToListAsync();

        return Ok(pendingInvoices);
    }
}
