/*
You DONT have to import the Movie with your username.
Because it's a default export we can nickname it whatever we want.
So import Movie from "./models"; will work!
You can do Movie.find() or whatever you need like normal!
*/
import Movie from "./models/Movie";

// Add your magic here!

export const home = async(req,res)=> {
  const movies = await Movie.find({}).sort({createdAt:"desc"});
  return res.render("home", {pageTitle: "Home", movies });
};

export const see = async(req,res)=>{
  const {id} = req.params;
  const movie = await Movie.findById(id);
  if(!movie){
    return res.render("404", {pageTitle: "Movie not found."})
  }
  return res.render("see", {pageTitle: movie.title, movie});
};

export const getUpload = (req,res)=> {
  return res.render("upload", {pageTitle: "Upload Video"})
};

export const postUpload = async(req,res) => {
  const{title, summary,year,rating,genre} = req.body;
  try{
    await Movie.create({
      title,
      summary,
      year,
      rating,
      genre
    });
    return res.redirect("/");
  } catch (error) {
    return res.status(400).render("upload",{
      pageTitle: "Upload Movie",
      errorMessage: error._message,
    });
  }
};



export const getEdit = async (req,res)=>{
  const {id} = req.params;
  const movie = await Movie.findById(id);
  if(!movie){
    return res.render("404", {pageTitle:"Movie not found."})
  }
  return res.render("edit", {pageTitle: `Edit: ${movie.title}`, movie});
}

export const postEdit = async (req,res)=>{
  const {id} = req.params;
  const{title, summary,year,rating,genre} = req.body;
  const movie = await Movie.findById(id);
  if(!movie){
    return res.render("404", {pageTitle:"Movie not found."})
  }
  await Movie.findByIdAndUpdate(id, {
    title,
    summary,
    year,
    rating,
    genre
  });
  return res.redirect(`/movies/${id}`);
};

export const deleteMovie = async (req,res) => {
  const {id} = req.params;
  await Movie.findByIdAndDelete(id);
  return res.redirect("/");
}


export const search = async (req,res) =>{
  const {keyword} = req.query;
  let movies = [];
  if(keyword){
    movies = await Movie.find({
      title:{
        $regex: new RegExp(`${keyword}`, "i"),
      },
    });
  }
  return res.render("search", {pageTitle:"Search", movies})
};