require("dotenv").config()
const supabase = require("../supabase/Supabase_Connect")

const createFeed = async (req, res) => {
    try {
      const { Title, Subtitle, Image, Content, date, likes } = req.body;
  
      // Insert the new feed into the "Feeds" table
      const { data: feed, error } = await supabase
        .from('Feeds')
        .insert({ Title, Subtitle, Image, Content, date, likes })
        .single();
  
      if (error) {
        throw new Error(error.message);
      }
  
      res.status(200).json(feed);
      console.log("psted", res)
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  module.exports = createFeed
  
  