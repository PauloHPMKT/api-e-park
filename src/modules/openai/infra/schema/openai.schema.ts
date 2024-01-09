import mongoose from 'mongoose';

export const OpenaiSchema = new mongoose.Schema({
  message: {
    role: { type: String },
    content: { type: String },
  },
  success: { type: Boolean },
  result: {
    message: {
      role: { type: String },
      content: { type: String },
    },
  },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

// {
//   "success": true,
//   "result": {
//     "index": 0,
//     "message": {
//       "role": "assistant",
//       "content": "Wizard é uma palavra em inglês que pode ser traduzida como \"mago\" em português. Um mago é uma pessoa que pratica magia, geralmente com poderes sobrenaturais. Esses indivíduos são conhecidos por sua habilidade de conjurar feitiços, criar ilusões e manipular a realidade à sua vontade. Em histórias de fantasia, os magos são frequentemente retratados como personagens poderosos e sábios, capazes de realizar feitos extraordinários. Além disso, o termo \"wizard\" também pode ser usado para se referir a um especialista em determinado campo de conhecimento, alguém que é altamente qualificado e experiente em uma área específica."
//     },
//     "logprobs": null,
//     "finish_reason": "stop"
//   }
