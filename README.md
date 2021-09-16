# What The Gif

Handy application to create and post message with inserted GIFs.

**catch it live @ https://what-the-gif.netlify.app/**

### Features
- User can create a post with a message and insert a GIF 
- On first load, user can choose from the trending GIFs or 
- Search for specific GIFs with keywords
- Since, GIPHY has a cap on the API calls, in the current implementation
  - There's a limit of 5 GIFs per API call (trending or keyword search) 
  - Debounce logic to limit the number of API calls on keyword search 
- localStorage for data persistency

### How to implement ?
- Create an account with Giphy
- From the dashboard "Create an app", basically register your application to get your API KEY
- Use fetch or axios to fetch the data and render accordingly
 
The reponse will have three parts
 - **data** => contains the actual array of GIFs, choose from a wide range of image/mp4 formats
 - **pagination** => shows total results available + the number of results fetched
 - **meta** => contains response status info (like, 'OK' 200) 
