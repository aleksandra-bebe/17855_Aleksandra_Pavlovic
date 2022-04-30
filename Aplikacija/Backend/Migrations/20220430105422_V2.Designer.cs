﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Projekat.Models;

namespace projekat.Migrations
{
    [DbContext(typeof(ShopContext))]
    [Migration("20220430105422_V2")]
    partial class V2
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .UseIdentityColumns()
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("ProductVersion", "5.0.0");

            modelBuilder.Entity("Projekat.Models.Artikal", b =>
                {
                    b.Property<int>("ArtikalID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("ArtikalID")
                        .UseIdentityColumn();

                    b.Property<double>("Cena")
                        .HasColumnType("float")
                        .HasColumnName("Cena");

                    b.Property<byte[]>("Image")
                        .HasMaxLength(255)
                        .HasColumnType("varbinary(255)")
                        .HasColumnName("Image");

                    b.Property<bool>("NaStanju")
                        .HasColumnType("bit")
                        .HasColumnName("Na stanju");

                    b.Property<string>("Naziv")
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)")
                        .HasColumnName("Naziv");

                    b.Property<string>("Opis")
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("Opis");

                    b.Property<int?>("TipId")
                        .HasColumnType("int");

                    b.HasKey("ArtikalID");

                    b.HasIndex("TipId");

                    b.ToTable("Artikal");
                });

            modelBuilder.Entity("Projekat.Models.Komentar", b =>
                {
                    b.Property<int>("KomentarID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("KomentarID")
                        .UseIdentityColumn();

                    b.Property<int?>("ArtikalID")
                        .HasColumnType("int");

                    b.Property<int?>("KorisnikId")
                        .HasColumnType("int");

                    b.Property<int>("Ocena")
                        .HasColumnType("int")
                        .HasColumnName("Ocena");

                    b.Property<string>("OpisKomentar")
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("OpisKomentar");

                    b.HasKey("KomentarID");

                    b.HasIndex("ArtikalID");

                    b.HasIndex("KorisnikId");

                    b.ToTable("Komentar");
                });

            modelBuilder.Entity("Projekat.Models.Korisnik", b =>
                {
                    b.Property<int>("KorisnikId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("KorisnikID")
                        .UseIdentityColumn();

                    b.Property<bool>("Admin")
                        .HasColumnType("bit");

                    b.Property<string>("Adresa")
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("Adresa");

                    b.Property<int>("Broj")
                        .HasColumnType("int")
                        .HasColumnName("BrojKupljenihProizvoda");

                    b.Property<string>("Email")
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("Email");

                    b.Property<string>("Ime")
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)")
                        .HasColumnName("Ime");

                    b.Property<string>("KorisnickoIme")
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("KorisnickoIme");

                    b.Property<string>("Prezime")
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)")
                        .HasColumnName("Prezime");

                    b.Property<string>("Sifra")
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("Sifra");

                    b.Property<int>("Telefon")
                        .HasColumnType("int")
                        .HasColumnName("Telefon");

                    b.HasKey("KorisnikId");

                    b.ToTable("Korisnik");
                });

            modelBuilder.Entity("Projekat.Models.Tip", b =>
                {
                    b.Property<int>("TipId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("TipId")
                        .UseIdentityColumn();

                    b.Property<string>("Naziv")
                        .HasMaxLength(20)
                        .HasColumnType("nvarchar(20)")
                        .HasColumnName("Naziv");

                    b.HasKey("TipId");

                    b.ToTable("Tip");
                });

            modelBuilder.Entity("Projekat.Models.Artikal", b =>
                {
                    b.HasOne("Projekat.Models.Tip", "Tip")
                        .WithMany()
                        .HasForeignKey("TipId");

                    b.Navigation("Tip");
                });

            modelBuilder.Entity("Projekat.Models.Komentar", b =>
                {
                    b.HasOne("Projekat.Models.Artikal", "Artikal")
                        .WithMany("Komentari")
                        .HasForeignKey("ArtikalID");

                    b.HasOne("Projekat.Models.Korisnik", "Korisnik")
                        .WithMany("Komentari")
                        .HasForeignKey("KorisnikId");

                    b.Navigation("Artikal");

                    b.Navigation("Korisnik");
                });

            modelBuilder.Entity("Projekat.Models.Artikal", b =>
                {
                    b.Navigation("Komentari");
                });

            modelBuilder.Entity("Projekat.Models.Korisnik", b =>
                {
                    b.Navigation("Komentari");
                });
#pragma warning restore 612, 618
        }
    }
}
