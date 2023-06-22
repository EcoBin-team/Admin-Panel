const supabase = require("../supabase/Supabase_Connect")



module.exports = {
  
  
    // method to retrieve all users in the database
    getAll: async (req,res) => {
      const { data, error } = await supabase
      .from("users")
      .select("*")
      
      res.send(data)
    },
    updateUserById: async (req, res) => {
        const { id } = req.params;
      
        const { data: existingUser, error: fetchError } = await supabase
          .from("users")
          .select("*")
          .eq("id", id);
      
        if (fetchError) {
          res.status(500).send(fetchError);
        } else {
          if (existingUser.length === 1) {
            const updatedUser = { ...existingUser[0], ...req.body }; // Update the user object with the new data from req.body
      
            const updatedFields = {
              name: updatedUser.name,
              address: updatedUser.address,
              email: updatedUser.email,
              phone: updatedUser.phone
            };
      
            const { data: updatedData, error: updateError } = await supabase
              .from("users")
              .update(updatedFields)
              .eq("id", id);
      
            if (updateError) {
              res.status(500).send(updateError);
            } else {
              if (updatedData && updatedData.length > 0) {
                res.send(updatedData[0]); // Return the updated user object
              } else {
                res.status(500).send("Failed to update user"); // Handle the case where the update operation did not return any data
              }
            }
          } else if (existingUser.length === 0) {
            res.status(404).send("User not found");
          } else {
            res.status(500).send("Multiple users found"); // Handle the case of multiple users with the same ID
          }
        }
      }
      
    
}