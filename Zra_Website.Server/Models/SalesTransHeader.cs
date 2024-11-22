using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Zra_Website.Server.Models
{
    public class SalesTransHeader
    {
        [Key]
        public string cisInvcNo { get; set; } = string.Empty;
        public string orgInvcNo { get; set; } = string.Empty; 
        public string rfdRsnCd { get; set; } = string.Empty;  
        public string custTpIn { get; set; } = string.Empty; 
        public string custNm { get; set; } = string.Empty;    
        public string pmtTyCd { get; set; } = string.Empty;  
        public string cfmDt { get; set; } = string.Empty;     
        public string salesDt { get; set; } = string.Empty;  
        public decimal cashDcRt { get; set; }                
        public decimal cashDcAmt { get; set; }              
        public string regId { get; set; } = string.Empty;     
        public string regrNm { get; set; } = string.Empty;    
        public string modrId { get; set; } = string.Empty;    
        public string modrNm { get; set; } = string.Empty;    
        public string currencyTyCd { get; set; } = string.Empty;
        public decimal exchangeRt { get; set; }              
        public string status { get; set; } = string.Empty;    
        public string syncStatus { get; set; } = string.Empty; 
        public string resultCd { get; set; } = string.Empty;  
        public string resultMsg { get; set; } = string.Empty; 
        public string rcptNo { get; set; } = string.Empty;    
        public string intrnlData { get; set; } = string.Empty;
        public string rcptSign { get; set; } = string.Empty;  
        public string vsdcRcptPbctDate { get; set; } = string.Empty; 
        public string sdcld { get; set; } = string.Empty;    
        public string mrcNo { get; set; } = string.Empty;    
        public string qrCodeUrl { get; set; } = string.Empty; 
    }
}
