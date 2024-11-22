using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Zra_Website.Server.Models
{
    public class ItemMaster
    {
        [Key]
        public string itemCd { get; set; } = string.Empty;
        public decimal rsdQty { get; set; }
        public string itemClsCd { get; set; } = string.Empty;
        public string itemNm { get; set; } = string.Empty;
        public string SyncStatus { get; set; } = string.Empty;

    }
}
