using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Zra_Website.Server.Models
{
    public class SalesTransHeader
    {
        [Key]
        public string cisInvcNo { get; set; } = string.Empty;
        public string? orgInvcNo { get; set; } = null; 
        //public string? rfdRsnCd { get; set; } = null;  
        //public string? custTpin { get; set; } = null; 
        //public string? custNm { get; set; } = null;    
        //public string? pmtTyCd { get; set; } = null;  
        //public string? cfmDt { get; set; } = null;     
        public string? salesDt { get; set; } = null;  
        //public decimal? cashDcRt { get; set; }                
        //public decimal? cashDcAmt { get; set; }              
        //public string? regrId { get; set; } = null;     
        //public string? regrNm { get; set; } = null;    
        //public string? modrId { get; set; } = null;    
        //public string? modrNm { get; set; } = null;    
        //public string? currencyTyCd { get; set; } = null;
        //public decimal? exchangeRt { get; set; }
        //public string? Status { get; set; } = null;    
        //public string? SyncStatus { get; set; } =null; 
        //public string? ResultCd { get; set; } = null;  
        public string? ResultMsg { get; set; } = null;
        public string? rcptNo { get; set; } = null;
        public string? intrlData { get; set; } = null;
        public string? rcptSign { get; set; } = null;
        public string? vsdcRcptPbctDate { get; set; } = null;
        public string? sdcId { get; set; } = null;
        //public string? mrcNo { get; set; } = null;    
        public string? qrCodeUrl { get; set; } = null;
    }
}
