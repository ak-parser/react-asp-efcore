#nullable disable
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using react_asp.Models;
using react_asp.Services;
using System.Security.Claims;

namespace react_asp.Controllers
{
	public class AuthStatus
	{
		public bool IsAuth { get; set; }
		public string Username { get; set; }
	}

	[Route("api/[controller]")]
	[ApiController]
	public class AuthController : ControllerBase
	{
		private readonly UserService _userService;

		public AuthController(UserService userService)
		{
			_userService = userService;
		}

		// Get: api/auth
		[HttpGet]
		public ActionResult<AuthStatus> IsAuthenticated()
		{
			if (HttpContext.User != null && HttpContext.User.Identity.IsAuthenticated)
			{
				return new AuthStatus { IsAuth = true, Username = (HttpContext.User.Identity as ClaimsIdentity).Claims.FirstOrDefault().Value };
			}

			return new AuthStatus { IsAuth = false };
		}

		// Post: api/auth/signin
		[HttpPost("signin")]
		public async Task<ActionResult> SignInAsync(Customer customer)
		{
			List<Claim> claims = new();
			if (await _userService.ValidateUser(customer.Username, customer.Password, claims))
			{
				ClaimsIdentity claimsIdentity = new(claims, CookieAuthenticationDefaults.AuthenticationScheme);
				ClaimsPrincipal claimsPrincipal = new(claimsIdentity);
				await HttpContext.SignInAsync(claimsPrincipal);
				return Ok(new { username = customer.Username });
			}

			return Unauthorized(new { errorMessage = "Incorrect username or password" });
		}

		// Post: api/auth/signup
		[HttpPost("signup")]
		public async Task<ActionResult> SignUpAsync(Customer customer)
		{
			if (await _userService.AddUser(customer))
			{
				return await SignInAsync(customer);
			}

			return Conflict(new { errorMessage = "Username already exists" });
		}

		// Post: api/auth/signout
		[Authorize]
		[HttpPost("signout")]
		public async Task<ActionResult> SignOutAsync()
		{
			await HttpContext.SignOutAsync();
			return Ok();
		}
	}
}
