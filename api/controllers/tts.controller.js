import gTTS from 'gtts';
import stream from 'stream';

 export const tts = async (req, res) => {
  try {
    // Coerce to a real string
    const raw = req.body.text;
    const text = typeof raw === 'string' ? raw : JSON.stringify(raw);

    // Now this will always be a string
    const tts = new gTTS(text, 'en');
    const passthrough = new stream.PassThrough();
    res.set({ 'Content-Type': 'audio/mpeg' });

    tts.stream().pipe(passthrough);
    passthrough.pipe(res);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'TTS failed' });
  }
};


