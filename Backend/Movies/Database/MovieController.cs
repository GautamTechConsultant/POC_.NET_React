//using Microsoft.AspNetCore.Mvc;
//using Microsoft.EntityFrameworkCore;
//using Movies.ApplicationDbContext;
//using Movies;
//using Movies.Models;

//namespace Movies.Controllers
//{
//    [Route("api/Movie")]
//    [ApiController]
//    public class MovieController : ControllerBase
//    {
//        private readonly MovieDbContext _context;

//        public MovieController(MovieDbContext context)
//        {
//            _context = context;
//        }
//        [HttpGet]
//        public async Task<ActionResult<IEnumerable<MovieActorDTO>>> GetMovies()
//        {
//            var movieActorData = await _context.Movies
//        .Include(m => m.Actor)
//        .Select(x => new MovieActorDTO
//        {
//            MovieId = x.Id,
//            Title = x.Title,
//            ActorId = x.ActorId,
//            ActorName = x.Actor.Name,
//            ActorAge = x.Actor.Age,
//            MovieRating = x.MovieRating,
//            Actors = new List<Actor>
//            {
//                new Actor
//                {
//                    Id = x.Actor.Id,
//                    Name = x.Actor.Name,
//                    Age = x.Actor.Age,
//                    Movies = x.Actor.Movies.Select(m => new Movie
//                    {
//                        Id = m.Id,
//                        Title = m.Title,
//                        ActorId = m.ActorId,
//                        MovieRating = m.MovieRating
//                    }).ToList()
//                }
//            }


//        })
//        .ToListAsync();

//            return Ok(movieActorData);

//        }

//        [HttpGet("{id}")]
//        public async Task<ActionResult<MovieActorDTO>> GetMovie(int id)
//        {
//            var movie = await _context.Movies
//                .Include(m => m.Actor)
//                .Where(m => m.Id == id)
//                .Select(x => new MovieActorDTO
//                {
//                    MovieId = x.Id,
//                    Title = x.Title,
//                    ActorId = x.ActorId,
//                    ActorName = x.Actor.Name,
//                    ActorAge = x.Actor.Age
//                })
//                .FirstOrDefaultAsync();

//            if (movie == null)
//            {
//                return NotFound();
//            }

//            return Ok(movie);
//        }


//        [HttpPost]
//        public async Task<ActionResult<Movie>> PostMovie([FromBody] Movie movie)
//        {
//            if (string.IsNullOrEmpty(movie.Title))
//            {
//                return BadRequest("Title cannot be null or empty.");
//            }

//            _context.Movies.Add(movie);
//            await _context.SaveChangesAsync();
//            return Ok();
//            //return CreatedAtAction(nameof(GetMovie), new { id = movie.Id }, movie);
//        }


//        [HttpDelete("{id}")]
//        public async Task<IActionResult> DeleteMovie(int id)
//        {
//            var movie = await _context.Movies.FindAsync(id);
//            if (movie == null)
//            {
//                return NotFound();
//            }

//            _context.Movies.Remove(movie);
//            await _context.SaveChangesAsync();

//            return NoContent();
//        }

//        [HttpGet("search")]
//        public async Task<ActionResult<IEnumerable<Movie>>> SearchMovies(string name)
//        {
//            var movies = await _context.Movies
//                .Where(m => m.Title.Contains(name))
//                .ToListAsync();
//            var movie = await _context.Movies
//       .Include(m => m.Actor)
//       .Select(x => new MovieActorDTO
//       {
//           MovieId = x.Id,
//           Title = x.Title,
//           ActorId = x.ActorId,
//           ActorName = x.Actor.Name,
//           ActorAge = x.Actor.Age
//       })
//       .ToListAsync();
//            return Ok(movies);
//        }

//        [HttpGet("actors")]
//        public async Task<ActionResult<IEnumerable<Actor>>> GetActors(string movieName)
//        {
//            try
//            {
//                var actors = await _context.Actors
//                    .Include(a => a.Movies)
//                    .Where(a => a.Movies.Any(m => m.Title.Contains(movieName)))
//                    .ToListAsync();

//                return Ok(actors);
//            }
//            catch (Exception ex)
//            {
//                // Log the exception
//                Console.Error.WriteLine($"Error: {ex.Message}");
//                return StatusCode(500, "Internal Server Error");
//            }
//        }



//    }
//}
