using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace react_asp.Migrations
{
	public partial class Second : Migration
	{
		protected override void Up(MigrationBuilder migrationBuilder)
		{
			migrationBuilder.AddColumn<int>(
				name: "Role",
				table: "Customers",
				type: "INTEGER",
				nullable: true);
		}

		protected override void Down(MigrationBuilder migrationBuilder)
		{
			migrationBuilder.DropColumn(
				name: "Role",
				table: "Customers");
		}
	}
}
