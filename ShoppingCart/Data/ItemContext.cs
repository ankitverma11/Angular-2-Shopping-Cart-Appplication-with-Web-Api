using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ShoppingCart.Data
{
    //DBContext is Entity Framework Class for establishing connection to database.
    //We can create a DBContext class by adding a new class file in our Data folder.
    public class ItemContext  : DbContext
    {
        public ItemContext(DbContextOptions<ItemContext> options) : base(options)
        {

        }

       public DbSet<ItemDetails> ItemDetails { get; set; }
    }
}
