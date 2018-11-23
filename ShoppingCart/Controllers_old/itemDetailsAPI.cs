using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ShoppingCart.Data;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ShoppingCart.Controllers
{
    [Produces("application/json")]
    [Route("api/itemDetailsAPI")]
    public class itemDetailsAPI : Controller
    {
        private readonly ItemContext _context;
        /// <summary>
        /// Depandency injection by Constructor
        /// </summary>
        /// <param name="context"></param>
        public itemDetailsAPI(ItemContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Route("Details")]
        public IEnumerable<ItemDetails> GetItemDetails()
        {
            return _context.ItemDetails;
        }

        // GET api/<controller>/5
        [HttpGet]
        [Route("Details/{ItemName}")]
        public IEnumerable<ItemDetails> GetItemDetails(string ItemName)
        {
            return _context.ItemDetails.Where(i => i.Item_Name.Contains(ItemName)).ToList();
        }

        // POST api/<controller>
        [HttpPost]
        public void Post([FromBody]string value)
        {
        }

        // PUT api/<controller>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/<controller>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
