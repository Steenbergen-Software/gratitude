using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Data.Domain
{
    public class Entry
    {
        public Entry()
        {
            this.Created = DateTime.Now;
            this.Updated = DateTime.Now;
            this.MediaType = MediaType.None;
        }

        public Guid Id { get; set; }
        public string? Title { get; set; }
        public string? Content { get; set; }
        public DateTime Created { get; set; }
        public DateTime? Updated { get; set; }
        public string? Location { get; set; }
        public string? MediaUrl { get; set; }
        public MediaType MediaType { get; set; }

    }
}