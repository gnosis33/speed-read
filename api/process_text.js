export default (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // Allow all origins

  if (req.method === 'POST') {
    const { text } = req.body;
    const words = text.split(/\s+/);
    res.status(200).json(words);
  } else {
    res.status(405).json({ message: 'Only POST requests allowed' });
  }
};


  