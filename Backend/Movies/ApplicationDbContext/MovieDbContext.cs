using Microsoft.EntityFrameworkCore;
using Movies;
using Movies.Models;

namespace Movies.ApplicationDbContext
{
    public class MovieDbContext : DbContext
    {
        public MovieDbContext(DbContextOptions<MovieDbContext> options)
            : base(options)
        {
        }
        public DbSet<CreateMovie> createmovies { get; set; }        //Table Iniatialized
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
       //     modelBuilder.Entity<Movie>()
       //.HasOne(m => m.Actor)
       //.WithMany(a => a.Movies)
       //.HasForeignKey(m => m.ActorId)
       //.OnDelete(DeleteBehavior.Cascade); 


       //     base.OnModelCreating(modelBuilder);
        }

    }
}

