using react_asp;
using react_asp.Models;
using Microsoft.EntityFrameworkCore;

namespace react_asp.Repository
{
    public class ProductRepository : IRepository
    {
        private AppDBContext _dBContext;
        public ProductRepository()
        {
            _dBContext = new AppDBContext();
        }

        public async void Create(Product item)
        {
            await _dBContext.Products.AddAsync(item);
        }

        public void Delete(Product product)
        {
            _dBContext.Remove(product);
        }

        public async Task<Product?> GetItem(int id)
        {
            return await _dBContext.Products.FindAsync(id);
        }

        public async Task<List<Product>> GetList()
        {
            return await _dBContext.Products.ToListAsync();
        }

        public async Task<int> Save()
        {
            return await _dBContext.SaveChangesAsync();
        }

        public void Update(Product item)
        {
            _dBContext.Entry(item).State = EntityState.Modified;
        }

        public async Task<bool> ProductExists(int id)
        {
            return await _dBContext.Products.AnyAsync(elem => elem.Id == id);
        }
    }
}
