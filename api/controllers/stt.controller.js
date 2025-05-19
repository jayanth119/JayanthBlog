import { createClient } from '@deepgram/sdk';
import fs from 'fs';
import path from 'path';

const deepgram = createClient("4fb9b931fea782ea3b8ea9c88c5888420c4826e3");

export const stt = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No audio file uploaded.' });
    }

    const filePath = path.resolve(req.file.path);
    const audioBuffer = fs.readFileSync(filePath);

    const { result } = await deepgram.listen.prerecorded.transcribeFile(
      audioBuffer,
      {
        model: 'nova',
        smart_format: true,
        language: 'en',
        punctuate: true,
      }
    );

    fs.unlinkSync(filePath); 

    const transcript = result.results.channels[0].alternatives[0].transcript;
    return res.json({ transcript });

  } catch (error) {
    console.error('Deepgram Error:', error);
    return res.status(500).json({ error: 'Speech-to-text failed.' });
  }
};
