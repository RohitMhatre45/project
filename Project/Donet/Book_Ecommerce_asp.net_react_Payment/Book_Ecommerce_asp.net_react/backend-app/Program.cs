using backend_app.Jwt;
using BusinessLayer.Interface;
using BusinessLayer.Service;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

using RespositoryLayer.ContextDB;
using RespositoryLayer.Interface;
using RespositoryLayer.Service;
using System.Text;
using System.Text.Json;

namespace backend_app
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

          
builder.Services.AddDbContext<BookEcommerceContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("BookEcommerceContext")));

            // Add CORS policy
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowFrontend",
                    builder => builder.WithOrigins("http://localhost:5173") // Replace with your frontend URL
                        .AllowAnyHeader()
                        .AllowAnyMethod()
                        .AllowCredentials());
            });

            builder.Services.AddScoped<ICategoryRL, CategoryRL>();
            builder.Services.AddScoped<ICategoryBL, CategoryBL>();

            builder.Services.AddScoped<IProductRL, ProductRL>();
            builder.Services.AddScoped<IProductBL, ProductBL>();

            builder.Services.AddScoped<IUserRoleRL,UserRoleRL>();
            builder.Services.AddScoped<IUserRoleBL, UserRoleBL>();

            builder.Services.AddScoped<IUserRL, UserRL>();
            builder.Services.AddScoped<IUserBL, UserBL>();

            builder.Services.AddScoped<ICartRL, CartRL>();
            builder.Services.AddScoped<ICartBL, CartBL>();

            builder.Services.AddScoped<IWishlistRL, WishlistRL>();
            builder.Services.AddScoped<IWishListBL, WishListBL>();


            builder.Services.AddScoped<IShippingAddressRL, ShippingAddressRL>();
            builder.Services.AddScoped<IShippingAddressBL, ShippingAddressBL>();


            builder.Services.AddScoped<IOrderRL, OrderRL>();
            builder.Services.AddScoped<IOrderBL, OrderBL>();

            builder.Services.AddScoped<IPaymentRL, PaymentRL>();
            builder.Services.AddScoped<IPaymentBL, PaymentBL>();




            // builder.Services.AddScoped<IRazorpayService, RazorpayService>();



            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();


            builder.Services.AddControllers()
           .AddJsonOptions(options =>
           {
               options.JsonSerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
               options.JsonSerializerOptions.IgnoreNullValues = true;
           });


            builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
             .AddJwtBearer(options =>
             {
                 options.TokenValidationParameters = new TokenValidationParameters
                 {
                     ValidateIssuer = true,
                     ValidateAudience = true,
                     ValidateLifetime = true,
                     ValidateIssuerSigningKey = true,
                     ValidIssuer = builder.Configuration["Jwt:Issuer"],
                     ValidAudience = builder.Configuration["Jwt:Audience"],
                     IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
                 };
             });


            builder.Services.AddAuthorization();

            // Register your services
            builder.Services.AddScoped<TokenService>();

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseStaticFiles();

            // Apply CORS policy
            app.UseCors("AllowFrontend");

            app.UseAuthentication();
            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}
