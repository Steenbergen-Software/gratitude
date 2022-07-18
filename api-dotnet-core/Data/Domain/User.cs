using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Data.Domain
{
    public class User
    {
        public User(string Email) {
            this.Email = Email;
            this.Enabled = false;
            this.Created = DateTime.Now;
            this.Updated = DateTime.Now;
        }

        public Guid Id { get; set; }
        public string Email { get; set; }
        public bool Enabled { get; set; }
        public DateTime Created { get; set; }
        public DateTime Updated { get; set; }

    }
}