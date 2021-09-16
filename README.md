# What The Gif

Handy application to create and post message with inserted GIFs.

**catch it live @ https://what-the-gif.netlify.app/**

### Features
- User can see the trending GIFs and select one from the list or 
- search for specific GIFs
- debounce logic to limit the number of API calls on search
- localStorage for data persistency

### How to implement ?
- Create an account with Giphy
- Create an app, basically register your application with them to get your API KEY
- Use fetch or axios to fetch the data and render accordingly
 
The reponse will have three parts
 - **data** => contains the actual array of GIFs, choose from a wide range of image/mp4 formats
 - **pagination** => shows total results available + the number of results fetched
 - **meta** => contains response status info (like, 'OK' 200) 
