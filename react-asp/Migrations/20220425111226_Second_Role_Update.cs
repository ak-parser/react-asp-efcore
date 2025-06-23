using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace react_asp.Migrations
{
	public partial class Second_Role_Update : Migration
	{
		protected override void Up(MigrationBuilder migrationBuilder)
		{
			migrationBuilder.AlterColumn<long>(
				name: "Role",
				table: "Customers",
				type: "INTEGER",
				nullable: false,
				defaultValue: 0L,
				oldClrType: typeof(int),
				oldType: "INTEGER",
				oldNullable: true);
		}

		protected override void Down(MigrationBuilder migrationBuilder)
		{
			migrationBuilder.AlterColumn<int>(
				name: "Role",
				table: "Customers",
				type: "INTEGER",
				nullable: true,
				oldClrType: typeof(long),
				oldType: "INTEGER");
		}
	}
}
