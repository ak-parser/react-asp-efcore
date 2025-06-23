using react_asp.Models;

namespace react_asp.Repository
{
	public interface IRepository
	{
		public Task<List<Product>> GetList();
		public Task<Product?> GetItem(int id);
		public void Create(Product item);
		public void Update(Product item);
		public void Delete(Product product);
		public Task<int> Save();
		public Task<bool> ProductExists(int id);
	}
}