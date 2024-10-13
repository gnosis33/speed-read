export default (req, res) => {
  if (req.method === 'POST') {
    const { text } = req.body;
    const words = text.split(/\s+/); // Split text into words
    res.status(200).json(words);     // Return the array of words
  } else {
    res.status(405).json({ message: 'Only POST requests allowed' });
  }
};

  