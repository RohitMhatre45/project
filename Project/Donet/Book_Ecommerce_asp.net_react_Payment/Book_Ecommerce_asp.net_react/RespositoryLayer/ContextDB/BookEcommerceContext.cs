using Microsoft.EntityFrameworkCore;
using RepositoryLayer.Entity;
using RespositoryLayer.Entity;
using RespositoryLayer.Entity.RespositoryLayer.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RespositoryLayer.ContextDB
{
     public class BookEcommerceContext : DbContext
    {
        public BookEcommerceContext(DbContextOptions<BookEcommerceContext> options) : base(options){ }

        public DbSet<Category> categories { get; set; }

        public DbSet<ProductEntity> products { get; set; }

        public DbSet<UserRoleEntity> userRoles { get; set; }

        public DbSet<UserEntity> users { get; set; }

        public DbSet<CartEntity> cart { get; set; }

        public DbSet<WishListEntity> wishlist { get; set; }

        public DbSet<ShippingAddressEntity> shippingAddress { get; set; }

        public DbSet<OrderEntity> order { get; set; }

        public DbSet<PaymentEntity> Payments { get; set; }



        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<WishListEntity>()
                .HasOne(w => w.User)
                .WithMany(u => u.Wishlists)
                .HasForeignKey(w => w.UserId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<WishListEntity>()
                .HasOne(w => w.Product)
                .WithMany(p => p.Wishlists)
                .HasForeignKey(w => w.ProductId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<CartEntity>()
                .HasOne(u => u.User)
                .WithMany(c => c.Carts)
                .HasForeignKey(u => u.UserId)
                .OnDelete(DeleteBehavior.NoAction);  // Restrict delete action to prevent cycles

            modelBuilder.Entity<CartEntity>()
                .HasOne(c => c.Product)
                .WithMany(p => p.Carts)
                .HasForeignKey(c => c.ProductId)
                .OnDelete(DeleteBehavior.NoAction);  // Add this to control the delete behavior

            modelBuilder.Entity<OrderEntity>()
        .HasOne(o => o.Cart)
        .WithMany(c => c.Order)
        .HasForeignKey(o => o.CartId)
        .OnDelete(DeleteBehavior.NoAction);  // Keep cascading delete for this relationship

            modelBuilder.Entity<OrderEntity>()
                .HasOne(o => o.Product)
                .WithMany(p => p.Order)
                .HasForeignKey(o => o.ProductId)
                .OnDelete(DeleteBehavior.NoAction);  // Set to null on delete to avoid cascade conflicts

            modelBuilder.Entity<OrderEntity>()
                .HasOne(o => o.ShippingAddress)
                .WithMany(s => s.Order)
                .HasForeignKey(o => o.ShippingAddressId)
                .OnDelete(DeleteBehavior.NoAction);  // Keep cascading delete for this relationship

            modelBuilder.Entity<OrderEntity>()
                .HasOne(o => o.User)
                .WithMany(u => u.Order)
                .HasForeignKey(o => o.UserId)
                .OnDelete(DeleteBehavior.NoAction);
        }

    }
}
