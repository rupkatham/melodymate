// server.js
const express = require('express');
const { createClient } = require('@supabase/supabase-js');

const app = express();
app.use(express.json());

// Initialize Supabase client
const supabaseUrl = 'https://tcmnvlalvyjelwsbggvw.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRjbW52bGFsdnlqZWx3c2JnZ3Z3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjI4NTExNjEsImV4cCI6MjAzODQyNzE2MX0.i-8XGOEzRCR2p2HMLdL7Nb7ILHIh--Yj6w7ThxL8tjk';
const supabase = createClient(supabaseUrl, supabaseKey);

// Define a route
app.get('/api/data', async (req, res) => {
  const { data, error } = await supabase
    .from('songs')
    .select('*');

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
