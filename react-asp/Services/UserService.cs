using Microsoft.EntityFrameworkCore;
using react_asp.Models;
using System.Security.Claims;

namespace react_asp.Services
{
	public class UserService
	{
		private readonly AppDBContext _context;

		public UserService(AppDBContext context)
		{
			_context = context;
		}

		public async Task<bool> ValidateUser(string username, string password, List<Claim> claims)
		{
			Customer? findCustomer = await _context.Customers.FindAsync(username);
			if (findCustomer != null && findCustomer.Password == password)
			{
				claims.Add(new Claim(ClaimTypes.NameIdentifier, username));
				if (findCustomer.Role == Roles.User)
				{
					claims.Add(new Claim(ClaimTypes.Role, Roles.User.ToString()));
				}
				else if (findCustomer.Role == Roles.Admin)
				{
					claims.Add(new Claim(ClaimTypes.Role, Roles.Admin.ToString()));
				}
				else if (findCustomer.Role == Roles.Manager)
				{
					claims.Add(new Claim(ClaimTypes.Role, Roles.Manager.ToString()));
				}

				return true;
			}

			return false;
		}

		public async Task<bool> AddUser(Customer customer)
		{
			if (_context.Customers.Any(e => e.Username == customer.Username))
			{
				return false;
			}

			customer.Role = Roles.User;

			_context.Customers.Add(customer);
			try
			{
				await _context.SaveChangesAsync();
			}
			catch (DbUpdateException)
			{
				throw;
			}

			return true;
		}
	}
}
