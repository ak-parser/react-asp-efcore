#nullable disable
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using react_asp;
using react_asp.Models;

namespace react_asp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomersController : ControllerBase
    {
        private readonly AppDBContext _context;

        public CustomersController(AppDBContext context)
        {
            _context = context;
        }

        // GET: api/Customers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Customer>>> GetCustomers()
        {
            return await _context.Customers.ToListAsync();
        }

        // GET: api/Customers/user
        [HttpGet("{username}")]
        public async Task<ActionResult<Customer>> GetCustomer(string username)
        {
            var customer = await _context.Customers.FindAsync(username);

            if (customer == null)
            {
                return NotFound();
            }

            return customer;
        }

        // PUT: api/Customers/user
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{username}")]
        public async Task<IActionResult> PutCustomer(string username, Customer customer)
        {
            if (username != customer.Username)
            {
                return BadRequest();
            }

            /*
            var existingCustomer = _context.Customers
                .Where(elem => elem.Username == customer.Username)
                .Include(elem => elem.Products)
                .SingleOrDefault();

            if (existingCustomer != null)
            {
                // Update parent
                _context.Entry(existingCustomer).CurrentValues.SetValues(customer);

                // Delete children
                foreach (var existingProduct in existingCustomer.Products.ToList())
                {
                    if (!customer.Products.Any(elem => elem.Id == existingProduct.Id))
                        _context.Products.Remove(existingProduct);
                }

                // Update and Insert children
                foreach (var childModel in model.Children)
                {
                    var existingChild = existingParent.Children
                        .Where(c => c.Id == childModel.Id && c.Id != default(int))
                        .SingleOrDefault();

                    if (existingChild != null)
                        // Update child
                        _dbContext.Entry(existingChild).CurrentValues.SetValues(childModel);
                    else
                    {
                        // Insert child
                        var newChild = new Child
                        {
                            Data = childModel.Data,
                            //...
                        };
                        existingParent.Children.Add(newChild);
                    }
                }

                _dbContext.SaveChanges();
            }
            else
                return NotFound();
            */

            _context.Entry(customer).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CustomerExists(username))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Customers
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Customer>> PostCustomer(Customer customer)
        {
            _context.Customers.Add(customer);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (CustomerExists(customer.Username))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetCustomer", new { id = customer.Username }, customer);
        }

        // DELETE: api/Customers/user
        [HttpDelete("{username}")]
        public async Task<IActionResult> DeleteCustomer(string username)
        {
            var customer = await _context.Customers.FindAsync(username);
            if (customer == null)
            {
                return NotFound();
            }

            _context.Customers.Remove(customer);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // GET: api/Customers/exists/user
        [HttpGet("exists/{username}")]
        public async Task<ActionResult<bool>> CheckIfExists(string username)
        {
            bool flag = false;
            if (CustomerExists(username))
                flag = true;

            return flag;
        }

        private bool CustomerExists(string username)
        {
            return _context.Customers.Any(e => e.Username == username);
        }
    }
}
