using Microsoft.EntityFrameworkCore.Migrations;

namespace projekat.Migrations
{
    public partial class V3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Komentar_Artikal_ArtikalID",
                table: "Komentar");

            migrationBuilder.RenameColumn(
                name: "KorisnikID",
                table: "Korisnik",
                newName: "KorisnikId");

            migrationBuilder.RenameColumn(
                name: "ArtikalID",
                table: "Komentar",
                newName: "ArtikalId");

            migrationBuilder.RenameColumn(
                name: "KomentarID",
                table: "Komentar",
                newName: "KomentarId");

            migrationBuilder.RenameIndex(
                name: "IX_Komentar_ArtikalID",
                table: "Komentar",
                newName: "IX_Komentar_ArtikalId");

            migrationBuilder.AddColumn<int>(
                name: "BrojProdaja",
                table: "Artikal",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddForeignKey(
                name: "FK_Komentar_Artikal_ArtikalId",
                table: "Komentar",
                column: "ArtikalId",
                principalTable: "Artikal",
                principalColumn: "ArtikalID",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Komentar_Artikal_ArtikalId",
                table: "Komentar");

            migrationBuilder.DropColumn(
                name: "BrojProdaja",
                table: "Artikal");

            migrationBuilder.RenameColumn(
                name: "KorisnikId",
                table: "Korisnik",
                newName: "KorisnikID");

            migrationBuilder.RenameColumn(
                name: "ArtikalId",
                table: "Komentar",
                newName: "ArtikalID");

            migrationBuilder.RenameColumn(
                name: "KomentarId",
                table: "Komentar",
                newName: "KomentarID");

            migrationBuilder.RenameIndex(
                name: "IX_Komentar_ArtikalId",
                table: "Komentar",
                newName: "IX_Komentar_ArtikalID");

            migrationBuilder.AddForeignKey(
                name: "FK_Komentar_Artikal_ArtikalID",
                table: "Komentar",
                column: "ArtikalID",
                principalTable: "Artikal",
                principalColumn: "ArtikalID",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
