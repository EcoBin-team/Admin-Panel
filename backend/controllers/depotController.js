require("dotenv").config()
const supabase = require("../supabase/Supabase_Connect")


const depotController = {

  getAllDepots: async (req ,res) => {
    try { const { data: depots, error } = await supabase.from('depot').select('*');
    if (error) {throw new Error(error.message);}
    res.status(200).json(depots || [])} catch (error) {
   res.status(500).json({ error: error.message });}} ,

/////
  getDepotById: async (req,res) => {const { id } = req.params;
 try { const feed = await supabase.from('depot').select('*').eq('id', id).single();
  if (feed.error) {throw new Error(feed.error.message);}
  res.status(200).json([feed])} catch (error) {
  res.status(500).json({ error: error.message });}},

/////
  searchDepot: async (req, res)=> {
    const { query } = req.query;
    try { const depotsByName = await supabase.from('depot').select('*').ilike('name', `%${query}%`);
      // Search by state name
    const depotsByState = await supabase.from('depot').select('*').ilike('state', `%${query}%`);
    const depots = [...(depotsByName.data || []),...(depotsByState.data || []), ];
    res.status(200).json(depots);} catch (error) {
    console.error('Error retrieving depots:', error.message);
    res.status(500).json({ error: 'Failed to retrieve depots' });}},
    addDepot: async (req, res) => {
        const { id, name, picture, longitude, latitude, capacity, logo, worktime, certificate } = req.body;
        try {
          const { data, error } = await supabase.from('depot').insert([
            {
              id,
              name,
              picture,
              longitude,
              latitude,
              capacity,
              logo,
              worktime,
              certificate
            }
          ]);
    
          if (error) {
            throw new Error(error.message);
          }
    
          res.status(200).json({ message: 'Depot added successfully', data });
        } catch (error) {
          console.error('Error adding depot:', error.message);
          res.status(500).json({ error: 'Failed to add depot' });
        }
      }
    };
////
    
     

module.exports = depotController
