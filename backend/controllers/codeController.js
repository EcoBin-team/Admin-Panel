const supabase = require("../supabase/Supabase_Connect");

const getAll = async (req, res) => {
  try {
    const { data: codes, error } = await supabase.from('codes').select('*');
  
    if (error) {
      throw new Error(error.message);
    }
  
    res.status(200).json(codes || []); // Return an empty array if codes is null
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getOneCode = async (req, res) => {
  try {
    const { code } = req.params; // Assuming the code value is provided as a route parameter
  
    const { data: codes, error } = await supabase
      .from('codes')
      .select('*')
      .eq('code', code)
      .limit(1);
  
    if (error) {
      throw new Error(error.message);
    }
  
    res.status(200).json(codes && codes.length > 0 ? codes[0] : null); // Return the first code object if found, otherwise null
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteCode = async (req, res) => {
  try {
    const { code } = req.params; // Assuming the code value is provided as a route parameter

    const { data, error } = await supabase
      .from('codes')
      .delete()
      .eq('code', code);

    if (error) {
      throw new Error(error.message);
    }

    if (data && data.length > 0) {
      res.status(200).json({ message: 'Code deleted successfully' });
    } else {
      res.status(404).json({ message: 'Code not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addCode = async (req, res) => {
    try {
      const { code, points } = req.body; // Assuming the code and points values are provided in the request body
  
      const { data, error } = await supabase
        .from('codes')
        .insert([{ code, points }]);
  
      if (error) {
        throw new Error(error.message);
      }
  
      if (data && data.length > 0) {
        res.status(201).json({ message: 'Code added successfully', code: data[0] });
      } else {
        res.status(500).json({ message: 'Failed to add code' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  module.exports = { getAll, getOneCode, deleteCode, addCode };

