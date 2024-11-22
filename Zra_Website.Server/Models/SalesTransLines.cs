using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Zra_Website.Server.Models
{
    public class SalesTransLines
    {
        [Key]
        public string cisInvcNo { get; set; } = string.Empty;
        public string orgInvcNo { get; set; } = string.Empty;
        public string itemCd { get; set; } = string.Empty;
        public string itemClsCd { get; set; } = string.Empty;
        public string itemNm { get; set; } = string.Empty;
        public string pkgUnitCd { get; set; } = string.Empty;
        public string qtyUnitCd { get; set; } = string.Empty;
        public decimal qty { get; set; }
        public decimal prc { get; set; }
        public string vatCatCd { get; set; } = string.Empty;
        public decimal dcRt { get; set; }
        public decimal dcAmt { get; set; }
    }
}
