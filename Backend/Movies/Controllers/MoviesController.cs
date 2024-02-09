using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Movies.ApplicationDbContext;
using Movies.Models;
using System.Data.Entity;
using Microsoft.EntityFrameworkCore;
using System.Linq;
namespace Movies.Controllers
{
    [Route("api/Movies")]
    [ApiController]
    public class MoviesController : ControllerBase
    {
        private readonly MovieDbContext _context;
        public MoviesController(MovieDbContext context)
        {
            _context = context;
        }
        [HttpGet]
        public async Task<IActionResult> getMovies()
        {
            var movie = _context.createmovies.ToList();
            return Ok(movie);
        }
        [HttpPost]
        public async Task<IActionResult> createMovie([FromBody] CreateMovie movie)
        {
            if (string.IsNullOrEmpty(movie.Title))
            {
                return BadRequest("Title cannot be null or empty.");
            }
            _context.createmovies.Add(movie);
            await _context.SaveChangesAsync();
            return Ok();
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> deleteMovie(int id)
        {
            var movie = await _context.createmovies.FindAsync(id);
            if (movie == null)
            {
                return NotFound();
            }

            _context.createmovies.Remove(movie);
            await _context.SaveChangesAsync();

            return NoContent();
        }
        [HttpPut]
        public async Task  <IActionResult>updateMovie([FromBody]CreateMovie movie)
        {
            //if (id == null) return NotFound();
            var movies = _context.createmovies.Find(movie.Id);
            movies.Title = movie.Title;
            movies.Rating = movie.Rating;
            movies.Actor = movie.Actor;
            _context.createmovies.Update(movies);
            _context.SaveChanges();
            return Ok(movies);
        }

        [HttpGet("searchByMovie")]
        public async Task<ActionResult<List<CreateMovie>>> SearchMovies(string name)
        {
                var movies =  _context.createmovies
                    .Where(m => m.Title==name)
                    .ToList();

                return Ok(movies);
        }

        [HttpGet("searchByActor")]
        public async Task<ActionResult<List<CreateMovie>>> SearchActor(string name)
        {
                var movies = _context.createmovies
                    .Where(m => m.Actor == name)
                    .ToList();
                return Ok(movies);
        }
    }
}
     
