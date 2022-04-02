using System;
using System.Linq;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Xunit;
using Xunit.Abstractions;
using Moq;
using react_asp.Models;
using react_asp.Controllers;
using react_asp.Repository;

namespace react_asp.tests
{
    public class ProductsControllerShould
    {
        private readonly ProductsController _controller;
        private readonly Mock<IRepository> _mock;
        private readonly ITestOutputHelper _output;

        public ProductsControllerShould(ITestOutputHelper output)
        {
            _output = output;

            _output.WriteLine("Creating new ProductController");
            _mock = new Mock<IRepository>();
            _controller = new ProductsController(_mock.Object);
        }

        [Fact]
        public void ReturnsTaskWithActionResultWithListOnGet()
        {
            //Arrange
            List<Product> products = GetTestProducts();
            _mock.Setup(repository => repository.GetList()).Returns(Task.FromResult(products));

            //Act
            var result = _controller.GetProducts();

            //Assert
            var viewResult = Assert.IsType<ActionResult<IEnumerable<Product>>>(result.Result);
            var model = Assert.IsAssignableFrom<IEnumerable<Product>>(viewResult.Value);
            Assert.Equal(products, model);
        }

        private List<Product> GetTestProducts()
        {
            List<Product> products = new List<Product>
            {
                new Product { Id = 1, Name = "Sugar", Price = 1.2, Weight = 0.5, CreateDate = new DateTime(2022, 3, 7) },
                new Product { Id = 2, Name = "Sugar", Price = 1.2, Weight = 0.5, CreateDate = new DateTime(2022, 3, 7) },
                new Product { Id = 3, Name = "Sugar", Price = 1.2, Weight = 0.5, CreateDate = new DateTime(2022, 3, 7) },
                new Product { Id = 4, Name = "Sugar", Price = 1.2, Weight = 0.5, CreateDate = new DateTime(2022, 3, 7) }
            };
            return products;
        }

        [Fact]
        public void ReturnsTaskWithValidationProblemOnPostWithModelError()
        {
            //Arrange
            _controller.ModelState.AddModelError("Name", "Required");
            Product newProduct = new Product();

            //Act
            var result = _controller.PostProduct(newProduct);

            //Assert
            Assert.IsAssignableFrom<ActionResult>(result.Result.Result);
        }

        [Fact]
        public void ReturnsTaskWithCreateActionResultWithProductOnPost()
        {
            //Arrange
            Product newProduct = GetTestProducts().First();

            //Act
            var result = _controller.PostProduct(newProduct);

            //Assert
            var createdAtActionResult = Assert.IsType<CreatedAtActionResult>(result.Result.Result);
            var model = Assert.IsType<Product>(createdAtActionResult.Value);
            Assert.Equal(newProduct, model);
            _mock.Verify(_mock => _mock.Create(newProduct));
            _mock.Verify(_mock => _mock.Save());
        }

        [Fact]
        public void ReturnsTaskWithNotFoundResultOnPostNull()
        {
            //Arrange
            //Act
            var result = _controller.PostProduct(null);

            //Assert
            var model = Assert.IsType<NotFoundResult>(result.Result.Result);
        }

        [Theory]
        [InlineData(-1)]
        [InlineData(0)]
        [InlineData(1)]
        [InlineData(100)]
        public void ReturnsTaskWithNotFoundResultOnGetWithInvalidId(int id)
        {
            //Arrange

            //Act
            var result = _controller.GetProduct(id);

            //Assert
            Assert.IsType<NotFoundResult>(result.Result.Result);
        }
    }
}