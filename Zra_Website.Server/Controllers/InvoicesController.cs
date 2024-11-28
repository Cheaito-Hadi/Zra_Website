using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Zra_Website.Server.Data;
using Zra_Website.Server.Models;

[Route("api/[controller]")]
[ApiController]
public class InvoicesController : ControllerBase
{
    private readonly AppDbContext _context;

    public InvoicesController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet("AllInvoices")]
    public async Task<IActionResult> GetAllInvoices()
    {
        var allInvoices = await _context.SalesTransHeader
            .ToListAsync();

        return Ok(allInvoices);
    }

    [HttpGet("ProcessedInvoices")]
    public async Task<IActionResult> GetProcessedInvoices()
    {
        var processedInvoices = await (from header in _context.SalesTransHeader
                                       join lines in _context.SalesTransLines
                                       on header.cisInvcNo equals lines.cisInvcNo
                                       where header.ResultMsg == "It is succeeded" || header.ResultMsg == null
                                       select new
                                       {
                                           ID = lines.cisInvcNo,
                                           Amount = lines.prc,
                                           Type = lines.orgInvcNo,
                                           DateForHeader = header.salesDt,
                                           DateForInvDetails = header.vsdcRcptPbctDate,
                                           ResultMessage = header.ResultMsg,
                                           Signature = header.rcptSign,
                                           InternalData = header.intrlData,
                                           InvoiceSequence = header.rcptNo,
                                           Url = header.qrCodeUrl
                                       })
                                        .ToListAsync();

        return Ok(processedInvoices);
    }

    [HttpGet("FailedInvoices")]
    public async Task<IActionResult> GetFailedInvoices()
    {
        var failedInvoices = await (from header in _context.SalesTransHeader
                                    join lines in _context.SalesTransLines
                                    on header.cisInvcNo equals lines.cisInvcNo
                                    where header.ResultMsg != "It is succeeded" && header.ResultMsg != null
                                    select new
                                    {
                                        InvoiceNumber = lines.cisInvcNo,
                                        ErrorMessage = header.ResultMsg,
                                        Date = header.vsdcRcptPbctDate,
                                        SdcId = header.sdcId,
                                    })
                              .ToListAsync();

        return Ok(failedInvoices);    
    }
}
