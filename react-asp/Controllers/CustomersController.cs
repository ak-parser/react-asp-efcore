#nullable disable
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using react_asp.Models;
using System.Security.Claims;

namespace react_asp.Controllers
{
	[Authorize]
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
		[Authorize(Roles = "Admin")]
		[HttpGet]
		public async Task<ActionResult<IEnumerable<Customer>>> GetCustomers()
		{
			return await _context.Customers.ToListAsync();
		}

		// GET: api/Customers/user
		[Authorize(Roles = "Admin")]
		[HttpGet("{username}")]
		public async Task<ActionResult<Customer>> GetCustomer(string username)
		{
			Customer customer = await _context.Customers.FindAsync(username);

			if (customer == null)
			{
				return NotFound();
			}

			return customer;
		}

		// Patch: api/Customers/user
		[HttpPatch("{username}")]
		public async Task<IActionResult> PatchCustomer(string username, [FromBody] JsonPatchDocument<Customer> patchCustomer)
		{
			Microsoft.AspNetCore.JsonPatch.Operations.Operation<Customer> roleOperation = patchCustomer.Operations.Find(patch => patch.path == "/role");

			if ((roleOperation != null &&
				(HttpContext.User.Identity as ClaimsIdentity).Claims.Any(claim => claim.Type == ClaimTypes.Role && claim.Value == Roles.Admin.ToString()))
				||
				(roleOperation == null &&
				username == (HttpContext.User.Identity as ClaimsIdentity).Claims.FirstOrDefault().Value))
			{
				if (roleOperation != null && !Enum.IsDefined(typeof(Roles), roleOperation.value))
				{
					return BadRequest(new { error = "Role is invalid" });
				}

				Customer customer = await _context.Customers.FindAsync(username);
				if (customer == null)
				{
					return NotFound();
				}

				patchCustomer.ApplyTo(customer);

				await _context.SaveChangesAsync();

				return NoContent();
			}

			return Forbid();
		}

		// DELETE: api/Customers/user
		[Authorize(Roles = "Admin")]
		[HttpDelete("{username}")]
		public async Task<IActionResult> DeleteCustomer(string username)
		{
			Customer customer = await _context.Customers.FindAsync(username);
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
			if (CustomerExists(username))
			{
				return true;
			}

			return false;
		}

		private bool CustomerExists(string username)
		{
			return _context.Customers.Any(e => e.Username == username);
		}
	}
}
